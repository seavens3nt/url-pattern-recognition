# Phase 1 — Foundation and specification

**Sprint goal:** give every member a working project and approve the language, interfaces and evidence needed for construction.

**Dates:** September 9–16, 2026

**Deadline:** Wednesday, September 16, 2026

**End-of-phase gate:** Ranee accepts the scope package containing the language rules, RE draft, notation, wireframes, API examples, test corpus, report outline and setup evidence. Phase 2 issues remain unopened until this gate is accepted.

Use [Contributing](../../CONTRIBUTING.md) for GitHub rules, [GitHub Desktop guide](../github-desktop-guide.md) for PR steps, [How to run](../how-to-run.md) for setup and [Architecture](../architecture.md) for file ownership.

## Meeting agenda

1. Confirm availability, sprint dates, professor requirements and the fixed core scope.
2. Run the starter together and record setup blockers.
3. Agree the URL components to support before any final automata construction.
4. Confirm the frontend/API boundary, formal notation and shared test format.
5. Review each handoff below and name its receiving reviewer.

## Assignments

| Owner | Specific work | Coordinate with | Deliverable and acceptance |
| --- | --- | --- | --- |
| **Ranee** @seavens3nt | Verify React, Flask, proxy and health endpoint; onboard all members; confirm calendar and chair scope review. | Isaiah and Sean on frontend boundaries; Jared on backend; Paul on clean setup; Ralph and Pamela on scope feasibility; Cedric on project explanation. | Starter runs from a clean guide; every member records setup evidence or blocker; scope decisions and dates are written down. |
| **Isaiah** @m1nay3on | Maintain the approved rules in `docs/language-spec.md`; keep the desktop/mobile wireframes for input, loading, accepted, rejected, invalid request and offline behavior aligned with them. | Ralph checks regularity; Paul checks expected outcomes; Sean agrees components and responsive behavior; Jared confirms API errors; Ranee approves scope. | PR containing the approved language file plus the Figma link, with no unresolved wording or contradictory examples. |
| **Sean** @bonkbonkboomeykwkwkw | Plan input, result and trace components; map loading, verdict, request-error and offline states to API responses. | Isaiah owns layout and labels; Jared agrees JSON fields/status codes; Paul reviews testable behavior. | `docs/ui/component-plan.md` and reviewed API examples; shared frontend file boundaries are agreed before coding. |
| **Ralph** @rlken | Check that the proposed language is regular; draft and explain the RE in named components; walk through two accepted and two rejected examples. | Isaiah resolves grammar ambiguity; Pamela agrees epsilon/state notation; Paul uses the same expected outcomes. | `docs/automata/regular-expression.md` reviewed by Pamela with ambiguity list resolved or explicitly blocked. |
| **Pamela** @Qiuyuan26 | Define state names, start/accept/sink conventions, epsilon notation, character classes and transition-table/subset worksheet formats. | Ralph aligns NFA notation; Jared agrees machine-readable representation; Paul reviews sink and out-of-alphabet cases. | `docs/automata/notation.md` plus DFA worksheet template, reviewed by Ralph and Jared. |
| **Jared** @AshenDary | Document current and proposed validation requests, responses, status codes, trace fields and simulator interface; label unimplemented behavior honestly. | Sean agrees UI needs; Pamela agrees model shape; Paul reviews negative cases; Ranee reviews readiness claims. | Updated `docs/api-contract.md` with accepted, rejected, bad request, offline and pending examples. |
| **Paul** @paulccampos | Follow the run guide on a clean clone; create uniquely identified accepted/rejected/boundary cases from the approved language rules. | Ranee fixes setup gaps; Isaiah confirms expectations; Ralph and Pamela cover formal boundaries; Jared agrees fixture format. | Setup evidence plus shared corpus with reason, source rule and expected verdict for every case. |
| **Cedric** @cedricsigue | Build the 23-section course report structure in one shared Google Doc; keep references, contribution matrix, decision notes and presentation outline there. Write only the verified project/setup overview. | Use merged evidence independently; raise missing requirements with Ranee, who reviews both outputs. | Google Doc link plus only `docs/report/evidence-index.md` in GitHub. Map sections to owners, evidence and status. Full acceptance checklist: [Issue #13](https://github.com/seavens3nt/url-pattern-recognition/issues/13). |

### Recorded progress

- **Complete — Ranee:** React and Flask setup, frontend/backend connection, run instructions, calendar and scope review are complete. Ranee confirmed that all eight members cloned and ran both servers and that no setup blocker remains. See [issue #1](https://github.com/seavens3nt/url-pattern-recognition/issues/1).
- **Complete — Isaiah:** the approved language specification and wireframe evidence were reviewed and merged. See [issue #2](https://github.com/seavens3nt/url-pattern-recognition/issues/2).
- **Complete — Jared:** the validation API contract was reviewed and merged. See [issue #4](https://github.com/seavens3nt/url-pattern-recognition/issues/4).
- **Complete — Ralph:** the regular-expression draft was aligned with the approved scope, verified against all 20 shared cases, reviewed and merged. See [issue #6](https://github.com/seavens3nt/url-pattern-recognition/issues/6).
- **Complete — Sean:** the component plan, response examples, state mapping and frontend file boundaries were reviewed and merged in [PR #30](https://github.com/seavens3nt/url-pattern-recognition/pull/30). See [issue #3](https://github.com/seavens3nt/url-pattern-recognition/issues/3).
- **Complete — Pamela:** the automata notation and DFA/minimization worksheet structure were reviewed and merged in [PR #29](https://github.com/seavens3nt/url-pattern-recognition/pull/29). See [issue #7](https://github.com/seavens3nt/url-pattern-recognition/issues/7).
- **Complete — Paul:** the clean-setup evidence and 10 accepted/10 rejected corpus were reviewed and merged in [PR #28](https://github.com/seavens3nt/url-pattern-recognition/pull/28). See [issue #5](https://github.com/seavens3nt/url-pattern-recognition/issues/5).
- **Active — Cedric:** the report outline and evidence index remain in [issue #13](https://github.com/seavens3nt/url-pattern-recognition/issues/13). The Phase 1 tracker stays open until this deliverable is accepted.

## Required handoffs

1. Isaiah sends the approved language rules to Ralph and Paul by September 14.
2. Ralph sends the RE draft to Pamela and Paul by September 16.
3. Pamela sends notation/model format to Jared before simulator work.
4. Jared and Sean approve response examples by September 15.
5. Paul reports setup problems immediately and gives corpus review results before the sprint review.
6. Cedric compiles existing merged explanations and evidence into the Google Doc and records missing items for Ranee. The GitHub evidence index links the paper to its sources.

## Completion checklist

- [x] Calendar, deadline and core scope recorded.
- [x] All eight members can clone and run both servers.
- [x] Language specification and examples reviewed.
- [x] RE draft and automata notation reviewed.
- [x] Wireframes, component plan and API examples agree.
- [ ] Shared test corpus and report outline exist.
- [ ] Phase 1 issues contain PR/evidence links and Ranee's acceptance.
- [ ] Ranee records the Phase 2 activation decision.
