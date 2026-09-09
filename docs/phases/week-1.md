# Phase 1 — Foundation and specification

**Sprint:** Week 1 of 4. Days mean planned workdays within the week; actual calendar dates are not set.

## Goal
Approve a small URL language and make every member ready to contribute.

## Phase meeting agenda
1. Review setup and scope blockers.
2. Backend members explain committed changes, model decisions, tests and blockers in detail. Frontend members show wireframes or working screens. QA and paper leads show evidence and missing inputs.
3. Confirm owners, acceptance criteria and within-week deadlines below.
4. Review shared interfaces and cross-area changes.
5. Agree the phase demonstration and exit checklist.

## Work sequence
- Day 1: kickoff, access and setup checks.
- Day 2: freeze the initial language scope.
- Days 3–4: RE draft, wireframes, API contract and test corpus.
- Day 5: demonstrate setup and review the foundation checklist.

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

## GitHub Desktop reminder for Week 1
Follow docs/github-desktop-guide.md: update main, create a branch such as phase-1/task-name, check changes, commit, publish, and open a PR into main. Link the task issue and request @seavens3nt. Push review fixes to the same branch. Technical peer review does not replace Ranee’s required approval.

## Member assignments and coordination

## Project Manager / Setup

### Ranee — Project Manager / Project Setup (@seavens3nt)

**Focus:** Prepare both frontend and backend so members can begin feature work; coordinate scope and onboarding.

**Before starting:** Existing starter and current repository configuration.

**Owned files or artifacts:** frontend/package.json; frontend/vite.config.js; backend/app.py; backend/requirements*.txt; docs/how-to-run.md; docs/github-desktop-guide.md; docs/release/onboarding.md; docs/roadmap.md

**Numbered tasks**
1. Day 1: verify React + Vite dependencies, the entry page and /api proxy. Start from the existing starter; fix setup gaps instead of recreating the project.
2. Day 1: verify the Python environment, Flask factory, route/service folders and health endpoint. Confirm frontend-to-backend communication with both servers running.
3. Give Sean and Isaiah the working frontend starting point and Jared the backend starting point. Agree dependency and shared-file changes before implementation.
4. Walk all eight members through GitHub Desktop cloning, creating a task branch, running both servers and opening a PR. Ask each to record setup evidence or a blocker on #1.
5. Confirm availability and calendar dates; chair the Day 2 URL scope review. Record scope decisions and review Week 1 PRs.
6. Ask Paul to independently follow the run guide. Help Cedric write the project/setup overview. Agree any backend support task with Jared before coding.

**Who to coordinate with and what to agree**
- Isaiah and Sean: verify frontend setup and component boundaries on Day 1.
- Jared: verify backend setup, API proxy and responsibility boundaries on Day 1.
- Paul: verify a fresh clone and report exact errors; Ranee resolves setup gaps.
- Cedric: collect the verified setup and architecture explanation.
- Ralph and Pamela: check formal-language feasibility before scope approval.

**Expected output and deadline:** Working starter and setup guide on Day 1; scope approval by Day 2; all-member onboarding evidence and calendar by Day 5.

**Handoff package:** Link the issue, PR, changed files, checks and any screenshots or worked examples. Record unresolved questions. The recipient confirms the package is usable before closure.

**Primary review and recipient:** Paul verifies onboarding; frontend and backend recipients accept the starter. Ranee gives final PR approval.

**Done when**
- [ ] Named artifacts and behavior are delivered.
- [ ] Coordination decisions and technical review are recorded.
- [ ] Relevant checks pass and documentation matches the deliverable.
- [ ] The recipient accepts the handoff and the PR is merged.

## Phase work for frontend

### Isaiah — Frontend Developer / UI/UX (@m1nay3on)

**Focus:** Specify schemes, alphabet, domain rules and supported optional URL parts; create Figma input, loading, accepted, rejected and error wireframes.

**Before starting:** Professor requirements and team scope decision.

**Owned files or artifacts:** docs/language-spec.md; docs/ui/wireframes.md

**Numbered tasks**
1. Write a component-by-component rule table for scheme, hostname, subdomains, port, path, query, fragment, case, whitespace and non-ASCII input; mark each supported or excluded.
2. Define the alphabet and state whether multi-character character-class labels are notation only; give accepted and rejected examples for each included rule.
3. Send the rule table to Ralph and Paul by Day 2; resolve every contradictory example before Ranee records approval.
4. Create Figma desktop/mobile wireframes and list input, submitting, accepted, rejected, empty, invalid-request and offline states. Add the Figma link and decisions to docs/ui/wireframes.md. Agree with Sean that Isaiah owns layout/CSS and Sean owns form/API behavior; record shared component interfaces before coding.

