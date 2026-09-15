# Phase 3 — Independent integration packages

**Dates:** September 21–25, 2026

**Sprint goal:** integrate the locked Phase 2 outputs while each member remains inside one owned area.

**Activation rule:** Ranee records the exact Phase 2 model, API, UI-state, and fixture commits before opening Phase 3 issues. Members start immediately when their listed inputs exist on `main`.

The independent workflow and issue structure are defined in [Independent work-package template](../work-package-template.md). Only Ranee approves PRs.

## Locked inputs

- `backend/automata/url_dfa.json`
- `docs/api-contract.md`
- `docs/language-spec.md`
- `docs/ui/wireframes.md`
- `tests/fixtures/url_cases.json`

## Work packages

### Ranee — integration and feature freeze

**Owned paths:** `docs/status.md`, `docs/release/integration-gate.md`, GitHub Phase 3 issues.

**Expected outputs:** locked commit list; independently owned issues; merged-PR record; blocker decisions; feature-freeze and Phase 4 activation decision.

### Jared — backend integration

**Owned paths:** `backend/`, `tests/test_api.py`, `tests/test_simulator.py`.

**Expected outputs:** validated model loading; complete-input traversal; accurate verdict/final-state/trace responses; backend regression tests.

**Do not touch:** `frontend/`, `docs/automata/*.md`, Figma/UI documents, or QA reports.

**Verify:** Ruff and pytest pass; all fixture cases produce the expected API verdict; traces use the locked model.

### Sean — frontend integration

**Owned paths:** `frontend/src/features/validator/` and its feature tests.

**Expected outputs:** real API submission; complete loading/verdict/error rendering; final-state and trace display; retry and component tests.

**Do not touch:** `backend/`, automata files, API/language contracts, global CSS, or QA-owned tests.

**Verify:** frontend tests, ESLint, and production build pass for accepted, rejected, invalid-request, and offline flows.

### Isaiah — responsive and accessible presentation

**Owned paths:** `frontend/src/style.css`, `frontend/src/ui/`, `docs/ui/accessibility-checklist.md`.

**Expected outputs:** desktop/mobile layout; all state appearances; keyboard focus; accessible labels/contrast evidence; screenshots.

**Do not touch:** `backend/`, validator request/state logic, automata files, or tests owned by other packages.

**Verify:** ESLint/build pass; keyboard and responsive inspection evidence is attached.

### Ralph — NFA trace audit

**Owned paths:** `docs/qa/nfa-trace-audit.md`, `docs/automata/diagrams/nfa.dot` only when a correction is assigned by Ranee.

**Expected outputs:** selected fixture traces through the RE/NFA; exact mismatch records; corrected NFA source only when required.

**Do not touch:** DFA/model, backend, frontend, or QA test files.

### Pamela — DFA model audit

**Owned paths:** `docs/qa/dfa-model-audit.md`, DFA/minimization artifacts only when a correction is assigned by Ranee.

**Expected outputs:** state-ID, accepting/sink, transition, and minimized-mapping comparison against `url_dfa.json`; exact mismatch records.

**Do not touch:** backend loader/simulator, frontend, or QA test files.

### Paul — end-to-end verification

**Owned paths:** `tests/fixtures/`, QA-owned regression tests, `docs/qa/phase-3-report.md`.

**Expected outputs:** simulator/API/UI result matrix; malformed/limit/offline/retry coverage; defect reports; retest evidence.

**Do not touch:** implementation or formal-model files. Ranee assigns fixes to the owning package.

### Cedric — implementation chapter and demo draft

**Owned paths:** `docs/report/implementation.md`, `docs/presentation/demo-script.md`, `docs/report/evidence-index.md`.

**Expected outputs:** code-aligned architecture explanation; verified screenshots; evidence links; timed demo sequence using actual behavior.

**Do not touch:** application code, formal artifacts, or tests.

## Parallel-progress rule

Ralph, Pamela, Paul, and Cedric can begin their audits/evidence work from the locked files while Jared, Sean, and Isaiah work in their own areas. Nobody waits for a personal review. When a required new commit reaches `main`, the affected owner pulls it and continues.

## Phase 3 completion

- [ ] Runtime model matches the locked minimized DFA.
- [ ] React displays real API verdicts, final states, and traces.
- [ ] Rejection, malformed request, and connection failure remain distinct.
- [ ] The shared corpus agrees across simulator, API, and UI.
- [ ] Critical defects are fixed in their owning packages and retested.
- [ ] Evidence and demo documents describe the actual candidate.
- [ ] Ranee records feature freeze and Phase 4 activation.
