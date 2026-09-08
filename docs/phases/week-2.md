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

## Member assignments

### Ranee — Project Manager / Integration Lead (@seavens3nt)

**Tasks:** Track sequential automata handoffs daily; review small PRs; prevent scope growth and manage Sean’s dual workload.

**Expected output:** Merged/reviewed handoff evidence and updated blocker log.

**Dependency:** Week 1 exit criteria.

**Integration and review:** Resolve delayed RE/NFA/DFA handoffs before shifting work downstream.

### Isaiah — Language Analyst / UI/UX (@m1nay3on)

**Tasks:** Resolve rule questions promptly; review UI labels and prototype against Figma; maintain the approved specification.

**Expected output:** Clarification log and UI feedback with no silent grammar changes.

**Dependency:** Approved scope and draft UI.

**Integration and review:** Paul reviews any changed expected outcomes; Ranee approves scope changes.

### Ralph — Regular Expression / NFA Designer (@rlken)

**Tasks:** Finish the RE and construct the epsilon-NFA with start/final states and transition table.

**Expected output:** RE, NFA diagram/table and construction explanation by Day 2.

**Dependency:** Week 1 language specification.

**Integration and review:** Pamela reviews and receives the NFA on Day 2.

### Pamela — DFA Designer (@Qiuyuan26)

**Tasks:** Compute epsilon closures and subset states; produce a complete DFA with accepting and sink states.

**Expected output:** Subset-construction table and DFA diagram/table by Day 3.

**Dependency:** Ralph’s reviewed NFA.

**Integration and review:** Sean reviews and receives the DFA on Day 3.

### Sean — Automata Optimizer / Frontend (@bonkbonkboomeykwkwkw)

**Tasks:** Build only the React input/result shell on Days 1–2 using clearly labeled fixtures; minimize the DFA on Days 4–5.

**Expected output:** UI shell; partition-refinement steps, minimized table and equivalence argument by Day 5.

**Dependency:** Wireframes/API contract for UI; Pamela’s Day 3 DFA for minimization.

**Integration and review:** Pamela reviews minimization; Jared receives the reviewed transition data.

### Jared — Simulator Programmer / Backend (@AshenDary)

**Tasks:** Implement a table-driven simulator interface and Flask response plumbing using test automata; connect the approved URL DFA when available.

**Expected output:** Simulator unit tests and endpoint implementation draft; explicit fixture versus URL-model distinction.

**Dependency:** API contract; approved minimized table arrives at week end.

**Integration and review:** Paul reviews tests; Sean checks response compatibility.

### Paul — Tester / QA (@paulccampos)

**Tasks:** Review automata stages against the shared corpus; add closure, sink, out-of-alphabet and end-of-input test scenarios.

**Expected output:** Automata discrepancy log and expanded regression cases.

**Dependency:** Ralph/Pamela/Sean artifacts as they arrive.

**Integration and review:** Return counterexamples to the artifact owner; Jared receives test cases.

### Cedric — Documentation / Presentation (@cedricsigue)

**Tasks:** Write RE/NFA/DFA sections and export readable Graphviz diagrams; record state mappings and minimization explanation.

**Expected output:** Draft theory chapter with source diagrams and traceable artifact versions.

**Dependency:** Reviewed artifacts only; label drafts.

**Integration and review:** Each designer checks their section; Ranee reviews evidence.

## Shared integration points
The language specification governs every model and test. Automata designers hand off state identifiers, transition tables and accepting states to Jared; Jared and Sean agree the JSON contract; Paul verifies the same examples independently; Cedric records only reviewed behavior. Ranee resolves cross-owner blockers.

## Phase completion checklist
- [ ] RE/NFA/DFA/minimized DFA artifacts agree with the approved language.
- [ ] State mappings and minimization reasoning are documented and reviewed.
- [ ] UI and backend interfaces are ready; fixture behavior is clearly labeled.
- [ ] Required PRs are reviewed; tests and documentation are updated.
- [ ] The team demonstrates the output and records one retrospective improvement.
