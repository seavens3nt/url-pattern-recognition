# Component plan: URL validation UI

## Objective

Plan the React components and their interaction with the validation API. The
browser accepts one value, sends it to Flask, and explains the DFA result
without visiting the submitted URL.

## Input

| Input | Type | Description |
| --- | --- | --- |
| URL to inspect | String | The raw URL text the user wants the backend to validate. |

The interface does not include a URL-pattern field, case-sensitivity toggle,
dynamic parameters, parsed URL anatomy, or client-side pattern matching.

## API contract

**Endpoint:** `POST /api/validate`

Request:

```json
{
  "url": "https://example.com"
}
```

An accepted or rejected DFA simulation returns HTTP 200 with `accepted`,
`message`, `final_state`, and `trace`.

Accepted example:

```json
{
  "accepted": true,
  "message": "Accepted: the URL matches the approved core language.",
  "final_state": "TLD_MANY",
  "trace": [
    {
      "position": 0,
      "symbol": "h",
      "from_state": "START",
      "to_state": "H"
    }
  ]
}
```

Rejected example:

```json
{
  "accepted": false,
  "message": "Rejected: the URL does not match the approved core language.",
  "final_state": "SINK",
  "trace": [
    {
      "position": 0,
      "symbol": "f",
      "from_state": "START",
      "to_state": "SINK"
    }
  ]
}
```

HTTP 400 and 413 responses are request errors rather than DFA rejections:

```json
{
  "code": "invalid_request",
  "message": "A non-empty URL string is required."
}
```

The exact message may vary with the invalid request. A network failure has no
HTTP response and maps to the offline interface state.

### Response fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted` | Boolean | Whether a completed simulation ended in an accepting state. |
| `message` | String | Readable result or request-error explanation. |
| `final_state` | String or null | Final DFA state for a simulation. Completed HTTP 200 responses use a string. |
| `trace` | Array | Transitions in input order. |

Each trace row contains:

| Field | Type | Description |
| --- | --- | --- |
| `position` | Integer | Zero-based position in the raw input. |
| `symbol` | String | Raw input character consumed at this step. |
| `from_state` | String | DFA state before consuming the character. |
| `to_state` | String or null | DFA state reached after the character. Completed simulations use a string. |

## Interface-state mapping

| UI state | API outcome | Display behavior |
| --- | --- | --- |
| Idle | No request submitted | Show the empty URL form and enabled submit button. |
| Loading | Request is pending | Disable duplicate submission and show a progress message. |
| Accepted | HTTP 200 and `accepted: true` | Show an accepted verdict, message, final state, and trace. |
| Rejected | HTTP 200 and `accepted: false` | Show a rejected verdict, message, final state, and trace. |
| Invalid request | HTTP 400 or 413 | Show the backend message as a request error; do not label it rejected. |
| Offline | Flask cannot be reached | Explain that the backend is unavailable and allow retry. |

## Interface components

1. **URL input form** — captures the URL text and provides its accessible label.
2. **Submit button** — sends the validation request and blocks duplicate submission while loading.
3. **Loading indicator** — announces that the request is pending.
4. **Accepted/rejected result panel** — renders the HTTP 200 verdict and message.
5. **Invalid-request panel** — renders HTTP 400/413 messages separately from rejection.
6. **Backend-offline panel** — renders connection-failure guidance and retry behavior.
7. **Final-state display** — renders `final_state` when supplied.
8. **Transition-trace table** — renders `position`, `symbol`, `from_state`, and `to_state` in order.

## Frontend ownership and file boundaries

| Owner | Owned files | Responsibility |
| --- | --- | --- |
| Isaiah | `frontend/src/style.css`, `frontend/src/ui/` | Layout, CSS, responsive behavior, presentational elements, and accessibility styling. |
| Sean | `frontend/src/features/validator/ValidatorPage.jsx`, `frontend/src/features/validator/api.js` | React state, request behavior, verdict/error rendering, final state, and trace display. |
| Jared | `docs/api-contract.md`, backend API implementation | Request/response keys, HTTP statuses, limits, and trace contract. |
| Paul | QA cases and test review | Confirm that every state and control has a derivable test case. |

Frontend changes must remain within the assigned owner paths. Isaiah does not
change request or React state logic; Sean does not change global visual styling
or presentational files unless Ranee assigns the change.

## Review evidence

- The request, HTTP outcomes, fields, limits, and trace row shape match
  `docs/api-contract.md`.
- Every interface state maps to one distinct API or network outcome.
- The accepted, rejected, request-error, loading, and offline behaviors are
  independently testable.
- Only Ranee reviews and approves the PR and decides whether the Phase 1 gate
  is accepted.
