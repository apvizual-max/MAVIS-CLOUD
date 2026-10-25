import unittest
from unittest.mock import patch, MagicMock
import importlib.util
import os
import subprocess

# Load build-dashboard-legacy.py
spec = importlib.util.spec_from_file_location("build_dashboard_legacy", os.path.join(os.path.dirname(__file__), "build-dashboard-legacy.py"))
build_dashboard_legacy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(build_dashboard_legacy)

class TestBuildDashboardLegacy(unittest.TestCase):
    @patch("subprocess.run")
    def test_sh_success(self, mock_run):
        mock_result = MagicMock()
        mock_result.stdout = "  output text  \n"
        mock_run.return_value = mock_result

        result = build_dashboard_legacy.sh("echo hello")

        self.assertEqual(result, "output text")

        # In actual implementation: subprocess.run(shlex.split(c, posix=(os.name == 'posix')), ...)
        mock_run.assert_called_once_with(["echo", "hello"], cwd=build_dashboard_legacy.REPO, capture_output=True, text=True, timeout=25)

    @patch("subprocess.run")
    def test_sh_exception(self, mock_run):
        mock_run.side_effect = subprocess.TimeoutExpired(cmd=["echo", "hello"], timeout=25)

        result = build_dashboard_legacy.sh("echo hello", t=5)

        self.assertEqual(result, "")
        mock_run.assert_called_once_with(["echo", "hello"], cwd=build_dashboard_legacy.REPO, capture_output=True, text=True, timeout=5)

if __name__ == '__main__':
    unittest.main()
