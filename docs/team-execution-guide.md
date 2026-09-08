# URL Pattern Recognition Four Week Team Execution Guide

This guide tells each teammate what to build, which files to use, who to coordinate with and what evidence to hand over. The project has four weekly phases. Calendar dates must be set by Ranee against the submission deadline.

## How to use this guide
1. Read this overview for architecture, GitHub rules and running instructions.
2. Open the current PHASE tab and find your name.
3. Check the required input and contact the named teammate before starting dependent work.
4. Work on a phase branch, open a reviewed PR and attach the handoff evidence.
5. The receiving teammate confirms the handoff before the issue is closed.

## Team and responsibilities
Ranee Mikaella V. Gutierrez (@seavens3nt) — Project Manager / Integration Lead
Isaiah Jasser C. Otilano (@m1nay3on) — Language Analyst
Punzalan, Ralph Kenneth G. (@rlken) — Regular Expression / NFA Designer
Babaran, Pamela R. (@Qiuyuan26) — DFA Designer
Tumolac, Sean Matthew E. (@bonkbonkboomeykwkwkw) — Automata Optimizer
Noel, Jared L. (@AshenDary) — Simulator Programmer
Paul Joshua R. Campos (@paulccampos) — Tester / QA
Sigue, Cedric Kristoff R. (@cedricsigue) — Documentation / Presentation Lead

## Technology stack
React + Vite and CSS for the browser; Python + Flask for the API; custom Python automata modules; Graphviz for diagrams; Figma for UI/UX; pytest, Vitest and React Testing Library for tests; Git and GitHub for collaboration. No database or AI/ML is needed for the core scope.

## Current state and scope
The starter connects React to Flask and deliberately returns a pending-implementation response for validation. The approved URL language, formal artifacts and real simulator are still team deliverables. The four-week plan is not a claim that future work is complete.

## Phase overview
Week 1: foundation, approved scope, wireframes, API contract and test cases.
Week 2: RE/NFA/DFA/minimization, with UI and API shell work in parallel.
Week 3: actual simulator and React result/trace integration.
Week 4: verification, delivery, report, slides and defense.

## Cross-team handoff sequence
Isaiah’s approved language → Ralph’s NFA → Pamela’s DFA → Sean’s minimized model → Jared’s API → Sean’s integrated UI → Paul’s release evidence → Cedric’s final report/demo → Ranee’s submission. QA and documentation run from Week 1, not just at the end.

## File architecture and ownership

## What exists now
```text
frontend/
  package.json and package-lock.json        Frontend dependencies only
  vite.config.js                           Local /api proxy to Flask
  src/
    main.jsx                               React entry point
    App.jsx                                Application composition
    features/validator/
      ValidatorPage.jsx                    Sean: input, loading, message and layout
      api.js                               Sean + Jared: HTTP boundary
    style.css                              Sean: styles, reviewed by Isaiah
    App.test.jsx                           Paul: browser-component behavior tests
backend/
  app.py                                   Jared: Flask factory and global errors
  routes/validation.py                     Jared: HTTP routes and status codes
  services/validation.py                   Jared: payload checks and pending engine boundary
  automata/                                Formal model and simulator destination
  requirements.txt and requirements-dev.txt Backend dependencies only
tests/test_api.py                          Paul: API contract and boundary tests
docs/phases/week-1.md through week-4.md     Weekly work and named coordination
.github/workflows/checks.yml               Ranee: CI with Paul reviewing checks
```

## Planned artifacts and files
These paths are delivery targets; their absence does not mean the task is finished. Do not create fabricated academic outputs just to fill a path.

- `docs/language-spec.md` — Isaiah; approved schemes, alphabet and component rules.
- `docs/ui/wireframes.md` — Isaiah; Figma link, screen behavior and accessibility notes.
- `docs/automata/notation.md` — Pamela; state naming and character-class conventions.
- `docs/automata/regular-expression.md` and `nfa.md` — Ralph; RE and epsilon-NFA construction.
- `docs/automata/dfa.md` — Pamela; epsilon closures and subset construction.
- `docs/automata/minimization.md` — Sean; partitions and original-to-minimized mapping.
- `docs/automata/diagrams/*.dot` — artifact owner; editable Graphviz diagram sources.
- `backend/automata/model.py` — Jared implements data structures agreed with Pamela and Sean.
- `backend/automata/simulator.py` — Jared; deterministic traversal independent of Flask.
- `backend/automata/url_dfa.json` — Sean supplies reviewed transitions; Jared integrates. No approved model exists yet.
- `tests/fixtures/url_cases.json` — Paul, expected outcomes reviewed by Isaiah.
- `tests/test_simulator.py` — Paul with Jared; real transitions, acceptance and trace behavior.
- `docs/qa/` — Paul; case coverage, findings and release evidence.
- `docs/report/`, `docs/presentation/` — Cedric; report, slides outline, demo and defense material.
- `docs/release/` — Ranee; delivery plan, clean-setup record and release checklist.

