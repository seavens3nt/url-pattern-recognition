# Phase 3 — Integrated web application

**Sprint:** Week 3 of 4. Days mean planned workdays within the week; actual calendar dates are not set.

## Goal
Run real DFA validation through Flask and React with accurate transition traces.

## Phase meeting agenda
1. Review the previous handoff and blockers (Week 1: check setup and scope).
2. Each member explains their changes, evidence and next task.
3. Confirm owners, acceptance criteria and within-week deadlines below.
4. Review shared interfaces and cross-area changes.
5. Agree the phase demonstration and exit checklist.

## Work sequence
- Days 1–2: wire the approved DFA into Flask.
- Day 3: connect React verdict and trace screens.
- Day 4: end-to-end regression and targeted fixes.
- Day 5: demonstrate the complete local flow; freeze new features.

## GitHub and coding rules
- Every change goes through a small reviewed pull request. No direct commits to main.
- Use phase-specific branches such as `phase-2/nfa-construction` or `phase-3/react-trace`.
- Keep frontend dependencies in frontend/package.json and backend dependencies in backend/requirements*.txt. Follow the existing isolated Python environment in how-to-run.md.
- Frontend contributors must coordinate with the backend owner before backend edits; backend contributors must coordinate with the frontend owner before frontend edits. Record cross-area agreement in the issue or PR before implementation.
- Group growing UI code by feature; keep Flask routes separate from reusable automata/simulation logic. Do not mix verdict logic into UI or route handlers.
- Coordinate shared language, state-table and API changes first; update affected tests and docs in the same handoff.
- Use descriptive commits and PR descriptions with test evidence. Never silently relabel draft or sample data as an approved model.

## Member assignments and coordination

### Ranee — Project Manager / Integration Lead (@seavens3nt)

**Focus:** Coordinate integration PRs; choose the demo hosting approach and rehearse setup from a clean checkout.

**Before starting:** Week 2 model handoff; no paid hosting commitment assumed.

**Owned files or artifacts:** docs/release/delivery-plan.md; docs/status.md; issue #16

**Numbered tasks**
1. Review the integration sequence and keep the API and frontend PRs small enough to diagnose independently.
2. By Day 2, confirm Jared’s endpoint uses the approved model; by Day 3, confirm Sean’s UI uses that endpoint.
3. Select hosting or local-delivery approach based on professor requirements and team resources; document commands and configuration without purchasing services.
4. Day 5: demonstrate accepted and rejected examples, freeze features and list defects carried into Week 4.

**Who to coordinate with and what to agree**
- Jared and Sean: coordinate API/UI merge order.
- Paul: verify candidate against the corpus.
- Isaiah: approve scope conformance.
- Cedric: prepare the demonstration evidence.
- All owners: agree what is a release blocker.

**Expected output and deadline:** Integrated build candidate, environment plan and review log.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Paul receives the candidate for release testing.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Isaiah — Language Analyst / UI/UX (@m1nay3on)

**Focus:** Review accepted/rejected explanations and keyboard/mobile flows; compare the implementation with wireframes and language rules.

**Before starting:** Working candidate and approved specification.

**Owned files or artifacts:** docs/ui/review-week-3.md; docs/language-spec.md (clarifications only)

**Numbered tasks**
1. Run the agreed cases through the integrated screen and compare verdict/explanation wording with the language specification.
2. Review focus order, keyboard submission, error announcements, trace readability and narrow-screen layout.
3. Write each finding with the screen state, expected behavior, screenshot and owner; separate correctness problems from optional styling.
4. By Day 3 send final text/layout requirements so fixes can land before feature freeze.

**Who to coordinate with and what to agree**
- Sean: UI and accessibility fixes.
- Jared: API explanation fixes.
- Paul: reproduce findings and add regressions.
- Ranee: resolve priority disputes before Day 4.

**Expected output and deadline:** Prioritized UX and rule-conformance findings by Day 3.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Sean fixes UI findings; Jared fixes response explanations.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Ralph — Regular Expression / NFA Designer (@rlken)

