# Phase 2 — Automata construction and core development

**Sprint:** Week 2 of 4. Days mean planned workdays within the week; actual calendar dates are not set.

## Goal
Produce a reviewed RE → NFA → DFA → minimized DFA chain while the UI and API shells progress.

## Phase meeting agenda
1. Review the previous handoff and blockers (Week 1: check setup and scope).
2. Each member explains their changes, evidence and next task.
3. Confirm owners, acceptance criteria and within-week deadlines below.
4. Review shared interfaces and cross-area changes.
5. Agree the phase demonstration and exit checklist.

## Work sequence
- Days 1–2: finalize RE/NFA; develop API and UI shells in parallel.
- Day 3: complete DFA and subset construction.
- Days 4–5: minimize and review equivalence; hand the model to Jared.
- Day 5: review formal artifacts and demonstrate shell progress.

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

**Focus:** Track sequential automata handoffs daily; review small PRs; prevent scope growth and manage Sean’s dual workload.

**Before starting:** Week 1 exit criteria.

**Owned files or artifacts:** docs/status.md; phase issue #15; reviewed artifact PR links

**Numbered tasks**
1. Check the phase issue at each daily handoff: NFA Day 2, DFA Day 3 and minimization Day 5.
2. Require artifact PRs to link their predecessor and receiving reviewer; do not merge unrelated frontend work into formal-artifact PRs.
3. Protect Sean’s Days 4–5 for minimization; defer cosmetic UI work if the NFA/DFA path slips.
4. At the review, verify exact source files and test evidence rather than accepting a completion message alone.

**Who to coordinate with and what to agree**
- Ralph to Pamela: confirm Day 2 acceptance.
- Pamela to Sean: confirm Day 3 acceptance.
- Sean to Jared: confirm Day 5 model readiness.
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

### Isaiah — Language Analyst / UI/UX (@m1nay3on)

**Focus:** Resolve rule questions promptly; review UI labels and prototype against Figma; maintain the approved specification.

**Before starting:** Approved scope and draft UI.

**Owned files or artifacts:** docs/language-spec.md; docs/ui/review-week-2.md

**Numbered tasks**
1. Answer rule questions in docs/language-spec.md with a change record; no silent edits after approval.
2. Compare Sean’s UI shell with every Figma state and write concrete differences with screenshots or component references.
3. Review any proposed changes to URL case or whitespace handling before they alter the RE or corpus.
4. Send reviewed label and error-text corrections to Sean and Jared by Day 3.

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

### Ralph — Regular Expression / NFA Designer (@rlken)

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

### Pamela — DFA Designer (@Qiuyuan26)

**Focus:** Compute epsilon closures and subset states; produce a complete DFA with accepting and sink states.

**Before starting:** Ralph’s reviewed NFA.

**Owned files or artifacts:** docs/automata/dfa.md; docs/automata/diagrams/dfa.dot

**Numbered tasks**
1. On Day 2, check Ralph’s NFA package with him; return missing edges or unclear epsilon transitions immediately.
2. Compute epsilon closures and reachable NFA subsets; assign each subset one DFA ID and mark acceptance based on contained NFA accepting states.
3. Define every state/symbol transition, including the sink state where applicable; identify unreachable states explicitly.
4. By Day 3, send Sean the DFA table/diagram, subset map, initial state, accepting states, sink state and alphabet classes.

**Who to coordinate with and what to agree**
- Ralph: sign off on the NFA input.
- Sean: inspect the complete DFA package together before minimization.
- Jared: confirm transition data can be encoded without ambiguous class overlaps.
- Paul: cross-check sample traces.
- Cedric: receive subset explanation and diagram.

**Expected output and deadline:** Subset-construction table and DFA diagram/table by Day 3.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Sean reviews and receives the DFA on Day 3.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Sean — Automata Optimizer / Frontend (@bonkbonkboomeykwkwkw)

**Focus:** Build only the React input/result shell on Days 1–2 using clearly labeled fixtures; minimize the DFA on Days 4–5.

**Before starting:** Wireframes/API contract for UI; Pamela’s Day 3 DFA for minimization.

**Owned files or artifacts:** frontend/src/features/validator/ValidatorPage.jsx; docs/automata/minimization.md; docs/automata/diagrams/minimized-dfa.dot; proposed backend/automata/url_dfa.json

**Numbered tasks**
1. Days 1–2: implement the input/result shell from Figma in the validator feature; keep sample data explicitly labeled and preserve the pending-validator state.
2. Day 3: inspect Pamela’s DFA package for missing transitions, accepting/sink states and alphabet definitions; resolve gaps before partitioning.
3. Days 4–5: record initial accepting/non-accepting partitions, each refinement and the stable partition; create original-to-minimized mapping and minimized table.
4. Send Jared the reviewed model package, Paul before/after walkthroughs and Cedric the minimization explanation. Do not claim corpus agreement alone is a general proof of equivalence.

**Who to coordinate with and what to agree**
- Isaiah: approve UI layout and labels.
- Jared: agree fixture JSON before shell work.
- Pamela: review each merged state class and final mapping.
- Paul: check accepted/rejected walkthroughs.
- Cedric: receive diagram plus partition explanation.
- Ranee: escalate late DFA handoff on Day 3.

**Expected output and deadline:** UI shell; partition-refinement steps, minimized table and equivalence argument by Day 5.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Pamela reviews minimization; Jared receives the reviewed transition data.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Jared — Simulator Programmer / Backend (@AshenDary)

**Focus:** Implement a table-driven simulator interface and Flask response plumbing using test automata; connect the approved URL DFA when available.

**Before starting:** API contract; approved minimized table arrives at week end.

**Owned files or artifacts:** backend/automata/model.py; backend/automata/simulator.py; backend/services/validation.py; tests/test_simulator.py

**Numbered tasks**
1. Define model data structures in model.py using the agreed alphabet and state conventions.
2. Implement a pure table-driven traversal interface in simulator.py with small test automata; do not present fixtures as the approved URL model.
3. Keep request checks in the validation service and HTTP status handling in routes; adapt the response using the agreed contract.
4. At week end, inspect Sean’s model package and list any ambiguous transitions or unsupported symbols before real integration.

**Who to coordinate with and what to agree**
- Pamela: validate state/transition schema.
- Sean: agree the exact model package and response names.
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

### Paul — Tester / QA (@paulccampos)

**Focus:** Review automata stages against the shared corpus; add closure, sink, out-of-alphabet and end-of-input test scenarios.

**Before starting:** Ralph/Pamela/Sean artifacts as they arrive.

**Owned files or artifacts:** docs/qa/automata-findings.md; tests/test_simulator.py; tests/fixtures/url_cases.json

**Numbered tasks**
1. Check NFA, DFA and minimized artifacts against the same corpus as each handoff arrives.
2. For a mismatch, record the input, expected outcome, observed state path and first differing transition.
3. Add test scenarios for empty input, last-character acceptance, sink loops and out-of-alphabet symbols without redefining the language.
4. Review Jared’s generic simulator tests and send artifact defects to their original owner before the phase review.

**Who to coordinate with and what to agree**
- Ralph: NFA discrepancies.
- Pamela: subset/DFA discrepancies.
- Sean: partition/minimized-state discrepancies.
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

### Cedric — Documentation / Presentation (@cedricsigue)

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
- Sean: review minimization argument.
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
Follow docs/architecture.md. Paths marked planned are tasks to create, not claims that the implementation already exists. Use docs/api-contract.md for current and proposed response shapes.
