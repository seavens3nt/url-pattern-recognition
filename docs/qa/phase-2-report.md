# Phase 2 QA Report

## Scope

Automated QA covers the approved URL corpus, Flask request validation, the no-network boundary, API schema, simulator/API agreement, and React regression states. The contract inputs are `docs/language-spec.md`, `docs/api-contract.md`, and `tests/fixtures/url_cases.json`.

The locked contract commit is `770b761`. The QA branch was rebased onto
`f1ca9fc` (`Merge pull request #49 from seavens3nt/pamela/phase-2-dfa`) before
verification. The tested QA commit is `8b70c05`.

## Results

| Area | Result | Evidence |
| --- | --- | --- |
| Fixture parameterization | Added | All accepted, rejected, and boundary rows run through the simulator. |
| Request/security validation | Added | Malformed JSON, wrong types, blank/empty, exact limit, oversized body, special characters, unknown symbols, and network guards. |
| API integration | Added | Response schema and fixture verdict/API/simulator agreement. |
| Frontend regressions | Added | Offline, timeout, duplicate submission, and malformed response states. |
| Formal model artifacts | Verified | `url_dfa.json`, `docs/automata/nfa.md`, and `docs/automata/diagrams/nfa.dot` are present; the DFA is checked using Pamela's published symbol partition and no unassigned NFA JSON is required. |
| Full sink trace | Defect exposed | Strict expected failure: current simulator stops at the first sink transition, while the API contract requires one trace entry per raw input character. |
| Consecutive interior hyphens | Resolved on this base | The rebased simulator and published expression now agree that `my--site.example.com` is accepted. |
| ASCII `xn--` hostname label | Resolved on this base | B14 is accepted as an ordinary ASCII hostname label; raw Unicode remains covered and rejected by B20. |

## Reproduction

`POST /api/validate` with `{"url":"https://example.com?query"}` returns HTTP 200 and `accepted: false`, but the trace ends at the `?` position instead of consuming the remaining `query` characters. Expected final state is the sink state with a full-length trace.

## Verification commands

Run from the repository root:

```powershell
python -m pytest -q
python -m ruff check backend tests
Set-Location frontend
npm.cmd test -- --run
npm.cmd run lint
npm.cmd run build
Set-Location ..
git diff --check
git status --short
```

The production build is intentionally part of the required release check. A clean-pull rerun must record the resulting output and tested commit in the PR description with `Refs #41`.

Observed on QA commit `0c03148`, rebased onto `f1ca9fc`: the full backend suite
reported `392
passed, 4 xfailed`; backend lint passed; the frontend suite reported `5
passed`; frontend lint passed; and the Vite production build completed
successfully. The four xfails are the intentionally retained D-001 incomplete
sink-trace cases. `git diff --check` passed and only the owned QA files changed.

Mutation checks performed on commit `5272400`: temporarily changing B14 to
rejected caused three language assertions to fail; weakening request type
validation caused 24 targeted security tests to fail; and removing the
frontend timeout result caused the timeout regression to fail. Each mutation
was reverted, and the restored checks passed.