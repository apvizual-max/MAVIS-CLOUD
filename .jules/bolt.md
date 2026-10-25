## 2025-02-16 - [Optimize Gmail API modifications]
**Learning:** Sequential calls to `messages.modify` inside loops for each email lead to excessive API quota consumption (costing 5 units per operation) and slow execution time.
**Action:** Always group emails by their target labels/modifications and use `messages.batchModify` in batches (up to 1000 messages) to drastically reduce quota usage and speed up processing.

## 2025-02-16 - [Optimize RegExp recompilation in hot loops]
**Learning:** Instantiating new `RegExp` objects inside heavily repeated utility functions (like `hasWord` used in scoring and filtering text loops) leads to significant performance degradation. The Javascript engine has to parse and compile the regex syntax on every call.
**Action:** Always memoize and cache compiled `RegExp` objects (using `Map` or an object literal) so they are created only once per unique pattern when operating in hot loops.

## 2026-10-25 - [Optimize Gmail API Calls]
**Learning:** Gmail API calls can be optimized using batch endpoints like `batchModify` instead of executing individual requests inside a Promise loop. This drastically reduces quota consumption.
**Action:** Use batching for multiple API requests whenever supported.
