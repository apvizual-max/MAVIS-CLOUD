## 2026-10-23 - Command injection vulnerabilities in python subprocess.run
**Vulnerability:** Python `subprocess.run` calls were executed with `shell=True`, which is vulnerable to command injection if variables substituted in commands are not properly escaped.
**Learning:** Shell=True enables execution of arbitary shell commands if user input reaches the command string.
**Prevention:** Use a list with `shell=False` for executing commands securely, as specified in memory guidelines. Avoid `shell=True` unless absolutely necessary (and if used, heavily sanitize).
## 2026-10-24 - Fix Command execution vulnerability in SITE/build-dashboard-legacy.py
**Learning:** Even deprecated tools should have secure defaults like shell=False when executing commands to prevent command injection, especially in shared code.
**Action:** Replaced shell=True with the shell=False and list argument in subprocess.run in SITE/build-dashboard-legacy.py and its corresponding test assertion.
