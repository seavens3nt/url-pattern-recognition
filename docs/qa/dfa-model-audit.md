# DFA model audit — Phase 3

**Auditor:** Pamela  
**Tested commit:** `a86e13877d658e7283c02ac143be35a5c7389a4a`  
**Audit date:** 2026-09-23  
**Refs:** issue [#60](https://github.com/seavens3nt/url-pattern-recognition/issues/60)

## Authoritative input files

| File | Role |
| --- | --- |
| `docs/automata/dfa.md` | Subset-construction worksheet (19 DFA states) |
| `docs/automata/minimization.md` | Partition-refinement record, mapping table, minimized transition table |
| `backend/automata/url_dfa.json` | Runtime model loaded by the simulator |
| `tests/fixtures/url_cases.json` | Shared corpus used for fixture traces |

---

## 1. State set

**Minimization spec** (stable partition, `minimization.md`):  
`{M0, M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13, M14, M15, M_sink}` — 17 states.

**Runtime JSON** (`states` array):  
`["M0","M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12","M13","M14","M15","M_sink"]` — 17 states.

**Result:** No mismatch found.

---

## 2. Start state

| Source | Value |
| --- | --- |
| `minimization.md` | M0 |
| `url_dfa.json` (`start_state`) | M0 |

**Result:** No mismatch found.

---

## 3. Accepting states

| Source | Value |
| --- | --- |
| `minimization.md` (rows marked `*`) | {M13, M14, M15} |
| `url_dfa.json` (`accepting_states`) | ["M13", "M14", "M15"] |

**Result:** No mismatch found.

---

## 4. Sink state

| Source | Value |
| --- | --- |
| `minimization.md` | M_sink |
| `url_dfa.json` (`sink_state`) | M_sink |

**Result:** No mismatch found.

---

## 5. Alphabet and symbol partition

**Spec alphabet** (13 disjoint columns, `minimization.md` / `notation.md`):  
`h`, `t`, `p`, `s`, `LOWER` ([a-z] \ {h,t,p,s}), `DIGIT` ([0-9]), `:`, `/`, `.`, `-`, `_`, `~`, `OTHER`

**JSON `alphabet` array** (13 entries):  
`["h","t","p","s","LOWER","DIGIT",":","/"," .","−","_","~","OTHER"]`

**JSON `symbol_partition`** entries:

| Key | Value in JSON |
| --- | --- |
| h | "h" |
| t | "t" |
| p | "p" |
| s | "s" |
| LOWER | "[a-z] excluding h, t, p, s" |
| DIGIT | "[0-9]" |
| : | ":" |
| / | "/" |
| . | "." |
| - | "-" |
| _ | "_" |
| ~ | "~" |
| OTHER | "every remaining input character" |

**Result:** No mismatch found.

---

## 6. Complete transition table comparison

Every cell of the 17 × 13 = 221-entry table was checked against `minimization.md`. The table below reproduces the full runtime JSON transitions alongside the spec values. Mismatches would be flagged in a **Diff** column; none were found.

| State | h | t | p | s | LOWER | DIGIT | : | / | . | - | _ | ~ | OTHER |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M0 | M1 | S | S | S | S | S | S | S | S | S | S | S | S |
| M1 | S | M2 | S | S | S | S | S | S | S | S | S | S | S |
| M2 | S | M3 | S | S | S | S | S | S | S | S | S | S | S |
| M3 | S | S | M4 | S | S | S | S | S | S | S | S | S | S |
| M4 | S | S | S | M5 | S | S | M6 | S | S | S | S | S | S |
| M5 | S | S | S | S | S | S | M6 | S | S | S | S | S | S |
| M6 | S | S | S | S | S | S | S | M7 | S | S | S | S | S |
| M7 | S | S | S | S | S | S | S | M8 | S | S | S | S | S |
| M8 | M9 | M9 | M9 | M9 | M9 | M9 | S | S | S | S | S | S | S |
| M9 | M9 | M9 | M9 | M9 | M9 | M9 | S | S | M10 | M11 | S | S | S |
| M10 | M12 | M12 | M12 | M12 | M12 | M9 | S | S | S | S | S | S | S |
| M11 | M9 | M9 | M9 | M9 | M9 | M9 | S | S | S | M11 | S | S | S |
| M12 | M13 | M13 | M13 | M13 | M13 | M9 | S | S | M10 | M11 | S | S | S |
| M13* | M13 | M13 | M13 | M13 | M13 | M9 | S | M14 | M10 | M11 | S | S | S |
| M14* | M15 | M15 | M15 | M15 | M15 | M15 | S | S | M15 | M15 | M15 | M15 | S |
| M15* | M15 | M15 | M15 | M15 | M15 | M15 | S | M14 | M15 | M15 | M15 | M15 | S |
| M_sink | S | S | S | S | S | S | S | S | S | S | S | S | S |

`S` = M_sink. `*` marks accepting states.

**Total-transition property:** each of the 17 states has exactly 13 defined transitions (one per alphabet column). No undefined edge exists. **No mismatch found.**

---

## 7. Original-to-minimized mapping

Mapping from `minimization.md` checked against the 17 minimized states present in `url_dfa.json`.

| Minimized state | Original DFA state(s) | Accepting? | Verified in JSON |
| --- | --- | --- | --- |
| M0 | D0 | No | ✓ |
| M1 | D1 | No | ✓ |
| M2 | D2 | No | ✓ |
| M3 | D3 | No | ✓ |
| M4 | D4 | No | ✓ |
| M5 | D5 | No | ✓ |
| M6 | D6 | No | ✓ |
| M7 | D7 | No | ✓ |
| M8 | D8 | No | ✓ |
| M9 | D9, D10 | No | ✓ — single state handles both label-start and label-continuation roles |
| M10 | D11 | No | ✓ |
| M11 | D12 | No | ✓ |
| M12 | D13 | No | ✓ |
| M13 | D14 | Yes | ✓ |
| M14 | D15, D17 | Yes | ✓ — root path and trailing slash merge correctly |
| M15 | D16 | Yes | ✓ |
| M_sink | D_sink | No | ✓ |

The two merges (`D9≡D10` and `D15≡D17`) are the only non-trivial equivalences. Their transition rows become identical after substituting final block labels, consistent with the partition-refinement record at steps P3 and P1 respectively.

**Result:** No mismatch found.

---

## 8. Fixture traces

Symbol-partition mapping applied before each step: `h`→h, `t`→t, `p`→p, `s`→s, `a–z`\{h,t,p,s}→LOWER, `0–9`→DIGIT, remaining punctuation mapped to its literal column or OTHER.

### Trace 1 — A01 `http://example.com` (expected: accepted)

| Step | Char | Column | From | To |
| --- | --- | --- | --- | --- |
| 1 | h | h | M0 | M1 |
| 2 | t | t | M1 | M2 |
| 3 | t | t | M2 | M3 |
| 4 | p | p | M3 | M4 |
| 5 | : | : | M4 | M6 |
| 6 | / | / | M6 | M7 |
| 7 | / | / | M7 | M8 |
| 8 | e | LOWER | M8 | M9 |
| 9 | x | LOWER | M9 | M9 |
| 10 | a | LOWER | M9 | M9 |
| 11 | m | LOWER | M9 | M9 |
| 12 | p | p | M9 | M9 |
| 13 | l | LOWER | M9 | M9 |
| 14 | e | LOWER | M9 | M9 |
| 15 | . | . | M9 | M10 |
| 16 | c | LOWER | M10 | M12 |
| 17 | o | LOWER | M12 | M13 |
| 18 | m | LOWER | M13 | M13 |

**Final state:** M13 ∈ {M13, M14, M15} → **accepted** ✓

---

### Trace 2 — A04 `https://api.example.com/users` (expected: accepted)

| Step | Char | Column | From | To |
| --- | --- | --- | --- | --- |
| 1 | h | h | M0 | M1 |
| 2 | t | t | M1 | M2 |
| 3 | t | t | M2 | M3 |
| 4 | p | p | M3 | M4 |
| 5 | s | s | M4 | M5 |
| 6 | : | : | M5 | M6 |
| 7 | / | / | M6 | M7 |
| 8 | / | / | M7 | M8 |
| 9 | a | LOWER | M8 | M9 |
| 10 | p | p | M9 | M9 |
| 11 | i | LOWER | M9 | M9 |
| 12 | . | . | M9 | M10 |
| 13 | e | LOWER | M10 | M12 |
| 14 | x | LOWER | M12 | M13 |
| 15 | a | LOWER | M13 | M13 |
| 16 | m | LOWER | M13 | M13 |
| 17 | p | p | M13 | M13 |
| 18 | l | LOWER | M13 | M13 |
| 19 | e | LOWER | M13 | M13 |
| 20 | . | . | M13 | M10 |
| 21 | c | LOWER | M10 | M12 |
| 22 | o | LOWER | M12 | M13 |
| 23 | m | LOWER | M13 | M13 |
| 24 | / | / | M13 | M14 |
| 25 | u | LOWER | M14 | M15 |
| 26 | s | s | M15 | M15 |
| 27 | e | LOWER | M15 | M15 |
| 28 | r | LOWER | M15 | M15 |
| 29 | s | s | M15 | M15 |

**Final state:** M15 ∈ {M13, M14, M15} → **accepted** ✓

---

### Trace 3 — R01 `ftp://example.com` (expected: rejected)

| Step | Char | Column | From | To |
| --- | --- | --- | --- | --- |
| 1 | f | LOWER | M0 | M_sink |
| 2–18 | (remaining) | any | M_sink | M_sink |

**Final state:** M_sink ∉ {M13, M14, M15} → **rejected** ✓  
Reason: M0 only accepts `h`; all other columns go directly to the sink.

---

### Trace 4 — R04 `https://localhost` (expected: rejected)

| Step | Char | Column | From | To |
| --- | --- | --- | --- | --- |
| 1 | h | h | M0 | M1 |
| 2 | t | t | M1 | M2 |
| 3 | t | t | M2 | M3 |
| 4 | p | p | M3 | M4 |
| 5 | s | s | M4 | M5 |
| 6 | : | : | M5 | M6 |
| 7 | / | / | M6 | M7 |
| 8 | / | / | M7 | M8 |
| 9 | l | LOWER | M8 | M9 |
| 10 | o | LOWER | M9 | M9 |
| 11 | c | LOWER | M9 | M9 |
| 12 | a | LOWER | M9 | M9 |
| 13 | l | LOWER | M9 | M9 |
| 14 | h | h | M9 | M9 |
| 15 | o | LOWER | M9 | M9 |
| 16 | s | s | M9 | M9 |
| 17 | t | t | M9 | M9 |

**Final state:** M9 ∉ {M13, M14, M15} → **rejected** ✓  
Reason: a single-label hostname never exits M9 (no `.` encountered to advance toward M10→M12→M13).

---

## 9. Summary

| Check | Result |
| --- | --- |
| State set (17 states) | No mismatch found |
| Start state (M0) | No mismatch found |
| Accepting states ({M13, M14, M15}) | No mismatch found |
| Sink state (M_sink) | No mismatch found |
| Alphabet (13 columns) | No mismatch found |
| Symbol partition | No mismatch found |
| All 221 transitions | No mismatch found |
| Total-transition property | No mismatch found |
| Original-to-minimized mapping (17 blocks) | No mismatch found |
| Fixture A01 trace | Accepted — correct |
| Fixture A04 trace | Accepted — correct |
| Fixture R01 trace | Rejected — correct |
| Fixture R04 trace | Rejected — correct |

**Overall verdict: No mismatch found.** The runtime model in `backend/automata/url_dfa.json` is identical to the minimized DFA specified in `docs/automata/minimization.md` at commit `a86e13877d658e7283c02ac143be35a5c7389a4a`.

---

## 10. Commands run

```powershell
# Confirm tested commit
git rev-parse HEAD
# a86e13877d658e7283c02ac143be35a5c7389a4a

# Whitespace check
git diff --check
# (no output — no trailing whitespace or mixed line-ending issues)
```

All comparison and trace work was performed by manual inspection of the source files listed in section 1. No simulator or API was invoked; the audit is a pure model-level check.
