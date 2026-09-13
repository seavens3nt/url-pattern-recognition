# API contract

## Implemented starter endpoints

`GET /api/health` returns HTTP 200 with `{"status":"ok","validator_ready":false}`.

`POST /api/validate` takes a JSON body such as `{"url":"https://example.com"}`. A missing, non-string, blank, or over-2048-character URL returns HTTP 400 with `code: invalid_request` and a readable `message`. Bodies over 16 KiB return 413. The service never fetches the supplied URL.

A well-shaped request currently returns HTTP 501:
```json
{"code":"not_implemented","message":"DFA validation is not implemented yet.","accepted":null,"trace":[]}
```
This is an intentional implementation status, not a rejected URL.

## Final response for Sprint 1 review — sign-off details pending

HTTP 200 represents a completed DFA simulation for either an accepted or rejected input string. The simulator must not fetch or otherwise visit the submitted URL.

An empty or blank URL never reaches the DFA path; it is rejected upstream by the existing HTTP 400 blank-URL check in "Implemented starter endpoints."

The response body has this schema:

```json
{
  "accepted": true,
  "message": "string",
  "final_state": "S0",
  "trace": [
    {
      "position": 0,
      "symbol": "h",
      "from_state": "S0",
      "to_state": "S1"
    }
  ]
}
```

Field meanings:

- `accepted` is a boolean verdict from the DFA.
- `message` is a string containing a readable result summary for the UI.
- `final_state` is the final DFA state label after consuming the input. The field is nullable in the wire contract, but completed HTTP 200 simulations should return a string state label.
- `trace` is an array of transition entries in input order.
- `position` is an integer zero-based index into the raw input string exactly as the client sent it.
- `symbol` is the raw input character consumed at that position.
- `from_state` is the DFA state before consuming `symbol`.
- `to_state` is the DFA state reached after consuming `symbol`. The field is nullable in the wire contract, but completed HTTP 200 simulations should return a string state label for each transition.

Trace completeness decision: the trace should run for the full length of the input. If a character falls outside the approved grammar or no accepting path remains, the DFA transitions into a dead/trap state and continues consuming the remaining characters. This matches the formal DFA model with a total transition function and gives the UI a complete per-character explanation. Pamela must confirm this remains compatible with the final DFA model once it exists.

Normalization decision: trace positions index the raw input string, not a lowercased, trimmed, Punycode-converted, or otherwise normalized form. Any normalization required by the approved language belongs to simulator preprocessing and state-transition design; the wire contract should not hide the user's original character positions from the UI. Pamela and Jared should confirm this once the simulator implementation exists.

The examples below are illustrative, not the final DFA. State labels such as `S0`, `S1`, `S_ACCEPT`, and `TRAP` are placeholders only; Pamela's DFA will provide the real labels.

### Illustrative accepted URL

Request:

```json
{
  "url": "ftp://a.co/"
}
```

Response:

```json
{
  "accepted": true,
  "message": "Input accepted by the DFA.",
  "final_state": "S_ACCEPT",
  "trace": [
    {"position": 0, "symbol": "f", "from_state": "S0", "to_state": "S1"},
    {"position": 1, "symbol": "t", "from_state": "S1", "to_state": "S2"},
    {"position": 2, "symbol": "p", "from_state": "S2", "to_state": "S3"},
    {"position": 3, "symbol": ":", "from_state": "S3", "to_state": "S4"},
    {"position": 4, "symbol": "/", "from_state": "S4", "to_state": "S5"},
    {"position": 5, "symbol": "/", "from_state": "S5", "to_state": "S6"},
    {"position": 6, "symbol": "a", "from_state": "S6", "to_state": "S7"},
    {"position": 7, "symbol": ".", "from_state": "S7", "to_state": "S8"},
    {"position": 8, "symbol": "c", "from_state": "S8", "to_state": "S9"},
    {"position": 9, "symbol": "o", "from_state": "S9", "to_state": "S10"},
    {"position": 10, "symbol": "/", "from_state": "S10", "to_state": "S_ACCEPT"}
  ]
}
```

### Illustrative rejected URL with trap state

Request:

```json
{
  "url": "http://bad host/"
}
```

Response:

