# Phase 2 QA Report

## Scope

Automated QA covers the approved URL corpus, Flask request validation, the no-network boundary, API schema, simulator/API agreement, and React regression states. The contract inputs are `docs/language-spec.md`, `docs/api-contract.md`, and `tests/fixtures/url_cases.json`.

The locked contract commit is `770b761`. The QA branch was synchronized with
`c54849c` (`Merge pull request #48 from
seavens3nt/phase-2/jared/secure-simulator-and-flask-validation-api`) before final
verification.

## Results

| Area | Result | Evidence |
| --- | --- | --- |
| Fixture parameterization | Added | All accepted, rejected, and boundary rows run through the simulator. |
| Request/security validation | Added | Malformed JSON, wrong types, blank/empty, exact limit, oversized body, special characters, unknown symbols, and network guards. |
| API integration | Added | Response schema and fixture verdict/API/simulator agreement. |
| Frontend regressions | Added | Offline, timeout, duplicate submission, and malformed response states. |
| Formal model artifacts | Verified | `url_dfa.json`, `docs/automata/nfa.md`, and `docs/automata/diagrams/nfa.dot` are present; the DFA is checked using Pamela's published symbol partition and no unassigned NFA JSON is required. |
| Full sink trace | Resolved and verified | Four rejected inputs confirm that the simulator continues through the sink state and returns one trace row per raw input character. |
| Consecutive interior hyphens | Resolved on this base | The rebased simulator and published expression now agree that `my--site.example.com` is accepted. |
| ASCII `xn--` hostname label | Resolved on this base | B14 is accepted as an ordinary ASCII hostname label; raw Unicode remains covered and rejected by B20. |

## Resolved defect verification

Defect D-001 was resolved by PR #48. Automated cases for query, fragment,
whitespace, and port input now confirm HTTP 200 with `accepted: false`, a sink
final state, and a trace covering every character in the submitted string.

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

After synchronization with `c54849c`, the full backend suite reported `446
passed` with no expected failures. Backend lint passed; the frontend suite
reported `5 passed`; frontend lint passed; and the Vite production build
completed successfully. `git diff --check` passed and only the owned QA files
changed relative to `main`.

Mutation checks performed on commit `5272400`: temporarily changing B14 to
rejected caused three language assertions to fail; weakening request type
validation caused 24 targeted security tests to fail; and removing the
frontend timeout result caused the timeout regression to fail. Each mutation
was reverted, and the restored checks passed.
