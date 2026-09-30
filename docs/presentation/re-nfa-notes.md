# RE/NFA defense notes

**Owner:** Ralph Punzalan

**Issue:** #81 — RE and NFA defense package (tracker #77)

**Tested commit:** `0eb389b` ("Reconcile Phase 3 gate evidence and Phase 4
timeline")

**Verification run:**
```
.venv/bin/python -m pytest tests/test_language_cases.py tests/test_integration.py
```
Result: `286 passed`.

**Source files:** [`docs/automata/regular-expression.md`](../automata/regular-expression.md),
[`docs/automata/nfa.md`](../automata/nfa.md),
[`docs/automata/diagrams/nfa.dot`](../automata/diagrams/nfa.dot),
[`docs/qa/nfa-trace-audit.md`](../qa/nfa-trace-audit.md).

**No formal correction made.** The editable `nfa.dot` and its rendered
evidence were compared against the transition table in `nfa.md` and found
consistent; no state, transition, or diagram mismatch was found. This
package is speaking notes and evidence only.

---

## RE-to-NFA explanation (for defense)

The approved language (`docs/language-spec.md`) is regular: its rules use
finite character classes, concatenation, alternation, and Kleene star/plus
repetition, all of which preserve regularity. The regular
expression in `regular-expression.md` Section 2 names each piece of the
grammar (`SCHEME`, `LABEL`, `TLD`, `PATH_CHAR`, `SEGMENT`, `PATH`), and the
NFA in `nfa.md` builds state-and-transition structures for those components: fixed keywords
like `http`/`https` become chains of literal-character transitions, repeated
or optional parts (a label's inner characters, extra TLD letters, path
segments) become epsilon choice points and self-loops, and the whole machine
is 21 states (`q0`-`q20`) with a single start state and a single accepting
state, `q20`. Nothing in the table treats a named component as a single
symbol; every transition is either a literal character, `ALNUM`, `LOWER`, or
`ε`.

## Four walkthroughs

### Accepted — B01: `https://example.com/`

Scheme and `://` consume normally to `q8`. The label `example` is matched
through the `q9`/`q11` loop and ends at `q10`. The decisive step is at `q12`:
after the dot, the machine takes the `ε` transition to `q13` (the TLD
branch) rather than looping back for another label, since there's no second
dot left in the string. `com` satisfies `TLD` at `q15`, host completes at
`q16`, and the lone `/` matches the root-path alternative straight to `q20`.
**ACCEPT**, full input consumed.

### Accepted — B14: `https://xn--example.com`

Same scheme/host structure, but the label is `xn--example`, with two
hyphens in a row. The decisive step is at `q11`: its self-loop accepts
`ALNUM` or `-` independently for each character, so two consecutive hyphens
are just two separate passes through the same self-loop, not a special
case. This is the case to point to if asked about Punycode: the language
spec (Ranee, 2026-09-19) treats `xn--` as an ordinary ASCII label under this
same `LABEL` rule, with no IDN decoding and no separate grammar path.
**ACCEPT**, full input consumed.

### Rejected — R04: `https://localhost`

The label `localhost` matches fully and lands on `q10`. The decisive step is
that `q10` has exactly one outgoing transition, on `.`, and the input is
already exhausted. There is no epsilon path from `q10` to `q20`, because
`HOST` requires a literal dot and a `TLD` after every label — a single
label can never finish the language. **REJECT**, no accepting state
reachable.

### Rejected — R08: `https://example.com/search?q=test`

Host and the path segment `search` consume normally to `q18`. The decisive
step is that `q18`'s outgoing transitions are `ALNUM`, `-`, `_`, `.`, `~`,
`/`, and `ε`; the next character, `?`, matches none of them. Taking the `ε`
transition to `q20` would leave `?q=test` unconsumed, which breaks
full-input matching. **REJECT**, no accepting path consumes the entire
string.

## Limits of the bounded language

This recognizer accepts a deliberately narrow academic subset, not
real-world URLs. Notably excluded, all by construction rather than by a
runtime filter: any port, query string, or fragment; uppercase or
mixed-case input anywhere; raw whitespace; IPv4/IPv6 hostnames; and raw
non-ASCII text (an ASCII `xn--` label is accepted as an ordinary label, but
it is never decoded, and literal Unicode is always rejected). A hostname
must have at least two labels, and the final label must be two or more
plain lowercase letters, digits are not allowed in it. A real browser would
accept many strings this recognizer rejects; that gap is intentional scope,
not a defect.

## Verification layers (state this distinction explicitly)

Three separate checks exist and should not be conflated when defending this
work:

1. **Phase 2 expression check** — 20 fixture cases checked by hand against the
   regular expression (`regular-expression.md` Section 5). The NFA document
   separately includes four worked NFA traces (`nfa.md` Section 5).
2. **Phase 3 NFA audit** — 4 additional fixture cases traced by hand,
   independently, against the documented NFA (`docs/qa/nfa-trace-audit.md`).
3. **Automated parity suite** — `tests/test_language_cases.py` and
   `tests/test_integration.py`, run against the full 36-case shared fixture
   plus additional unit coverage (286 tests total, all passing at commit
   `0eb389b`). This checks specification/simulator/API agreement in code; it
   is not a hand trace of the NFA.

No claim is made that all 36 fixture cases were manually traced through the
NFA. The published evidence contains four Phase 2 NFA worked traces and four
additional Phase 3 NFA traces. The 20-case Phase 2 expression check is a
different verification layer; automated parity covers all 36 fixture cases.

## Speaking sequence (~1 minute)

1. *(10s)* "Our URL language is a deliberately small regular subset —
   scheme, hostname, optional path — built entirely from finite alternation,
   concatenation, and bounded repetition, so it's regular by construction."
2. *(15s)* "The NFA has 21 states, one start state, one accepting state.
   Fixed keywords like `http` are literal-character chains; repeated parts —
   label characters, extra TLD letters, path segments — are epsilon choice
   points and self-loops, built directly from the named RE components."
3. *(15s)* "Take `https://example.com/`: scheme and host consume normally,
   the decisive moment is right after the dot before `com` — the machine
   chooses the TLD branch over continuing the label loop, and a lone `/`
   matches the root-path case straight to accept."
4. *(10s)* "Now `https://localhost`: the label matches fine, but it lands in
   a state whose only transition is on a literal dot. With no more input and
   no epsilon path to accept, it rejects — a single label can never satisfy
   this language."
5. *(10s)* "We hand-checked 20 fixtures against the expression, published four
   NFA worked traces, and independently traced four more NFA cases in Phase 3.
   Automated tests cover all 36 fixtures; those are not hand traces."
