# Evidence index

This file is the repository source map for the course report. The shared Google
Doc remains the paper-authoring location; this index records which claims are
supported by reviewed files on `main` and prevents the report from describing
planned or superseded behavior as finished work.

## Shared report

- Google Doc: https://docs.google.com/document/d/1qoo1uikbvgz3ryrP2cxPXJKNrFWNfft_6i-fbwAKvMg/edit
- Phase 1 baseline: PR #33 (`39e907f`)
- Phase 2 status: repository evidence assembled; Google Doc synchronization and
  PM acceptance are Phase 3 deliverables.

## Status key

- **Complete:** reviewed repository evidence is available.
- **Pending:** the artifact belongs to Phase 3 or Phase 4 and is not yet accepted.
- **Blocked:** Ranee must resolve a recorded contradiction before work continues.

## Phase 2 reviewed package

| Area | Owner | Merge | Authoritative evidence | Status |
| --- | --- | --- | --- | --- |
| Integration and deployment foundation | Ranee | PR #44 (`94ee888`) | [`scripts/check_all.py`](../../scripts/check_all.py), [`scripts/smoke_api.py`](../../scripts/smoke_api.py), [`compose.yaml`](../../compose.yaml), [`docs/release/phase-2-deployment-check.md`](../release/phase-2-deployment-check.md) | Complete |
| Regular expression and NFA | Ralph | PR #45 (`5a47b9a`) | [`regular-expression.md`](../automata/regular-expression.md), [`nfa.md`](../automata/nfa.md), [`nfa.dot`](../automata/diagrams/nfa.dot) | Complete |
| DFA and minimization | Pamela | PR #49 (`f1ca9fc`) | [`dfa.md`](../automata/dfa.md), [`minimization.md`](../automata/minimization.md), [`url_dfa.json`](../../backend/automata/url_dfa.json), editable diagrams | Complete |
| Simulator and Flask API | Jared | PR #48 (`c54849c`) | [`simulator.py`](../../backend/automata/simulator.py), [`validation.py`](../../backend/services/validation.py), [`test_api.py`](../../tests/test_api.py), [`test_simulator.py`](../../tests/test_simulator.py) | Complete |
| Independent QA | Paul | PR #50 (`35cf107`) | [`phase-2-report.md`](../qa/phase-2-report.md), shared fixture and integration/security tests | Complete |
| React interaction | Sean | PR #51 (`2a1f081`) | [`ValidatorPage.jsx`](../../frontend/src/features/validator/ValidatorPage.jsx), [`api.js`](../../frontend/src/features/validator/api.js), feature tests | Complete |
| Visual interface and accessibility | Isaiah | PR #54 (`cd1d620`) plus PM integration repair | [`frontend/src/ui`](../../frontend/src/ui), [`style.css`](../../frontend/src/style.css), [`accessibility-checklist.md`](../ui/accessibility-checklist.md) | Complete after integration merge |
| Report evidence | Cedric | Phase 1 baseline carried forward | This index and the shared Google Doc | Pending Phase 3 synchronization |

## Required course sections

| Report section | Evidence | Status |
| --- | --- | --- |
| Introduction, objectives, scope and limitations | [`context.md`](../context.md), [`language-spec.md`](../language-spec.md), [`roadmap.md`](../roadmap.md) | Complete |
| Alphabet, strings and formal language | [`language-spec.md`](../language-spec.md), [`notation.md`](../automata/notation.md) | Complete |
| Accepted and rejected examples | [`url_cases.json`](../../tests/fixtures/url_cases.json), [`phase-2-report.md`](../qa/phase-2-report.md) | Complete |
| Regular expression | [`regular-expression.md`](../automata/regular-expression.md) | Complete |
| NFA definition, transition table, traces and diagram | [`nfa.md`](../automata/nfa.md), [`nfa.dot`](../automata/diagrams/nfa.dot), [`nfa-rendered-evidence.png`](../automata/diagrams/nfa-rendered-evidence.png) | Complete |
| NFA-to-DFA subset construction | [`dfa.md`](../automata/dfa.md) | Complete |
| DFA transition table and diagram | [`dfa.md`](../automata/dfa.md), [`dfa.dot`](../automata/diagrams/dfa.dot), [`dfa-rendered-evidence.png`](../automata/diagrams/dfa-rendered-evidence.png) | Complete |
| DFA minimization and minimized diagram | [`minimization.md`](../automata/minimization.md), [`minimized-dfa.dot`](../automata/diagrams/minimized-dfa.dot), [`minimized-dfa-rendered-evidence.png`](../automata/diagrams/minimized-dfa-rendered-evidence.png) | Complete |
| System design and API contract | [`architecture.md`](../architecture.md), [`api-contract.md`](../api-contract.md) | Complete |
| Implementation/source code | [`backend`](../../backend), [`frontend/src`](../../frontend/src) | Complete |
| Test cases and results | [`phase-2-report.md`](../qa/phase-2-report.md), [`tests`](../../tests), frontend component tests | Complete |
| Working-system screenshots | [`phase-2-recognizer-desktop.png`](../ui/screenshots/phase-2-recognizer-desktop.png), [`phase-2-home-mobile.png`](../ui/screenshots/phase-2-home-mobile.png) | Complete |
| Deployment, performance and security evidence | [`phase-2-deployment-check.md`](../release/phase-2-deployment-check.md), [`integration-gate.md`](../release/integration-gate.md) | Pending final container/host evidence |
| Discussion and conclusion | Phase 2 QA report plus the shared Google Doc | Pending Cedric update and Ranee acceptance |
| References | Repository sources and course brief | Pending final Google Doc citation check |
| Contribution matrix and demo sequence | Verified merges above and Phase 3 demo draft | Pending Phase 3 update |

## Verified system behavior

- React sends one `{ "url": string }` request to `POST /api/validate`.
- Flask validates the request shape and size before invoking the simulator.
- The simulator reads the submitted text without opening or fetching the URL.
- A well-formed request returns HTTP 200 with `accepted`, `message`,
  `final_state`, and an ordered `trace`, whether the DFA accepts or rejects it.
- Malformed/oversized requests and an unavailable backend remain separate UI
  states from a DFA rejection.
- The browser exposes Home, Recognizer, How It Works, and About Us pages, and
  the recognizer uses the reviewed visual components with the real API logic.

## Contribution record

| Member | Verified Phase 2 contribution |
| --- | --- |
| Ranee Mikaella V. Gutierrez | Project setup, integration tooling, deployment foundation, PM review and UI integration repair |
| Isaiah Jasser C. Otilano | Responsive visual system, reusable UI components, static pages and accessibility evidence |
| Ralph Kenneth G. Punzalan | Regular expression, NFA definition, transition table, worked traces and diagram |
| Pamela R. Babaran | Subset-construction DFA, minimization, model encoding and diagrams |
| Sean Matthew E. Tumolac | React request state, API client, verdict/error handling, retry and trace behavior |
| Jared L. Noel | Model loader, deterministic simulator, Flask API, validation and backend tests |
| Paul Joshua R. Campos | Shared corpus, security/integration regressions, mutation checks and QA report |
| Cedric Kristoff R. Sigue | Phase 1 report baseline and repository evidence-index ownership |

## Phase 3 report work

Cedric updates the accepted Google Doc from this index. Each `Complete` claim
must retain a direct source link. Ranee accepts the synchronized theory,
implementation, test-result, contribution, screenshot, and demo sections. The
repository files remain authoritative if the Google Doc conflicts with code or
reviewed automata artifacts.
