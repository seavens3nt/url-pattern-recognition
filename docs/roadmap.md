# Roadmap and Agile workflow

## Planning assumptions
Proposed schedule: a short setup Sprint 0 followed by five one-week sprints. These are relative planning windows, not committed calendar dates. Ranee should align them with the professor's deadline and team availability. Re-estimate after Sprint 1; do not trade formal correctness for the proposed schedule.

| Sprint | Goal | Owners | Exit criteria |
| --- | --- | --- | --- |
| 0 — Team setup | Repository, invitations, runnable starter, run guide, checks, workflow | Ranee; Paul checks onboarding | A teammate can clone and run React + Flask; starter checks pass; invitations and onboarding confirmed |
| 1 — Scope and design | Approve URL language, alphabet, valid/invalid corpus, Figma wireframes, API contract | Isaiah; Jared and Sean on API; Paul on corpus | Each syntax rule has examples; UI states defined; unresolved language decisions resolved |
| 2 — Automata construction | RE and NFA, subset construction, complete DFA | Ralph then Pamela; Paul reviews examples | RE/NFA/DFA diagrams and tables agree; accepting and sink states explicit; construction explanation reviewed |
| 3 — Optimization and implementation | Minimized DFA, Python simulator, React result and trace screens | Sean and Jared; Paul tests | Equivalence justified; simulator walks explicit transitions; API and UI integrate using reviewed artifacts |
| 4 — Verification and release candidate | End-to-end, boundary, accessibility, responsive and deployment checks | Paul leads; all fix defects; Ranee integrates | Tests pass; release candidate runs in target environment; no unresolved critical defects |
| 5 — Report and defense | Final report, slides, demo script, rehearsal, submission | Cedric leads; all explain assigned work | Diagrams match code; README reproduces setup; demo and fallback rehearsed; release tagged and submission checked |

## Initial backlog

| ID | Deliverable | Owner | Sprint | Dependency | Acceptance |
| --- | --- | --- | --- | --- | --- |
| SETUP | Starter and onboarding | Ranee | 0 | Repository | Run guide verified and CI passes |
| LANG | Formal language specification | Isaiah | 1 | None | Scheme, alphabet and component rules plus examples approved |
| UX | Responsive wireframes | Isaiah | 1 | Draft scope | Input/loading/result/error/trace states documented |
| API | Request and result contract | Jared, Sean | 1 | Draft scope | Both sides review accepted/rejected/error examples |
| CORPUS | Shared accepted/rejected cases | Paul | 1 | LANG | Each rule and boundary represented with expected outcome |
| NFA | Regular expression and NFA | Ralph | 2 | LANG | Diagram, transition table and construction explanation |
| DFA | Subset construction and DFA | Pamela | 2 | NFA | Complete transition table, state mapping and accepting states |
| MIN | Minimized DFA | Sean | 3 | DFA | Partition steps and language-equivalence evidence |
| ENGINE | Simulator and validation endpoint | Jared | 3 | MIN, API | Actual DFA results and complete traces; corpus passes |
| WEB | React validator UI | Sean | 3 | UX, API | Responsive result/trace UI and error states; connects to engine |
| QA | Release candidate verification | Paul | 4 | ENGINE, WEB | API/UI tests and manual browser checks pass; defects retested |
| DEPLOY | Deployment and smoke check | Ranee | 4 | QA | Hosting selected, configuration documented, live flow checked |
| REPORT | Report, slides and defense | Cedric | 5 | Automata and QA | Code-aligned report and rehearsed demo; all explain their work |

## Sprint routine
- Planning: choose a small sprint goal, review dependencies, assign one accountable owner to each task, and agree acceptance criteria.
- Daily asynchronous update: each member posts completed work, next work, and blockers in their task issue. Raise blockers to Ranee promptly.
- Board states: Backlog → Ready → In progress → In review → Done. Use Blocked with a named dependency when needed.
- Keep at most one implementation task in progress per person, unless the team agrees otherwise.
- Review: demonstrate completed behavior and academic artifacts at sprint end.
- Retrospective: record one improvement for the next sprint.

## Ready and done
A ready task has an owner, clear acceptance criteria, and available dependencies. Done means a reviewed PR is merged, relevant checks pass, related docs are updated, and the deliverable can be demonstrated. A coding task that only works on its author's machine is not done.

## Risk handling
Language changes affect every automata artifact and test; review their impact before accepting them. Sean owns both minimization and frontend work, so UI shell work can happen early with sample data while formal work takes priority. Reserve Sprint 4 for integration and defect fixes. Keep a local demo and screenshots as a defense fallback.

## GitHub tracking

[Open the task backlog](https://github.com/seavens3nt/url-pattern-recognition/issues) and [sprint milestones](https://github.com/seavens3nt/url-pattern-recognition/milestones). Issues #1�#13 correspond to the initial backlog rows in order. Owners awaiting invitation acceptance are recorded in issue descriptions.
