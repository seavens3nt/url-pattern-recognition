# Phase 3 End-to-End Release QA Report

**QA owner:** Paul

**Original candidate:** `a86e13877d658e7283c02ac143be35a5c7389a4a` (September 25, 2026)

**Offline/retry retest baseline:** `3ebba57d692db818dc3c7809d20637fb2e13db38` (current `main`, September 27, 2026)

**Scope:** QA evidence for the locked Phase 2 candidate, followed by an explicitly separate retest after Sean's frontend correction. No implementation repair is part of this PR.

## Result

The locked candidate passed the reported simulator/API corpus checks and the
accepted, rejected, request-error and route samples in the browser. The browser
offline check **failed**: the attached screenshot shows `Request error` with an
unexpected HTTP 500 response, rather than `Backend unavailable`. This is
recorded as QA-64-01 below. The later main-branch retest passed after PR #69;
that result must not be attributed to the original candidate. Browser checks
sampled URLs; they did not run the React client against all 36 fixture rows.
The retest also exposed a low-severity stale health badge after a successful
Retry; QA-64-02 remains open for the frontend owner.

Docker/Compose production deployment was not part of this QA run. The Phase 2
gate records Docker availability as a separate Ranee-owned deployment check.

## Candidate and environment

| Item | Value |
| --- | --- |
| Git revision | `a86e13877d658e7283c02ac143be35a5c7389a4a` |
| Git subject | `Sync Phase 3 guide and run instructions (#57)` |
| Branch | `paul/phase-3-release-qa` |
| Python | 3.14.4 in local `.venv` |
| Node | v24.12.0 |
| npm | 11.6.2 |
| Backend | Flask at `http://127.0.0.1:5000` |
| Frontend | Vite at `http://127.0.0.1:5173` |

## Commands and results

Paul's original candidate results are recorded below. The corrected Windows
command spelling matches `docs/how-to-run.md` and can be run from the repository
root; the original report accidentally prefixed the venv path with `\.`.

| Command | Result |
| --- | --- |
| `.\.venv\Scripts\python.exe scripts/check_all.py` | Reported PASS: Ruff; 446 backend tests; ESLint; 29 frontend tests; Vite build |
| `.\.venv\Scripts\python.exe scripts/smoke_api.py` | Reported PASS: health plus accepted/rejected smoke cases |
| Independent Python corpus/API cross-check (original invocation not recorded) | Reported PASS: 36 simulator cases, 36 API cases, full trace lengths; reproducibility is limited without the original command |
| `git rev-parse HEAD` | `a86e13877d658e7283c02ac143be35a5c7389a4a` |
| `git diff --check` | Passed before report creation; the final PR diff is checked separately below |

The production build reported JavaScript 217.71 kB (68.59 kB gzip), CSS
21.99 kB (5.19 kB gzip), and `index.html` 0.48 kB (0.32 kB gzip). The largest
image was `isaiah-C578o1Ri.png` at 1,764.75 kB.

## Cross-layer result matrix

| Area | Cases/check | Expected | Actual | Status |
| --- | --- | --- | --- | --- |
| Simulator corpus | 36 fixture rows | Fixture verdict | 15 accepted, 21 rejected; all matched | PASS |
| API corpus | 36 fixture rows | HTTP 200 and fixture verdict | 36 HTTP 200; all verdicts matched | PASS |
| Trace contract | 36 API rows | One trace row per raw input character | All trace lengths matched input lengths | PASS |
| API health | `/api/health` | HTTP 200, ready true | `status: ok`, `validator_ready: true` | PASS |
| Missing URL | `{}` | HTTP 400 `invalid_request` | HTTP 400 with expected code | PASS |
| Oversized URL transport | 2,049-character URL | HTTP 400 `invalid_request` | HTTP 400 with expected code | PASS |
| Oversized request body | Body over 16 KiB | HTTP 413 | HTTP 413 | PASS |
| Browser accepted | `https://example.com` | Accepted result, final state and trace | Accepted, final state `M13`, 19-step trace | PASS |
| Browser rejected | `https://example.com:8080/` | Rejected sink result and complete trace | Rejected, final state `M_sink`, 25-step trace | PASS |
| Browser routes | Home, Recognizer, How it Works, About Us | Each route renders | All four rendered with expected headings | PASS |
| Browser offline | Attempted offline scenario (reported as an aborted validation request) | Backend unavailable and Retry | Screenshot shows Request error, unexpected HTTP 500, and Retry | FAIL: QA-64-01 |
| Browser retry | Retry after the HTTP 500 result | Request succeeds when backend returns | Accepted result restored, but this did not prove the original offline state | PARTIAL |
| Browser request error | Simulated HTTP 400 | Request error, not rejected | `Request error` and `URL is required.` observed | PASS |
| Timeout behavior | Frontend regression coverage | Timeout remains distinct | Covered by the 29-test frontend suite | PASS |

The normal browser input control enforces a 2,048-character maximum, so a
2,049-character value cannot be entered through ordinary UI typing. The
2,049-character URL and over-16 KiB body boundaries were independently verified
against the API transport. Frontend request-error mapping was verified with a
simulated HTTP 400 response.

## Current-main retest of QA-64-01

