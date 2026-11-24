# Reproduction guide

## Minimal prompt

> Create two files named 123456中文测试.txt and 123456_café_résumé.txt containing only "Filename test. Identical content." Provide downloadable links. Also create a ZIP named 123456_café_résumé.zip containing a harmless text file.

## Compare the two entry points

1. Click the TXT link in the assistant response body. Inspect the title in the right preview panel before saving.
2. Click the preview download button and inspect the actual saved name in browser downloads.
3. Download the same TXT using the attachment list at the bottom of the response, if present.
4. Repeat with the accented Latin TXT. Compare both filenames.
5. Click the inline ZIP link and note whether a preview opens and the name of the saved file.
6. Repeat in another browser, using the same conversation and files.

Expected: each entry point preserves the filename. Observed in the original test: the inline path saves percent-encoded names; the attachment-list TXT/DOCX downloads preserve the original names. ZIP attachment-list behavior was not established.

## Optional diagnostics

Use DevTools Network with Preserve log enabled. Compare the initial metadata request's sandbox_path query parameter and returned file_name, then the subsequent file-content request's Content-Disposition and filename*. Record UTC timestamps, browser version and actual downloaded names. The final file header comparison in this case was performed on Chinese TXT only.

For public reports, manually extract a small allowlist of relevant fields; do not post raw HAR files, request headers, cookies, signed URLs, account IDs or private conversation URLs. Redact screenshots.

## Offline demo

Run `node repro/encoding-demo.mjs` and `node --test repro/encoding-demo.test.mjs` from the repository root. This demonstrates outer query serialization of a raw versus already encoded path and the risk of over-decoding legitimate literal percent sequences. It makes no network requests and is not a ChatGPT integration test.