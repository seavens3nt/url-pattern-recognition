# Phase 2 deployment foundation check

Owner: Ranee Mikaella V. Gutierrez (`@seavens3nt`)  
Phase gate: September 20, 2026, 11:59 PM Asia/Manila

## Purpose

This check proves that the repository can run its full verification suite, start the Flask API for a smoke test, and build a production-style React and Flask deployment. It does not claim that the final public deployment is complete.

## Local verification

Run these commands from the repository root in PowerShell:

```powershell
.\.venv\Scripts\python.exe .\scripts\check_all.py
```

Expected result: Ruff, pytest, ESLint, Vitest, and the Vite production build all pass, followed by `All project checks passed.`

To check the API, start Flask in one terminal:

```powershell
.\.venv\Scripts\python.exe -m flask --app backend.app:create_app run --host 127.0.0.1 --port 5000
```

Then run this from a second terminal at the repository root:

```powershell
.\.venv\Scripts\python.exe .\scripts\smoke_api.py
```

Expected result: the health endpoint responds successfully, and one accepted and one rejected shared fixture return HTTP 200 with the required response fields and correct verdicts.

## Container verification

Docker Desktop must be installed and running. From the repository root:

```powershell
docker compose up --build
```

Open `http://localhost:8080`, submit one accepted URL and one rejected URL from `tests/fixtures/url_cases.json`, and confirm that the verdict, final state, and trace appear. Stop the containers with:

```powershell
docker compose down
```

## Security and validation checks

- The browser sends the URL only to the local `/api/validate` endpoint.
- The backend treats the URL as text and never fetches or opens it.
- Flask rejects malformed requests and limits request bodies to 16 KiB.
- The validation service limits the URL value to 2,048 characters.
- Nginx limits request bodies, adds basic browser security headers, and exposes Flask only through `/api/`.
- The backend container runs as a non-root user.
- No secret or `.env` file is required or included in the container images.

## PR evidence

Attach or paste the following in the PR:

- Output from `scripts/check_all.py`.
- Output from `scripts/smoke_api.py`.
- Output from `docker compose config`.
- A screenshot of `http://localhost:8080` showing a completed validation.
- Any limitation that remains for Phase 3 or the final hosted deployment.

Link the PR with `Refs #35`. Ranee reviews the combined result and closes Issue #35 only after every required check passes.
