## 2026-10-23 - Command injection vulnerabilities in python subprocess.run
**Vulnerability:** Python `subprocess.run` calls were executed with `shell=True`, which is vulnerable to command injection if variables substituted in commands are not properly escaped.
**Learning:** Shell=True enables execution of arbitary shell commands if user input reaches the command string.
**Prevention:** Use a list with `shell=False` for executing commands securely, as specified in memory guidelines. Avoid `shell=True` unless absolutely necessary (and if used, heavily sanitize).

## 2026-10-23 - XSS vulnerability via innerHTML in SITE/build-hub.py
**Vulnerability:** User-controlled input was inserted unsanitized into `.innerHTML`, leading to a Cross-Site Scripting (XSS) vulnerability.
**Learning:** Using `.innerHTML` to insert text without proper HTML escaping allows for the execution of arbitrary JavaScript. Also, when embedding JS containing curly braces within Python string templates, they must be escaped (`{{`, `}}`) to avoid Python formatting errors.
**Prevention:** Always use a helper function to HTML-escape variables when concatenating strings to be injected into `.innerHTML`, or avoid using `.innerHTML` altogether and prefer methods that treat input strictly as text (e.g. `textContent`).
