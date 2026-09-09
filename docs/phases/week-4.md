# Phase 4 — Verification deployment and defense

**Sprint:** Week 4 of 4. Days mean planned workdays within the week; actual calendar dates are not set.

## Goal
Deliver a tested, reproducible project and prepare all eight members to defend it.

## Phase meeting agenda
1. Review the previous handoff and blockers (Week 1: check setup and scope).
2. Each member explains their changes, evidence and next task.
3. Confirm owners, acceptance criteria and within-week deadlines below.
4. Review shared interfaces and cross-area changes.
5. Agree the phase demonstration and exit checklist.

## Work sequence
- Days 1–2: regression, responsive checks and priority fixes.
- Day 3: release candidate and deployment/local-delivery smoke test.
- Day 4: full defense rehearsal and final fixes.
- Day 5: final package check, tag and submission buffer.

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

**Focus:** Freeze features; coordinate release fixes, deployment or approved local delivery; tag reviewed release and verify submission materials.

**Before starting:** QA evidence and professor delivery requirements.

**Owned files or artifacts:** docs/release/checklist.md; docs/release/delivery-plan.md; docs/status.md; release tag after review

**Numbered tasks**
1. Day 1: freeze features and triage the remaining bug list with Paul; assign each blocking defect to an owner.
2. Day 3: verify clean setup and the chosen delivery environment; record commit ID, configuration and smoke-test results.
3. Day 4: attend the full rehearsal and ensure all eight members can explain their own work.
4. Day 5: verify final report, slides, source, release tag and required submission channel against the professor’s checklist.

**Who to coordinate with and what to agree**
- Paul: give go/no-go evidence and residual defects.
- Jared/Sean: verify target environment.
- Cedric: deliver final package and fallback.
- All members: confirm their section.
- Do not tag a release with unresolved critical correctness failures.

**Expected output and deadline:** Release checklist, tagged commit and submission package by Day 5.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Team reviews package; no release while critical defects remain.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Isaiah — Language Analyst / UI/UX (@m1nay3on)

**Focus:** Perform final scope/UX review and document limitations; prepare the language-definition portion of the defense.

**Before starting:** Release candidate.

**Owned files or artifacts:** docs/language-spec.md; docs/ui/final-checklist.md; docs/report/limitations.md

**Numbered tasks**
1. Check the final UI and every documented language limitation against the frozen specification.
2. Recheck priority usability fixes and sign off on the final text and mobile behavior.
3. Prepare a short explanation of why the supported URL language is intentionally scoped and which inputs are outside it.
4. Send final scope/limitation text to Cedric before Day 4 rehearsal.

**Who to coordinate with and what to agree**
- Sean: recheck UI fixes.
- Paul: verify findings are resolved.
- Ranee: approve final scope claims.
- Cedric: include limitations in slides and report.
- Jared: confirm unsupported inputs are explained consistently.

**Expected output and deadline:** Scope checklist, known limitations and explanation of accepted language.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Cedric integrates limitations; Paul verifies final UI findings.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Ralph — Regular Expression / NFA Designer (@rlken)

**Focus:** Proofread RE/NFA artifacts against final code; rehearse construction with one accepted and one rejected string.

**Before starting:** Frozen language and release candidate.

**Owned files or artifacts:** docs/automata/regular-expression.md; docs/automata/nfa.md; docs/presentation/re-nfa-notes.md

**Numbered tasks**
1. Compare final RE/NFA diagrams and tables with the exact release artifacts; remove stale drafts from the final report links.
2. Rehearse construction using one accepted and one rejected example without depending on slides alone.
3. Prepare answers about epsilon transitions, repetition and optional components.
4. Give Cedric the final RE/NFA section and editable diagrams by Day 3.

**Who to coordinate with and what to agree**
- Pamela: cross-review the NFA-to-DFA handoff.
- Paul: confirm example verdicts.
- Cedric: verify final image versions.
- Ranee: identify any remaining formal inconsistency.

**Expected output and deadline:** Final RE/NFA diagrams and defense walkthrough.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Pamela cross-reviews; Cedric replaces outdated diagrams.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Pamela — DFA Designer (@Qiuyuan26)

**Focus:** Verify final subset construction and state tables; rehearse determinization and accepting/sink-state explanations.

**Before starting:** Frozen automata artifacts.

**Owned files or artifacts:** docs/automata/dfa.md; docs/presentation/dfa-notes.md; docs/automata/diagrams/dfa.dot

**Numbered tasks**
1. Check each final DFA transition and accepting/sink state against the approved subset table.
2. Rehearse epsilon closure, subset creation and why a subset is accepting.
3. Prepare a clear explanation of one original-state-to-minimized-state mapping with Sean.
4. Submit the final DFA appendix and speaking notes by Day 3.

**Who to coordinate with and what to agree**
- Ralph: verify source NFA.
- Sean: verify minimization mapping.
- Jared: verify release model state IDs.
- Cedric: validate appendix references.
- Paul: confirm no unresolved transition discrepancy.

**Expected output and deadline:** Final DFA appendix and defense walkthrough.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Sean cross-reviews minimization mapping; Cedric checks report consistency.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Sean — Automata Optimizer / Frontend (@bonkbonkboomeykwkwkw)

