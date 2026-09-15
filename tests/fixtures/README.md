# Shared fixture contract

url_cases.json is the source corpus for the formal simulator. It is structured
so that future Flask accept/reject-response and UI verdict tests can
parameterize directly over the same cases.

| Field | Meaning |
| --- | --- |
| id | Stable unique identifier. Use A for representative accepts, R for representative rejects, and B for a boundary. |
| category | accepted, rejected, or boundary. A boundary still has an explicit Boolean verdict. |
| url | Raw input string; no consumer may trim, lowercase, fetch, or normalize it. |
| accepted | Expected DFA verdict and the expected HTTP 200 response value. |
| source_rule | Exact rule heading(s) from docs/language-spec.md. |
| reason | Short explanation suitable for a parameterized-test failure or UI assertion. |

For every row, simulator tests call simulate_url(url). Future API tests should
post the raw URL and expect HTTP 200 plus the same accepted value; future UI
tests should submit that raw URL and assert the matching verdict state.
Malformed transport requests
(missing, non-string, blank, too long, or too large) are not language rows:
they expect HTTP 400 or 413 before the DFA and belong in API request-validation
tests.

Adding a row requires a unique ID and URL, source rule, reason, and test run.
Changing a verdict changes the language contract and needs Ranee's scope
approval plus review by Isaiah, Ralph, Pamela, and Jared.
