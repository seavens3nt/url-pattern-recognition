# Phase 2 — Automata construction and core development

**Sprint:** Week 2 of 4. Days mean planned workdays within the week; actual calendar dates are not set.

## Goal
Produce a reviewed RE → NFA → DFA → minimized DFA chain while the UI and API shells progress.

## Phase meeting agenda
1. Review the previous week’s accepted handoffs and unresolved blockers.
2. Backend members explain committed changes, model decisions, tests and blockers in detail. Frontend members show wireframes or working screens. QA and paper leads show evidence and missing inputs.
3. Confirm owners, acceptance criteria and within-week deadlines below.
4. Review shared interfaces and cross-area changes.
5. Agree the phase demonstration and exit checklist.

## Work sequence
- Days 1–2: finalize RE/NFA; develop API and UI shells in parallel.
- Day 3: complete DFA and subset construction.
- Days 4–5: minimize and review equivalence; hand the model to Jared.
- Day 5: review formal artifacts and demonstrate shell progress.

## GitHub and coding rules

### Common bad habits to avoid
- Direct pushes to main; unclear branch names; large unrelated changes.
- Installing dependencies in the wrong directory or committing .env, .venv, node_modules or build outputs.
- Editing another member’s files without coordination or changing API/model fields without agreement.

### Rule list
- Every change goes through a small reviewed pull request. No direct commits to main.
- Use phase-specific branches such as `phase-2/nfa-construction` or `phase-3/react-trace`.
- Keep frontend dependencies in frontend/package.json and backend dependencies in backend/requirements*.txt. Follow the existing isolated Python environment in how-to-run.md.
- Frontend contributors must coordinate with the backend owner before backend edits; backend contributors must coordinate with the frontend owner before frontend edits. Record cross-area agreement in the issue or PR before implementation.
- Group growing UI code by feature; keep Flask routes separate from reusable automata/simulation logic. Do not mix verdict logic into UI or route handlers.
- Coordinate shared language, state-table and API changes first; update affected tests and docs in the same handoff.
- Use descriptive commits and PR descriptions with test evidence. Never silently relabel draft or sample data as an approved model.

## GitHub Desktop reminder for Week 2
Follow docs/github-desktop-guide.md: update main, create a branch such as phase-2/task-name, check changes, commit, publish, and open a PR into main. Link the task issue and request @seavens3nt. Push review fixes to the same branch. Technical peer review does not replace Ranee’s required approval.

## Member assignments and coordination

## Project Manager / Setup

### Ranee — Project Manager / Project Setup (@seavens3nt)

**Focus:** Track sequential automata handoffs daily; review small PRs; prevent scope growth and protect Pamela’s DFA and minimization schedule.

**Before starting:** Week 1 exit criteria.

**Owned files or artifacts:** docs/status.md; phase issue #15; reviewed artifact PR links

**Numbered tasks**
1. Check the phase issue at each daily handoff: NFA Day 2, DFA Day 3 and minimization Day 5.
2. Require artifact PRs to link their predecessor and receiving reviewer; do not merge unrelated frontend work into formal-artifact PRs.
3. Protect Pamela’s Days 4–5 for minimization; Ralph provides review support; defer cosmetic UI work if the NFA/DFA path slips.
4. At the review, verify exact source files and test evidence rather than accepting a completion message alone.

**Who to coordinate with and what to agree**
- Ralph to Pamela: confirm Day 2 acceptance.
- Pamela to Ralph and Jared: confirm the Day 3 DFA review.
- Pamela to Jared: confirm Day 5 minimized-model readiness.
- Paul: report discrepancies before downstream work is declared done.
- Cedric: keep report artifacts aligned.

**Expected output and deadline:** Merged/reviewed handoff evidence and updated blocker log.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Resolve delayed RE/NFA/DFA handoffs before shifting work downstream.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

## Phase work for frontend

### Isaiah — Frontend Developer / UI/UX (@m1nay3on)

