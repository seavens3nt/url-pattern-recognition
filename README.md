# URL Pattern Recognition

**Project completed October 4, 2026**, as confirmed by project manager Ranee
Mikaella V. Gutierrez. [Open the live application](https://url-pattern-recognition.vercel.app).
The October 6 presentation remains scheduled. See [Current status](docs/status.md)
for the completed application revision and verification record.

An Automata Theory web application built with React and Flask. It decides whether an input URL belongs to the team-approved language and shows the DFA transition trace used to reach the result.

The frontend uses Tailwind CSS v4 for layout and common component styling.
Its responsive navigation, original logo, illustrated URL anatomy, and
animations retain focused component CSS. Tailwind is compiled by Vite during `npm run dev` and
`npm run build`; no separate styling command is needed.

The application runs the approved core language through an explicit DFA and returns accepted or rejected verdicts with a transition trace. The RE → NFA → DFA → minimized-DFA evidence is recorded in the [regular expression](docs/automata/regular-expression.md), [NFA](docs/automata/nfa.md), [DFA](docs/automata/dfa.md), and [minimization](docs/automata/minimization.md) documentation. See [Current status](docs/status.md) for completion and latest verification. The [Phase 3 release gate](docs/release/phase-3-release-gate.md) preserves earlier evidence.

## Start here

| Need | Read |
| --- | --- |
| Read the final academic paper | [Final documentation](https://docs.google.com/document/d/1Q8BYOrsRL5etfIrDO8WJyDF4kosqH6syazlp8PAPTgs/edit) |
| Use the shared team document | [Google Docs execution guide](https://docs.google.com/document/d/1sjPsqJnhULjnTyqZo2iaPqDlImX-l2sUmqY9-tPVNsQ/edit) |
| Understand the project | [Project guide](docs/team-execution-guide.md) |
| Use the approved URL rules | [Core language specification](docs/language-spec.md) |
| See completion and verification | [Current status](docs/status.md) |
| Find your role | [Team roles](docs/team-roles.md) |
| Follow the four-week plan | [Roadmap](docs/roadmap.md) |
| Run the project | [How to run](docs/how-to-run.md) |
| Clone, branch and open a PR | [GitHub Desktop guide](docs/github-desktop-guide.md) |
| Follow contribution rules | [Contributing](CONTRIBUTING.md) |

Development phases are complete. Phase guides and the execution guide remain
as historical planning references. Future maintenance uses a new scoped issue
and PR rather than reopening the four-week plan.

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