**Who to coordinate with and what to agree**
- Ranee: approve scope Day 2.
- Ralph: check regular-expression feasibility before scope approval.
- Paul: review expected labels, not just syntax.
- Sean: agree control labels, trace columns, keyboard order and responsive behavior by Day 4.
- Jared: agree which errors come from the API.

**Expected output and deadline:** Reviewed language specification by Day 2; wireframes by Day 4.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Ralph and Paul review rules; Sean reviews wireframes.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Sean — Frontend Developer — API Integration (@bonkbonkboomeykwkwkw)

**Focus:** Review wireframes; split React into input, result and trace components; agree JSON responses with Jared.

**Before starting:** Isaiah’s scope/wireframes; Jared’s API proposal.

**Owned files or artifacts:** docs/ui/component-plan.md; frontend/src/features/validator/; docs/api-contract.md (joint review)

**Numbered tasks**
1. Review Figma with Isaiah and list the React pieces: input form, submission state, verdict message and trace table.
2. Map each UI state to the API contract; no boolean verdict should be shown for a 400, 501 or unreachable backend.
3. Review api.js with Jared and agree accepted, rejected, invalid-request and not-implemented response examples.
4. Record component responsibilities and CSS breakpoints in docs/ui/component-plan.md; leave final UI implementation for the assigned weeks.

**Who to coordinate with and what to agree**
- Isaiah: confirm labels, layout and mobile behavior before coding.
- Jared: agree exact JSON keys and status handling by Day 4.
- Paul: agree accessible labels and test cases.
- Isaiah: agree layout/component file boundaries before either frontend member edits shared components.

**Expected output and deadline:** UI component plan and approved API response examples by Day 4.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Isaiah reviews UX; Jared reviews API usage.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

## Phase work for backend

### Ralph — Backend Developer — RE and NFA (@rlken)

**Focus:** Review whether the proposed language is regular and practical; draft the regular expression and explain each component.

**Before starting:** Isaiah’s Day 2 specification.

**Owned files or artifacts:** docs/automata/regular-expression.md

**Numbered tasks**
1. Read Isaiah’s component rules and flag any rule that depends on network state or unbounded non-regular relationships.
2. Draft the RE in named components; explain optional sections, repetition and concatenation without relying on a programming-library shortcut.
3. Walk at least two accepted and two rejected examples through the draft and record why each matches or fails.
4. Send the RE draft to Pamela and Paul by Day 4; resolve mismatches with Isaiah before Week 2.

**Who to coordinate with and what to agree**
- Isaiah: clarify alphabet, allowed repetitions and optional URL parts by Day 2.
- Pamela: agree explicit epsilon notation and RE component boundaries before NFA construction.
- Paul: use the shared expected outcomes rather than inventing a separate test list.

**Expected output and deadline:** Annotated RE draft and ambiguous-rule questions by Day 4.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Pamela reviews; prepare NFA work for Week 2.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Pamela — Backend Developer — DFA and Minimization (@Qiuyuan26)

**Focus:** Agree state naming, alphabet classes, accepting/sink conventions and transition-table format; review the RE draft.

**Before starting:** Language specification and Ralph’s RE draft.

**Owned files or artifacts:** docs/automata/notation.md; docs/automata/dfa.md (worksheet draft)

**Numbered tasks**
1. Specify naming for q-states, initial/accepting/sink states and epsilon transitions.
2. Define the transition-table schema and how character classes represent individual input symbols; state what happens outside the alphabet.
3. Create a subset-construction worksheet layout containing DFA state ID, NFA-state set, transitions and accepting flag.
4. Review Ralph’s RE draft against Isaiah’s rules and return ambiguous notation by Day 4.

**Who to coordinate with and what to agree**
- Ralph: agree NFA state naming before his construction.
- Ralph and Jared: review the original-to-minimized mapping format.
- Jared: agree machine-readable transition representation; distinguish proposed model shape from an implemented model.
- Paul: confirm sink/out-of-alphabet examples.

**Expected output and deadline:** Automata notation and table template by Day 4.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Share format with Ralph, Sean and Jared.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

### Jared — Backend Developer — Simulator and API (@AshenDary)

**Focus:** Finalize the request/result schema, trace positions and error cases; keep routes thin and plan a separate simulator module.

**Before starting:** Scope and frontend requirements.

**Owned files or artifacts:** docs/api-contract.md; backend/routes/validation.py; backend/services/validation.py; docs/automata/notation.md (joint review)

**Numbered tasks**
1. Document GET /api/health and POST /api/validate request and response examples, including malformed JSON, missing URL, over-limit input and unimplemented validation.
2. Propose final trace fields: zero-based position, symbol, from_state and to_state; agree final_state, message and accepted types with Sean.
3. Define the simulator input/output interface independently of Flask; agree how the model will carry initial state, accepting states, alphabet and transitions.
4. Record which fields are implemented now and which need Week 3 work; ask Paul to review boundary cases before finalizing the contract.