## Request flow
Browser input -> ValidatorPage -> api.js -> Flask route -> validation service -> future simulator -> future approved DFA model -> JSON result -> React result and trace.

Today the service ends with HTTP 501 and `accepted: null`. The model and simulator are future work. The refactor preserves the existing endpoint behavior; it does not claim real URL validation.

## Coordination rules
Sean owns the React feature; Jared owns backend route/service changes. API field changes require both to agree in the linked issue before implementation; Paul updates contract tests with the same PR. Formal model changes require the originating designer and the next recipient to review. Cross-area edits require coordination with the owner first. Ranee manages integration and resolves unresolved ownership conflicts.

## GitHub rules and review workflow
- Every change goes through a small reviewed pull request. No direct commits to main.
- Use phase-specific branches such as `phase-2/nfa-construction` or `phase-3/react-trace`.
- Keep frontend dependencies in frontend/package.json and backend dependencies in backend/requirements*.txt. Follow the existing isolated Python environment in how-to-run.md.
- Frontend contributors must coordinate with the backend owner before backend edits; backend contributors must coordinate with the frontend owner before frontend edits. Record cross-area agreement in the issue or PR before implementation.
- Group growing UI code by feature; keep Flask routes separate from reusable automata/simulation logic. Do not mix verdict logic into UI or route handlers.
- Coordinate shared language, state-table and API changes first; update affected tests and docs in the same handoff.
- Use descriptive commits and PR descriptions with test evidence. Never silently relabel draft or sample data as an approved model.


Do not overwrite another owner’s model or schema without agreement. Record the consulted teammate, changed interface and receiving reviewer in the PR template. CODEOWNERS identifies eligible reviewers but does not itself enforce required approvals.

## Sprint meetings
Start each week with a goal, owners, acceptance criteria and dependency review. Every member posts completed work, next steps and blockers daily in their issue. End the week with a demonstration and one retrospective improvement. A blocker must name the person or artifact needed to proceed.

## Where work is tracked
Repository: https://github.com/seavens3nt/url-pattern-recognition
Phase checklists: GitHub issues 14, 15, 16 and 17. Deliverable issues 1–13 remain separate. The phase guides in docs/phases are the repository mirror of the four PHASE tabs. Update the relevant repository guide and Google Docs phase together after an agreed change; include both links in the PR. There is no automatic live synchronization.

## How to run the project

This guide starts from a computer with no project setup. You need internet access for the first installation. The commands below use Windows PowerShell; macOS/Linux differences are included at the end.

## 1. Accept your invitation

Sign in to the GitHub account listed in the team roles and accept the repository invitation. The repository is private, so you must accept before cloning it. You do not need to create a new repository or fork.

## 2. Install the tools once