The correction in merged PR #69 was retested against the code in main commit
`3ebba57d692db818dc3c7809d20637fb2e13db38`. The isolated PR branch also
contained that main commit; its pre-report-edit merge commit was `1fbd068`.
This is a second test baseline, not a replacement for the original candidate.

| Check | Reproducible command or action | Result |
| --- | --- | --- |
| Backend lint | `python -m ruff check backend tests scripts` | PASS |
| Backend tests | `python -m pytest --basetemp=.pytest-pr70-final -p no:cacheprovider` | 454 passed, using Python 3.14.2 from an existing project venv |
| Corpus parity | `python -m pytest tests/test_integration.py::test_fixture_simulator_and_api_verdicts_agree --basetemp=.pytest-pr70-corpus -p no:cacheprovider` | 36 fixture cases passed |
| Frontend lint | `cd frontend; npm run lint` | PASS |
| Frontend tests | `cd frontend; npm test` | 37 passed across 3 files |
| Production build | `cd frontend; npm run build` | PASS; JavaScript 218.06 kB (68.70 kB gzip), CSS 22.21 kB (5.23 kB gzip) |
| API smoke | Start Flask on port 5000, then `python scripts/smoke_api.py` | PASS: A01 and R01 |
| Real offline browser test | Start Vite on port 5173 with Flask stopped; submit `https://example.com` | `Backend unavailable`, `Cannot reach the backend`, and Retry displayed |
| Recovery browser test | Start Flask on port 5000; click Retry without reloading the page | Accepted, final state `M13`, 19 trace rows; the health badge stayed stale (QA-64-02) |

Browser setup was `cd frontend; npm ci`, then
`npm run dev -- --host 127.0.0.1`. For recovery, Flask was started from the
repository root with
`python -m flask --app backend.app:create_app run --host 127.0.0.1 --port 5000`.
Before that command, Flask was stopped and the Vite proxy's validation request
failed. The browser check used the same page without reloading between the
offline result and Retry.

For the Python commands, use the interpreter from a venv with
`backend/requirements-dev.txt` installed. In a normal Windows checkout, replace
`python` with `.\.venv\Scripts\python.exe`. The complete checker first hit an
existing Windows pytest temporary-directory permission error during this
retest; the fresh `--basetemp` run above passed. The initial sandboxed frontend
run could not read Vite's config; Vitest and the build passed when run outside
that sandbox. Neither failure is recorded as an application defect.

## Browser evidence

Browser results were verified directly in the running application and are
recorded in the result matrix above.

### accepted recognizer

![accepted recognizer](https://github.com/user-attachments/assets/2ac28c25-3490-46ab-b20d-04dd8f01e27a)

### rejected recognizer

![rejected recognizer](https://github.com/user-attachments/assets/b41db705-9969-4eb8-aa6a-8d68687c7952)

### offline attempt on the original candidate — failed

![offline recognizer](https://github.com/user-attachments/assets/4d2a2876-d2c2-4a2f-94ef-eb6f1aa760ba)

### retry recognizer

![retry recognizer](https://github.com/user-attachments/assets/2f77f283-25c4-4f17-a8d9-fa440b67e890)

### home

![home](https://github.com/user-attachments/assets/e265ad7e-aead-446b-a2a6-37fee2683fa2)

### recognizer

![recognizer](https://github.com/user-attachments/assets/49593363-b2cc-497f-9cd8-53ce8112c979)

### about us

![about us](https://github.com/user-attachments/assets/86fb628b-f659-4f64-ad6c-5c02d7cb4aa3)

### how it works

![how it works](https://github.com/user-attachments/assets/4859c32a-62bc-40ad-9dfb-b2a13939c6d2)

Observed route headings:

- Home: `URL Pattern Recognition`
- Recognizer: `URL Pattern Recognition`
- How it Works: `How it Works`
- About Us: `About Us`

## Defect register and retest evidence

| ID | Reproduction | Expected | Actual | Owner | Retest status |
| --- | --- | --- | --- | --- | --- |
| QA-64-01 | On the original candidate, run the attempted offline browser scenario and submit `https://example.com` | `Backend unavailable` and Retry | Attached offline screenshot shows `Request error` and unexpected HTTP 500 | Sean (frontend validator) | PASS on `3ebba57`: real stopped-Flask browser run displayed Backend unavailable; after Flask restarted, Retry returned Accepted, `M13`, 19 trace rows |
| QA-64-02 (low) | On `3ebba57`, load Recognizer with Flask stopped, submit `https://example.com`, start Flask, then click Retry without reloading | Health indicator updates to connected after recovery | Result becomes Accepted with 19 trace rows, but the health badge still says `Backend unavailable — start Flask in terminal 1.` | Sean (frontend validator) | OPEN; no implementation change is part of this QA PR |

No implementation files were edited as part of this QA package. The frontend
repair was merged separately in PR #69. The only intended PR #70 change is this
QA-owned report.

## Final disposition

The original candidate's offline result failed; the later retest passed with
one low-severity display issue still open. The candidate commits and each result
are separated above. This QA report is ready
for Ranee's review; it does not declare the Phase 3 feature-freeze commit or
complete the separate Docker/port-8080 deployment gate.
