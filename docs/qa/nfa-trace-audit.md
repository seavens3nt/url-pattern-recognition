# NFA trace audit — Phase 3

**Owner:** Ralph Punzalan

**Issue:** #59 — Audit NFA traces against the locked language

**Tested commit:** `a86e138` (`main`, "Sync Phase 3 guide and run instructions (#57)")

**Audited artifact:** [`docs/automata/nfa.md`](../automata/nfa.md) as it exists
at the tested commit, checked symbol by symbol against its own transition
table (Section 3) and epsilon-closure summary (Section 4). Not re-derived
from the regular expression.

**Locked inputs referenced:** `docs/language-spec.md`,
`docs/automata/diagrams/nfa.dot`, `tests/fixtures/url_cases.json`.

## Method

Each traced case is walked one input symbol at a time through the exact
states and transitions listed in `docs/automata/nfa.md` Section 3, including
every epsilon transition taken. A case passes the audit when the full input
string is consumed and the reachable final state matches the documented
outcome (`q20` = accept, no reachable accepting state = reject), matching the
fixture's own expected verdict.

The four fixture IDs below were chosen to be independent of the four traces
already published in `nfa.md` Section 5 (`B01`, `A06`, `R04`, `R08`), and to
specifically exercise boundary rules added to the fixture and language spec
since the original Phase 2 NFA was written: the IDN/`xn--` scope decision,
the full `PATH_CHAR` set, and the stricter top-level-label and
label-ending-hyphen rules.

## Commands

```
git log --oneline -1 a86e138
(git show a86e138:tests/fixtures/url_cases.json | Out-String | ConvertFrom-Json).Count
.\.venv\Scripts\python.exe -m pytest tests/test_integration.py -q --basetemp=.pytest-tmp
git diff --check
```
Run from the repository root in Windows PowerShell. The first command confirms
the locked candidate named in issue #59. The fixture count command returns
`36`. The integration suite passes (`155 passed`); it checks the published
regular expression, shared fixture, simulator, and API. The four NFA traces
above were checked by hand against the transition table. The diff check
reports no whitespace errors.

No `dot` render command was run. Per the issue's "Render DOT only if its
source changes" instruction, `docs/automata/diagrams/nfa.dot` was diffed
against the copy used for this audit and found unchanged, so no new render
was produced.

## Traces

### B14 (accepted): `https://xn--example.com`

| Input consumed so far | State reached |
| --- | --- |
| `https://` | q8 |
| `x` | q9 |
| `ε` into loop hub | q11 |
| `n` (loop, `ALNUM`) | q11 |
| `-` (loop, `-`) | q11 |
| `-` (loop, `-`) | q11 |
| `xampl` (loop, `ALNUM`) | q11 |
| `e` (final `ALNUM`) | q10 |
| `.` | q12 |
| `ε` (take TLD branch) | q13 |
| `c` | q14 |
| `o` | q15 |
| `m` (loop, `LOWER`) | q15 |
| `ε` (host complete, end of input) | q16 |
| `ε` (no path) | q20 |

Expected: accepted. Actual: all input consumed, final state `q20` is
accepting. **ACCEPT.** No mismatch found. The two consecutive `-` characters
are each consumed by a separate application of the `q11 -"-"-> q11`
self-loop, exactly as documented; nothing in the table treats a repeated
hyphen differently from a single one.

### B19 (accepted): `https://x1.example.org/~a-b_c.d`

| Input consumed so far | State reached |
| --- | --- |
| `https://` | q8 |
| `x` | q9 |
| `ε` into loop hub | q11 |
| `1` (final `ALNUM`, no loop iteration) | q10 |
| `.` | q12 |
| `ε` (continue as label) | q8 |
| `e` | q9 |
| `ε` into loop hub | q11 |
| `xampl` (loop, `ALNUM`) | q11 |
| `e` (final `ALNUM`) | q10 |
| `.` | q12 |
| `ε` (take TLD branch) | q13 |
| `o` | q14 |
| `r` | q15 |
| `g` (loop, `LOWER`) | q15 |
| `ε` (host complete) | q16 |
| `/` | q17 |
| `~` (first `PATH_CHAR`) | q18 |
| `a` (loop, `ALNUM`) | q18 |
| `-` (loop, `-`) | q18 |
| `b` (loop, `ALNUM`) | q18 |
| `_` (loop, `_`) | q18 |
| `c` (loop, `ALNUM`) | q18 |
| `.` (loop, `.`) | q18 |
| `d` (loop, `ALNUM`) | q18 |
| `ε` (no trailing slash, end of input) | q20 |

