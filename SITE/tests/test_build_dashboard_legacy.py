import unittest
from unittest.mock import patch
import sys
import os
import subprocess

# Import using importlib to handle hyphens in the filename
import importlib.util
spec = importlib.util.spec_from_file_location("build_dashboard_legacy", os.path.join(os.path.dirname(__file__), '..', 'build-dashboard-legacy.py'))
bd = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bd)


class TestBuildDashboardLegacy(unittest.TestCase):
    @patch('subprocess.run')
    def test_sh_exception_returns_empty_string(self, mock_run):
        # Configure mock to raise an exception
        mock_run.side_effect = Exception("Test Exception")

        # Call the function
        result = bd.sh('some_command')

        # Assert the result is an empty string
        self.assertEqual(result, '')

    @patch('subprocess.run')
    def test_sh_timeout_expired_returns_empty_string(self, mock_run):
        # Configure mock to raise a TimeoutExpired exception
        mock_run.side_effect = subprocess.TimeoutExpired("cmd", 25)

        # Call the function
        result = bd.sh('some_command')

        # Assert the result is an empty string
        self.assertEqual(result, '')

    @patch('subprocess.run')
    def test_sh_success_returns_stdout(self, mock_run):
        mock_process = unittest.mock.Mock()
        mock_process.stdout = " success output \n"
        mock_run.return_value = mock_process

        result = bd.sh('echo hello')

        self.assertEqual(result, "success output")

if __name__ == '__main__':
    unittest.main()