- [Git](https://git-scm.com/downloads): downloads and updates the project.
- [Node.js](https://nodejs.org/en/download): use Node 22.12 or newer supported LTS; npm comes with it.
- [Python](https://www.python.org/downloads/): Python 3.11 or newer. On Windows, select the option to add Python to PATH if offered.
- Optional: [Visual Studio Code](https://code.visualstudio.com/) to edit files and open terminals.

Close and reopen your terminal after installing. Type each line separately:
```powershell
git --version
node --version
npm --version
python --version
```
Each should print a version. If Python is not found but `py --version` works, use `py` instead of `python` for the environment-creation command below. If a command is not found, restart the terminal and check that installation completed.

## 3. Download the project once

Open PowerShell in a folder where you keep school projects, then run:
```powershell
git clone https://github.com/seavens3nt/url-pattern-recognition.git
cd url-pattern-recognition
```
If Git asks you to sign in, use the invited GitHub account. The **repository root** is this `url-pattern-recognition` folder. It contains `README.md`, `frontend`, and `backend`.

## 4. Install Python dependencies once

Run these commands from the repository root:
```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r backend/requirements-dev.txt
```
The `.venv` folder keeps this project's Python packages separate. No activation command is required: using its Python path also avoids PowerShell activation-policy problems.

## 5. Install frontend dependencies once

Still from the repository root:
```powershell
cd frontend
npm ci
cd ..
```
`npm ci` installs the exact versions in the committed lockfile. Wait for it to finish. `cd ..` returns to the repository root.

## 6. Start the backend in terminal 1

From the repository root:
```powershell
.\.venv\Scripts\python.exe -m flask --app backend.app:create_app run --host 127.0.0.1 --port 5000
```
Success includes `Running on http://127.0.0.1:5000`. Leave this terminal open. Open http://127.0.0.1:5000/api/health in your browser: you should see `status` equal to `ok` and `validator_ready` equal to `false`. A 404 at the backend root `/` is normal; it is an API, not the web page.

## 7. Start the frontend in terminal 2

Open a second terminal. In VS Code, use Terminal > New Terminal. Make sure it starts in the repository root, then run:
```powershell
cd frontend
npm run dev
```
Success includes `Local: http://127.0.0.1:5173/` or `http://localhost:5173/`. Keep both terminals open. Open http://localhost:5173 in your browser.

## 8. Check that it works

- The page title is URL Pattern Recognition.
- The connection message becomes **Backend connected**.
- Enter `https://example.com` and press **Send to backend**.
- You should see **DFA validation is not implemented yet.** This is the expected starter response, not a setup error. No URLs are accepted or rejected yet.

## Each time you work

Run steps 6 and 7 again. You do not need to reinstall dependencies every time. Stop each server with **Ctrl+C** in its terminal. Closing the browser alone does not stop the servers.

Before getting updates, save your work and inspect `git status`. Commit your work on your task branch, or ask the integration lead if you are unsure. From the root, update the checked-out branch with:
```powershell
git pull --ff-only
```
If the dependency files changed, repeat the Python installation command and `npm ci`. Restart the servers after configuration or dependency changes. Do not discard uncommitted work to make an update succeed.

## Common problems

| Problem | What to do |
| --- | --- |
| Repository not found | Accept the invite and sign in using the invited account. |
| npm.ps1 cannot be loaded | Use `npm.cmd ci` and `npm.cmd run dev` in PowerShell; no security-policy change is needed. |
| package.json not found | Run npm commands inside `frontend`, not the repository root. |
| No module named flask | Use `.venv\Scripts\python.exe`, and repeat the requirements installation. |
| Could not import backend.app | Run the Flask command from the repository root. |
| Backend unavailable | Start terminal 1, check `/api/health`, then refresh the page. |
| Port 5000 or 5173 in use | Stop the project's old server terminal with Ctrl+C; do not stop unrelated apps blindly. Vite requires port 5173. |
| Flask cannot use port 5000 | Choose another port in the Flask command and change the matching proxy target in `frontend/vite.config.js`, then restart Vite. |
| 501 from /api/validate | Expected while the DFA is unimplemented. A 400 means the request input was missing or malformed. |

## macOS or Linux

Use `python3 -m venv .venv`, then `.venv/bin/python -m pip install -r backend/requirements-dev.txt` and `.venv/bin/python -m flask --app backend.app:create_app run --host 127.0.0.1 --port 5000`. The npm and Git commands are the same.

## Configuration and checks

No `.env` is needed for the default setup. `.env.example` documents optional Flask settings; the explicit startup command supplies them. Do not commit secrets. Frontend requests use `/api`; Vite forwards them to local Flask.

From the root:
```powershell
.\.venv\Scripts\python.exe -m pytest
.\.venv\Scripts\python.exe -m ruff check backend tests
```
From `frontend`:
```powershell
npm run lint
npm test
npm run build
```
The build creates `frontend/dist`. It does not deploy the app. Production hosting must route `/api` to a production Python server; `vite preview` alone does not provide the backend.

Reference: [Vite setup requirements](https://vite.dev/guide/) and [Flask installation](https://flask.palletsprojects.com/en/stable/installation/).