Expected: accepted. Actual: all input consumed, final state `q20` is
accepting. **ACCEPT.** No mismatch found. All five `PATH_CHAR` alternatives
(`ALNUM`, `-`, `_`, `.`, `~`) are exercised in this single trace and each is
handled by the documented `q18` self-loop.

### B06 (rejected): `https://example.co1`

| Input consumed so far | State reached |
| --- | --- |
| `https://` | q8 |
| `e` | q9 |
| `ε` into loop hub | q11 |
| `xampl` (loop, `ALNUM`) | q11 |
| `e` (final `ALNUM`) | q10 |
| `.` | q12 |
| — | (two branches, both fail) |

Branch A — continue as label (`q12 -ε-> q8`): `c` → q9, `ε` → q11 (loop
hub), `o` (loop, `ALNUM`) → q11, `1` (final `ALNUM`) → q10. Input is now
fully consumed, but `q10`'s only outgoing transition is on `.`; no epsilon
path from `q10` reaches `q20`. Dead end.

Branch B — take TLD (`q12 -ε-> q13`): `c` (`LOWER`) → q14, `o` (`LOWER`) →
q15. Next input symbol is `1`. `q15`'s outgoing transitions are `ε` (to
`q16`) and `LOWER` (self-loop); `1` is a `DIGIT`, not `LOWER`, and matches
neither. Dead end.

Expected: rejected. Actual: no path consumes the full input and reaches
`q20`. **REJECT.** No mismatch found. The rejection reason matches the
fixture (`co1` cannot complete as `TLD` because `TLD` never accepts
`DIGIT`), and Branch A confirms the label-continuation path was also
genuinely tried, not skipped.

### B07 (rejected): `https://a-.example.com`

| Input consumed so far | State reached |
| --- | --- |
| `https://` | q8 |
| `a` | q9 |
| — | (two branches, both fail) |

Branch A — single-character label (`q9 -ε-> q10`): label would be just `a`.
`q10`'s only transition is on `.`, but the next actual input symbol is `-`,
not `.`. Dead end.

Branch B — multi-character label (`q9 -ε-> q11`): `-` (loop, `-`) → q11.
Next input symbol is `.`. `q11`'s outgoing transitions are `ALNUM`
(self-loop), `-` (self-loop), and `ALNUM` (to `q10`); `.` matches none of
them. Dead end.

Expected: rejected. Actual: both branches from `q9` dead-end before any more
input can be consumed. **REJECT.** No mismatch found. This confirms `LABEL`
cannot terminate on a hyphen in the documented NFA, consistent with the
grammar's `... (ALNUM|-)* ALNUM` structure.

## Result

No state or transition mismatch found in any of the four traced cases. The
documented NFA in `docs/automata/nfa.md` at commit `a86e138` produces the
correct accept/reject outcome for `B14`, `B19`, `B06`, and `B07`, including
correctly handling repeated internal hyphens, the full `PATH_CHAR` set, and
the digit-exclusion rule for `TLD`.

## Observation (non-blocking)

`docs/automata/nfa.md` Section 6 states "All 20 cases in
`tests/fixtures/url_cases.json` were traced by hand against this NFA." The
fixture at the tested commit contains 36 cases (`B05`-`B20` were added after
the original NFA construction). This is a documentation-currency note, not a
trace defect: every case checked in this audit, all drawn from
the newer `B05`-`B20` range, still matches. No correction to `nfa.md` was
made, since this file is not owned for edits outside an assigned correction.
Flagged here for Ranee's awareness.