**Focus:** Resolve rule questions promptly; review UI labels and prototype against Figma; maintain the approved specification.

**Before starting:** Approved scope and draft UI.

**Owned files or artifacts:** frontend/src/style.css; agreed presentation components in frontend/src/features/validator/; docs/language-spec.md; docs/ui/review-week-2.md

**Numbered tasks**
1. Answer rule questions in docs/language-spec.md with a change record; no silent edits after approval.
2. Compare Sean’s UI shell with every Figma state and write concrete differences with screenshots or component references.
3. Review any proposed changes to URL case or whitespace handling before they alter the RE or corpus.
4. Send reviewed label and error-text corrections to Sean and Jared by Day 3.

5. Build the responsive page layout and shared styles from the approved wireframes in frontend/src/style.css and agreed presentation components under frontend/src/features/validator/. Submit the layout PR by Day 3; integrate with Sean by Day 4.

**Who to coordinate with and what to agree**
- Ralph/Pamela: resolve syntax ambiguities before their handoffs.
- Paul: update expected labels together with a rule change.
- Sean: agree required fixes versus optional polish.
- Ranee: approve any scope change affecting the critical path.

**Expected output and deadline:** Clarification log and UI feedback with no silent grammar changes.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Paul reviews any changed expected outcomes; Ranee approves scope changes.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Sean — Frontend Developer — API Integration (@bonkbonkboomeykwkwkw)

**Focus:** Build frontend behavior and result components against the agreed API contract.

**Before starting:** Ranee’s working starter, Isaiah’s wireframes and #4 API contract.

**Owned files or artifacts:** frontend/src/features/validator/ValidatorPage.jsx; frontend/src/features/validator/api.js; frontend/src/App.test.jsx; docs/ui/component-plan.md

**Numbered tasks**
1. Days 1–2: agree component props and file ownership with Isaiah; implement the input form and result/trace shell.
2. Use labeled fixture responses for accepted, rejected, invalid-request and offline states. Keep sample results separate from live validation and preserve the real endpoint’s pending state.
3. Centralize calls in api.js; implement loading and duplicate-submission handling without adding verdict logic to React.
4. Days 3–4: combine Isaiah’s layout/styles with the interaction components through coordinated PRs. Test error messages, empty input and long traces.
5. Day 5: hand Paul the working shell, fixture descriptions and component tests; provide Cedric screenshots labeled as sample-data demonstrations.

**Who to coordinate with and what to agree**
- Isaiah: agree shared component interfaces before coding; avoid editing the same lines simultaneously.
- Jared: verify fixture JSON and error codes against #4.
- Paul: review component cases and browser behavior.
- Pamela: confirm trace column meanings and state ID notation.
- Ranee: review integration PR and unresolved interface questions.

**Expected output and deadline:** Interactive frontend shell and component checks by Day 5; API integration remains Week 3 under #10.

**Handoff package:** Link the issue, PR, changed files, checks and any screenshots or worked examples. Record unresolved questions. The recipient confirms the package is usable before closure.

**Primary review and recipient:** Isaiah reviews layout integration; Paul checks behavior; Jared reviews API usage. Ranee gives final PR approval.

**Done when**
- [ ] Named artifacts and behavior are delivered.
- [ ] Coordination decisions and technical review are recorded.
- [ ] Relevant checks pass and documentation matches the deliverable.
- [ ] The recipient accepts the handoff and the PR is merged.

## Phase work for backend

### Ralph — Backend Developer — RE and NFA (@rlken)

**Focus:** Finish the RE and construct the epsilon-NFA with start/final states and transition table.

**Before starting:** Week 1 language specification.

**Owned files or artifacts:** docs/automata/regular-expression.md; docs/automata/nfa.md; docs/automata/diagrams/nfa.dot

