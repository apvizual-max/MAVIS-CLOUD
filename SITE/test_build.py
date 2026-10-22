import unittest
from build import initials

class TestInitials(unittest.TestCase):
    def test_normal_name(self):
        self.assertEqual(initials("John Doe"), "JD")
        self.assertEqual(initials("alice smith"), "AS")

    def test_single_name(self):
        self.assertEqual(initials("Prince"), "P")
        self.assertEqual(initials("madonna"), "M")

    def test_multiple_words(self):
        self.assertEqual(initials("John Jacob Jingleheimer Schmidt"), "JJ")

    def test_empty_and_whitespace(self):
        self.assertEqual(initials(""), "—")
        self.assertEqual(initials("   "), "—")
        self.assertEqual(initials("\t\n"), "—")

    def test_non_string_types(self):
        self.assertEqual(initials(None), "N") # 'None' stringifies to 'None'
        self.assertEqual(initials(123), "1")
        self.assertEqual(initials(45.67), "4")

    def test_special_characters(self):
        self.assertEqual(initials("!@# $%^"), "!$")
        self.assertEqual(initials("O'Connor"), "O")
        self.assertEqual(initials("Jean-Luc Picard"), "JP") # hyphen is part of the word

if __name__ == '__main__':
    unittest.main()
