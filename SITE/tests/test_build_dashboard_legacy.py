import unittest
from unittest.mock import patch
import sys
import os

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
    def test_esc_basic_escaping(self):
        self.assertEqual(bd.esc('a & b < c > d'), 'a &amp; b &lt; c &gt; d')

    def test_esc_non_string(self):
        self.assertEqual(bd.esc(123), '123')

    def test_esc_empty_string(self):
        self.assertEqual(bd.esc(''), '')

    def test_esc_none(self):
        self.assertEqual(bd.esc(None), 'None')


if __name__ == '__main__':
    unittest.main()