**Focus:** Fix priority frontend defects; check mobile and keyboard use; rehearse UI and minimization explanations.

**Before starting:** Paul’s defect list; feature freeze.

**Owned files or artifacts:** frontend/src/features/validator/; frontend/src/style.css; docs/presentation/ui-minimization-notes.md

**Numbered tasks**
1. Fix only prioritized UI regressions; rerun component checks after each behavior change.
2. Verify keyboard and narrow-screen behavior with Isaiah and Paul, including long traces and error messages.
3. Capture final screenshots from the approved candidate, not development fixtures.
4. Rehearse both the UI walkthrough and the partition-refinement explanation.

**Who to coordinate with and what to agree**
- Paul: reproduce and retest fixes.
- Isaiah: approve final UX.
- Jared: verify API compatibility after fixes.
- Pamela: cross-review minimization explanation.
- Cedric: receive final screenshots by Day 3.

**Expected output and deadline:** Reviewed UI fixes, final screenshots and minimization demo.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Isaiah/Paul verify fixes; Ranee integrates.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Jared — Simulator Programmer / Backend (@AshenDary)

**Focus:** Fix backend defects; verify deployment configuration and error responses; rehearse simulator and API explanations.

**Before starting:** QA findings and chosen delivery environment.

**Owned files or artifacts:** backend/routes/validation.py; backend/services/validation.py; backend/automata/; docs/release/backend-configuration.md

**Numbered tasks**
1. Resolve engine/API defects with reproducing tests; do not silently change the grammar or schema during freeze.
2. Verify configuration, request limits and JSON errors in the chosen delivery environment.
3. Confirm that restart and clean setup load the same reviewed model and generate the same verdicts/traces.
4. Provide a short simulator/API walkthrough and deployment instructions by Day 3.

**Who to coordinate with and what to agree**
- Paul: retest defects and setup.
- Sean: verify response compatibility.
- Pamela/Sean: review any transition-data change.
- Ranee: coordinate environment configuration.
- Cedric: confirm technical explanation.

**Expected output and deadline:** Backend release candidate, configuration guide and simulator demo.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Paul verifies; Ranee coordinates release.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Paul — Tester / QA (@paulccampos)

**Focus:** Run final regression, browser and clean-setup checks; verify deployed flow if hosting is used; document residual defects.

**Before starting:** Frozen candidate and all priority fixes.

**Owned files or artifacts:** docs/qa/release-report.md; docs/qa/residual-defects.md; automated tests

**Numbered tasks**
1. Run the complete corpus and API/UI tests against the release candidate; record commit ID and commands.
2. Perform clean-clone setup, mobile/keyboard checks and target-environment smoke tests when hosted.
3. List residual issues by severity with reproducible evidence; give Ranee a go/no-go recommendation by Day 3.
4. Day 4: retest fixes and verify the final commit, rather than reusing results from an older candidate.

**Who to coordinate with and what to agree**
- Jared: backend fixes.
- Sean: frontend fixes.
- Isaiah: UX acceptance.
- Ranee: release decision.
- Cedric: copy exact verification results and limitations, not blanket claims.

**Expected output and deadline:** Release test report with pass/fail evidence by Day 3; retest fixes on Day 4.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Recommend go/no-go to Ranee based on unresolved defects.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Cedric — Documentation / Presentation (@cedricsigue)

**Focus:** Finalize report, slides and references; organize timed rehearsals with all members and capture a demo fallback.

**Before starting:** Final artifacts and test evidence.

**Owned files or artifacts:** docs/report/; docs/presentation/slides-outline.md; docs/presentation/demo-script.md; docs/release/submission-index.md

**Numbered tasks**
1. Finalize report and slide content using the reviewed evidence index; verify all names, state labels and screenshots.
2. Assign speaking order to all eight members and run a timed rehearsal on Day 4.
3. Prepare a local demo plus saved screenshots or video as fallback; record the final setup steps.
4. Deliver report, slides, references, demo script and fallback location to Ranee before Day 5 submission checks.

**Who to coordinate with and what to agree**
- Ralph/Pamela/Sean: approve theory sections.
- Jared: approve architecture/API section.
- Isaiah: approve scope and limitations.
- Paul: approve test claims.
- Ranee: approve package completeness; each member rehearses their own contribution.

**Expected output and deadline:** Final report/slides, speaking order, demo script and fallback materials by Day 4.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** All eight rehearse on Day 4; Ranee verifies package on Day 5.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

## Shared integration points
The language specification governs every model and test. Automata designers hand off state identifiers, transition tables and accepting states to Jared; Jared and Sean agree the JSON contract; Paul verifies the same examples independently; Cedric records only reviewed behavior. Ranee resolves cross-owner blockers.

## Phase completion checklist
- [ ] No unresolved critical defects; checks and clean setup pass.
- [ ] Final diagrams, code, report and slides describe the same language and automaton.
- [ ] All eight members can explain their contribution; demo fallback and submission package are ready.
- [ ] Required PRs are reviewed; tests and documentation are updated.
- [ ] The team demonstrates the output and records one retrospective improvement.

## File architecture for this phase
Follow docs/architecture.md. Paths marked planned are tasks to create, not claims that the implementation already exists. Use docs/api-contract.md for current and proposed response shapes.
