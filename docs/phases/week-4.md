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

## Member assignments

### Ranee — Project Manager / Integration Lead (@seavens3nt)

**Tasks:** Freeze features; coordinate release fixes, deployment or approved local delivery; tag reviewed release and verify submission materials.

**Expected output:** Release checklist, tagged commit and submission package by Day 5.

**Dependency:** QA evidence and professor delivery requirements.

**Integration and review:** Team reviews package; no release while critical defects remain.

### Isaiah — Language Analyst / UI/UX (@m1nay3on)

**Tasks:** Perform final scope/UX review and document limitations; prepare the language-definition portion of the defense.

**Expected output:** Scope checklist, known limitations and explanation of accepted language.

**Dependency:** Release candidate.

**Integration and review:** Cedric integrates limitations; Paul verifies final UI findings.

### Ralph — Regular Expression / NFA Designer (@rlken)

**Tasks:** Proofread RE/NFA artifacts against final code; rehearse construction with one accepted and one rejected string.

**Expected output:** Final RE/NFA diagrams and defense walkthrough.

**Dependency:** Frozen language and release candidate.

**Integration and review:** Pamela cross-reviews; Cedric replaces outdated diagrams.

### Pamela — DFA Designer (@Qiuyuan26)

**Tasks:** Verify final subset construction and state tables; rehearse determinization and accepting/sink-state explanations.

**Expected output:** Final DFA appendix and defense walkthrough.

**Dependency:** Frozen automata artifacts.

**Integration and review:** Sean cross-reviews minimization mapping; Cedric checks report consistency.

### Sean — Automata Optimizer / Frontend (@bonkbonkboomeykwkwkw)

**Tasks:** Fix priority frontend defects; check mobile and keyboard use; rehearse UI and minimization explanations.

**Expected output:** Reviewed UI fixes, final screenshots and minimization demo.

**Dependency:** Paul’s defect list; feature freeze.

**Integration and review:** Isaiah/Paul verify fixes; Ranee integrates.

### Jared — Simulator Programmer / Backend (@AshenDary)

**Tasks:** Fix backend defects; verify deployment configuration and error responses; rehearse simulator and API explanations.

**Expected output:** Backend release candidate, configuration guide and simulator demo.

**Dependency:** QA findings and chosen delivery environment.

**Integration and review:** Paul verifies; Ranee coordinates release.

### Paul — Tester / QA (@paulccampos)

**Tasks:** Run final regression, browser and clean-setup checks; verify deployed flow if hosting is used; document residual defects.

**Expected output:** Release test report with pass/fail evidence by Day 3; retest fixes on Day 4.

**Dependency:** Frozen candidate and all priority fixes.

**Integration and review:** Recommend go/no-go to Ranee based on unresolved defects.

### Cedric — Documentation / Presentation (@cedricsigue)

**Tasks:** Finalize report, slides and references; organize timed rehearsals with all members and capture a demo fallback.

**Expected output:** Final report/slides, speaking order, demo script and fallback materials by Day 4.

**Dependency:** Final artifacts and test evidence.

**Integration and review:** All eight rehearse on Day 4; Ranee verifies package on Day 5.

## Shared integration points
The language specification governs every model and test. Automata designers hand off state identifiers, transition tables and accepting states to Jared; Jared and Sean agree the JSON contract; Paul verifies the same examples independently; Cedric records only reviewed behavior. Ranee resolves cross-owner blockers.

## Phase completion checklist
- [ ] No unresolved critical defects; checks and clean setup pass.
- [ ] Final diagrams, code, report and slides describe the same language and automaton.
- [ ] All eight members can explain their contribution; demo fallback and submission package are ready.
- [ ] Required PRs are reviewed; tests and documentation are updated.
- [ ] The team demonstrates the output and records one retrospective improvement.
