# Phase 1 — Foundation and specification

**Sprint:** Week 1 of 4. Days mean planned workdays within the week; actual calendar dates are not set.

## Goal
Approve a small URL language and make every member ready to contribute.

## Phase meeting agenda
1. Review the previous handoff and blockers (Week 1: check setup and scope).
2. Each member explains their changes, evidence and next task.
3. Confirm owners, acceptance criteria and within-week deadlines below.
4. Review shared interfaces and cross-area changes.
5. Agree the phase demonstration and exit checklist.

## Work sequence
- Day 1: kickoff, access and setup checks.
- Day 2: freeze the initial language scope.
- Days 3–4: RE draft, wireframes, API contract and test corpus.
- Day 5: demonstrate setup and review the foundation checklist.

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

**Tasks:** Confirm deadline and weekly availability; verify all eight members can run the starter; split tasks and resolve scope questions.

**Expected output:** Onboarding checklist, four-week calendar, issue owners and approval record.

**Dependency:** Existing starter; each member reports setup result.

**Integration and review:** Review Isaiah’s scope with the team; unblock access on Day 1.

### Isaiah — Language Analyst / UI/UX (@m1nay3on)

**Tasks:** Specify schemes, alphabet, domain rules and supported optional URL parts; create Figma input, loading, accepted, rejected and error wireframes.

**Expected output:** Reviewed language specification by Day 2; wireframes by Day 4.

**Dependency:** Professor requirements and team scope decision.

**Integration and review:** Ralph and Paul review rules; Sean reviews wireframes.

### Ralph — Regular Expression / NFA Designer (@rlken)

**Tasks:** Review whether the proposed language is regular and practical; draft the regular expression and explain each component.

**Expected output:** Annotated RE draft and ambiguous-rule questions by Day 4.

**Dependency:** Isaiah’s Day 2 specification.

**Integration and review:** Pamela reviews; prepare NFA work for Week 2.

### Pamela — DFA Designer (@Qiuyuan26)

**Tasks:** Agree state naming, alphabet classes, accepting/sink conventions and transition-table format; review the RE draft.

**Expected output:** Automata notation and table template by Day 4.

**Dependency:** Language specification and Ralph’s RE draft.

**Integration and review:** Share format with Ralph, Sean and Jared.

### Sean — Automata Optimizer / Frontend (@bonkbonkboomeykwkwkw)

**Tasks:** Review wireframes; split React into input, result and trace components; agree JSON responses with Jared.

**Expected output:** UI component plan and approved API response examples by Day 4.

**Dependency:** Isaiah’s scope/wireframes; Jared’s API proposal.

**Integration and review:** Isaiah reviews UX; Jared reviews API usage.

### Jared — Simulator Programmer / Backend (@AshenDary)

**Tasks:** Finalize the request/result schema, trace positions and error cases; keep routes thin and plan a separate simulator module.

**Expected output:** Reviewed API contract and simulator interface by Day 4.

**Dependency:** Scope and frontend requirements.

**Integration and review:** Sean signs off on response fields; Paul checks error examples.

### Paul — Tester / QA (@paulccampos)

**Tasks:** Turn language rules into accepted/rejected and boundary examples; independently follow the run guide.

**Expected output:** At least 20 reviewed cases, including at least 10 accepted and 10 rejected; onboarding findings.

**Dependency:** Isaiah’s approved rules; no guessed expected outcomes.

**Integration and review:** Isaiah reviews labels; Jared uses cases in Week 2.

### Cedric — Documentation / Presentation (@cedricsigue)

**Tasks:** Create report outline, glossary and evidence folders; record scope/architecture decisions and meeting notes.

**Expected output:** Report skeleton, reference list and Week 1 decision log.

**Dependency:** Team decisions and existing context.

**Integration and review:** Ranee reviews completeness; all members submit notes.

## Shared integration points
The language specification governs every model and test. Automata designers hand off state identifiers, transition tables and accepting states to Jared; Jared and Sean agree the JSON contract; Paul verifies the same examples independently; Cedric records only reviewed behavior. Ranee resolves cross-owner blockers.

## Phase completion checklist
- [ ] Each member can start both parts of the project.
- [ ] Language specification, API contract and wireframes are reviewed.
- [ ] Each language rule has labeled examples; no unresolved acceptance rule blocks NFA design.
- [ ] Required PRs are reviewed; tests and documentation are updated.
- [ ] The team demonstrates the output and records one retrospective improvement.
