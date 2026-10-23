## 2023-10-23 - Async Error Handling with Child Processes in Node.js

**Vulnerability:** Node.js `child_process.spawn()` can silently crash the application with an `Unhandled 'error' event` if the executable is missing and no `.on('error', ...)` listener is attached.
**Learning:** A synchronous `try/catch` around `spawn()` does not catch asynchronous event emitter errors like "executable not found". This is a common regression when migrating from `exec()` (which catches these errors via its callback) to `spawn()`.
**Prevention:** Always attach an error listener when using `spawn()`, especially for non-critical side effects like opening a browser: `spawn(...).on('error', () => {}).unref()`.
