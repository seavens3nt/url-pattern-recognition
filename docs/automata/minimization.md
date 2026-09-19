# DFA minimization proof

Minimization uses the complete, disjoint-column DFA in [dfa.md](dfa.md). `D_sink` participates as an ordinary non-accepting state; no undefined transition is ignored.

## Partition refinement record

`P0` separates acceptance: `A = {D14,D15,D16,D17}` and `N = {D0..D13,D_sink}`. The following work-list refinements record every split; unchanged blocks are retained through the next row.

| Step | Splitter / distinguishing columns | Blocks newly separated |
| --- | --- | --- |
| P1 | acceptance signatures | `{D14}`, `{D15,D17}`, `{D16}` from `A`; `{D13}` from `N` |
| P2 | destination block `{D13}` on `h,t,p,s,LOWER` | `{D11}` from the remaining non-accepting block |
| P3 | destination block `{D11}` on `.` | `{D9,D10}` from the remaining block |
| P4 | destination block `{D9,D10}` on `h,t,p,s,LOWER,DIGIT` | `{D8,D12}` from the remaining block |
| P5 | destination block `{D8,D12}` on `/` | `{D7}` from the remaining block |
| P6 | destination block `{D7}` on `/` | `{D6}` from the remaining block |
| P7 | destination block `{D6}` on `:` | `{D4,D5}` from the remaining block |
| P8 | destination block `{D4,D5}` on `p` / `:` | `{D3}` and `{D5}`; leaves `{D4}` |
| P9 | destination block `{D3}` on `t` | `{D2}` from the remaining prefix block |
| P10 | destination block `{D2}` on `t` | `{D1}` from the remaining prefix block |
| P11 | destination block `{D1}` on `h` | `{D0}` from the remaining non-accepting block |
| P12 | sink self-loop versus non-sink continuation | `{D_sink}`, `{D12}`, and then the stable remaining singletons |

The stable partition is:

```text
{D0} {D1} {D2} {D3} {D4} {D5} {D6} {D7} {D8} {D9,D10}
{D11} {D12} {D13} {D14} {D15,D17} {D16} {D_sink}
```

No further split is possible: each block has a uniform accepting flag and destination block for every one of the 13 columns. The only merges are `D9 ≡ D10` (first versus subsequent valid label character) and `D15 ≡ D17` (root path versus trailing slash); their rows become identical after replacing destinations by final blocks.

## Original-to-minimized mapping

| Minimized state | Original DFA state(s) | Accepting? |
| --- | --- | --- |
| M0 | D0 | No |
| M1 | D1 | No |
| M2 | D2 | No |
| M3 | D3 | No |
| M4 | D4 | No |
| M5 | D5 | No |
| M6 | D6 | No |
| M7 | D7 | No |
| M8 | D8 | No |
| M9 | D9, D10 | No |
| M10 | D11 | No |
| M11 | D12 | No |
| M12 | D13 | No |
| M13 | D14 | Yes |
| M14 | D15, D17 | Yes |
| M15 | D16 | Yes |
| M_sink | D_sink | No |

## Complete minimized transition table

`S` denotes `M_sink`; `L` is the disjoint `LOWER` column defined in [notation.md](notation.md).

| State | h | t | p | s | L | DIGIT | : | / | . | - | _ | ~ | OTHER |
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

`M0` is the start state and `*` marks acceptance. This table is identical to the `transitions` object in [url_dfa.json](../../backend/automata/url_dfa.json), whose key set is exactly the alphabet and whose acceptance list is `{M13,M14,M15}`. The editable visualization source is [minimized-dfa.dot](diagrams/minimized-dfa.dot).
