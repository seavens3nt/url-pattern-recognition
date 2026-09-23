# Phase 3 — Audit, correction and release candidate

**Dates:** September 23–25, 2026
**Sprint goal:** audit the integrated Phase 2 candidate, fix only verified
defects, complete deployment/report evidence, and freeze a release candidate.

Phase 3 does not repeat Phase 2 implementation. Each member receives one
independent package and works from the locked files on `main`. A member changes
an implementation file only when their audit exposes a reproducible defect in
their owned area. Only Ranee accepts PRs and changes scope.

## Activation inputs

- Phase 2 integration gate and screenshots in `docs/release/`
- `backend/automata/url_dfa.json`
- `docs/automata/{nfa,dfa,minimization}.md`
- `docs/api-contract.md` and `docs/language-spec.md`
- `tests/fixtures/url_cases.json`
- integrated React application under `frontend/src/`
- `docs/report/evidence-index.md`

The locked candidate commit will be recorded in `docs/status.md` after the
Phase 2 closure PR is merged. Members pull that `main` before beginning.

## Ranee — integration, deployment and feature freeze

**Owned files:** `scripts/`, `.github/workflows/checks.yml`, `compose.yaml`,
`deployment/`, `docs/status.md`, `docs/release/`, and Phase 3 GitHub issues.

**Required output:**

- Run the complete checker and API smoke test on the locked candidate.
- Start Docker Desktop when available, validate the Compose configuration, and
  record a port-8080 accepted/rejected browser run.
- Measure production bundle sizes and record startup/first-response evidence.
- Triage defects to the owning package without expanding features.
- Record the feature-freeze commit and Phase 4 decision.

**Done when:** CI is green, critical defects are closed, deployment evidence is
linked, and `docs/status.md` names the frozen commit.

## Ralph — NFA trace audit

**Owned files:** `docs/qa/nfa-trace-audit.md`; change
`docs/automata/nfa.md` or `docs/automata/diagrams/nfa.dot` only for an assigned
correction.

**Required output:**

- Independently trace two accepted and two rejected shared-fixture IDs.
- Compare every consumed symbol, epsilon closure and final outcome with the
  documented NFA.
- List exact state/transition mismatches or state `No mismatch found`.
- Render the DOT source only if it changes.

**Done when:** the audit names fixture IDs, expected/actual paths, commands and
the tested commit. Ralph does not edit DFA, runtime, frontend or QA tests.

## Pamela — minimized-DFA/model audit

**Owned files:** `docs/qa/dfa-model-audit.md`; change DFA/minimization/model
files only for a defect assigned by Ranee.

**Required output:**

- Compare documented states, start/accepting/sink sets, symbol partition and
  every transition with `backend/automata/url_dfa.json`.
- Check the original-to-minimized mapping and total-transition property.
- Trace two accepted and two rejected shared-fixture IDs through the model.
- List exact mismatches or state `No mismatch found`.

**Done when:** the audit is reproducible from the locked commit and does not
modify simulator, API, frontend or another member's audit.

## Jared — backend security and contract audit

**Owned files:** `backend/`, `tests/test_api.py`, and
`tests/test_simulator.py` only.

**Required output:**

- Recheck model-schema rejection, total traversal, sink continuation, request
  type/size limits, response schema and the no-network guarantee.
- Add regression tests only for missing backend coverage.
- Fix only reproducible backend defects and retain the locked API contract.
- Record Ruff and targeted/full pytest results in the PR.

**Done when:** all shared cases agree with the API and simulator, security
boundaries pass, and no frontend/formal-document file changes appear.

## Isaiah — responsive and accessibility audit

**Owned files:** `frontend/src/ui/`, `frontend/src/style.css`, and
`docs/ui/accessibility-checklist.md`.

**Required output:**

- Inspect Home, Recognizer, How It Works and About Us at desktop and narrow
  widths, including the hamburger menu and scrollable trace.
- Verify keyboard order, visible focus, labels, live status/error semantics,
  color contrast and reduced-motion behavior.
- Optimize oversized presentation assets without changing team content.
- Attach before/after evidence only when a correction is required.

**Done when:** the checklist identifies every tested viewport and interaction,
ESLint/build pass, and no API/state/backend files change.

## Sean — frontend behavior and performance audit

**Owned files:** `frontend/src/features/validator/` and its feature tests.

**Required output:**

- Recheck accepted, rejected, malformed, oversized, offline, timeout,
  unexpected-response, retry, duplicate-submit and unmount behavior.
- Verify environment-configurable API routing for development and deployment.
- Add regression tests only for uncovered behavior and fix verified defects.
- Record Vitest, ESLint and production-build output.

**Done when:** API behavior remains consistent through Isaiah's components and
no backend/global-style/formal-document files change.

## Paul — end-to-end release verification

**Owned files:** QA-owned tests, `tests/fixtures/`, and
`docs/qa/phase-3-report.md`.

**Required output:**

- Run the full corpus through simulator and API, then sample accepted/rejected
  cases in the browser.
- Verify malformed/oversized/offline/retry behavior and all four routes.
- Record each defect with reproduction, expected/actual result, owner and
  retest status; do not repair implementation files.
- Record the final test counts and tested commit.

**Done when:** the report contains a cross-layer result matrix, every critical
defect is retested, and the candidate commit is explicit.

## Cedric — integrated paper and demo package

**Owned artifacts:** the accepted shared Google Doc and
`docs/report/evidence-index.md`.

**Required output:**

- Synchronize the NFA, subset construction, DFA, minimization, architecture,
  implementation, validation/security and test-result sections from linked
  repository evidence.
- Insert the accepted desktop/mobile screenshots with numbered captions.
- Update references, contribution matrix and the 9-minute eight-member demo.
- Remove pending statements that conflict with merged evidence.

**Done when:** each technical claim links to evidence, terminology/state IDs
match the candidate, all members have verified contributions, and Ranee accepts
the Google Doc. Cedric does not edit application, automata or test files.

## Phase 3 gate

- [ ] Runtime JSON matches the documented minimized DFA.
- [ ] React/API/simulator agree for the shared corpus.
- [ ] Verdict, request-error and offline states remain distinct.
- [ ] Desktop/narrow accessibility evidence is accepted.
- [ ] CI, API smoke and production-like deployment checks pass.
- [ ] Paper and demo describe the frozen candidate.
- [ ] Ranee records the feature-freeze commit and activates Phase 4.
