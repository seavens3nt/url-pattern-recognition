# Phase 2 QA Report

## Scope

Automated QA covers the approved URL corpus, Flask request validation, the no-network boundary, API schema, simulator/API agreement, and React regression states. The contract inputs are `docs/language-spec.md`, `docs/api-contract.md`, and `tests/fixtures/url_cases.json`.

The locked contract commit is `770b761`. The checkout used for this report is `7d433a8` (`Activate Phase 2 independent work packages (#43)`); it is the current `main`/task-branch tip when the tests were prepared.

## Results

| Area | Result | Evidence |
| --- | --- | --- |
| Fixture parameterization | Added | All accepted, rejected, and boundary rows run through the simulator. |
| Request/security validation | Added | Malformed JSON, wrong types, blank/empty, exact limit, oversized body, special characters, unknown symbols, and network guards. |
| API integration | Added | Response schema and fixture verdict/API/simulator agreement. |
| Frontend regressions | Added | Offline, timeout, duplicate submission, and malformed response states. |
| NFA/generated DFA agreement | Blocked on this checkout | Reviewed NFA and generated-DFA artifacts are not present; the integration test skips and fails closed if only part of the formal package lands. |
| Full sink trace | Defect exposed | Strict expected failure: current simulator stops at the first sink transition, while the API contract requires one trace entry per raw input character. |

## Reproduction

`POST /api/validate` with `{"url":"https://example.com?query"}` returns HTTP 200 and `accepted: false`, but the trace ends at the `?` position instead of consuming the remaining `query` characters. Expected final state is the sink state with a full-length trace.

## Verification commands

Run from the repository root:

```powershell
.\.venv\Scripts\python.exe -m pytest -q
.\.venv\Scripts\python.exe -m ruff check backend tests
Set-Location frontend
npm.cmd test -- --run
npm.cmd run lint
npm.cmd run build
Set-Location ..
git diff --check
git status --short
```

The production build is intentionally part of the required release check. A clean-pull rerun must record the resulting output and tested commit in the PR description with `Refs #41`.

Observed on base commit `7d433a8` with the QA working-tree changes: backend
lint passed; the full backend suite reported `379 passed, 3 skipped, 6
xfailed`; frontend lint passed; Vitest reported `5 passed`; and the Vite
production build completed successfully. Duplicate test definitions and two
platform-sensitive security-test inputs were corrected before this final run.