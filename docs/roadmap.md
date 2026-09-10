# Four-week roadmap

The project uses one one-week sprint per phase. Calendar dates and the final submission deadline remain for Ranee to confirm.

| Phase | Gate at the end of the week | Detailed guide |
| --- | --- | --- |
| 1. Foundation and specification | Scope and alphabet approved; RE draft, wireframes, API contract, test corpus and setup evidence reviewed | [Week 1](phases/week-1.md) |
| 2. Automata and shells | RE/NFA/DFA/minimized DFA reviewed; frontend and API shells ready for integration | [Week 2](phases/week-2.md) |
| 3. Integrated application | React displays real simulator verdicts and traces; end-to-end tests pass; features freeze | [Week 3](phases/week-3.md) |
| 4. Verification and defense | Release candidate, clean-run evidence, report, slides and rehearsal accepted | [Week 4](phases/week-4.md) |

## Critical handoffs

```text
Isaiah language rules
  → Ralph RE/NFA
  → Pamela DFA/minimization
  → Jared simulator/API
  → Sean frontend integration
  → Paul end-to-end verification
  → Cedric evidence and presentation
  → Ranee release approval
```

Frontend layout work, test planning and paper preparation run in parallel from Week 1. If a formal gate slips, Ranee reduces optional interface polish; the team does not skip conversion or correctness checks.

## Weekly routine

1. **Planning:** confirm the sprint goal, one accountable owner per task, dependencies, coordination partner and acceptance criteria.
2. **Daily update:** write completed, next and blocked in the active issue.
3. **Handoff:** link the PR and evidence; the named recipient checks the output.
4. **Review:** demonstrate the week’s gate and record unresolved items.
5. **Retrospective:** choose one process improvement for the next week.

## Issue release policy

- Keep the active phase tracker and its member tasks open.
- Keep later work in these phase guides until its sprint begins.
- At sprint review, close completed active issues, move unfinished work deliberately, and then open the next phase’s issues.
- Do not create all four weeks of member issues in advance.

The active phase and evidence are recorded in [Current status](status.md). GitHub contains the live issue state; this file defines the schedule and activation rule.
