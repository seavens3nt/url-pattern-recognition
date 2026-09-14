# Automata Notation & DFA Worksheet

**Owner:** Pamela
**Issue:** #7 — Automata Notation and DFA Worksheet
**Role:** Backend Developer — DFA and Minimization
**Status:** Phase 1 — Draft v1

---

## 1. Purpose

This document defines the notation and worksheet format for the automata construction of the approved URL language.

It covers the conventions needed for:

* NFA state notation
* start and accepting states
* sink states
* epsilon transitions and epsilon-closure
* character classes
* out-of-alphabet input
* NFA transition tables
* NFA-to-DFA subset construction
* DFA transition tables
* DFA minimization

The actual NFA and DFA states and transitions will be filled in during construction.

---

## 2. State Naming Convention

### NFA States

NFA states are named:

```text
q0, q1, q2, q3, ...
```

`q0` is the NFA start state.

Additional NFA states are numbered sequentially as they are created.

### DFA States

DFA states are named:

```text
D0, D1, D2, D3, ...
```

The initial DFA state is created from the epsilon-closure of the NFA start state:

```text
D0 = ε-closure({q0})
```

Each DFA state represents a set of NFA states.

Example:

```text
D3 = {q2, q5, q7}
```

The actual state numbers and state sets must be taken from the constructed NFA and subset-construction process.

---

## 3. Start-State Convention

The NFA start state is:

```text
q0
```

The DFA start state is:

```text
D0 = ε-closure({q0})
```

The DFA begins processing the input from `D0`.

---

## 4. Accepting-State Convention

An NFA accepting state is determined during the NFA construction.

A DFA state is accepting when its represented NFA-state set contains at least one NFA accepting state.

Example:

```text
D4 = {q3, q7, q10}
```

If `q10` is an NFA accepting state, then `D4` is an accepting DFA state.

### Worksheet

| DFA State | NFA-State Set | Contains NFA Accepting State? | Accepting? |
| --------- | ------------- | ----------------------------- | ---------- |
| D0        | `{...}`       | No                            | No         |
| D1        | `{...}`       | No                            | No         |
| D2        | `{...}`       | Yes                           | Yes        |
| D3        | `{...}`       | No                            | No         |

---

## 5. Sink-State Convention

The DFA sink state is named:

```text
D_sink
```

`D_sink` is non-accepting.

Once an input reaches `D_sink`, every subsequent input remains in `D_sink`.

Example:

```text
D_sink --a-z--> D_sink
D_sink --0-9--> D_sink
D_sink --OTHER--> D_sink
```

The complete transition table should include the sink state when a sink is required by the DFA construction.

---

## 6. Epsilon Notation

Epsilon is represented by:

```text
ε
```

An epsilon transition consumes no input character.

Example:

```text
q0 --ε--> q1
```

### Epsilon Closure

The epsilon-closure of a state or set of states is written as:

```text
ε-closure(S)
```

It contains the states reachable through zero or more epsilon transitions, including the original states.

Example:

```text
ε-closure({q0}) = {q0, q1, q3}
```

The actual closure depends on the NFA transitions produced during construction.

---

## 7. Character-Class Notation

The automaton uses the following character classes from the approved regular-expression components:

| Name          | Notation       | Meaning                              |
| ------------- | -------------- | ------------------------------------ |
| `LOWER`       | `[a-z]`        | Lowercase letters                    |
| `DIGIT`       | `[0-9]`        | Digits                               |
| `ALNUM`       | `[a-z0-9]`     | Lowercase letters or digits          |
| `LABEL_INNER` | `[a-z0-9-]`    | Lowercase letters, digits, or hyphen |
| `PATH_CHAR`   | `[a-z0-9._~-]` | Allowed path characters              |

These classes are used as grouped transition labels where appropriate.

---

## 8. Literal Symbols

The following literal characters are relevant to the automaton:

```text
:
/
.
-
_
~
```

The URL scheme separator is:

```text
://
```

When constructing the automaton, the characters in `://` are processed as part of the input sequence.

---

## 9. Out-of-Alphabet Input

