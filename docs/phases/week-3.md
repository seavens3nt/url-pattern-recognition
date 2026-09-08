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

## Member assignments

### Ranee — Project Manager / Integration Lead (@seavens3nt)

**Tasks:** Coordinate integration PRs; choose the demo hosting approach and rehearse setup from a clean checkout.

**Expected output:** Integrated build candidate, environment plan and review log.

**Dependency:** Week 2 model handoff; no paid hosting commitment assumed.

**Integration and review:** Paul receives the candidate for release testing.

### Isaiah — Language Analyst / UI/UX (@m1nay3on)

**Tasks:** Review accepted/rejected explanations and keyboard/mobile flows; compare the implementation with wireframes and language rules.

**Expected output:** Prioritized UX and rule-conformance findings by Day 3.

**Dependency:** Working candidate and approved specification.

**Integration and review:** Sean fixes UI findings; Jared fixes response explanations.

### Ralph — Regular Expression / NFA Designer (@rlken)

**Tasks:** Trace selected accepted and rejected strings through the RE/NFA; investigate disagreements with the simulator.

**Expected output:** Worked examples and resolved theory discrepancies.

**Dependency:** Integrated simulator plus shared corpus.

**Integration and review:** Paul cross-checks examples; Cedric adds them to the report.

### Pamela — DFA Designer (@Qiuyuan26)

**Tasks:** Audit runtime state IDs and transitions against the DFA/minimized-state mapping; check sink and accepting behavior.

**Expected output:** State mapping audit and reviewed transition-data changes.

**Dependency:** Jared’s implemented model and Sean’s minimization artifacts.

**Integration and review:** Jared resolves engine mismatches; Sean confirms equivalence.

### Sean — Automata Optimizer / Frontend (@bonkbonkboomeykwkwkw)

**Tasks:** Connect React to the real endpoint; show verdict, rejection explanation and ordered transition table; handle loading and API failures.

**Expected output:** Responsive validator and trace UI by Day 3; component tests.

**Dependency:** Jared’s real API and Isaiah’s UX feedback.

**Integration and review:** Paul reviews browser behavior; Ranee reviews integration PR.

### Jared — Simulator Programmer / Backend (@AshenDary)

**Tasks:** Load the approved minimized DFA; implement real acceptance, final state and per-symbol trace; replace the 501 placeholder only when ready.

**Expected output:** Working validation API by Day 2 with passing corpus and contract tests.

**Dependency:** Reviewed minimized table and agreed API contract.

**Integration and review:** Sean integrates on Days 2–3; Paul independently verifies outputs.

### Paul — Tester / QA (@paulccampos)

**Tasks:** Run end-to-end accepted/rejected cases through UI and API; test invalid requests and unavailable backend; retest fixes.

**Expected output:** Integration test report and severity-ranked bug list by Day 4.

**Dependency:** Working API/UI candidate.

**Integration and review:** Assign defects to Sean/Jared or automata owner; Ranee prioritizes.

### Cedric — Documentation / Presentation (@cedricsigue)

**Tasks:** Write implementation and architecture sections; add actual screenshots and a draft demo script; verify the run guide.

**Expected output:** Code-aligned report draft and demo sequence.

**Dependency:** Integrated behavior and verified screenshots.

**Integration and review:** All owners review technical statements; Ranee checks reproducibility.

## Shared integration points
The language specification governs every model and test. Automata designers hand off state identifiers, transition tables and accepting states to Jared; Jared and Sean agree the JSON contract; Paul verifies the same examples independently; Cedric records only reviewed behavior. Ranee resolves cross-owner blockers.

## Phase completion checklist
- [ ] React → Flask → actual DFA → result and trace works for accepted and rejected examples.
- [ ] Trace rows represent actual transitions; no fabricated regex-based verdicts.
- [ ] Critical integration defects are resolved and report draft matches the candidate.
- [ ] Required PRs are reviewed; tests and documentation are updated.
- [ ] The team demonstrates the output and records one retrospective improvement.
