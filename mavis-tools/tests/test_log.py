import unittest
from unittest.mock import patch, mock_open
import os
import sys

# Add the parent directory to the path so we can import the module
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import log

class TestLog(unittest.TestCase):
    @patch('os.path.exists', return_value=True)
    @patch('builtins.open', new_callable=mock_open, read_data="invalid json")
    def test_incarcare_invalid_json(self, mock_file, mock_exists):
        result = log.incarcare()
        self.assertEqual(result, {'intrari': [], 'nivel': {}})

if __name__ == '__main__':
    unittest.main()