**Who to coordinate with and what to agree**
- Sean: sign off on all sample JSON before either side changes field names.
- Pamela and Ralph: agree model format and state naming.
- Paul: confirm error codes and trace assertions.
- Ranee: review unresolved interface decisions by Day 4.

**Expected output and deadline:** Reviewed API contract and simulator interface by Day 4.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Sean signs off on response fields; Paul checks error examples.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

## QA / Testing

### Paul — QA / Tester (@paulccampos)

**Focus:** Turn language rules into accepted/rejected and boundary examples; independently follow the run guide.

**Before starting:** Isaiah’s approved rules; no guessed expected outcomes.

**Owned files or artifacts:** tests/fixtures/url_cases.json; docs/qa/test-plan.md; docs/qa/onboarding-findings.md

**Numbered tasks**
1. Follow docs/how-to-run.md from a clean checkout and record confusing steps with actual error output.
2. Create tests/fixtures/url_cases.json with unique case ID, input string, expected acceptance and rule reference; labels stay provisional until Isaiah reviews them.
3. Include at least 10 accepted and 10 rejected cases and expand beyond this minimum to cover every rule and boundary.
4. Separate malformed HTTP requests from valid requests containing rejected URLs; record test plan and reviewers.

**Who to coordinate with and what to agree**
- Isaiah: approve each rule-to-case mapping.
- Ralph: review RE edge cases.
- Jared: agree HTTP errors versus language rejection.
- Sean: agree UI offline/loading cases.
- Ranee: report setup blockers on Day 1, not at week end.

**Expected output and deadline:** At least 20 reviewed cases, including at least 10 accepted and 10 rejected; onboarding findings.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Isaiah reviews labels; Jared uses cases in Week 2.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

## Paper & Presentation

### Cedric — Paper & Presentation Lead (@cedricsigue)

**Focus:** Create report outline, glossary and evidence folders; record scope/architecture decisions and meeting notes.

**Before starting:** Team decisions and existing context.

**Owned files or artifacts:** docs/report/outline.md; docs/report/evidence-index.md; docs/report/decisions.md

**Numbered tasks**
1. Create report sections for problem, language definition, RE, NFA, DFA, minimization, implementation, tests, limitations and references.
2. Record each approved decision with owner, reviewer and related issue/PR; do not copy example-project facts.
3. Create an evidence index naming the artifact, source path, owner and review status.
4. Ask each member for a short weekly explanation and retain the links in the report outline.

**Who to coordinate with and what to agree**
- Ranee: validate meeting decisions and scope.
- Isaiah: supply approved language rules.
- Ralph/Pamela: agree notation and diagram captions.
- Jared: verify architecture explanation.
- Paul: distinguish passed checks from planned tests.

**Expected output and deadline:** Report skeleton, reference list and Week 1 decision log.

**Handoff package:** Link the issue, PR and commit; list changed files; include the artifact/data schema, worked example or screenshot, checks actually run, and unresolved questions. The receiving reviewer confirms usability in the issue before the task is closed.

**Primary review and recipient:** Ranee reviews completeness; all members submit notes.

**Done when**
- [ ] Numbered tasks and named outputs are complete.
- [ ] Required coordination decisions are recorded in the issue or PR.
- [ ] The named reviewer checks the output and the recipient accepts the handoff.
- [ ] Relevant checks pass and the reviewed PR updates affected docs.

## Shared integration points
The language specification governs every model and test. Automata designers hand off state identifiers, transition tables and accepting states to Jared; Jared and Sean agree the JSON contract; Paul verifies the same examples independently; Cedric records only reviewed behavior. Ranee resolves cross-owner blockers.

## Phase completion checklist
- [ ] Each member can start both parts of the project.
- [ ] Language specification, API contract and wireframes are reviewed.
- [ ] Each language rule has labeled examples; no unresolved acceptance rule blocks NFA design.
- [ ] Required PRs are reviewed; tests and documentation are updated.
- [ ] The team demonstrates the output and records one retrospective improvement.

## File architecture for this phase
Follow docs/architecture.md. Frontend dependencies belong in frontend/package.json; backend dependencies in backend/requirements*.txt. Ranee owns setup for both, Isaiah owns layout/CSS, Sean owns interaction/API UI, Ralph owns RE/NFA, Pamela owns DFA/minimization, and Jared owns simulator/API implementation. Paths marked planned are tasks to create, not claims that the implementation already exists. Use docs/api-contract.md for current and proposed response shapes.