**Numbered tasks**
1. Finalize the RE and construct the epsilon-NFA using the agreed notation.
2. List every state, start state, accepting state, symbol/epsilon edge and source RE component; write a complete NFA transition table.
3. Create an editable Graphviz .dot diagram and show worked accepted/rejected paths using the reviewed corpus.
4. By Day 2, submit the NFA PR and hand Pamela the RE, state list, table, diagram and explanation; answer her review before the handoff closes.

**Who to coordinate with and what to agree**
- Isaiah: verify rule coverage.
- Pamela: check epsilon closure can be derived from the supplied edges and no state is missing.
- Paul: compare worked paths with expected outcomes.
- Cedric: receive approved diagram and construction explanation.

**Expected output and deadline:** RE, NFA diagram/table and construction explanation by Day 2.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Pamela reviews and receives the NFA on Day 2.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Pamela — Backend Developer — DFA and Minimization (@Qiuyuan26)

**Focus:** Construct the DFA and then minimize it, with independent review from Ralph.

**Before starting:** Ralph’s reviewed NFA by Day 2 and agreed model schema from Jared.

**Owned files or artifacts:** docs/automata/dfa.md; docs/automata/minimization.md; docs/automata/diagrams/dfa.dot; docs/automata/diagrams/minimized-dfa.dot; backend/automata/url_dfa.json (planned)

**Numbered tasks**
1. Day 2: inspect Ralph’s NFA state list, epsilon transitions and accepting states with him; resolve missing edges immediately.
2. By Day 3: compute epsilon closures and reachable subsets, assign DFA IDs, and document complete transitions, accepting states and sink behavior. Submit the DFA package under #7.
3. Ask Ralph to review the subset table and Jared to check machine-readable representation before minimization.
4. Days 4–5: under #8, record initial accepting/non-accepting partitions, every refinement, stable groups, original-to-minimized mapping and the minimized table.
5. Explain why the partition result preserves the language. Ask Ralph to independently review the argument; corpus agreement alone is not a general equivalence proof.
6. By Day 5: hand Jared the reviewed model, Paul the worked before/after traces, and Cedric the editable diagrams and theory explanation.

**Who to coordinate with and what to agree**
- Ralph: accept the NFA on Day 2, review the DFA on Day 3 and minimization on Days 4–5.
- Jared: agree schema before export; confirm the final package loads without ambiguous symbol classes.
- Paul: verify shared examples and report the first differing transition.
- Ranee: escalate a late NFA or DFA gate immediately; protect minimization time.
- Cedric: receive separate DFA and minimization explanations.

