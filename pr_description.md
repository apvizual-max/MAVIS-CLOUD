🎯 **What:** Separated the multiple imports on line 9 of `mavis-tools/export-conversatie.py` into individual lines according to PEP 8 standards. The target file originally contained `import os, json, subprocess, datetime` without `urllib.request`.

💡 **Why:** Having each import on a separate line improves code readability, makes diffs cleaner for future version control changes, and adheres to standard Python coding conventions. It also addresses the underlying code health instruction to clean up the import block.

✅ **Verification:** Verified the script compiles correctly without syntax errors using `python3 -m py_compile mavis-tools/export-conversatie.py`. Ran the Python test suite in `SITE` to ensure no related tests failed, confirming the refactor is safe. (A pre-existing failure in `mavis-tools/tests/test_build_dashboard_legacy.py` is unrelated to this script).

✨ **Result:** The code block is cleaner, strictly conforms to PEP 8, and is easier to maintain.
