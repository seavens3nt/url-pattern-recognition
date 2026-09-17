# Four-week roadmap

The final deadline is **September 29, 2026**. Because fewer than four full weeks remain, the four phases use a compressed recovery schedule. September 29 is reserved for the final upload and submission check.

| Phase | Dates | Gate | Detailed guide |
| --- | --- | --- |
| 1. Foundation and specification | Sep 9–16 | Scope and alphabet approved; RE draft, wireframes, API contract, test corpus and setup evidence reviewed | [Week 1](phases/week-1.md) |
| 2. Automata and owned packages | Sep 17–20 | Formal model and independently owned frontend, backend, QA, and paper packages reviewed | [Week 2](phases/week-2.md) |
| 3. Integrated application | Sep 21–25 | React displays real simulator verdicts and traces; end-to-end tests pass; features freeze | [Week 3](phases/week-3.md) |
| 4. Verification and defense | Sep 26–28 | Release candidate, clean-run evidence, report, slides and rehearsal accepted | [Week 4](phases/week-4.md) |

## Final deadline sequence

All dates use Asia/Manila time. Phase gates close at 11:59 PM unless the course
portal has an earlier cutoff.

- **September 18–19:** Phase 2 owners complete their assigned construction,
  implementation, tests, and evidence; blockers are recorded on the same day.
- **September 20:** all Phase 2 PRs and evidence are due; Ranee records the
  Phase 2 gate decision.
- **September 21–24:** integrate the approved automaton, API, React interface,
  automated tests, deployment configuration, and report evidence.
- **September 25:** record the feature-freeze commit and finish integrating
  verified Phase 2 evidence into the accepted report baseline.
- **September 26–27:** run final regression and clean setup; finish the paper,
  slides, demo script, citations, screenshots, and offline fallback.
- **September 28:** tag the release candidate, finish one full timed rehearsal,
  and prepare every submission file and link.
- **September 29:** upload, verify every submitted file/link, and save the
  submission receipt. No feature work is planned for submission day.

## Phase 2 onward start order

```text
Locked language + RE + notation
  ├─ Ralph completes NFA
  ├─ Jared prepares simulator/API independently
  ├─ Isaiah builds visual presentation independently
  ├─ Sean builds frontend interaction independently
  ├─ Paul prepares verification cases independently
  └─ Cedric drafts stable report sections independently

Merged NFA → Pamela completes DFA/minimization
Merged DFA model → Jared completes model integration
Merged application packages → Paul completes end-to-end verification
All packages → Ranee gives the phase decision
```

Members begin every task that the locked files already allow. A dependency blocks only the part that truly requires the missing file. The owner does not need to contact or obtain approval from the person who created the input; merging to `main` makes the input available.

## Weekly routine

1. **Planning:** Ranee locks inputs and assigns one accountable owner, exact editable paths, expected outputs and acceptance criteria.
2. **Daily update:** write completed, next and blocked in the active issue.
3. **Independent delivery:** the owner tests the complete package and opens one linked PR.
4. **PM review:** only Ranee approves or requests changes and records unresolved items.
5. **Retrospective:** choose one process improvement for the next week.

## Issue release policy

- Keep the active phase tracker and its member tasks open.
- Keep later work in these phase guides until its sprint begins.
- At sprint review, close completed active issues, move unfinished work deliberately, and then open the next phase’s issues.
- Do not create all four weeks of member issues in advance.

The active phase and evidence are recorded in [Current status](status.md). GitHub contains the live issue state; this file defines the schedule and activation rule.

Phase 2 onward issues use the [Independent work-package template](work-package-template.md). Phase 1 issues are preserved as completed project history.
