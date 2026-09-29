# Phase 4 Release QA Report

**QA owner:** Paul
**Checked:** September 29, 2026
**Tracker:** [Issue #77](https://github.com/seavens3nt/url-pattern-recognition/issues/77)

## Disposition

The frozen application passed the clean-install regression checks, full shared
URL corpus, API boundaries, and exercised browser flows. No release-blocking
application defect was reproduced in this scope. This is not a public-hosting
or deployment sign-off. Ranee's review and acceptance are pending. Presentation
retest and fallback verification remain due by October 5.

## Baseline and Environment

| Item | Value |
| --- | --- |
| Frozen application revision | `0eb389bac3f50d3ed0a2cae70bb8a36e6b79e480` |
| Frozen commit subject | `Reconcile Phase 3 gate evidence and Phase 4 timeline` |
| Latest `main` at test | `c2bda231535201a0a1a2debc5cf738c1bb5b51c0` |
| QA branch | `phase-4/paul-final-qa` |
| Revision used for report | `c2bda231535201a0a1a2debc5cf738c1bb5b51c0` |
| Application-source comparison | No changes from frozen revision in `backend/`, `frontend/`, `tests/`, `scripts/`, or `pyproject.toml` |
| OS | Windows 11 Home Single Language, 10.0.26200, build 26200, 64-bit |
| Python / Flask / pytest / Ruff | 3.14.4 / 3.1.3 / 9.1.1 / 0.16.9 |
| Node.js / npm / Vite / Vitest | v24.12.0 / 11.6.2 / 7.3.6 / 3.2.7 |
| Git | 2.51.0.windows.1 |
| Browser | VS Code integrated Chromium, Chrome 150.0.7871.250, Electron 43.6.0 |

The QA branch was clean and at fetched `origin/main` before report creation.
Testing used a separate detached worktree at the frozen commit, with a new
Python virtual environment and `npm ci`; no existing project environment or
`node_modules` directory was reused. Package downloads may use the machine's
normal package-manager cache.

## Clean Setup and Commands

From the repository root in PowerShell, the isolated setup and checks were:

```powershell
git worktree add --detach ..\url-pattern-recognition-qa-frozen-0eb389 0eb389bac3f50d3ed0a2cae70bb8a36e6b79e480
cd ..\url-pattern-recognition-qa-frozen-0eb389
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r backend/requirements-dev.txt
cd frontend
npm.cmd ci
cd ..
.\.venv\Scripts\python.exe scripts/check_all.py
```

The documented API smoke used two terminals in the frozen worktree. In terminal
1, start Flask:

```powershell
.\.venv\Scripts\python.exe -m flask --app backend.app:create_app run --host 127.0.0.1 --port 5000
```

In terminal 2, from the worktree root, run:

```powershell
.\.venv\Scripts\python.exe scripts/smoke_api.py
```

For browser testing, Vite was started from `frontend` with
`npm.cmd run dev -- --host 127.0.0.1 --port 5173`. Both services ran from the
frozen worktree. No public hosting target was selected; hosted deployment was
not verified.

## Result Matrix

| Check | Result | Evidence |
| --- | --- | --- |
| Backend lint | PASS | Ruff reported all checks passed. |
| Backend tests | PASS | 454 passed. |
| Frontend lint | PASS | ESLint completed successfully. |
| Frontend tests | PASS | 38 passed across 3 files. |
| Frontend production build | PASS | 51 modules transformed; Vite build completed in 0.95 s. |
| Documented API smoke | PASS | Health plus accepted A01 and rejected R01. |
| Live shared corpus | PASS | 36/36 HTTP cases matched fixture verdicts and had one trace row per input character: 15 accepted, 21 rejected. |
| Invalid request boundary | PASS | Missing field, malformed JSON, and URL over 2,048 characters each returned HTTP 400. |
| Request body boundary | PASS | JSON body over 16 KiB returned HTTP 413. |
| API health | PASS, limited meaning | HTTP 200 with `status: ok` and `validator_ready: true`; see readiness risk below. |
| Browser accepted/rejected flows | PASS | Both exercised in the UI at desktop and narrow CSS viewport widths. |
| Browser invalid-request presentation | PASS | Deterministic HTTP 400 at the browser API boundary rendered as Request error, not a DFA rejection. The real API 400 boundary was independently exercised above. |
| Browser offline and Retry | PASS | Stopped and restarted only the frozen-worktree Flask server; details below. |
| Public deployment | NOT RUN | Hosting destination is not selected. |

## Browser Results

The app was exercised in VS Code integrated Chromium at 1440px and 375px CSS
viewport widths. The browser runs at 80% zoom (`devicePixelRatio` 0.8), so the
requested viewport dimensions were calibrated using `window.innerWidth`. At
both widths, document `scrollWidth` equaled `clientWidth`; no horizontal
overflow was observed.

| Flow | Input / action | Observed result |
| --- | --- | --- |
| Accepted | `https://example.com` | Accepted; final state `M13`; 19 transition rows. |
| Rejected | `ftp://example.com` | Rejected; final state `M_sink`; all 17 input characters shown in the trace. |
| Invalid request | Intercept validation call with HTTP 400 and `invalid_request` JSON | “Request error” and the request message rendered; not presented as a language rejection. |
| Offline | Stop isolated Flask, then submit `https://example.com` | Vite proxy could not reach Flask; UI showed “Backend unavailable”, “Cannot reach the backend”, and Retry. Failed upstream was logged as HTTP 500. |
| Retry recovery | Restart Flask and click Retry without reloading | Accepted, `M13`, 19 rows; status changed to “Backend connected”. |
| Narrow viewport | Run accepted flow at 375px CSS width | Form and result remained available; no document horizontal overflow. |

## Screenshots

- [ ] Desktop: accepted result
<img width="1177" height="917" alt="accepted recognizer" src="https://github.com/user-attachments/assets/102b25c3-f1e4-4e0e-ab0a-b786d701ad82" />

- [ ] Desktop: rejected result
<img width="1173" height="917" alt="rejected recognizer" src="https://github.com/user-attachments/assets/749d4e46-5929-4ae4-bcce-38c465da5cab" />

- [ ] Offline (backend unavailable)
<img width="1162" height="725" alt="desktop ver - offline" src="https://github.com/user-attachments/assets/56623bb2-4124-4dce-a14e-6db95208e97c" />

- [ ] Invalid request (HTTP 400)
<img width="1167" height="727" alt="invalid" src="https://github.com/user-attachments/assets/05688cfd-20ec-4b9b-9efe-34014cda345b" />

- [ ] Retry
<img width="1172" height="925" alt="retry recognizer" src="https://github.com/user-attachments/assets/33d5df31-957f-4991-9059-26a5c9f5ebfc" />

- [ ] Narrow/mobile accepted result
<img width="313" height="845" alt="narrow ver" src="https://github.com/user-attachments/assets/49a86173-c218-4d1c-ac31-c2b13f6eb7cb" />

## Residual Risks and Follow-up

- **Security:** `npm audit --omit=dev` reported 0 vulnerabilities. Full
  `npm audit` reported 2 moderate development-only findings in `vitest` and
  transitive `@vitest/mocker`, advisory
  [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9).
  npm reports the available fix as Vitest 5, a major upgrade; no dependency was
  changed in this QA task.
- **Accessibility:** Browser semantics exposed a labeled input, named buttons,
  status/alert regions, headings, and a trace table. This was not a complete
  keyboard, screen-reader, contrast, or WCAG audit; no automated accessibility
  scanner was run.
- **Performance:** The build's largest asset is `isaiah-C578o1Ri.png` at
  1,764.75 kB. No load test, hosted latency measurement, or production asset
  transfer test was run.
- **Deployment:** No public hosting target was selected or verified. Local
  development servers are not public hosting evidence.
- **Readiness:** `/api/health` returns a constant `validator_ready: true`; health
  proves endpoint connectivity only. The accepted/rejected API smoke exercises
  actual validation.
- **Presentation:** The October 5 local fallback/demo retest is still pending.
  Record it separately from this September 29 frozen-commit result.

## Defect and Review Status

No release-blocking defect was reproduced, so no implementation defect was
filed. The initial apparent narrow-width overflow was a measurement error from
integrated-browser zoom and scrollbar width; corrected CSS viewport checks
showed no overflow. Implementation, formal-model, and frontend files were not
edited. 


