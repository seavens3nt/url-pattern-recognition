# Regular-expression design — core URL language

**Owner:** Ralph Punzalan

**Construction reviewer:** Pamela

**Authoritative scope:** [`docs/language-spec.md`](../language-spec.md)

**Shared examples:** [`tests/fixtures/url_cases.json`](../../tests/fixtures/url_cases.json)

**Phase 2 status:** Finalized. Ranee's 2026-09-19 scope clarification confirms
that an ASCII `xn--` label is processed under the ordinary `LABEL` rule without
IDN decoding; raw Unicode remains rejected. No grammar change is required.
This version is the locked construction input for the epsilon-NFA in
`docs/automata/nfa.md`, referenced against locked commit `770b761`.

## 1. Regularity decision

The approved URL language is regular. Each component uses a finite character
alphabet, concatenation, finite alternatives, and repetition. Hostname and path
rules do not require recursive nesting, matching counts across distant parts of
the input, DNS access, or any other memory beyond a finite state. Therefore the
complete language can be recognized by a regular expression and converted to an
NFA and DFA.

This construction recognizes the submitted string exactly as written. It does
not trim, lowercase, decode, normalize, resolve, or open the URL.

## 2. Named components

The notation below is the formal design input for the NFA. `|` means choice,
juxtaposition means concatenation, `*` means zero or more, `+` means one or more,
and `?` means optional.

```text
LOWER       = [a-z]
DIGIT       = [0-9]
ALNUM       = LOWER | DIGIT

SCHEME      = http | https

LABEL       = ALNUM | ALNUM (ALNUM | -)* ALNUM
TLD         = LOWER LOWER LOWER*
HOST        = LABEL (. LABEL)* . TLD

PATH_CHAR   = ALNUM | - | _ | . | ~
SEGMENT     = PATH_CHAR+
PATH        = / | / SEGMENT (/ SEGMENT)* /?

URL         = SCHEME :// HOST PATH?
```

Dots in `HOST` and punctuation shown as URL separators are literal characters.
The entire input must match `URL`; no prefix or substring match is accepted.

An equivalent implementation-oriented full-match expression is:

```regex
^(?:http|https)://[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}(?:/(?:[a-z0-9._~-]+(?:/[a-z0-9._~-]+)*/?)?)?$
```

## 3. Mapping to the approved rules

| Approved rule | Expression component | How the expression enforces it |
| --- | --- | --- |
| Lowercase `http` or `https` only | `SCHEME` | It has exactly two literal alternatives. |
| Required `://` delimiter | `URL` | The delimiter is concatenated directly after `SCHEME`. |
| At least two hostname labels | `HOST` | At least one `LABEL` must occur before the final `. TLD`. |
| Labels start and end with a letter or digit | `LABEL` | The first and last symbols are `ALNUM`; hyphens can occur only between them. |
| Final label has at least two lowercase letters | `TLD` | Two `LOWER` symbols are required, followed by zero or more `LOWER` symbols. |
| Optional simple path | `PATH`, `SEGMENT` | A path begins with `/`; nonempty segments use only approved path characters, with single `/` separators and at most one trailing `/`. |
| No port, query, fragment, IP literal, Unicode, uppercase, percent escape, or whitespace | `URL` and its character classes | No component provides syntax or characters for these excluded forms. A full-input match therefore rejects them. |

## 4. Worked cases

### Accepted: `https://example.com/`

`https` matches `SCHEME`; `example` matches `LABEL`; `com` matches `TLD`;
and `/` matches the root alternative of `PATH`. The complete string matches,
so the result is **ACCEPT**.

### Accepted: `https://shop2.example.com/products/item-1/`

`https` matches `SCHEME`. `shop2` and `example` match `LABEL`, while `com`
matches `TLD`. The path contains two nonempty segments using approved
characters and one trailing slash. The result is **ACCEPT**.

### Rejected: `https://localhost`

`localhost` supplies only one hostname label. `HOST` requires at least one
`LABEL`, a literal dot, and a final `TLD`, so the result is **REJECT**.

### Rejected: `https://example.com/search?q=test`

The scheme and hostname match, and `/search` can match a path segment. The `?`
and following query text cannot match `PATH` or any later component because the
core language has no query component. Full-input matching therefore produces
**REJECT**.

## 5. Fixture verification

The expression was checked against the full shared fixture
(`tests/fixtures/url_cases.json`), by ID, for the Phase 2 NFA handoff.

| Case ID | URL | Expected | Expression result | Outcome |
| --- | --- | --- | --- | --- |
| A01 | http://example.com | Accepted | Matches | Pass |
| B01 | https://example.com/ | Accepted | Matches | Pass |
| A03 | https://www.example.com | Accepted | Matches | Pass |
| A04 | https://api.example.com/users | Accepted | Matches | Pass |
| A05 | http://my-site.example.org/docs | Accepted | Matches | Pass |
| A06 | https://v2.api.example.net/users/123 | Accepted | Matches | Pass |
| A07 | https://example.co.uk/about-us | Accepted | Matches | Pass |
| A08 | http://docs.example.edu/file_name | Accepted | Matches | Pass |
| B02 | https://shop2.example.com/products/item-1/ | Accepted | Matches | Pass |
| A10 | https://a.b.example.com/~user/read.me | Accepted | Matches | Pass |
| R01 | ftp://example.com | Rejected | No match | Pass |
| R02 | HTTP://example.com | Rejected | No match | Pass |
| R03 | example.com | Rejected | No match | Pass |
| R04 | https://localhost | Rejected | No match | Pass |
| B03 | https://-example.com | Rejected | No match | Pass |
| B04 | https://example..com | Rejected | No match | Pass |
| R07 | https://example.com:8080/ | Rejected | No match | Pass |
| R08 | https://example.com/search?q=test | Rejected | No match | Pass |
| R09 | https://example.com/page#top | Rejected | No match | Pass |
| R10 | https://192.168.1.1/ | Rejected | No match | Pass |

All 20 fixture cases pass. The earlier Punycode wording conflict was resolved
by Ranee's 2026-09-19 scope clarification: ASCII `xn--` labels follow the
existing `LABEL` rule, while raw Unicode remains rejected.

## 6. Construction handoff

The NFA built from these named components is recorded in
[`docs/automata/nfa.md`](nfa.md), with the transition table cross-checked
state by state against Section 2 above. The construction preserves
full-input matching and the stricter final-label (TLD) rule.

There are no unresolved grammar questions in this Phase 2 finalization. Ranee's
ASCII `xn--` clarification matches the existing expression and requires no RE
or NFA transition change.
Expanding the language requires Ranee's approval and synchronized changes to
the language specification, fixture, formal artifacts, simulator, API, UI
messages, and tests.
