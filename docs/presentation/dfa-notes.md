# DFA and minimization — defense speaking notes

**Owner:** Pamela  
**Issue:** [#82](https://github.com/seavens3nt/url-pattern-recognition/issues/82)  
**Frozen application commit:** `0eb389bac3f50d3ed0a2cae70bb8a36e6b79e480`  
**Tested at:** `c2bda231535201a0a1a2debc5cf738c1bb5b51c0` (latest main, 2026-09-23)  
**Source files:** `docs/automata/dfa.md`, `docs/automata/minimization.md`,  
`backend/automata/url_dfa.json`, `tests/fixtures/url_cases.json`

---

## 1. The core idea: NFA → DFA via subset construction

An NFA lets a state have multiple outgoing transitions on the same symbol, and
it can also jump between states without consuming any input (epsilon
transitions). Both of those properties make simulation ambiguous — you cannot
follow one path; you have to track every possible path at once.

Subset construction resolves that by turning every reachable *set* of NFA
states into a single DFA state. At each step you ask: "if the NFA is currently
in any of these states and reads symbol `a`, which NFA states can it reach?"
You then take the epsilon-closure of that answer (all states reachable without
consuming input) and that becomes the next DFA state. You repeat until every
set you encounter has already been named.

**Concrete starting example — the scheme prefix `http`:**

The NFA starts at `q0`. Reading `h` reaches `q1` (singleton, no epsilon
transitions). `q1` becomes DFA state `D1`. Reading `t` from `D1` gives `q2`
→ `D2`; another `t` gives `q3` → `D3`; `p` gives `{q4}` whose epsilon
closure is `{q4, q5}` (because `q4 --ε--> q5` covers the optional `s`
branch) → `D4`. Any other symbol from any of these prefix states reaches the
empty set, which becomes `D_sink`.

The full subset construction produced **19 DFA states** (D0–D17 plus D_sink),
documented in `docs/automata/dfa.md`. The four accepting states are **D14,
D15, D16, D17** — all contain NFA state `q20`, the single NFA accepting
state.

**Why a DFA is needed here:** the simulator in `backend/automata/simulator.py`
reads one character at a time and follows exactly one edge per step. The NFA's
ambiguity must be resolved before it can power a live recognizer.

---

## 2. What the 19-state DFA looks like structurally

| Region | States | Role |
| --- | --- | --- |
| Scheme prefix | D0–D5 | Spell out `h t t p` then optional `s` |
| Scheme delimiter | D6–D7 | Accept `://` (two slashes) |
| Hostname start | D8 | First character after `//` must be ALNUM |
| Label body | D9, D10 | In-progress hostname label — D9 = first char seen, D10 = subsequent chars; identical transitions |
| Hyphen run | D12 | One or more hyphens inside a label; cannot end here |
| After a dot | D11 | Dot consumed; next char starts a new label or TLD |
| Final label | D13 | Last label of hostname (one or two chars seen but TLD not yet complete) |
| Accepting host | D14 | TLD complete; host accepted — root or path can follow |
| Path states | D15, D16, D17 | After `/`; inside a segment; after segment `/`; each also accepting |
| Sink | D_sink | Dead state; every symbol loops back to D_sink |

**Key rule to remember:** `D_sink` is never accepting. Reaching it means the
URL is already malformed and no further input can rescue it.

---

## 3. What minimization merges — and why only two pairs

Minimization starts from the observation that two states are *equivalent* if
(a) they agree on acceptance and (b) for every symbol, they transition into the
same equivalence class. You start with the coarsest possible split (accepting
vs non-accepting) and keep splitting until nothing changes.

**The two merges that the partition refinement found:**

### Merge 1 — D9 ≡ D10 → M9

`D9` represents the NFA set `{q9, q10, q11}` (just entered a label) and
`D10` represents `{q10, q11}` (continuing inside a label). After one
partition step, both states transition to the same blocks on every symbol —
they go to the same "dot" block on `.`, the same "hyphen" block on `-`, and
loop back to the same "label-body" block on every ALNUM. No symbol can
distinguish them, so they collapse into **M9**.

**What M9 means at runtime:** the machine is inside a hostname label and does
not yet know whether this is the first or a later character. Both are fine; a
dot or end of input will determine the outcome.

### Merge 2 — D15 ≡ D17 → M14

`D15` is reached from D14 (host accepted) by consuming the first `/` of a
path. `D17` is reached from D16 (inside a path segment) by consuming a `/`
that separates segments. Both are accepting (both contain `q20`), and after
any path character both go to D16, which is the "inside segment" state. After
another `/` both go back to themselves. No symbol separates them, so they
collapse into **M14**.

**What M14 means at runtime:** the machine has just consumed a `/` — it does
not matter whether it was the leading slash or a segment separator; what
follows has the same acceptance profile.

**Why nothing else merges:** every other pair of states either differs in
acceptance (e.g. D14 accepts, D13 does not), or differs in where at least one
symbol leads (e.g. D8 sends ALNUM to what becomes M9 but no other state sends
ALNUM there from a non-loop position). The partition-refinement record in
`docs/automata/minimization.md` shows all 12 split steps.

**Result:** the 19-state DFA minimizes to **17 states** (M0–M15 plus M_sink).
The mapping is recorded in `docs/automata/minimization.md` and the runtime
model is in `backend/automata/url_dfa.json`.

---

## 4. Accepted walkthrough — fixture A01: `http://example.com`

**Source:** `tests/fixtures/url_cases.json`, id `A01`, expected `accepted: true`.

Symbol-partition rule: `h/t/p/s` are their own columns; `[a-z]\{h,t,p,s}` →
LOWER; `[0-9]` → DIGIT; `.` → `.`; others → literal or OTHER.

| # | Char | Column | State | → |
|---|------|--------|-------|---|
| 1 | `h` | h | M0 | M1 |
| 2 | `t` | t | M1 | M2 |
| 3 | `t` | t | M2 | M3 |
| 4 | `p` | p | M3 | M4 |
| 5 | `:` | : | M4 | M6 |
| 6 | `/` | / | M6 | M7 |
| 7 | `/` | / | M7 | M8 |
| 8 | `e` | LOWER | M8 | M9 |
| 9–14 | `xampl`, `e` | LOWER/p | M9 | M9 (loop) |
| 15 | `.` | . | M9 | M10 |
| 16 | `c` | LOWER | M10 | M12 |
| 17 | `o` | LOWER | M12 | M13 |
| 18 | `m` | LOWER | M13 | M13 |

**Final state: M13** ∈ {M13, M14, M15} → **ACCEPTED** ✓

Note that M5 is skipped because `http` (not `https`) goes M4 → `:` → M6
directly. M10 is the "just consumed a dot" state; a lowercase letter there
moves to M12 (one TLD character seen), and a second letter moves to M13 (TLD
complete, host accepted).

**What distinguishes accepted from sink:** if the input had been `http:/example.com`
(one slash), step 6 would take M6 on `/` to M7 but step 7 would take M7 on
`e` (LOWER) — M7 has no LOWER transition, so it goes to M_sink and stays
there for the rest of the input. M_sink is never accepting: **REJECTED**.

---

## 5. Rejected walkthrough — fixture R04: `https://localhost`

**Source:** `tests/fixtures/url_cases.json`, id `R04`, expected `accepted: false`.  
**Reason in fixture:** "A hostname requires at least two labels."

| # | Char | Column | State | → |
|---|------|--------|-------|---|
| 1 | `h` | h | M0 | M1 |
| 2 | `t` | t | M1 | M2 |
| 3 | `t` | t | M2 | M3 |
| 4 | `p` | p | M3 | M4 |
| 5 | `s` | s | M4 | M5 |
| 6 | `:` | : | M5 | M6 |
| 7 | `/` | / | M6 | M7 |
| 8 | `/` | / | M7 | M8 |
| 9 | `l` | LOWER | M8 | M9 |
| 10–17 | `ocalhos`, `t` | LOWER/s/t | M9 | M9 (loop) |

**Final state: M9** ∉ {M13, M14, M15} → **REJECTED** ✓

The machine consumed all 17 characters of `https://localhost` and stopped at
M9. M9 is not accepting — it represents "inside a hostname label with no dot
yet consumed." The language requires at least one `.` after the first label
(to reach M10 → M12 → M13). Because `localhost` has no dot, the machine
never advances past M9 and the URL is rejected.

**M9 vs M_sink:** this is an important distinction to make in the defense.
M9 is a *live* non-accepting state — from M9 a `.` would still move the
machine forward toward acceptance. M_sink is a *dead* non-accepting state —
no symbol can ever lead to acceptance from there. Both cause rejection, but
for different structural reasons. The simulator reports M9 as the final state,
and the trace shows every character consumed cleanly; the rejection is a
grammar constraint (two-label requirement), not a malformed-input error.

---

## 6. Sink state vs accepting state — key distinction

| Property | M_sink | M13 / M14 / M15 |
| --- | --- | --- |
| Accepting? | **No** | **Yes** |
| Transitions | Every symbol loops to M_sink | Defined non-sink transitions exist |
| Reached by | Invalid or out-of-language input | Fully valid URL consumed |
| Verdict | REJECTED | ACCEPTED (if input also fully consumed) |

M_sink is declared explicitly in the JSON (`"sink_state": "M_sink"`) so the
simulator can short-circuit: once in M_sink it knows acceptance is impossible
regardless of remaining input. This is different from a non-accepting state
like M9, which still has useful outgoing transitions.

---

## 7. One-minute speaking sequence

> *Use this as a rehearsal script. Each bullet is roughly 10 seconds.*

1. **Setup (10 s):** "We need a DFA to power the URL simulator. We start from
   the NFA Ralph built. An NFA can have multiple paths for the same input, so
   we can't simulate it directly one character at a time."

2. **Subset construction idea (15 s):** "Subset construction solves this by
   treating every reachable *set* of NFA states as a single DFA state. For
   example, reading `http` from the start produces states D0 through D4 —
   D4 holds `{q4, q5}` because `q4` has an epsilon transition covering the
   optional `s`. We end up with 19 DFA states total."

3. **Accepting states (10 s):** "A DFA state is accepting when its NFA-state
   set contains `q20`, the single NFA accepting state. States D14 through D17
   all contain `q20`; every other state does not."

4. **Minimization (15 s):** "Minimization runs partition refinement. It finds
   that D9 and D10 are indistinguishable — both are 'inside a hostname label'
   and every symbol takes them to the same block. D15 and D17 similarly merge
   because both are 'just read a path slash' with identical futures. Those are
   the only two merges; everything else is already distinct. We go from 19 to
   17 states."

5. **Live example — accepted (10 s):** "`http://example.com` ends at M13,
   which is accepting. The dot after `example` is what advances the machine
   from the label-body state through the TLD states to acceptance."

6. **Live example — rejected (10 s):** "`https://localhost` ends at M9 — a
   non-accepting state, not the sink. The machine consumed all the input but
   never saw a dot, so the two-label requirement was never satisfied."

7. **Sink distinction (5 s):** "M_sink is different from M9. M_sink is a dead
   state — no input can ever recover from it. M9 is still live; a dot would
   move it forward. Both reject, but for different reasons."

---

## 8. Verification record

```
# Frozen application commit
0eb389bac3f50d3ed0a2cae70bb8a36e6b79e480  (Reconcile Phase 3 gate evidence and Phase 4 timeline)

# Branch HEAD at time of this document
c2bda231535201a0a1a2debc5cf738c1bb5b51c0

# Tests run
.\.venv\Scripts\python.exe -m pytest tests/test_language_cases.py tests/test_simulator.py -v
# Result: 190 passed in 0.60s

# Whitespace check
git diff --check
# (no output)
```

**Formal artifacts inspected:**

| File | Outcome |
| --- | --- |
| `docs/automata/dfa.md` | 19 states, accepting = {D14,D15,D16,D17} — consistent with JSON mapping |
| `docs/automata/minimization.md` | 17-block stable partition, mapping table, 221-cell transition table — matches JSON exactly |
| `backend/automata/url_dfa.json` | Frozen runtime model — read-only; no contradiction found |
| `docs/automata/diagrams/dfa.dot` | D14/D15/D16/D17 marked `doublecircle` ✓; PATH_CHAR label is documented compression ✓ |
| `docs/automata/diagrams/minimized-dfa.dot` | M13/M14/M15 marked `doublecircle` ✓; PATH_CHAR label is documented compression ✓ |
| `docs/qa/dfa-model-audit.md` | Phase 3 audit at a86e138 — no mismatches; confirmed still valid at c2bda23 |

**No corrections were required to any owned file.** This document and the
parity evidence are the sole deliverables for this package.

---

## 9. Source pointers for the defense

| Topic | File | Section / row |
| --- | --- | --- |
| Approved language rules | `docs/language-spec.md` | Final rules table |
| NFA states and transitions | `docs/automata/nfa.md` | §2–3 |
| Epsilon closures | `docs/automata/nfa.md` | §4 |
| Subset construction | `docs/automata/dfa.md` | Epsilon closures and reachable subsets |
| DFA transition table | `docs/automata/dfa.md` | Complete transition table |
| Partition refinement | `docs/automata/minimization.md` | Partition refinement record |
| Minimized mapping | `docs/automata/minimization.md` | Original-to-minimized mapping |
| Minimized transition table | `docs/automata/minimization.md` | Complete minimized transition table |
| Runtime JSON | `backend/automata/url_dfa.json` | `transitions`, `accepting_states`, `sink_state` |
| Phase 3 parity audit | `docs/qa/dfa-model-audit.md` | §6–7 (transition comparison), §8 (fixture traces) |
| Fixture corpus | `tests/fixtures/url_cases.json` | IDs A01 (accepted), R04 (rejected) used above |
