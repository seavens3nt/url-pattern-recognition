# URL Pattern Recognition

An Automata Theory web application built with React and Flask. It will decide whether an input URL belongs to the team-approved language and show the DFA transition trace used to reach the result.

The starter runs, but URL recognition is still pending. The formal language and automata must be reviewed before the app returns accepted or rejected verdicts.

## Start here

| Need | Read |
| --- | --- |
| Use the shared team document | [Google Docs execution guide](https://docs.google.com/document/d/1sjPsqJnhULjnTyqZo2iaPqDlImX-l2sUmqY9-tPVNsQ/edit) |
| Understand the project | [Project guide](docs/team-execution-guide.md) |
| See this week's work | [Current status](docs/status.md) |
| Find your role | [Team roles](docs/team-roles.md) |
| Follow the four-week plan | [Roadmap](docs/roadmap.md) |
| Run the project | [How to run](docs/how-to-run.md) |
| Clone, branch and open a PR | [GitHub Desktop guide](docs/github-desktop-guide.md) |
| Follow contribution rules | [Contributing](CONTRIBUTING.md) |

The active phase guide is linked from [Current status](docs/status.md). Future phase guides are planning references; their GitHub issues are opened only when that phase starts.

## Project structure

```text
frontend/src/          React interface and frontend tests
backend/               Flask API, services and automata code
tests/                 Backend and simulator tests
docs/                  Project, phase and academic documentation
.github/               CI, PR template and ownership rules
```

See [File architecture and ownership](docs/architecture.md) for the full map and shared-file coordination rules.

## Quick verification

After completing the first-time setup in [How to run](docs/how-to-run.md):

- Start Flask in one terminal.
- Start React in a second terminal.
- Open `http://localhost:5173`.
- Run the checks listed in the run guide before submitting a PR.