**Focus:** Trace selected accepted and rejected strings through the RE/NFA; investigate disagreements with the simulator.

**Before starting:** Integrated simulator plus shared corpus.

**Owned files or artifacts:** docs/automata/worked-examples.md; docs/automata/nfa.md (reviewed fixes)

**Numbered tasks**
1. Select reviewed accepted/rejected inputs that cover different RE branches and optional parts.
2. Show their NFA paths and compare them with the runtime verdict; document first divergence, if any.
3. Fix only reviewed RE/NFA artifact mistakes through a PR; a grammar change requires Isaiah and Ranee approval.
4. Supply final worked examples with diagrams and a short verbal explanation.

**Who to coordinate with and what to agree**
- Pamela: map NFA paths into DFA states.
- Jared: compare runtime verdicts.
- Paul: independently reproduce discrepancies.
- Cedric: use reviewed examples in the report and demo.

**Expected output and deadline:** Worked examples and resolved theory discrepancies.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Paul cross-checks examples; Cedric adds them to the report.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Pamela — DFA Designer (@Qiuyuan26)

**Focus:** Audit runtime state IDs and transitions against the DFA/minimized-state mapping; check sink and accepting behavior.

**Before starting:** Jared’s implemented model and Sean’s minimization artifacts.

**Owned files or artifacts:** docs/qa/state-mapping-audit.md; docs/automata/dfa.md; docs/automata/minimization.md (joint review)

**Numbered tasks**
1. Compare the runtime model’s state IDs, accepting set and each transition against the reviewed minimized mapping.
2. Audit sink behavior and consumption of the final character; check that character classes are disjoint or have an explicit deterministic rule.
3. For any mismatch, record input/state/symbol and expected next state before asking Jared for a fix.
4. Review the corrected model with Sean and approve the mapping evidence for the release candidate.

**Who to coordinate with and what to agree**
- Sean: confirm original-to-minimized mapping.
- Jared: correct encoded model or traversal.
- Paul: add a reproducing test.
- Ralph: resolve upstream DFA-input questions.
- Cedric: receive final mapping explanation.

**Expected output and deadline:** State mapping audit and reviewed transition-data changes.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Jared resolves engine mismatches; Sean confirms equivalence.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Sean — Automata Optimizer / Frontend (@bonkbonkboomeykwkwkw)

**Focus:** Connect React to the real endpoint; show verdict, rejection explanation and ordered transition table; handle loading and API failures.

**Before starting:** Jared’s real API and Isaiah’s UX feedback.

**Owned files or artifacts:** frontend/src/features/validator/ValidatorPage.jsx; frontend/src/features/validator/api.js; frontend/src/App.test.jsx; frontend/src/style.css

**Numbered tasks**
1. Replace sample UI data with validateUrl responses only after Jared provides real-model acceptance evidence.
2. Display boolean verdict, readable message, final state and an ordered table of position/symbol/from_state/to_state using the approved contract.
3. Keep accepted:null and transport errors separate from rejected strings; prevent duplicate submission and handle retries after errors.
4. Add component tests for accepted, rejected, invalid-request and offline outcomes; submit the integrated screen by Day 3.

**Who to coordinate with and what to agree**
- Jared: provide exact success/error JSON and confirm the model is real.
- Isaiah: review labels and responsive layout.
- Pamela: confirm displayed state IDs match documentation.
- Paul: review behavior tests and browser cases.
- Ranee: coordinate integration PR.

**Expected output and deadline:** Responsive validator and trace UI by Day 3; component tests.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Paul reviews browser behavior; Ranee reviews integration PR.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Jared — Simulator Programmer / Backend (@AshenDary)

**Focus:** Load the approved minimized DFA; implement real acceptance, final state and per-symbol trace; replace the 501 placeholder only when ready.

**Before starting:** Reviewed minimized table and agreed API contract.

**Owned files or artifacts:** backend/automata/url_dfa.json; backend/automata/simulator.py; backend/services/validation.py; backend/routes/validation.py; tests/test_api.py

