# Four-week roadmap and delegation

The project lasts **four weeks total**, with one Agile sprint per week. Setup is included in Week 1; there is no additional Sprint 0 or fifth week. Calendar start/end dates remain to be confirmed by Ranee.

The phase format follows the supplied [phase example](https://docs.google.com/document/d/1Qpj0AeXr7mD2jqXJLeSe6rae7hYeflvG9eApdSm2kNg/edit): meeting agenda, GitHub rules, member tasks, expected outputs, integration points and completion checklist. The example's unrelated marine-project features and technologies are not part of this project.

| Week | Phase | Required outcome | Detailed delegation |
| --- | --- | --- | --- |
| 1 | Foundation and specification | Team setup, approved URL language, RE draft, wireframes, API contract and corpus | [Phase 1](phases/week-1.md) |
| 2 | Automata construction and core development | Reviewed RE/NFA/DFA/minimized DFA plus UI and API shells | [Phase 2](phases/week-2.md) |
| 3 | Integrated web application | Real validation and trace from React through Flask | [Phase 3](phases/week-3.md) |
| 4 | Verification deployment and defense | Tested release, final report/slides, rehearsal and submission | [Phase 4](phases/week-4.md) |

## Each member's four-week responsibility

| Member | Week 1 | Week 2 | Week 3 | Week 4 |
| --- | --- | --- | --- | --- |
| Ranee | Access, setup, calendar and scope approval | Handoffs, PR review and blockers | Integration and delivery plan | Release, submission and go/no-go |
| Isaiah | Language specification and Figma | Rule clarifications and UI review | UX and scope-conformance review | Limitations and language defense |
| Ralph | RE draft and regularity review | Final RE and NFA by Day 2 | Worked traces and discrepancy fixes | Final RE/NFA explanation |
| Pamela | State conventions and RE review | DFA/subset construction by Day 3 | Runtime state mapping audit | Final DFA explanation |
| Sean | UI plan and API review | UI shell Days 1–2; minimization Days 4–5 | React result/trace integration | UI fixes and minimization defense |
| Jared | API contract and simulator interface | Simulator plumbing with test automata | Real validation API by Day 2 | Backend fixes and configuration |
| Paul | Corpus and onboarding verification | Automata checks and regression cases | End-to-end integration tests | Release report and retests |
| Cedric | Report outline and decision log | Theory chapter and diagrams | Implementation chapter and demo draft | Report, slides and rehearsal |

## Handoff schedule and workload
The critical path is Week 1 language approval → Week 2 Day 2 NFA → Day 3 DFA → Day 5 minimized DFA → Week 3 Day 2 backend → Day 3 frontend → Week 4 QA and defense. Later stages cannot claim correctness before their upstream artifacts are reviewed. Jared can build the generic engine and tests in parallel; Sean uses only early Week 2 for UI shell work so minimization has protected time. Documentation and QA start in Week 1.

If a gate slips, Ranee reduces optional polish and reassigns support work; the team must not skip formal conversion or correctness checks. No new features after Week 3 review. Hosting follows professor requirements and available resources; a local reproducible demo remains available as fallback.

## Agile routine
- Start-of-week planning: agree one sprint goal, owner, dependency and acceptance criteria for each task.
- Daily async update in the issue: completed work, next step, blocker. Raise blocked dependencies immediately.
- Track Backlog → Ready → In progress → In review → Done; label the blocking dependency when needed.
- One implementation task in progress per member unless agreed otherwise.
- End-of-week review: demonstrate outputs; record one retrospective improvement.
- Done requires a reviewed PR, passing relevant checks, updated docs and a demonstrable deliverable. A phase checklist remains unchecked until there is evidence.

## GitHub tracking
The original issues #1–#13 remain the deliverable records and are remapped to these four milestones. Four phase coordination issues collect the eight weekly member checklists. Original milestones 5 and 6 are closed as superseded, not completed work.

[Task backlog](https://github.com/seavens3nt/url-pattern-recognition/issues) · [Milestones](https://github.com/seavens3nt/url-pattern-recognition/milestones)
