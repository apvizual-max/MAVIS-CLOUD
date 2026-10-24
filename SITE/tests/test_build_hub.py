import sys
import os
import unittest
from unittest.mock import patch, mock_open

# Load the module dynamically since it contains a hyphen
import importlib.util
module_name = 'build_hub'
file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'build-hub.py'))
spec = importlib.util.spec_from_file_location(module_name, file_path)
build_hub = importlib.util.module_from_spec(spec)
sys.modules[module_name] = build_hub
spec.loader.exec_module(build_hub)

class TestCitesteRepo(unittest.TestCase):
    @patch('os.path.exists')
    def test_citeste_repo_no_file(self, mock_exists):
        """Test when repos.json does not exist."""
        mock_exists.return_value = False
        result = build_hub.citeste_repo()
        self.assertEqual(result, [])

    @patch('os.path.exists')
    @patch('builtins.open', new_callable=mock_open, read_data='invalid json')
    def test_citeste_repo_invalid_json(self, mock_file, mock_exists):
        """Test when repos.json exists but contains invalid JSON."""
        mock_exists.return_value = True
        result = build_hub.citeste_repo()
        self.assertEqual(result, [])

    @patch('os.path.exists')
    @patch('builtins.open', new_callable=mock_open, read_data='[{"name": "repo1", "branch": "dev", "role": "test", "remote": "url"}]')
    @patch.object(build_hub, 'stare_repo')
    def test_citeste_repo_valid_json(self, mock_stare_repo, mock_file, mock_exists):
        """Test when repos.json is valid."""
        mock_exists.return_value = True
        mock_stare_repo.return_value = {'nume': 'repo1', 'ramura': 'dev'}

        result = build_hub.citeste_repo()

        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]['nume'], 'repo1')
        self.assertEqual(result[0]['rol'], 'test')
        self.assertEqual(result[0]['remote_url'], 'url')
        mock_stare_repo.assert_called_once_with('repo1', 'dev')

if __name__ == '__main__':
    unittest.main()
