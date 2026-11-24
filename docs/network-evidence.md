# Network evidence (sanitized)

## Initial metadata request

Both requests used GET on the same metadata endpoint, with conversation and message identifiers removed. Both returned HTTP 200 and application/json.

| Field | Attachment-list (working) | Inline link (affected) |
| --- | --- | --- |
| Date (UTC) | 2026-11-24 02:02:43 | 2026-11-24 02:04:35 |
| download_intent | true | false |
| Encoding of Chinese characters | Single | Double |
| JSON file_name | 123456中文测试.txt | 123456中文测试.txt |

```text
GET /backend-api/conversation/[REDACTED]/interpreter/download
working:  sandbox_path=%2Fmnt%2Fdata%2F123456%E4%B8%AD%E6%96%87%E6%B5%8B%E8%AF%95.txt
affected: sandbox_path=%2Fmnt%2Fdata%2F123456%25E4%25B8%25AD%25E6%2596%2587%25E6%25B5%258B%25E8%25AF%2595.txt
```

After parsing the outer query string once:

```text
working:  /mnt/data/123456中文测试.txt
affected: /mnt/data/123456%E4%B8%AD%E6%96%87%E6%B5%8B%E8%AF%95.txt
```

Both JSON responses returned the same file ID and signed content URL (omitted) and the following matching fields:

```json
{
  "file_name": "123456中文测试.txt",
  "mime_type": "text/plain"
}
```

The request intent and server build identifiers differed between captures; the observations alone do not identify which exact code path introduced the encoded display/save name.

## Subsequent TXT file-content response

| Field | Inline (affected) | Attachment (working) |
| --- | --- | --- |
| Date (UTC) | 2026-11-24 02:25:57 | 2026-11-24 02:27:23 |
| Content-Type | text/plain | text/plain |
| Content-Encoding | br | br |
| ETag | W/"0x8DF49CD8584EF2F" | W/"0x8DF49CD8584EF2F" |
| Last-Modified (UTC) | 2026-11-24 01:51:56 | 2026-11-24 01:51:56 |
| Content-Disposition | Identical, valid filename* | Identical, valid filename* |
| Saved name | Percent-encoded | Original Chinese |

Exact relevant header (both captures):

```http
Content-Disposition: attachment; filename="123456____.txt"; filename*=UTF-8''123456%E4%B8%AD%E6%96%87%E6%B5%8B%E8%AF%95.txt
```

The ASCII fallback is intentional. Per RFC 6266, clients that understand filename* should prefer it when both parameters exist. The header is not evidence of a malformed filename*.

## Interpretation

- Confirmed: the initial request's path encoding differs; the correct canonical filename is present in the returned JSON and the final TXT header; the preview and final saved name differ by entry point.
- Suspected: the inline route may use a filename derived from the encoded path instead of the canonical filename, possibly passing it into a programmatic download.
- Not established: exact source function, whether the double encoding alone causes the issue, other browser engines, whether ZIP headers match, and official engineering root cause or fix.

A regression test should cover the actual preview title and saved filename, not just correct HTTP headers; also test literal percent signs to avoid accidental repeated decoding.

## Data handling

Only allowlisted fields and cropped evidence are published. Request IDs were provided privately to Support, not included here. No raw request headers, cookies, tokens, signed links or conversation identifiers are published.

Reference: [RFC 6266](https://www.rfc-editor.org/rfc/rfc6266), [MDN Content-Disposition](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Disposition).