# API contract

## Implemented starter endpoints

`GET /api/health` returns HTTP 200 with `{"status":"ok","validator_ready":true}`.

`POST /api/validate` takes a JSON body such as `{"url":"https://example.com"}`. A missing, non-string, blank, or over-2048-character URL returns HTTP 400 with `code: invalid_request` and a readable `message`. Bodies over 16 KiB return 413. The service never fetches the supplied URL.

A well-shaped request returns HTTP 200 with a DFA result:
```json
{"accepted":true,"message":"Accepted: the URL matches the approved core language.","final_state":"TLD_MANY","trace":[{"position":0,"symbol":"h","symbol_class":"letter","from_state":"START","to_state":"H"}]}
```
A rejected URL also returns HTTP 200 with `accepted: false`, its final state, and the trace produced before rejection.

## Response fields

HTTP 200 represents a completed simulation for either an accepted or rejected string. Fields are `accepted` (boolean), `message`, `final_state`, and `trace` entries with zero-based `position`, `symbol`, `symbol_class`, `from_state`, and `to_state`.

During development, React calls relative `/api` paths and Vite proxies to Flask at 127.0.0.1:5000. Production needs an equivalent routing arrangement and production Python server.

The accepted input language is fixed in [Approved URL language](language-spec.md). A syntactically valid JSON request that contains a URL outside that language must eventually return HTTP 200 with `accepted: false`; HTTP 400 is reserved for malformed API input such as a missing or non-string `url` field.
