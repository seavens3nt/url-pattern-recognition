# Phase 4 — Independent release and defense packages

**Dates:** September 26–28, 2026. Submit on September 29.

**Sprint goal:** verify the frozen candidate, correct only release blockers, and prepare the final academic package.

**Activation rule:** Ranee records the frozen release-candidate commit before opening Phase 4 issues. Only Ranee approves PRs and decides whether a reported defect is release-blocking.

The independent workflow and issue structure are defined in [Independent work-package template](../work-package-template.md).

## Work packages

### Ranee — release control and submission

**Owned paths:** `docs/release/`, `docs/status.md`, `.github/workflows/checks.yml`, release tag and submission records.

**Expected outputs:** frozen commit; blocker decisions; release checklist; clean-run record; rehearsal schedule; final tag and submission evidence.

### Isaiah — final visual verification

**Owned paths:** `frontend/src/style.css`, `frontend/src/ui/`, `docs/ui/accessibility-checklist.md`.

**Expected outputs:** mobile/desktop and keyboard checks; assigned visual blocker fixes; final screenshots; scope/limitations explanation.

**Do not touch:** `backend/`, validator logic, automata files, or backend tests.

### Sean — final frontend verification

**Owned paths:** `frontend/src/features/validator/` and its feature tests.

**Expected outputs:** assigned frontend blocker fixes; component regression results; final input-to-verdict/error demo notes.

**Do not touch:** `backend/`, formal automata, global CSS, or QA-owned tests.

### Ralph — RE/NFA defense package

**Owned paths:** `docs/automata/regular-expression.md`, `docs/automata/nfa.md`, `docs/automata/diagrams/nfa.dot`, `docs/presentation/re-nfa-notes.md`.

**Expected outputs:** release-aligned appendix; two accepted/two rejected walkthroughs; editable final diagram; rehearsed explanation notes.

**Do not touch:** DFA/model, backend, frontend, or QA files.

### Pamela — DFA/minimization defense package

**Owned paths:** DFA/minimization documents and diagrams, `backend/automata/url_dfa.json`, `docs/presentation/dfa-notes.md`.

**Expected outputs:** release-aligned tables/mapping; editable final diagrams; determinization/minimization explanation notes.

**Do not touch:** simulator/API code, frontend, or QA tests.

### Jared — backend release verification

**Owned paths:** `backend/`, `tests/test_api.py`, `tests/test_simulator.py`.

**Expected outputs:** assigned backend blocker fixes with reproducing tests; restart/model validation; backend demo notes.

**Do not touch:** `frontend/`, formal documents, shared fixture expectations, or QA reports.

### Paul — final QA report

**Owned paths:** QA-owned tests, `tests/fixtures/`, `docs/qa/release-report.md`.

**Expected outputs:** full regression on the exact frozen commit; clean-clone, mobile/keyboard, and delivery-environment evidence; residual-risk list; retest results.

**Do not touch:** implementation or formal-model files. Report defects for Ranee to assign.

### Cedric — final paper, slides, and fallback

**Owned artifacts:** final paper, references, contribution matrix, demo/presentation outline and submission-copy checklist in the existing Google Doc; final slides and exports linked from `docs/report/evidence-index.md`, Cedric's only GitHub report file.

**Expected outputs:** final report and references; slides; speaking order; timed demo; local fallback; evidence package.

**Do not touch:** application code, formal source artifacts, or tests.

## Independent release rule

Each owner checks the frozen commit and works only on an assigned package. A member does not wait for another member's approval. If a blocker crosses an ownership boundary, the member reports it in their own issue; Ranee creates or assigns the corrective task.

## Phase 4 completion

- [ ] Full corpus, API, UI, and clean-setup checks pass on the frozen commit.
- [ ] Residual defects and limitations are documented accurately.
- [ ] Formal diagrams/tables match runtime state IDs.
- [ ] The run guide works from a clean clone.
- [ ] Report, slides, references, demo, and fallback are complete.
- [ ] Every member can explain their own contribution.
- [ ] Ranee approves, tags, and records the submitted release.

## Final consolidated timeline

All dates use Asia/Manila time. Phase gates close at 11:59 PM unless the course
portal has an earlier cutoff.

- **September 20:** Phase 2 PRs/evidence due and gate decision recorded.
- **September 21–24:** Phase 3 integration and correction window.
- **September 25:** feature-freeze commit recorded; Cedric's carried Issue #13
  accepted or recorded as a final-release blocker.
- **September 26–27:** final QA, clean run, paper, slides, demo, and fallback.
- **September 28:** release candidate tagged and full timed rehearsal completed.
- **September 29:** upload and verification only; submission receipt saved.
