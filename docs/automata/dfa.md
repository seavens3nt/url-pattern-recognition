# DFA subset-construction worksheet

**Input:** [epsilon-NFA](nfa.md), locked commit `770b761`.  The complete DFA uses the disjoint partition `h`, `t`, `p`, `s`, `LOWER = [a-z] \ {h,t,p,s}`, `DIGIT`, `:`, `/`, `.`, `-`, `_`, `~`, and `OTHER` (all remaining characters).  `D_sink` completes the transition function.

## Epsilon closures and reachable subsets

`epsilon-closure({q0}) = {q0}`, so `D0 = {q0}`.  The NFA closures used by the construction are: `{q4,q5}`, `{q9,q10,q11}`, `{q12,q8,q13}`, `{q15,q16,q20}`, `{q16,q20}`, `{q17,q20}`, `{q18,q20}`, and `{q19,q20}`; all other singleton closures are themselves.  Applying `epsilon-closure(move(S,a))` until no new subset is found gives:

| DFA | NFA-state subset | Accepting? |
| --- | --- | --- |
| D0 | `{q0}` | No |
| D1 | `{q1}` | No |
| D2 | `{q2}` | No |
| D3 | `{q3}` | No |
| D4 | `{q4,q5}` | No |
| D5 | `{q5}` | No |
| D6 | `{q6}` | No |
| D7 | `{q7}` | No |
| D8 | `{q8}` | No |
| D9 | `{q9,q10,q11}` | No |
| D10 | `{q10,q11}` | No |
| D11 | `{q8,q12,q13}` | No |
| D12 | `{q11}` | No |
| D13 | `{q9,q10,q11,q14}` | No |
| D14 | `{q10,q11,q15,q16,q20}` | Yes — contains `q20` |
| D15 | `{q17,q20}` | Yes — contains `q20` |
| D16 | `{q18,q20}` | Yes — contains `q20` |
| D17 | `{q19,q20}` | Yes — contains `q20` |
| D_sink | `empty set` | No |

For example, `move({q8}, LOWER) = {q9}`, then `epsilon-closure({q9}) = {q9,q10,q11} = D9`.  Every unlisted move is `empty set` and therefore goes to `D_sink`.

## Complete transition table

The compact cell `S` denotes `D_sink`; it remains one transition per column. `L` denotes the disjoint `LOWER` column above.

| State | h | t | p | s | L | DIGIT | : | / | . | - | _ | ~ | OTHER |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D0 | D1 | S | S | S | S | S | S | S | S | S | S | S | S |
| D1 | S | D2 | S | S | S | S | S | S | S | S | S | S | S |
| D2 | S | D3 | S | S | S | S | S | S | S | S | S | S | S |
| D3 | S | S | D4 | S | S | S | S | S | S | S | S | S | S |
| D4 | S | S | S | D5 | S | S | D6 | S | S | S | S | S | S |
| D5 | S | S | S | S | S | S | D6 | S | S | S | S | S | S |
| D6 | S | S | S | S | S | S | S | D7 | S | S | S | S | S |
| D7 | S | S | S | S | S | S | S | D8 | S | S | S | S | S |
| D8 | D9 | D9 | D9 | D9 | D9 | D9 | S | S | S | S | S | S | S |
| D9 | D10 | D10 | D10 | D10 | D10 | D10 | S | S | D11 | D12 | S | S | S |
| D10 | D10 | D10 | D10 | D10 | D10 | D10 | S | S | D11 | D12 | S | S | S |
| D11 | D13 | D13 | D13 | D13 | D13 | D9 | S | S | S | S | S | S | S |
| D12 | D10 | D10 | D10 | D10 | D10 | D10 | S | S | S | D12 | S | S | S |
| D13 | D14 | D14 | D14 | D14 | D14 | D10 | S | S | D11 | D12 | S | S | S |
| D14* | D14 | D14 | D14 | D14 | D14 | D10 | S | D15 | D11 | D12 | S | S | S |
| D15* | D16 | D16 | D16 | D16 | D16 | D16 | S | S | D16 | D16 | D16 | D16 | S |
| D16* | D16 | D16 | D16 | D16 | D16 | D16 | S | D17 | D16 | D16 | D16 | D16 | S |
| D17* | D16 | D16 | D16 | D16 | D16 | D16 | S | S | D16 | D16 | D16 | D16 | S |
| D_sink | S | S | S | S | S | S | S | S | S | S | S | S | S |

`*` marks an accepting subset. Thus the accepting-state rule is exactly “contains NFA accepting state `q20`.” All 19 rows have one destination for all 13 mutually exclusive columns; all are reachable from `D0` except the explicitly added completion state, which is reachable on invalid input.

The editable rendering source is [dfa.dot](diagrams/dfa.dot). The minimized table and JSON model are documented in [minimization.md](minimization.md).