**Expected output and deadline:** DFA/subset construction by Day 3 (#7); minimized model and equivalence reasoning by Day 5 (#8).

**Handoff package:** Link the issue, PR, changed files, checks and any screenshots or worked examples. Record unresolved questions. The recipient confirms the package is usable before closure.

**Primary review and recipient:** Ralph reviews formal reasoning; Jared accepts model data; Paul checks worked cases. Ranee gives final PR approval.

**Done when**
- [ ] Named artifacts and behavior are delivered.
- [ ] Coordination decisions and technical review are recorded.
- [ ] Relevant checks pass and documentation matches the deliverable.
- [ ] The recipient accepts the handoff and the PR is merged.

### Jared — Backend Developer — Simulator and API (@AshenDary)

**Focus:** Implement a table-driven simulator interface and Flask response plumbing using test automata; connect the approved URL DFA when available.

**Before starting:** API contract; approved minimized table arrives at week end.

**Owned files or artifacts:** backend/automata/model.py; backend/automata/simulator.py; backend/services/validation.py; tests/test_simulator.py

**Numbered tasks**
1. Define model data structures in model.py using the agreed alphabet and state conventions.
2. Implement a pure table-driven traversal interface in simulator.py with small test automata; do not present fixtures as the approved URL model.
3. Keep request checks in the validation service and HTTP status handling in routes; adapt the response using the agreed contract.
4. At week end, inspect Pamela’s model package and list any ambiguous transitions or unsupported symbols before real integration.

**Who to coordinate with and what to agree**
- Pamela: validate state/transition schema.
- Pamela: agree the exact model package. Sean: agree frontend response names.
- Paul: review fixtures for empty input, sink state and unknown symbols.
- Ranee: record whether the URL model is ready or still pending.

**Expected output and deadline:** Simulator unit tests and endpoint implementation draft; explicit fixture versus URL-model distinction.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Paul reviews tests; Sean checks response compatibility.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

## QA / Testing

### Paul — QA / Tester (@paulccampos)

**Focus:** Review automata stages against the shared corpus; add closure, sink, out-of-alphabet and end-of-input test scenarios.

**Before starting:** Ralph/Pamela artifacts as they arrive.

**Owned files or artifacts:** docs/qa/automata-findings.md; tests/test_simulator.py; tests/fixtures/url_cases.json

**Numbered tasks**
1. Check NFA, DFA and minimized artifacts against the same corpus as each handoff arrives.
2. For a mismatch, record the input, expected outcome, observed state path and first differing transition.
3. Add test scenarios for empty input, last-character acceptance, sink loops and out-of-alphabet symbols without redefining the language.
4. Review Jared’s generic simulator tests and send artifact defects to their original owner before the phase review.

**Who to coordinate with and what to agree**
- Ralph: NFA discrepancies.
- Pamela: subset/DFA discrepancies.
- Pamela: partition/minimized-state discrepancies, with Ralph reviewing corrections.
- Isaiah: unclear expected outcome.
- Jared: traversal bugs.
- Ranee: unresolved correctness blockers.

**Expected output and deadline:** Automata discrepancy log and expanded regression cases.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Return counterexamples to the artifact owner; Jared receives test cases.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

## Paper & Presentation

### Cedric — Paper & Presentation Lead (@cedricsigue)

**Focus:** Write RE/NFA/DFA sections and export readable Graphviz diagrams; record state mappings and minimization explanation.

**Before starting:** Reviewed artifacts only; label drafts.

**Owned files or artifacts:** docs/report/theory.md; docs/report/evidence-index.md; docs/automata/diagrams/

**Numbered tasks**
1. Create theory sections using the exact filenames and state names in reviewed PRs.
2. Retain editable .dot sources and export readable diagrams without changing their transitions.
3. Explain how one RE component becomes NFA states, how a subset becomes a DFA state and how a partition becomes a minimized state.
4. Collect an owner review for each section and mark unfinished artifacts as draft in the evidence index.

**Who to coordinate with and what to agree**
- Ralph: review RE/NFA text.
- Pamela: review subset construction text.
- Pamela: explain minimization; Ralph independently reviews the argument.
- Paul: verify example labels.
- Ranee: confirm reviewed artifact versions for the phase review.

**Expected output and deadline:** Draft theory chapter with source diagrams and traceable artifact versions.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Each designer checks their section; Ranee reviews evidence.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

## Shared integration points
The language specification governs every model and test. Automata designers hand off state identifiers, transition tables and accepting states to Jared; Jared and Sean agree the JSON contract; Paul verifies the same examples independently; Cedric records only reviewed behavior. Ranee resolves cross-owner blockers.

## Phase completion checklist
- [ ] RE/NFA/DFA/minimized DFA artifacts agree with the approved language.
- [ ] State mappings and minimization reasoning are documented and reviewed.
- [ ] UI and backend interfaces are ready; fixture behavior is clearly labeled.
- [ ] Required PRs are reviewed; tests and documentation are updated.
- [ ] The team demonstrates the output and records one retrospective improvement.

## File architecture for this phase
Follow docs/architecture.md. Frontend dependencies belong in frontend/package.json; backend dependencies in backend/requirements*.txt. Ranee owns setup for both, Isaiah owns layout/CSS, Sean owns interaction/API UI, Ralph owns RE/NFA, Pamela owns DFA/minimization, and Jared owns simulator/API implementation. Paths marked planned are tasks to create, not claims that the implementation already exists. Use docs/api-contract.md for current and proposed response shapes.
