## 2025-02-16 - [Optimize Gmail API modifications]
**Learning:** Sequential calls to `messages.modify` inside loops for each email lead to excessive API quota consumption (costing 5 units per operation) and slow execution time.
**Action:** Always group emails by their target labels/modifications and use `messages.batchModify` in batches (up to 1000 messages) to drastically reduce quota usage and speed up processing.
