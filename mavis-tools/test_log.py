import unittest
from unittest.mock import patch, mock_open
import log

class TestLog(unittest.TestCase):
    @patch('os.path.exists', return_value=True)
    @patch('builtins.open', new_callable=mock_open, read_data="invalid json")
    def test_incarcare_invalid_json(self, mock_file, mock_exists):
        result = log.incarcare()
        self.assertEqual(result, {'intrari': [], 'nivel': {}})

    @patch('os.path.exists', return_value=True)
    @patch('builtins.open')
    def test_incarcare_open_exception(self, mock_file, mock_exists):
        mock_file.side_effect = PermissionError("Cannot open file")
        result = log.incarcare()
        self.assertEqual(result, {'intrari': [], 'nivel': {}})

if __name__ == '__main__':
    unittest.main()
