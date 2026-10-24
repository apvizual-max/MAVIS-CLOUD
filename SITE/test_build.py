import unittest
from build import initials

class TestInitials(unittest.TestCase):
    def test_normal_full_name(self):
        self.assertEqual(initials("John Doe"), "JD")

    def test_single_name(self):
        self.assertEqual(initials("John"), "J")

    def test_multiple_words(self):
        self.assertEqual(initials("John Doe Smith"), "JD")

    def test_empty_string(self):
        self.assertEqual(initials(""), "—")
        self.assertEqual(initials("   "), "—")

    def test_non_string_input(self):
        self.assertEqual(initials(None), "N")
        self.assertEqual(initials(123), "1")

    def test_weird_spacing(self):
        self.assertEqual(initials("  John   Doe  "), "JD")

if __name__ == '__main__':
    unittest.main()
