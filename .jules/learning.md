## 2026-10-28 - Optimizing regex matching in hotpaths
**Insight:** When iterating over a large array of keywords to test against a string using regex (e.g. `keywords.some(k => new RegExp(k).test(text))`), the performance cost is extremely high in tight loops.
**Action:** Always combine the keywords into a single pre-compiled regular expression using the alternation operator `|` (e.g. `new RegExp(`(${escapedKeywords.join('|')})`)`) and test that single regex. This delegates the iteration to the C++ regex engine, which is orders of magnitude faster.
