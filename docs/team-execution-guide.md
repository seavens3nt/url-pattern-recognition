# URL PATTERN RECOGNITION
## Project overview
Duration: four weeks, with one Agile sprint per week. Calendar dates and the final submission deadline must be confirmed by Ranee.

An educational web application that checks whether an input URL belongs to the team’s approved language. It returns a verdict and shows the states/transitions used to process the input. It checks structure, not whether a website exists.

Academic pipeline: Regular Expression → NFA → DFA → Minimized DFA → Simulator.

## Team
Three backend developers: Ralph, Pamela and Jared. Two frontend developers: Isaiah and Sean. One QA tester: Paul. Paper lead: Cedric. Ranee owns project management and setup for both frontend and backend, with backend and paper support.

| Member Name | GitHub Username | Primary Role | Key Responsibilities | Main Deliverables |
| --- | --- | --- | --- | --- |
| Ranee Mikaella V. Gutierrez | @seavens3nt | Project Manager / Project Setup | Prepare React and Flask, connect both, write run instructions, coordinate tasks and approve PRs; support agreed backend tasks and the paper. | Working starter; onboarding guide; task coordination; reviewed release. |
| Isaiah Jasser C. Otilano | @m1nay3on | Frontend Developer / UI/UX | Design and implement layout, CSS, responsive behavior and accessibility; document URL rules agreed with the backend team. | Wireframes; responsive layout; supported-language specification. |
| Ralph Kenneth G. Punzalan | @rlken | Backend Developer — RE and NFA | Construct RE/NFA; provide tables and diagrams; independently review Pamela’s DFA and minimization. | RE; NFA; construction explanation; formal review evidence. |
| Pamela R. Babaran | @Qiuyuan26 | Backend Developer — DFA and Minimization | Perform subset construction and minimization; hand the reviewed model to Jared. | DFA; partitions; minimized model; equivalence explanation. |
| Sean Matthew E. Tumolac | @bonkbonkboomeykwkwkw | Frontend Developer — API Integration | Implement input/form behavior, API calls, results, errors and transition trace; coordinate components with Isaiah. | Interactive validator UI; API connection; trace display. |
| Jared L. Noel | @AshenDary | Backend Developer — Simulator and API | Implement the Python simulator and Flask endpoints; agree backend support tasks with Ranee. | Simulator; API; request handling; actual transition trace. |
| Paul Joshua R. Campos | @paulccampos | QA / Tester | Prepare corpus, test API/UI/automata, report defects and verify fixes and clean setup. | Tests; defect reports; release verification. |
| Cedric Kristoff R. Sigue | @cedricsigue | Paper & Presentation Lead | Compile each member’s explanation; maintain report and evidence; prepare slides and demo with Ranee’s support. | Paper; references; slides; demo script. |

Everyone writes the explanation for their own work; Cedric compiles and edits the paper. Technical peers check artifacts; Ranee provides final PR approval.

## Tech stack
### Frontend
- React + Vite: browser components, local development and production build.
- JavaScript / JSX: component behavior; CSS: layout, styling and responsive screens.
- Fetch API: requests to Flask through the shared frontend API module.
- Figma: wireframes and UI/UX handoff.

### Backend
- Python: formal-model data structures and deterministic simulation.
- Flask: health and validation API endpoints.
- JSON: API request/response data and the agreed transition-model representation.
- Graphviz: editable NFA, DFA and minimized-DFA diagrams.

### Testing and development tools
- pytest: Python simulator and API tests.
- Vitest and React Testing Library: frontend behavior tests.
- Ruff and ESLint: code checks.
- Git, GitHub and GitHub Desktop: branches, commits, PRs and task tracking.
- GitHub Actions: backend and frontend checks on pushes and PRs.

## Backend design
### Core runtime and framework
Flask receives requests; Python handles reusable model and simulator logic. Ranee prepares the working environment and folder structure; Jared leads feature implementation.

### Formal processing
Ralph constructs the RE/NFA. Pamela performs subset construction and minimization, with Ralph reviewing. Jared loads the reviewed model and consumes the complete input through its transitions. Paul checks the same approved test corpus across artifacts and runtime behavior.

### API boundary
GET /api/health reports service/model readiness. POST /api/validate accepts a JSON object containing a URL string. Request errors, pending implementation and valid requests containing rejected URLs are separate outcomes. Exact current and proposed fields are recorded in docs/api-contract.md.

## Frontend design
Isaiah owns layout, CSS, responsive behavior and UI/UX. Sean owns form behavior, API calls, results and trace rendering. They agree shared component interfaces before editing the same feature.

Use components grouped under frontend/src/features/validator. Keep HTTP calls in api.js. The UI displays backend results; it does not implement a separate regex-based acceptance engine.

## Architecture
Input → React validator → api.js → Flask route → validation service → DFA simulator → reviewed model → JSON response → result and trace.

