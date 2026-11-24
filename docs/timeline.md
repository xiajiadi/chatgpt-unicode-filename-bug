# Investigation and feedback timeline

All events below refer to November 24, 2026. Network timestamps are UTC; local reporting time was UTC+8.

| Stage | Result |
| --- | --- |
| Discovery | Generated course ZIP filename contained percent escapes. |
| Control tests | Chinese TXT, DOCX, ZIP and ASCII controls isolated Unicode handling. |
| Cross-browser comparison | Chrome and Edge reproduced; attachment-list route worked. |
| 02:02:43 / 02:04:35 UTC | Initial request comparison captured single vs double encoding; JSON metadata matched. |
| Community report | Public technical report published in ChatGPT Bugs; later updated with additional evidence. |
| Support interaction | AI-assisted Support stated it had recorded the bug and requested targeted follow-up. |
| 02:25:57 / 02:27:23 UTC | Subsequent TXT file-content headers captured; Content-Disposition and filename* matched. |
| Additional Unicode test | Accented Latin TXT and ZIP reproduced; ZIP bypassed preview. |
| Final Support response | AI-assisted Support stated the accented-Latin reproductions, ZIP direct-download behavior, and additional screenshot had been appended. |

## Current recorded status

- Community report: [public topic](https://community.openai.com/t/chatgpt-web-double-url-encoding-of-unicode-filenames-in-inline-file-downloads/1419940).
- AI-assisted Support acknowledged recording the report and additional evidence; this is not independent confirmation by an engineer.
- Support case/reference number: not provided.
- Engineering escalation: not confirmed.
- Root cause: hypothesis, not source-verified.
- Fix: not confirmed.
- Reward: none claimed.

This is an independent case record. If later developments occur, append dated updates and distinguish reproduction results from official statements.