Characters that are not part of the supported automaton alphabet are represented by:

```text
OTHER
```

Examples include:

```text
uppercase letters
?
#
@
%
spaces
raw non-ASCII characters
```

These characters are outside the approved input language and must not result in acceptance.

When represented in the complete DFA, an invalid `OTHER` input may transition to the sink state:

```text
D_i --OTHER--> D_sink
```

---

# 10. NFA Transition Table

The following template is used to record the NFA produced from the regular expression.

| From | Input   | To  |
| ---- | ------- | --- |
| q__  | `ε`     | q__ |
| q__  | `LOWER` | q__ |
| q__  | `DIGIT` | q__ |
| q__  | `:`     | q__ |
| q__  | `/`     | q__ |
| q__  | `.`     | q__ |
| q__  | `-`     | q__ |
| q__  | `_`     | q__ |
| q__  | `~`     | q__ |

### NFA State Summary

| State | Start? | Accepting? |
| ----- | ------ | ---------- |
| q0    | Yes    | No         |
| q__   | No     | No         |
| q__   | No     | Yes        |

The actual NFA state IDs and transitions must be derived from the regular expression. They are not assigned in this notation document.

---

# 11. Epsilon-Closure Worksheet

Record the epsilon transitions and resulting closures before performing subset construction.

| NFA State | Direct ε-Transitions | ε-Closure   |
| --------- | -------------------- | ----------- |
| q0        | `{q__}`              | `{q0, ...}` |
| q__       | `{q__}`              | `{...}`     |
| q__       | `∅`                  | `{...}`     |

For a set of states, calculate the closure of the entire set:

```text
ε-closure({q1, q3})
```

The result must contain all states reachable from `q1` or `q3` using zero or more epsilon transitions.

---

# 12. Subset Construction Worksheet

Each DFA state corresponds to a set of NFA states.

### DFA State Table

| DFA State | NFA-State Set  | ε-Closure   |
| --------- | -------------- | ----------- |
| D0        | `{q0}`         | `{q0, ...}` |
| D1        | `{q..., q...}` | `{...}`     |
| D2        | `{q..., q...}` | `{...}`     |

### Transition Calculation

For each DFA state and input class:

1. Determine the NFA states reachable on the input.
2. Calculate the epsilon-closure of the resulting states.
3. Check whether that set already represents an existing DFA state.
4. If not, create a new DFA state.

| Current DFA | Input   | Move     | Resulting ε-Closure | New DFA State |
| ----------- | ------- | -------- | ------------------- | ------------- |
| D0          | `LOWER` | `{q...}` | `{...}`             | D__           |
| D0          | `DIGIT` | `{q...}` | `{...}`             | D__           |
| D0          | `:`     | `{q...}` | `{...}`             | D__           |
| D0          | `/`     | `{q...}` | `{...}`             | D__           |
| D0          | `.`     | `{q...}` | `{...}`             | D__           |
| D0          | `-`     | `{q...}` | `{...}`             | D__           |
| D0          | `_`     | `{q...}` | `{...}`             | D__           |
| D0          | `~`     | `{q...}` | `{...}`             | D__           |

Continue until every reachable DFA state has been processed.

---

# 13. DFA Transition Table

After subset construction, record the resulting DFA in a transition table.

| DFA State | `LOWER` | `DIGIT` | `:`    | `/`    | `.`    | `-`    | `_`    | `~`    | `OTHER` | Accepting? |
| --------- | ------- | ------- | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ---------- |
| D0        | D__     | D__     | D__    | D__    | D__    | D__    | D__    | D__    | D_sink  | No         |
| D1        | D__     | D__     | D__    | D__    | D__    | D__    | D__    | D__    | D_sink  | No         |
| D2        | D__     | D__     | D__    | D__    | D__    | D__    | D__    | D__    | D_sink  | Yes        |
| D_sink    | D_sink  | D_sink  | D_sink | D_sink | D_sink | D_sink | D_sink | D_sink | D_sink  | No         |

The actual transitions are filled in after subset construction.

---

# 14. DFA Acceptance

