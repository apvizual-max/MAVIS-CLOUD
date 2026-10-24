import unittest
from unittest.mock import patch, mock_open
import sys
import os
import json

# Add mavis-tools to Python path so we can import log.py
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import log

class TestLog(unittest.TestCase):
    @patch('os.path.exists')
    @patch('builtins.open', new_callable=mock_open, read_data='{"intrari": [{"msg": "test"}], "nivel": {"info": 1}}')
    def test_incarcare_existing_file_valid_json(self, mock_file, mock_exists):
        """Test incarcare when the file exists and contains valid JSON."""
        mock_exists.return_value = True

        result = log.incarcare()

        mock_exists.assert_called_once_with(log.FIS)
        mock_file.assert_called_once_with(log.FIS, encoding='utf-8')
        self.assertEqual(result, {"intrari": [{"msg": "test"}], "nivel": {"info": 1}})

    @patch('os.path.exists')
    @patch('builtins.open', new_callable=mock_open, read_data='invalid json content')
    def test_incarcare_existing_file_invalid_json(self, mock_file, mock_exists):
        """Test incarcare when the file exists but contains invalid JSON."""
        mock_exists.return_value = True

        result = log.incarcare()

        mock_exists.assert_called_once_with(log.FIS)
        mock_file.assert_called_once_with(log.FIS, encoding='utf-8')
        self.assertEqual(result, {'intrari': [], 'nivel': {}})

    @patch('os.path.exists')
    def test_incarcare_missing_file(self, mock_exists):
        """Test incarcare when the file does not exist."""
        mock_exists.return_value = False

        result = log.incarcare()

        mock_exists.assert_called_once_with(log.FIS)
        self.assertEqual(result, {'intrari': [], 'nivel': {}})

if __name__ == '__main__':
    unittest.main()