**Numbered tasks**
1. Integrate the reviewed url_dfa.json model and validate its referenced states and deterministic transitions at load time.
2. Return acceptance only after consuming the complete input; record actual per-symbol transitions and final state using the agreed convention.
3. Map valid simulated requests to HTTP 200 for either accepted or rejected; preserve request errors and keep unready-model handling explicit.
4. By Day 2, provide Sean sample real-model responses and Paul corpus results; replace validator_ready:false only when the engine is actually ready.

**Who to coordinate with and what to agree**
- Sean and Pamela: sign off on model encoding.
- Sean: review response compatibility before field changes.
- Paul: verify corpus and negative paths independently.
- Ranee: review model-readiness evidence before integration.

**Expected output and deadline:** Working validation API by Day 2 with passing corpus and contract tests.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Sean integrates on Days 2–3; Paul independently verifies outputs.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Paul — Tester / QA (@paulccampos)

**Focus:** Run end-to-end accepted/rejected cases through UI and API; test invalid requests and unavailable backend; retest fixes.

**Before starting:** Working API/UI candidate.

**Owned files or artifacts:** tests/test_api.py; tests/test_simulator.py; frontend/src/App.test.jsx; docs/qa/integration-report.md

**Numbered tasks**
1. Exercise the same accepted/rejected corpus through the simulator and HTTP API; sample representative cases through React.
2. Test missing/malformed input, length limits, double submission, backend offline, error recovery and narrow screens.
3. Compare trace rows to the model rather than checking only verdict text; report reproducible defects with severity and owner.
4. By Day 4, publish the integration report; retest fixes against the same case IDs before recommending feature freeze.

**Who to coordinate with and what to agree**
- Jared: API and engine defects.
- Sean: UI defects.
- Isaiah: disputed expected behavior.
- Ralph/Pamela: model discrepancies.
- Ranee: prioritize critical issues.
- Cedric: include only observed pass/fail evidence.

**Expected output and deadline:** Integration test report and severity-ranked bug list by Day 4.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Assign defects to Sean/Jared or automata owner; Ranee prioritizes.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Cedric — Documentation / Presentation (@cedricsigue)

**Focus:** Write implementation and architecture sections; add actual screenshots and a draft demo script; verify the run guide.

**Before starting:** Integrated behavior and verified screenshots.

**Owned files or artifacts:** docs/report/implementation.md; docs/presentation/demo-script.md; docs/report/evidence-index.md; docs/how-to-run.md (corrections)

**Numbered tasks**
1. Document the actual path from ValidatorPage through api.js, Flask route, service and simulator; check it against code.
2. Capture current screenshots showing one accepted, one rejected and one error case after the real engine is ready.
3. Write a step-by-step demo script and tag which teammate explains each part.
4. Run the README instructions independently and record missing setup details before report freeze.

**Who to coordinate with and what to agree**
- Jared: verify backend flow.
- Sean: verify UI flow and screenshots.
- Ralph/Pamela: verify example paths.
- Paul: supply integration evidence.
- Ranee: review reproducibility and demo length.

**Expected output and deadline:** Code-aligned report draft and demo sequence.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** All owners review technical statements; Ranee checks reproducibility.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

## Shared integration points
The language specification governs every model and test. Automata designers hand off state identifiers, transition tables and accepting states to Jared; Jared and Sean agree the JSON contract; Paul verifies the same examples independently; Cedric records only reviewed behavior. Ranee resolves cross-owner blockers.

## Phase completion checklist
- [ ] React → Flask → actual DFA → result and trace works for accepted and rejected examples.
- [ ] Trace rows represent actual transitions; no fabricated regex-based verdicts.
- [ ] Critical integration defects are resolved and report draft matches the candidate.
- [ ] Required PRs are reviewed; tests and documentation are updated.
- [ ] The team demonstrates the output and records one retrospective improvement.

## File architecture for this phase
Follow docs/architecture.md. Paths marked planned are tasks to create, not claims that the implementation already exists. Use docs/api-contract.md for current and proposed response shapes.
