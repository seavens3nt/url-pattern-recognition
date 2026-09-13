# API contract

## Implemented starter endpoints

`GET /api/health` returns HTTP 200 with `{"status":"ok","validator_ready":false}`.

`POST /api/validate` takes a JSON body such as `{"url":"https://example.com"}`. A missing, non-string, blank, or over-2048-character URL returns HTTP 400 with `code: invalid_request` and a readable `message`. Bodies over 16 KiB return 413. The service never fetches the supplied URL.

A well-shaped request currently returns HTTP 501:
```json
{"code":"not_implemented","message":"DFA validation is not implemented yet.","accepted":null,"trace":[]}
```
This is an intentional implementation status, not a rejected URL.

## Proposed final response for Sprint 1 review

HTTP 200 should represent a completed simulation for either an accepted or rejected string. Proposed fields: `accepted` (boolean), `message`, `final_state`, and `trace` entries with `position`, `symbol`, `from_state`, `to_state`. Define positions as zero-based input character indices and agree how out-of-alphabet symbols and empty input are explained before implementation. Final schemas require Jared and Sean's review; they are not implemented yet.

During development, React calls relative `/api` paths and Vite proxies to Flask at 127.0.0.1:5000. Production needs an equivalent routing arrangement and production Python server.

The accepted input language is fixed in [Approved URL language](language-spec.md). A syntactically valid JSON request that contains a URL outside that language must eventually return HTTP 200 with `accepted: false`; HTTP 400 is reserved for malformed API input such as a missing or non-string `url` field.
