# Project guide

## Purpose

URL Pattern Recognition is a four-week Automata Theory project. The web app checks the **structure** of an input URL against a language approved by the team. It does not check whether the website exists or fetch the submitted address.

The academic pipeline is:

```text
Language specification → Regular Expression → NFA → DFA → Minimized DFA → Simulator → Web app
```

The final app should show a verdict, final state and ordered transition trace. It should also explain the supported language, examples and formal construction clearly enough for the team’s defense.

## Scope

The required product has one focused validator experience with three sections: Validator, Automata, and Guide & Examples. The team will support one fixed URL language after Week 1 approval. Accounts, saved history, database storage, external URL fetching and a general-purpose regex editor are outside the core scope.

## Technology

- **Frontend:** React, Vite, JavaScript/JSX and CSS.
- **Backend:** Python and Flask.
- **Formal artifacts:** JSON transition data and Graphviz diagrams.
- **Testing:** pytest, Vitest and React Testing Library.
- **Quality and teamwork:** Ruff, ESLint, Git, GitHub Desktop and GitHub Actions.

See [Tech stack](tech-stack.md) for the short reference and [API contract](api-contract.md) for request and response details.

## Team model

Ranee manages the project, prepares both application sides and gives final PR approval. Isaiah and Sean own the frontend. Ralph, Pamela and Jared own the formal backend pipeline and API. Paul owns independent QA. Cedric compiles the paper and presentation, while every member writes and explains their own contribution.

Names, GitHub usernames, responsibilities and deliverables live in one place: [Team roles](team-roles.md).

## Architecture

```text
URL input
  → React validator
  → frontend API module
  → Flask validation route
  → validation service
  → minimized-DFA simulator
  → verdict, final state and trace
  → React result display
```

The frontend must display backend results rather than implement a separate regex validator. The backend must simulate the reviewed DFA and consume the complete input before deciding. See [File architecture and ownership](architecture.md) for current and planned paths.

## Four-week delivery plan

| Phase | Outcome | Detailed assignments |
| --- | --- | --- |
| Week 1 — Foundation | Approved scope, language draft, interfaces, wireframes, corpus and working setup | [Phase 1](phases/week-1.md) |
| Week 2 — Construction | Reviewed RE, NFA, DFA and minimized DFA plus application shells | [Phase 2](phases/week-2.md) |
| Week 3 — Integration | Real React-to-Flask validation with an accurate transition trace | [Phase 3](phases/week-3.md) |
| Week 4 — Delivery | Regression-tested release, report, slides and rehearsed defense | [Phase 4](phases/week-4.md) |

[Roadmap](roadmap.md) contains the phase gates and Agile routine. [Current status](status.md) identifies the active phase, blockers and verified evidence.

## Working agreement

Each member works from an issue for the **current phase only**. The issue names the owner, required output, dependency, coordination partner and acceptance criteria. Later-phase issues are opened after the previous sprint review, so the open backlog stays focused.

Use one task branch and PR per issue. Post a short daily update in the issue: completed, next, blocked. A task is done after its output is reviewed, relevant checks pass, documentation is current and its recipient accepts the handoff.

All GitHub rules live in [Contributing](../CONTRIBUTING.md). Beginner clone, branch and PR steps live in the [GitHub Desktop guide](github-desktop-guide.md). Installation and two-terminal startup steps live in [How to run](how-to-run.md).

## Definition of success

The team succeeds when the reviewed formal artifacts agree with the simulator, the same test corpus produces consistent results through the API and UI, a new teammate can run the project from the guide, and every member can defend their contribution with evidence.
