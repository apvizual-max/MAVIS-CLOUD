import unittest
import os
import importlib.util

# Load the module dynamically since it has dashes in the name
spec = importlib.util.spec_from_file_location("build_dashboard_legacy", os.path.join(os.path.dirname(__file__), "..", "build-dashboard-legacy.py"))
build_dashboard_legacy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(build_dashboard_legacy)

class TestBuildDashboardLegacy(unittest.TestCase):
    def test_esc(self):
        esc = build_dashboard_legacy.esc

        # Happy path - no escaping needed
        self.assertEqual(esc("plain text"), "plain text")

        # Single replacements
        self.assertEqual(esc("A & B"), "A &amp; B")
        self.assertEqual(esc("<tag>"), "&lt;tag&gt;")

        # Multiple replacements and order verification
        self.assertEqual(esc("1 < 2 & 2 > 1"), "1 &lt; 2 &amp; 2 &gt; 1")
        self.assertEqual(esc("&<"), "&amp;&lt;")

        # Edge cases - non-string inputs
        self.assertEqual(esc(123), "123")
        self.assertEqual(esc(None), "None")
        self.assertEqual(esc(""), "")

if __name__ == '__main__':
    unittest.main()
