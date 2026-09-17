# Phase 2 — Independent construction packages

**Dates:** September 17–20, 2026

**Sprint goal:** complete the formal automata and independently owned frontend, backend, QA, and paper packages needed for integration.

**Activation rule:** Ranee locks the Phase 2 input files and opens one self-contained issue per member. Phase 1 records and issues are not rewritten by this workflow.

**Activation decision:** Active from September 17, 2026. Inputs are locked at
commit `770b761`. Cedric's Phase 1 [Issue #13](https://github.com/seavens3nt/url-pattern-recognition/issues/13)
remains open as a carried documentation condition and does not block other packages.

## How members work

- Start immediately when every authoritative input for the package is already on `main`.
- Work only in the owned paths listed below. Frontend owners must not edit `backend/`; backend owners must not edit `frontend/`.
- Pull `main`, create one task branch, complete the package, run its checks, and open one PR.
- Do not request another member's approval. Only Ranee reviews and approves PRs.
- If an input is missing or contradictory, comment on the owner's issue. Ranee decides and updates the locked input.
- A later package uses merged files from `main`; its owner does not need a personal handoff or approval from the earlier owner.

The required issue shape and PR checklist are in [Independent work-package template](../work-package-template.md).

## Locked inputs

- `docs/language-spec.md`
- `docs/automata/regular-expression.md`
- `docs/automata/notation.md` after its Phase 1 PR is accepted
- `docs/api-contract.md`
- `docs/ui/wireframes.md`
- `tests/fixtures/url_cases.json`

Only Ranee may approve a change to these inputs during the phase.

## Required check before opening a PR

Every member must complete this checklist inside the PR description:

- Pull the latest `main` before starting and again before the final test run.
- Run `git diff --name-only origin/main...HEAD` and confirm that every changed
  path belongs to the issue's owned files. Frontend packages must not change
  `backend/`; backend packages must not change `frontend/`.
- Run the package-specific tests and `git diff --check`.
- Attach the issue's required evidence, such as diagrams, screenshots, test
  output, or worked traces.
- Explain the result, list the checks run, and include `Refs #<issue-number>`.
- Leave the PR unmerged for Ranee's review. No peer approval or personal handoff
  is required.

If a requirement is missing or contradictory, stop only the affected part and
comment on the issue. Continue every task in the package that is still possible.

## GitHub issue map

