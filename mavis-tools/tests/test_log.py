import unittest
from unittest.mock import patch, mock_open
import json
import os
import sys

# Add parent directory to sys.path to import log
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import log

class TestLogIncarcare(unittest.TestCase):

    @patch('log.os.path.exists')
    def test_file_does_not_exist(self, mock_exists):
        mock_exists.return_value = False
        result = log.incarcare()
        self.assertEqual(result, {'intrari': [], 'nivel': {}})

    @patch('log.os.path.exists')
    @patch('builtins.open', new_callable=mock_open, read_data='{"intrari": [{"msg": "test"}], "nivel": {"info": 1}}')
    def test_file_exists_valid_json(self, mock_file, mock_exists):
        mock_exists.return_value = True
        valid_data = {'intrari': [{'msg': 'test'}], 'nivel': {'info': 1}}
        result = log.incarcare()
        self.assertEqual(result, valid_data)

    @patch('log.os.path.exists')
    @patch('builtins.open', new_callable=mock_open, read_data="not valid json")
    def test_file_exists_invalid_json(self, mock_file, mock_exists):
        mock_exists.return_value = True
        result = log.incarcare()
        self.assertEqual(result, {'intrari': [], 'nivel': {}})

    @patch('log.os.path.exists')
    def test_file_exists_read_error(self, mock_exists):
        mock_exists.return_value = True
        mock_file = mock_open()
        mock_file.side_effect = Exception("Read error")
        with patch('builtins.open', mock_file):
            result = log.incarcare()
            self.assertEqual(result, {'intrari': [], 'nivel': {}})

if __name__ == '__main__':
    unittest.main()
