# Validation API contract

This is the implemented React–Flask boundary for the Phase 3 candidate. The
accepted input language is defined by [the approved specification](language-spec.md);
runtime states come from [url_dfa.json](../backend/automata/url_dfa.json). The API
simulates the submitted string. It never fetches the URL or checks whether a
website exists.

## Endpoints and input

**GET /api/health** returns HTTP 200 with
{"status":"ok","validator_ready":true} when the Flask endpoint is reachable.
The current route sets `validator_ready` to `true` without loading or checking
the DFA model, so this response proves backend connectivity only. Verify model
readiness with a known accepted `POST /api/validate` smoke case; health alone
does not prove that validation can run or that a submitted URL is accepted.

**POST /api/validate** takes one required JSON string:

~~~json
{"url":"http://a.co"}
~~~

The value is processed as sent. It is not trimmed, lowercased, decoded,
resolved, or visited. The core language accepts lowercase HTTP/HTTPS, a
DNS-style host, and an optional simple path. FTP, ports, queries, fragments,
IP literals, raw Unicode, and uppercase input are outside that language. An
ASCII xn-- label is ordinary label text; no IDN decoding occurs.

## Completed simulation: HTTP 200

Both acceptance and formal rejection return HTTP 200.

| Field | Meaning |
| --- | --- |
| accepted | Boolean DFA verdict. |
| message | Human-readable result; do not use it as the machine-readable verdict. |
| final_state | State after all input symbols are consumed; a string for a completed simulation. |
| trace | Ordered transition rows, one per input symbol, including symbols consumed in the sink. |

Each trace row contains zero-based position, raw symbol, from_state, and
to_state. There is no symbol_class response field. The minimized DFA starts at
M0, accepts in M13, M14, or M15, and uses M_sink for invalid paths. The client
displays the trace and final state; it must not infer acceptance from the
message or HTTP 200 alone.

The current Flask test client returns this complete response for http://a.co:

~~~json
{
  "accepted": true,
  "final_state": "M13",
  "message": "Accepted: the URL matches the approved core language.",
  "trace": [
    {"from_state":"M0","position":0,"symbol":"h","to_state":"M1"},
    {"from_state":"M1","position":1,"symbol":"t","to_state":"M2"},
    {"from_state":"M2","position":2,"symbol":"t","to_state":"M3"},
    {"from_state":"M3","position":3,"symbol":"p","to_state":"M4"},
    {"from_state":"M4","position":4,"symbol":":","to_state":"M6"},
    {"from_state":"M6","position":5,"symbol":"/","to_state":"M7"},
    {"from_state":"M7","position":6,"symbol":"/","to_state":"M8"},
    {"from_state":"M8","position":7,"symbol":"a","to_state":"M9"},
    {"from_state":"M9","position":8,"symbol":".","to_state":"M10"},
    {"from_state":"M10","position":9,"symbol":"c","to_state":"M12"},
    {"from_state":"M12","position":10,"symbol":"o","to_state":"M13"}
  ]
}
~~~

For ftp://a.co, the same endpoint returns HTTP 200 with accepted false,
final_state M_sink, and ten trace rows. The first row goes from M0 to M_sink
on f; the remaining symbols are still consumed in M_sink. A URL ending in
?debug is likewise a completed simulation with an HTTP 200 **rejected**
verdict because queries are outside the approved language.

## Invalid request: HTTP 400 or 413

A missing, non-string, blank, or over-2,048-character URL does not reach the
DFA. Flask returns HTTP 400 with code invalid_request and a readable message.
For example, an empty JSON object returns:

~~~json
{"code":"invalid_request","message":"Send a JSON object with a string URL."}
~~~

A request body over 16 KiB returns HTTP 413. In the Compose deployment, Nginx
may reject the body before Flask does, so callers must not assume every 413
has Flask's JSON error shape. The ordinary browser input is limited to 2,048
characters. React renders Flask's JSON 400/413 responses as request errors,
not DFA rejections. An upstream HTML 413 is an unexpected server response in
the current client; this edge cannot be produced by the ordinary 2,048-
character browser form.

## Unavailable backend and routing

If React cannot reach Flask, it shows **Backend unavailable** with Retry.
Timeout and unexpected server responses remain separate errors. Development
uses Vite's relative /api proxy. Compose uses Nginx to route /api/ to the
Python backend at port 5000 while serving the frontend at port 8080. The
backend is not published directly by Compose. See [compose.yaml](../compose.yaml)
and [nginx.conf](../deployment/nginx.conf).

The implemented contract is checked by [test_api.py](../tests/test_api.py),
[test_simulator.py](../tests/test_simulator.py), and the shared
[URL corpus](../tests/fixtures/url_cases.json). Local Compose verification
is recorded in [the Phase 3 release gate](release/phase-3-release-gate.md).