- [Tracker — Issue #34](https://github.com/seavens3nt/url-pattern-recognition/issues/34)
- [Ranee — Issue #35](https://github.com/seavens3nt/url-pattern-recognition/issues/35)
- [Ralph — Issue #36](https://github.com/seavens3nt/url-pattern-recognition/issues/36)
- [Pamela — Issue #37](https://github.com/seavens3nt/url-pattern-recognition/issues/37)
- [Jared — Issue #38](https://github.com/seavens3nt/url-pattern-recognition/issues/38)
- [Isaiah — Issue #39](https://github.com/seavens3nt/url-pattern-recognition/issues/39)
- [Sean — Issue #40](https://github.com/seavens3nt/url-pattern-recognition/issues/40)
- [Paul — Issue #41](https://github.com/seavens3nt/url-pattern-recognition/issues/41)
- [Cedric — Issue #42](https://github.com/seavens3nt/url-pattern-recognition/issues/42)

Cedric's [Phase 1 Issue #13](https://github.com/seavens3nt/url-pattern-recognition/issues/13)
remains a separate open condition. Completing Issue #42 does not automatically
close Issue #13.

## Independent work packages

### Ranee — phase control

**Owned paths:** `docs/status.md`, `docs/roadmap.md`, `docs/release/`, GitHub Phase 2 issues.

**Tasks and expected outputs:**

- Lock the Phase 2 input files and record their commit.
- Open one issue per member with exact owned paths and checks.
- Review and merge PRs; record blockers and scope decisions.
- Record the Phase 3 go/no-go decision.

**Verify:** every active issue follows the work-package template; no two packages own the same editable file; all merged PR checks pass.

### Ralph — RE and NFA

**Start:** immediately after Phase 2 opens; the approved language, RE, notation, and fixture are sufficient.

**Owned paths:**

```text
docs/automata/regular-expression.md
docs/automata/nfa.md
docs/automata/diagrams/nfa.dot
```

**Tasks and expected outputs:**

- Finalize the named RE without expanding the approved language.
- Construct the epsilon-NFA with numbered states, start/accepting states, and transitions.
- Add a complete transition table and editable Graphviz source.
- Trace at least two accepted and two rejected fixture cases.

**Boundary:** do not edit `frontend/`, `backend/`, Pamela's DFA/minimization files, or QA fixtures.

**Verify:** render the diagram, check every transition against the RE, run `git diff --check`, and confirm all worked cases use the shared fixture.

### Pamela — DFA and minimization

**Start:** prepare the symbol partition, worksheet structure, and model schema immediately. Fill the final NFA-state sets as soon as `docs/automata/nfa.md` appears on `main`; no approval or message from Ralph is required.

**Owned paths:**

```text
docs/automata/notation.md
docs/automata/dfa.md
docs/automata/minimization.md
docs/automata/diagrams/dfa.dot
docs/automata/diagrams/minimized-dfa.dot
backend/automata/url_dfa.json
```

**Tasks and expected outputs:**

- Calculate epsilon closures and every reachable subset.
- Build a complete DFA with a sink state and disjoint symbol columns.
- Minimize the DFA and record every partition refinement.
- Map DFA states to minimized states.
- Produce editable diagrams and the machine-readable model.

**Boundary:** do not edit Flask routes/services, simulator code, React files, Ralph's NFA, or QA tests.

**Verify:** every DFA row is total and deterministic; accepting sets contain an NFA accepting state; minimized transitions preserve the language; JSON parses; `git diff --check` passes.

### Jared — simulator and API

**Start:** implement request validation, model validation, simulator interfaces, and tests immediately from the locked API contract. Connect the final JSON model when it appears on `main`; no approval or message from Pamela is required.

**Owned paths:**

```text
backend/app.py
backend/routes/
backend/services/
backend/automata/model.py
backend/automata/simulator.py
tests/test_api.py
tests/test_simulator.py
```

**Tasks and expected outputs:**

- Validate and load the machine-readable DFA.
- Consume the complete input with deterministic transitions and sink behavior.
- Return `accepted`, `message`, `final_state`, and ordered `trace` fields.
- Keep HTTP rejection separate from malformed requests.
- Add backend unit and API tests.

**Boundary:** do not edit `frontend/`, formal construction documents, Figma/wireframe files, or the shared fixture expectations.

**Verify:** run Ruff and pytest; all 20 shared cases pass; malformed-body and size-limit tests pass; the backend never fetches submitted URLs.

### Isaiah — visual interface

**Start:** immediately from the locked Figma handoff and UI-state document.

**Owned paths:**

```text
frontend/src/style.css
frontend/src/ui/
docs/ui/accessibility-checklist.md
```

**Tasks and expected outputs:**

- Implement the visual system and responsive desktop/mobile layout.
- Style idle, loading, accepted, rejected, invalid-request, and offline states.
- Add visible keyboard focus, readable labels, and accessible contrast notes.
- Record the final visual/accessibility checklist.

**Boundary:** do not edit `backend/`, API helpers, validator state logic, automata files, or backend tests.

**Verify:** run ESLint and the production build; inspect desktop/mobile layouts and keyboard focus; attach screenshots to the PR.

### Sean — frontend interaction

**Start:** immediately from the locked API contract and UI-state document. Use simple existing markup until Isaiah's optional presentational components appear on `main`; do not wait for them.

**Owned paths:**

```text
frontend/src/features/validator/ValidatorPage.jsx
frontend/src/features/validator/api.js
frontend/src/features/validator/ValidatorPage.test.jsx
```

**Tasks and expected outputs:**

- Implement one URL input and request submission.
- Render loading, accepted, rejected, invalid-request, offline, and unexpected-response states.
- Display `message`, `final_state`, and the ordered transition table.
- Prevent duplicate submission and support retry.
- Add component tests for every interface state.

**Boundary:** do not edit `backend/`, the approved language/API documents, automata files, global CSS, or QA-owned tests.

**Verify:** run frontend tests, ESLint, and the production build; use mocked responses for every state; confirm React never opens the submitted URL.

### Paul — QA corpus and independent verification

**Start:** immediately from the locked language, API contract, and shared fixture. Add later model/API/UI results when those PRs reach `main`; do not wait to prepare the cases.

**Owned paths:**

```text
tests/fixtures/url_cases.json
tests/test_language_cases.py
frontend/src/App.test.jsx
docs/qa/phase-2-report.md
```

**Tasks and expected outputs:**

- Verify the 10 accepted and 10 rejected expectations against the locked rules.
- Add boundary cases without changing approved results.
- Run formal, backend, and frontend checks available on `main`.
- Record defects with reproduction steps and actual/expected results.
- Produce a Phase 2 QA report.

**Boundary:** do not fix frontend, backend, or automata implementation files. Report defects in the responsible issue for Ranee to assign.

**Verify:** every case has an ID, rule, expected result, actual result, and evidence; all commands and commit IDs are recorded.

### Cedric — theory chapter

**Start:** immediately from the locked language, RE, notation, architecture, and existing evidence. Insert final NFA/DFA figures only after they appear on `main`; do not wait to draft the stable sections.

**Owned paths:**

```text
docs/report/evidence-index.md
```

**Tasks and expected outputs:**

- In the existing report Google Doc, explain the RE-to-NFA, subset-construction, and minimization methods; keep references in the same document.
- Insert merged tables/diagrams with captions and source links.
- Maintain references and the evidence index.
- Attribute each technical artifact to its owner.

**Boundary:** do not edit application code, automata source artifacts, tests, or another member's explanation.

**Verify:** every claim points to a merged artifact or test result; terminology matches the locked notation; no unfinished result is described as complete.

## Phase 2 completion

- [ ] Every package has one owner, non-overlapping paths, expected outputs, and checks.
- [ ] RE/NFA, DFA/minimization, simulator/API, visual, interaction, QA, and evidence-index PRs are merged; Ranee accepts the Google Docs theory sections.
- [ ] No frontend PR edits backend files and no backend PR edits frontend files.
- [ ] All automated checks pass on `main`.
- [ ] Ranee records the Phase 3 activation decision.
