---
name: automata-development
description: Implement or review this project's formal URL language, automata conversions, and Python DFA simulation.
---

Read docs/context.md and the approved language artifacts before choosing acceptance rules. If the language is still undecided, implement structural interfaces or clearly identify a proposal instead of treating examples as a specification.

Preserve the RE → NFA → DFA → minimized DFA chain. Record epsilon closure and subset mappings during determinization, and partitions during minimization. Explicitly model initial, accepting, and sink states. A trace must reflect each real transition in order; never generate a decorative trace after a regex verdict.

Use the same accepted/rejected corpus across formal stages and the simulator. Report unreachable states, undefined transitions, and language differences with counterexample inputs. Do not visit input URLs. Coordinate response changes through docs/api-contract.md and relevant frontend tests.