### File architecture
```text
frontend/src/features/validator/  Frontend feature and API boundary
frontend/src/style.css           Layout and styling
backend/app.py                   Flask application factory
backend/routes/                  HTTP routes
backend/services/                Request/engine coordination
backend/automata/                Model and simulator delivery targets
tests/                          Python tests and shared fixtures
docs/automata/                  Formal definitions and diagrams
docs/ui/                        Wireframes and component decisions
docs/qa/                        Test plan and defect evidence
docs/report/                    Paper and references
docs/phases/                    Four detailed phase instructions
.github/                        CI, PR template and CODEOWNERS
```
Some formal-artifact and report folders are planned deliverables. See docs/architecture.md for current versus planned files and ownership. Do not treat a listed path as completed implementation.

## Data storage
No database is required for the core scope. Keep model definitions, transition tables and reviewed test cases in version-controlled files. Accounts, saved user history and external URL fetching are outside the core plan.

## System features
1. URL input and a clear validation action.
2. Accepted/rejected verdict based on the reviewed DFA after complete input consumption.
3. Trace table: position, symbol, source state and destination state.
4. Automata reference: RE, diagrams, tables and explanations.
5. Approved examples, supported rules and limitations.
6. Loading, invalid-request and connection-error states that are distinct from language rejection.

## Roadmap — final product pages
Plan one main page with three sections or tabs: Validator; Automata; Guide & Examples. Keep this small for the deadline. The exact navigation is finalized in the Week 1 wireframes.

The initial language is fixed after team approval. Arbitrary user-edited regular expressions and automatic conversion of any regex are not assumed requirements; check the professor’s rubric before committing to them.

## Phase 1 — Foundation and specification (Week 1)
Ranee verifies setup for both sides and helps all members clone/run the project. Isaiah documents supported URL rules and creates wireframes; Sean plans component/API behavior. Ralph drafts the RE; Pamela agrees state/model notation; Jared finalizes the API contract. Paul prepares the corpus; Cedric creates the paper outline.

Outcome: reviewed scope, working starter, agreed interfaces, onboarding evidence and initial tests. See docs/phases/week-1.md.

## Phase 2 — Automata and application shells (Week 2)
Ralph hands off RE/NFA by Day 2. Pamela completes DFA construction by Day 3 and minimization by Day 5; Ralph independently reviews both. Jared prepares simulator plumbing using labeled test automata, then accepts the final model. Isaiah builds layout/CSS while Sean builds form/result/trace behavior. Paul checks formal artifacts and tests; Cedric compiles theory; Ranee resolves handoff blockers.

Outcome: reviewed RE → NFA → DFA → minimized DFA artifacts and frontend/backend shells. See docs/phases/week-2.md.

## Phase 3 — Integrated web application (Week 3)
Jared provides real validation by Day 2; Sean connects results and traces by Day 3. Isaiah implements layout/accessibility fixes. Ralph and Pamela investigate formal/runtime mismatches; Paul runs end-to-end checks; Cedric documents implementation. Ranee coordinates integration and the delivery decision.

Outcome: working input-to-result flow with accurate traces. Freeze new features after the review. See docs/phases/week-3.md.

## Phase 4 — Verification, delivery and defense (Week 4)
Paul verifies regression and clean setup; developers fix assigned defects. Ranee verifies the delivery package. Cedric compiles the final paper/slides; every member explains their contribution and rehearses the demonstration.

Outcome: tested application, reproducible run instructions, reviewed formal artifacts, paper, slides and rehearsed demo. See docs/phases/week-4.md.

## Agile and coordination
At weekly planning, agree the sprint goal, owners, dependencies and deadlines. Each member posts a daily done/next/blocker update in their task issue. At review, demonstrate outputs, record recipient handoff acceptance and choose one retrospective improvement. Use Backlog → Ready → In progress → In review → Done.

Keep 13 deliverable issues and four weekly trackers. Trackers link work rather than repeat full task descriptions. Do not close a whole multi-week deliverable when only an early checkpoint is complete.

## GitHub rules and beginner instructions
All changes use task branches and PRs into main. Ranee is the sole required code owner; new changes dismiss an earlier approval. Only her account has a PR-only bypass for her own PRs. Coordinate shared-file changes, keep dependencies in their correct folders, and never commit secrets or generated dependencies.

Read docs/github-desktop-guide.md for clone → update main → branch → commit → publish → PR → feedback → merge → update main. Read docs/how-to-run.md for installing dependencies, starting frontend/backend in two terminals and troubleshooting. The Google Docs guide includes separate GitHub Desktop and How to Run tabs with the same instructions.

## Current status
The starter React/Flask connection, run instructions, automated checks and required owner-review configuration are in place. All seven teammates have accepted access. The last verified application still reports validation pending; formal language approval, real automata validation and delivery readiness need reviewed evidence. A passing starter check is not proof that URL recognition is complete.

## Deployment and delivery
The baseline is a reproducible local demonstration. Confirm whether hosting is required during Week 3; choose the platform then and test the full deployed frontend/API flow in Week 4. Do not add database or hosting services solely because the reference project used them.

## Final product vision
A focused educational URL recognizer with an understandable verdict and transition trace, supported by a complete formal derivation, tested implementation, clear setup instructions and a defensible academic paper.
