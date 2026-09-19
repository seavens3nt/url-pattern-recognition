# Epsilon-NFA — core URL language

**Owner:** Ralph Punzalan

**Issue:** #36 — Final regular expression and epsilon-NFA

**Construction input:** [`docs/automata/regular-expression.md`](regular-expression.md)

**Notation source:** [`docs/automata/notation.md`](notation.md) (Pamela)

**Diagram:** [`docs/automata/diagrams/nfa.dot`](diagrams/nfa.dot)

## 1. Formal definition

The NFA is built from the named components in
`docs/automata/regular-expression.md` Section 2, using Thompson-style
construction. Literal keyword characters (`h t t p s`) and structural
punctuation (`: / . - _ ~`) are recorded as individual literal transitions per
`notation.md` Section 8. `LOWER`, `DIGIT`, and `ALNUM` are used as grouped
transition labels per `notation.md` Section 7. `SCHEME`, `LABEL`, `TLD`,
`SEGMENT`, and `PATH` are not used as single transition symbols anywhere in
the table below; each is fully expanded into its component states.

```text
M = (Q, Σ, δ, q0, F)

Q  = {q0, q1, ..., q20}          (21 states)
Σ  = {h, t, p, s, :, /, ., -, _, ~} ∪ LOWER ∪ DIGIT
q0 = start state
F  = {q20}
```

## 2. NFA state summary

| State | Start? | Accepting? | Role |
| ----- | ------ | ---------- | ---- |
| q0  | Yes | No | Scheme start |
| q1  | No  | No | Consumed `h` |
| q2  | No  | No | Consumed `ht` |
| q3  | No  | No | Consumed `htt` |
| q4  | No  | No | Consumed `http`; optional-`s` choice point |
| q5  | No  | No | Scheme complete (`http` or `https`) |
| q6  | No  | No | Consumed `:` |
| q7  | No  | No | Consumed `://`, minus final `/` |
| q8  | No  | No | Consumed `://`; label start / label-loop re-entry |
| q9  | No  | No | Consumed first `ALNUM` of a label |
| q10 | No  | No | Label complete (label-end hub) |
| q11 | No  | No | Inside a multi-character label (loop hub) |
| q12 | No  | No | Consumed `.` after a label; label-vs-TLD choice point |
| q13 | No  | No | TLD start |
| q14 | No  | No | Consumed first TLD letter |
| q15 | No  | No | Consumed second TLD letter; extra-letter loop hub |
| q16 | No  | No | Host complete; path-vs-end choice point |
| q17 | No  | No | Consumed leading `/` of path |
| q18 | No  | No | Inside a path segment (loop hub) |
| q19 | No  | No | Consumed `/` inside path; trailing-slash-vs-next-segment choice point |
| q20 | No  | **Yes** | URL accepted |

## 3. NFA transition table

| From | Input | To |
| ---- | ----- | -- |
| q0  | `h` | q1 |
| q1  | `t` | q2 |
| q2  | `t` | q3 |
| q3  | `p` | q4 |
| q4  | `ε` | q5 |
| q4  | `s` | q5 |
| q5  | `:` | q6 |
| q6  | `/` | q7 |
| q7  | `/` | q8 |
| q8  | `ALNUM` | q9 |
| q9  | `ε` | q10 |
| q9  | `ε` | q11 |
| q11 | `ALNUM` | q11 |
| q11 | `-` | q11 |
| q11 | `ALNUM` | q10 |
| q10 | `.` | q12 |
| q12 | `ε` | q8 |
| q12 | `ε` | q13 |
| q13 | `LOWER` | q14 |
| q14 | `LOWER` | q15 |
| q15 | `ε` | q16 |
| q15 | `LOWER` | q15 |
| q16 | `ε` | q20 |
| q16 | `/` | q17 |
| q17 | `ε` | q20 |
| q17 | `ALNUM` | q18 |
| q17 | `-` | q18 |
| q17 | `_` | q18 |
| q17 | `.` | q18 |
| q17 | `~` | q18 |
| q18 | `ALNUM` | q18 |
| q18 | `-` | q18 |
| q18 | `_` | q18 |
| q18 | `.` | q18 |
| q18 | `~` | q18 |
| q18 | `ε` | q20 |
| q18 | `/` | q19 |
| q19 | `ε` | q20 |
| q19 | `ALNUM` | q18 |
| q19 | `-` | q18 |
| q19 | `_` | q18 |
| q19 | `.` | q18 |
| q19 | `~` | q18 |

## 4. Epsilon-closure summary

Only states with at least one direct epsilon transition are listed; every
other state has an empty direct epsilon set and a closure equal to itself.

| NFA State | Direct ε-transitions | ε-closure |
| --------- | --------------------- | --------- |
| q4  | `{q5}`       | `{q4, q5}` |
| q9  | `{q10, q11}` | `{q9, q10, q11}` |
| q12 | `{q8, q13}`  | `{q12, q8, q13}` |
| q15 | `{q16}`      | `{q15, q16, q20}` |
| q16 | `{q20}`      | `{q16, q20}` |
| q17 | `{q20}`      | `{q17, q20}` |
| q18 | `{q20}`      | `{q18, q20}` |
| q19 | `{q20}`      | `{q19, q20}` |

