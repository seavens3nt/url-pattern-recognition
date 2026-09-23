# How to run the project

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

Prefer buttons? Follow [the GitHub Desktop cloning steps](github-desktop-guide.md), then continue at step 4 here. Do not clone again if you already used Desktop.

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
Success includes `Running on http://127.0.0.1:5000`. Leave this terminal open. Open http://127.0.0.1:5000/api/health in your browser: you should see `status` equal to `ok` and `validator_ready` equal to `true`. A 404 at the backend root `/` is normal; it is an API, not the web page.

## 7. Start the frontend in terminal 2

Open a second terminal. In VS Code, use Terminal > New Terminal. Make sure it starts in the repository root, then run:
```powershell
cd frontend
npm run dev
```
Success includes `Local: http://127.0.0.1:5173/` or `http://localhost:5173/`. Keep both terminals open. Open http://localhost:5173 in your browser.

## 8. Check that it works

- The page title is URL Pattern Recognition.
- On the Home page, select **Start** or **Recognizer** to open the validator.
- The connection message becomes **Backend connected**.
- Enter `https://example.com` and press **Run DFA**.
- You should see an accepted result for `https://example.com`, including its final DFA state and transition trace.

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
| 501 from /api/validate | The working validator returns HTTP 200 for a well-formed request, whether the URL is accepted or rejected. Restart the backend from the checked-out project revision; a stale server may still be running. A 400 means the request input was missing or malformed. |

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
