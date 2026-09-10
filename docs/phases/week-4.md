# Phase 4 — Verification, delivery and defense

**Sprint goal:** stabilize the frozen candidate, prove that it runs cleanly and prepare every member for submission and defense.

**End-of-week gate:** Ranee has a reviewed release commit, verification report, reproducible run instructions, final report/slides and demonstrated fallback.

Only release-blocking fixes enter this phase. Open Phase 4 issues after the Phase 3 feature-freeze review.

## Assignments

| Owner | Specific work | Coordinate with | Deliverable and acceptance |
| --- | --- | --- | --- |
| **Ranee** | Triage blockers with Paul; verify delivery environment and commit; chair rehearsal; check the professor’s submission list; tag the approved release. | All members on fixes and speaking parts; Cedric on package; Jared/Sean on environment. | Release checklist, exact commit/tag and complete submission package; no unresolved critical correctness issue. |
| **Isaiah** | Check final scope text, mobile layout and accessibility; fix assigned release blockers; prepare the language/scope explanation. | Sean on shared UI; Paul retests; Jared aligns unsupported-input messages; Cedric receives limitations/screenshots. | Final UI checklist, limitations text and verified screenshots by Day 3. |
| **Sean** | Fix prioritized frontend regressions, rerun component checks and rehearse input-to-result/error handling. | Paul reproduces/retests; Isaiah approves UX; Jared protects API compatibility; Cedric receives demo notes. | Verified frontend fixes by Day 2 and final UI demo notes by Day 3. |
| **Ralph** | Proofread final RE/NFA against the release; prepare accepted/rejected walkthroughs and editable diagrams. | Pamela cross-checks handoff; Paul confirms examples; Cedric receives final versions. | Final RE/NFA appendix and rehearsed explanation by Day 3. |
| **Pamela** | Verify final DFA/minimized tables and runtime state IDs; prepare determinization/minimization explanation. | Ralph checks source NFA/mapping; Jared checks release model; Paul confirms no open discrepancy. | Final DFA/minimization appendix and rehearsed explanation by Day 3. |
| **Jared** | Fix backend defects with reproducing tests; verify model/configuration after restart and clean setup; rehearse simulator/API flow. | Paul retests; Sean checks responses; formal owners review transition changes; Ranee verifies environment. | Backend release candidate and configuration/demo notes by Day 3. |
| **Paul** | Run full regression on the exact release commit; test clean clone, mobile/keyboard and target environment; document residual risks. | Developers fix assigned defects; Ranee receives go/no-go; Cedric uses exact results. | Release report with commit ID, commands, cases and Day 4 retest evidence. |
| **Cedric** | Finalize report, references, slides, evidence index, speaking order, timed rehearsal and local/demo fallback. | Every owner signs off their section; Paul signs test claims; Ranee approves package. | Final academic package and fallback ready before Day 5 submission review. |

## Coordination checkpoints

- **Day 1:** feature freeze confirmed; Paul and Ranee assign blocking defects.
- **Day 2:** code fixes complete and focused checks pass.
- **Day 3:** exact release candidate passes clean-run and regression review; all final artifacts reach Cedric.
- **Day 4:** full timed rehearsal and final retest.
- **Day 5:** Ranee verifies submission, tags the release and records delivery evidence.

## Completion checklist

- [ ] Full corpus, API, UI and clean-setup checks pass on the final commit.
- [ ] Residual defects and limitations are documented accurately.
- [ ] Formal diagrams/tables match runtime state IDs.
- [ ] Run guide works for a clean machine.
- [ ] Report, slides, references and demo fallback are complete.
- [ ] All eight members rehearse their own contribution.
- [ ] Ranee approves and records the submitted release.