This is provided as a starting point for Pamela's subset construction in
`docs/automata/notation.md` Section 11; it is not the DFA and does not
replace her worksheet.

## 5. Worked traces

Four cases are traced directly from `tests/fixtures/url_cases.json`, two
accepted and two rejected, matching the fixture's own case IDs.

### Trace 1 — B01 (accepted): `https://example.com/`

| Input consumed so far | State reached |
| --- | --- |
| (start) | q0 |
| `h` | q1 |
| `t` | q2 |
| `t` | q3 |
| `p` | q4 |
| `s` | q5 |
| `:` | q6 |
| `/` | q7 |
| `/` | q8 |
| `e` (first `ALNUM` of `example`) | q9 |
| `ε` into loop hub | q11 |
| `xampl` (loop on `ALNUM`) | q11 |
| `e` (final `ALNUM` of label) | q10 |
| `.` | q12 |
| `ε` to TLD branch | q13 |
| `c` | q14 |
| `o` | q15 |
| `m` (loop on `LOWER`) | q15 |
| `ε` (host complete) | q16 |
| `/` | q17 |
| `ε` (root path, end of input) | q20 |

All input consumed, final state `q20` is accepting. **ACCEPT** — matches the
fixture's expected verdict.

### Trace 2 — A06 (accepted): `https://v2.api.example.net/users/123`

| Input consumed so far | State reached |
| --- | --- |
| `https://` | q8 (as in Trace 1) |
| `v` | q9 |
| `ε`, `2` (final `ALNUM`) | q10 (label `v2` complete) |
| `.` | q12 |
| `ε` (continue as label) | q8 |
| `a` | q9 |
| `ε`, `p` (loop), `i` (final) | q10 (label `api` complete) |
| `.` | q12 |
| `ε` (continue as label) | q8 |
| `e` | q9 |
| `ε`, `xampl` (loop), `e` (final) | q10 (label `example` complete) |
| `.` | q12 |
| `ε` (take TLD branch) | q13 |
| `n` | q14 |
| `e` | q15 |
| `t` (loop on `LOWER`) | q15 |
| `ε` (host complete) | q16 |
| `/` | q17 |
| `u` | q18 |
| `sers` (loop on `ALNUM`) | q18 |
| `/` | q19 |
| `1` (start new segment) | q18 |
| `23` (loop on `ALNUM`) | q18 |
| `ε` (no trailing slash, end of input) | q20 |

All input consumed, final state `q20` is accepting. **ACCEPT** — matches the
fixture's expected verdict.

### Trace 3 — R04 (rejected): `https://localhost`

| Input consumed so far | State reached |
| --- | --- |
| `https://` | q8 |
| `l` | q9 |
| `ε`, `ocalhos` (loop), `t` (final) | q10 (label `localhost` complete) |
| end of input | — |

At `q10`, the only outgoing transition is on `.`. There is no more input and
no epsilon path from `q10` to `q20`, since `HOST` requires a literal `.`
followed by a `TLD` after every label. No accepting state is reachable.
**REJECT** — matches the fixture's expected verdict (hostname requires at
least two labels).

### Trace 4 — R08 (rejected): `https://example.com/search?q=test`

| Input consumed so far | State reached |
| --- | --- |
| `https://example.com` | q16 (as in Trace 1, host complete) |
| `/` | q17 |
| `search` (loop on `ALNUM`) | q18 |
| next input character: `?` | — |

At `q18`, the outgoing transitions are `ALNUM`, `-`, `_`, `.`, `~`, `/`, and
`ε` (to `q20`). `?` matches none of them. Taking the `ε` transition to `q20`
would leave `?q=test` unconsumed, which violates full-input matching. No
accepting path consumes the entire string. **REJECT** — matches the
fixture's expected verdict (query is outside the core language).

## 6. Validation notes

- The transition table above was checked state by state against every named
  component in `docs/automata/regular-expression.md` Section 2; no component
  introduces a symbol or transition absent from this table.
- All 20 cases in `tests/fixtures/url_cases.json` were traced by hand against
  this NFA (full results in `regular-expression.md` Section 5); all 20 match
  their expected verdict. The four traces above are a representative subset
  using the fixture's own IDs, as required by the issue.
- Scope decision — approved by Ranee Mikaella V. Gutierrez on 2026-09-19:
  an ASCII `xn--` label is processed as an ordinary `LABEL` and is accepted
  when it satisfies the existing grammar. The recognizer does not decode or
  validate internationalized domain names, and raw Unicode remains rejected.
  This resolves the earlier wording conflict without changing the NFA.
- `docs/automata/diagrams/nfa.dot` renders successfully with Graphviz
  (`dot -Tsvg`); rendered evidence is attached alongside this document.

## 7. Handoff

This document and `nfa.dot` are the construction input for Pamela's subset
construction and DFA work in `docs/automata/notation.md`. State names
(`q0`-`q20`), epsilon notation (`ε`), and transition labels (`LOWER`,
`DIGIT`, `ALNUM`, and the literal punctuation set) follow her locked
conventions exactly.
