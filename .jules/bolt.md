## 2026-10-23 - Compiling RegExp in Hot Loop (`hasWord`)
**Learning:** The `hasWord` utility function compiles a new `RegExp` every single time it is called. Given its usage inside mapping and filtering functions over large arrays (like scanning JD texts or lists of roles for word boundaries), this was causing significant slowdowns (e.g. ~5x slower in synthetic benchmarks).
**Action:** Always memoize/cache dynamically created `RegExp` objects using a simple dictionary when they are created repeatedly with the same string arguments in a hot loop.
