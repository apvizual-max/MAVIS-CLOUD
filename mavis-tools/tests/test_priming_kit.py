import unittest
from unittest.mock import patch, MagicMock
import os
import sys

# Ensure the parent directory is in the sys.path
import importlib.util

spec = importlib.util.spec_from_file_location("priming_kit", os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'priming-kit.py')))
priming_kit = importlib.util.module_from_spec(spec)
sys.modules["priming_kit"] = priming_kit
spec.loader.exec_module(priming_kit)

class TestPrimingKit(unittest.TestCase):
    @patch('priming_kit.subprocess.run')
    def test_git_state(self, mock_run):
        mock_result = MagicMock()
        mock_result.stdout = "mocked_output"
        mock_run.return_value = mock_result

        c1, c2, c3 = priming_kit.git_state()

        self.assertEqual(c1, "mocked_output")
        self.assertEqual(c2, "mocked_output")
        self.assertEqual(c3, "mocked_output")

        # Verify shell=True is not used and arguments are split correctly
        for call_args in mock_run.call_args_list:
            args, kwargs = call_args
            self.assertNotIn('shell', kwargs)
            self.assertIsInstance(args[0], list)

if __name__ == '__main__':
    unittest.main()
