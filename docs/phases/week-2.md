# Phase 2 — Automata construction and application shells

**Sprint goal:** finish the reviewed formal conversion and prepare frontend/backend shells that accept the final model without pretending validation is complete.

**End-of-week gate:** the RE, NFA, DFA and minimized DFA agree on the shared corpus; application shells and tests are ready for Week 3 integration.

This phase starts only after the Phase 1 review. Its GitHub issues are opened at that time. Shared workflow and setup rules remain in [Contributing](../../CONTRIBUTING.md) and [How to run](../how-to-run.md).

## Assignments

| Owner | Specific work | Coordinate with | Deliverable and acceptance |
| --- | --- | --- | --- |
| **Ranee** | Open Phase 2 issues after the gate; sequence formal handoffs; review PRs and remove blockers. | Ralph → Pamela → Jared on the critical path; Isaiah and Sean on shared frontend files; Paul on evidence; Cedric on documentation. | Phase tracker shows owners, dependencies and evidence; no downstream artifact is marked done before review. |
| **Isaiah** | Build the responsive page layout, styles, navigation and accessible labels from approved wireframes. | Sean agrees component props and shared files; Paul reviews keyboard/mobile behavior; Ranee controls scope. | Responsive static layout passes lint/build and matches approved states without duplicating validation logic. |
| **Sean** | Build input, result, error and trace components using fixtures; keep HTTP logic in the agreed API module. | Isaiah owns layout; Jared supplies contract examples; Paul reviews component tests. | Components render pending, accepted, rejected and error fixtures with tests; no fabricated live verdict. |
| **Ralph** | Finalize RE and construct the NFA with tables, epsilon transitions, diagrams and worked examples by Day 2. | Isaiah confirms language; Pamela reviews notation and receives NFA; Paul checks examples; Cedric receives editable artifacts. | Reviewed RE/NFA reproduce the approved examples and provide a complete handoff to Pamela. |
| **Pamela** | Perform subset construction by Day 3, then partition refinement and state mapping by Day 5. | Ralph reviews closures and equivalence; Jared agrees model IDs/format; Paul checks cases. | DFA table, minimization table, diagrams and original-to-minimized mapping are independently reviewed. |
| **Jared** | Implement generic simulator/model-loading plumbing with small test automata while waiting for the final model; keep Flask routes thin. | Pamela agrees representation; Sean protects API compatibility; Paul reviews unit cases; Ranee reviews readiness. | Generic engine tests pass; final URL verdict remains pending until the reviewed minimized model is integrated. |
| **Paul** | Compare shared cases across RE/NFA/DFA/minimized DFA; add simulator/API/component regression cases and log discrepancies. | Ralph and Pamela resolve formal mismatches; Jared and Sean resolve code/test issues. | Formal review matrix and automated checks identify the exact artifact/state where any mismatch begins. |
| **Cedric** | Write the theory chapter from reviewed artifacts and maintain diagram/source references. | Ralph explains RE/NFA; Pamela explains DFA/minimization; Paul provides verification evidence; Ranee reviews claims. | Theory draft and editable diagrams use consistent state names and cite actual reviewed evidence. |

## Coordination checkpoints

- **Day 2:** Ralph hands the reviewed NFA to Pamela.
- **Day 3:** Pamela presents the complete DFA/subset table to Ralph, Jared and Paul.
- **Day 4:** frontend components and simulator shell demonstrate fixture-driven behavior.
- **Day 5:** minimization mapping, corpus comparison and theory draft are reviewed together.

## Completion checklist

- [ ] RE/NFA approved and handed to Pamela.
- [ ] DFA subsets and transitions checked.
- [ ] Minimized partitions and state mapping checked independently.
- [ ] Generic simulator/model validation tests pass.
- [ ] Responsive frontend components and tests pass with fixtures.
- [ ] Theory draft matches final state names.
- [ ] Ranee approves Week 3 integration readiness.