```json
{
  "accepted": false,
  "message": "Input rejected by the DFA after entering the trap state.",
  "final_state": "TRAP",
  "trace": [
    {"position": 0, "symbol": "h", "from_state": "S0", "to_state": "S1"},
    {"position": 1, "symbol": "t", "from_state": "S1", "to_state": "S2"},
    {"position": 2, "symbol": "t", "from_state": "S2", "to_state": "S3"},
    {"position": 3, "symbol": "p", "from_state": "S3", "to_state": "S4"},
    {"position": 4, "symbol": ":", "from_state": "S4", "to_state": "S5"},
    {"position": 5, "symbol": "/", "from_state": "S5", "to_state": "S6"},
    {"position": 6, "symbol": "/", "from_state": "S6", "to_state": "S7"},
    {"position": 7, "symbol": "b", "from_state": "S7", "to_state": "S8"},
    {"position": 8, "symbol": "a", "from_state": "S8", "to_state": "S9"},
    {"position": 9, "symbol": "d", "from_state": "S9", "to_state": "S10"},
    {"position": 10, "symbol": " ", "from_state": "S10", "to_state": "TRAP"},
    {"position": 11, "symbol": "h", "from_state": "TRAP", "to_state": "TRAP"},
    {"position": 12, "symbol": "o", "from_state": "TRAP", "to_state": "TRAP"},
    {"position": 13, "symbol": "s", "from_state": "TRAP", "to_state": "TRAP"},
    {"position": 14, "symbol": "t", "from_state": "TRAP", "to_state": "TRAP"},
    {"position": 15, "symbol": "/", "from_state": "TRAP", "to_state": "TRAP"}
  ]
}
```

### Illustrative accepted edge case with valueless query

Request:

```json
{
  "url": "https://ex.com/path?debug"
}
```

Response:

```json
{
  "accepted": true,
  "message": "Input accepted by the DFA with a valueless query key.",
  "final_state": "S_ACCEPT",
  "trace": [
    {"position": 0, "symbol": "h", "from_state": "S0", "to_state": "S1"},
    {"position": 1, "symbol": "t", "from_state": "S1", "to_state": "S2"},
    {"position": 2, "symbol": "t", "from_state": "S2", "to_state": "S3"},
    {"position": 3, "symbol": "p", "from_state": "S3", "to_state": "S4"},
    {"position": 4, "symbol": "s", "from_state": "S4", "to_state": "S5"},
    {"position": 5, "symbol": ":", "from_state": "S5", "to_state": "S6"},
    {"position": 6, "symbol": "/", "from_state": "S6", "to_state": "S7"},
    {"position": 7, "symbol": "/", "from_state": "S7", "to_state": "S8"},
    {"position": 8, "symbol": "e", "from_state": "S8", "to_state": "S9"},
    {"position": 9, "symbol": "x", "from_state": "S9", "to_state": "S10"},
    {"position": 10, "symbol": ".", "from_state": "S10", "to_state": "S11"},
    {"position": 11, "symbol": "c", "from_state": "S11", "to_state": "S12"},
    {"position": 12, "symbol": "o", "from_state": "S12", "to_state": "S13"},
    {"position": 13, "symbol": "m", "from_state": "S13", "to_state": "S14"},
    {"position": 14, "symbol": "/", "from_state": "S14", "to_state": "S15"},
    {"position": 15, "symbol": "p", "from_state": "S15", "to_state": "S16"},
    {"position": 16, "symbol": "a", "from_state": "S16", "to_state": "S17"},
    {"position": 17, "symbol": "t", "from_state": "S17", "to_state": "S18"},
    {"position": 18, "symbol": "h", "from_state": "S18", "to_state": "S19"},
    {"position": 19, "symbol": "?", "from_state": "S19", "to_state": "S20"},
    {"position": 20, "symbol": "d", "from_state": "S20", "to_state": "S21"},
    {"position": 21, "symbol": "e", "from_state": "S21", "to_state": "S22"},
    {"position": 22, "symbol": "b", "from_state": "S22", "to_state": "S23"},
    {"position": 23, "symbol": "u", "from_state": "S23", "to_state": "S24"},
    {"position": 24, "symbol": "g", "from_state": "S24", "to_state": "S_ACCEPT"}
  ]
}
```

During development, React calls relative `/api` paths and Vite proxies to Flask at 127.0.0.1:5000. Production needs an equivalent routing arrangement and production Python server.

## Review outcomes

- Isaiah / `docs/language-spec.md`: Still pending in this checkout; `docs/language-spec.md` is missing, and no PR number, review date, or decision-log entry was provided in this task.
- Sean: Pending; no actual review resolution was provided in this task.
- Pamela: Pending; no actual review resolution was provided in this task.
- Paul: Pending; no actual review resolution was provided in this task.
- Ranee: Pending; no gate approval resolution was provided in this task.
- Schema changes requested: No actual schema changes were provided in this task, so no schema or example changes were applied.
