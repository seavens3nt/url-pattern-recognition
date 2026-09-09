# URL Pattern Recognition PROJECT

An Automata Theory web app using React + Vite and Python + Flask.

## Start here

**New to running a project? Follow [How to run the project](docs/how-to-run.md).** It explains installations, folders, two terminals, and common errors.

The starter connects React to Flask. The URL validator is deliberately not implemented yet: submitting a URL returns a clear pending-implementation message, never a fabricated acceptance result.

## Project hub

- [Google Docs team execution guide](https://docs.google.com/document/d/1sjPsqJnhULjnTyqZo2iaPqDlImX-l2sUmqY9-tPVNsQ/edit)
- [Repository copy of the execution guide](docs/team-execution-guide.md)
- [File architecture and ownership](docs/architecture.md)

- [How to run](docs/how-to-run.md)
- [Roadmap and Agile sprints](docs/roadmap.md)
- [Current status](docs/status.md)
- [Project context and decisions](docs/context.md)
- [Team roles](docs/team-roles.md)
- [Skills and learning responsibilities](docs/skills.md)
- [Tech stack](docs/tech-stack.md)
- [API contract](docs/api-contract.md)
- [Contributing](CONTRIBUTING.md)
- [Shared Google Doc](https://docs.google.com/document/d/1d69DL9JlwwhTE8vPeQ9kBaWEzZUrey_OtatF9RUvFCk/edit)

## Quick start for returning developers

From the repository root, after completing the first-time setup:

Terminal 1 (Windows):
```powershell
.\.venv\Scripts\python.exe -m flask --app backend.app:create_app run --host 127.0.0.1 --port 5000
```
Terminal 2:
```text
cd frontend
npm run dev
```
Open http://localhost:5173. Keep both terminals running.

## Structure

```text
frontend/src/          React app and UI tests
backend/app.py         Flask API factory
backend/automata/      Future automata definitions and simulator
tests/                 Backend and future shared behavior tests
docs/                  Setup, roadmap, context, status, and team references
.agents/skills/        Repository-specific Codex skills
.github/               CI checks and contribution templates
```

## Checks

From the root: `.venv\Scripts\python.exe -m pytest` and `.venv\Scripts\python.exe -m ruff check backend tests`.
From `frontend`: `npm run lint`, `npm test`, and `npm run build`.
CI runs the same checks on pushes and pull requests. Deployment is a later sprint; development servers are for local use.