The DFA accepts an input only when the entire input has been consumed and the final DFA state is accepting.

```text
Entire input consumed
        +
Final state is accepting
        =
ACCEPT
```

If the input ends in a non-accepting state:

```text
REJECT
```

If invalid input leads to `D_sink`:

```text
REJECT
```

The DFA must therefore use full-input matching rather than accepting only a valid prefix.

---

# 15. DFA Minimization

Minimization is performed after the complete DFA transition table has been constructed.

### Step 1 — Initial Partition

Separate states according to accepting status:

```text
P0 = {Accepting states}
     {Non-accepting states}
```

Worksheet:

| Partition | DFA States        |
| --------- | ----------------- |
| P0-A      | `{D__, D__, ...}` |
| P0-N      | `{D__, D__, ...}` |

---

### Step 2 — Compare Transitions

For states in the same partition, compare their destination partitions for every input category.

| State | `LOWER` | `DIGIT` | `:` | `/` | `.` | `-` | `_` | `~` | `OTHER` |
| ----- | ------- | ------- | --- | --- | --- | --- | --- | --- | ------- |
| D__   | P__     | P__     | P__ | P__ | P__ | P__ | P__ | P__ | P__     |
| D__   | P__     | P__     | P__ | P__ | P__ | P__ | P__ | P__ | P__     |

If two states have different transition behavior, they must be separated into different partitions.

---

### Step 3 — Repeat Refinement

Continue refining the partitions until no further changes occur.

```text
P0 → P1 → P2 → ... → Pfinal
```

The final stable partitions represent the equivalent-state groups of the minimized DFA.

---

# 16. Minimized DFA Worksheet

Record which original DFA states belong to each minimized state.

| Minimized State | Original DFA States | Accepting? |
| --------------- | ------------------- | ---------- |
| M0              | `{D__}`             | No         |
| M1              | `{D__, D__}`        | No         |
| M2              | `{D__}`             | Yes        |
| M_sink          | `{D_sink}`          | No         |

Then create the minimized transition table:

| State  | `LOWER` | `DIGIT` | `:`    | `/`    | `.`    | `-`    | `_`    | `~`    | `OTHER` | Accepting? |
| ------ | ------- | ------- | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ---------- |
| M0     | M__     | M__     | M__    | M__    | M__    | M__    | M__    | M__    | M_sink  | No         |
| M1     | M__     | M__     | M__    | M__    | M__    | M__    | M__    | M__    | M_sink  | No         |
| M2     | M__     | M__     | M__    | M__    | M__    | M__    | M__    | M__    | M_sink  | Yes        |
| M_sink | M_sink  | M_sink  | M_sink | M_sink | M_sink | M_sink | M_sink | M_sink | M_sink  | No         |

---

# 17. Construction Checklist

Before completing the DFA construction:

* [ ] NFA states use `q0`, `q1`, `q2`, ...
* [ ] DFA states use `D0`, `D1`, `D2`, ...
* [ ] `q0` is identified as the NFA start state.
* [ ] `D0 = ε-closure({q0})`.
* [ ] NFA accepting states are identified.
* [ ] DFA accepting states are derived from the NFA accepting states.
* [ ] `D_sink` is non-accepting.
* [ ] `ε` is used consistently for epsilon transitions.
* [ ] Character classes are used consistently.
* [ ] `OTHER` is defined for unsupported input.
* [ ] NFA transition table is completed.
* [ ] Epsilon closures are calculated.
* [ ] Subset construction is completed.
* [ ] DFA transition table is completed.
* [ ] Full-input matching is preserved.
* [ ] Initial minimization partitions are created.
* [ ] Partitions are refined until stable.
* [ ] Equivalent DFA states are merged.
* [ ] The minimized DFA preserves the same accepted language.

---

## 18. Phase 1 Scope

This document defines the **notation and worksheet format** for Pamela's DFA and minimization work.

It does not contain the final NFA, DFA, or minimized DFA because those states and transitions must be derived during the automaton construction.

The construction must use the approved regular-expression components and remain consistent with the project's approved URL language.
