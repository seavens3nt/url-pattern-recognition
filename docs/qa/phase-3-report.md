# Phase 3 End-to-End Release QA Report

**QA owner:** Paul  
**Tested commit:** `a86e13877d658e7283c02ac143be35a5c7389a4a`  
**Branch:** `paul/phase-3-release-qa`  
**Evidence date:** 2026-09-25  
**Scope:** Locked Phase 2 candidate; no implementation repair performed.

## Result

**PASS for the verified release-candidate scope.** The simulator, API and React
client agreed on all 36 fixture rows. The complete checker passed, API
transport/security cases passed, all four routes rendered, and accepted,
rejected, request-error, offline and retry states were observed. No critical or
high-severity defect was reproduced.

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

Commands were run from the repository root unless noted.

| Command | Result |
| --- | --- |
| `\.\.venv\Scripts\python.exe scripts/check_all.py` | PASS: Ruff; 446 backend tests; ESLint; 29 frontend tests; Vite build |
| `\.\.venv\Scripts\python.exe scripts/smoke_api.py` | PASS: health plus accepted/rejected smoke cases |
| Independent Python corpus/API cross-check | PASS: 36 simulator cases, 36 API cases, full trace lengths |
| `git rev-parse HEAD` | `a86e13877d658e7283c02ac143be35a5c7389a4a` |
| `git diff --check` | PASS before report creation |

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
| Browser offline | Aborted validation request | Backend unavailable and Retry | Expected alert and Retry observed | PASS |
| Browser retry | Retry after offline | Request succeeds when backend returns | Accepted result restored | PASS |
| Browser request error | Simulated HTTP 400 | Request error, not rejected | `Request error` and `URL is required.` observed | PASS |
| Timeout behavior | Frontend regression coverage | Timeout remains distinct | Covered by the 29-test frontend suite | PASS |

The normal browser input control enforces a 2,048-character maximum, so a
2,049-character value cannot be entered through ordinary UI typing. The
2,049-character URL and over-16 KiB body boundaries were independently verified
against the API transport. Frontend request-error mapping was verified with a
simulated HTTP 400 response.

## Browser evidence

Browser results were verified directly in the running application and are
recorded in the result matrix above.

### Accepted recognizer

![Accepted recognizer](https://github.com/user-attachments/assets/6b6eabc3-a13f-487f-931e-ebe35f137961)

### Offline state

![Offline state](https://github.com/user-attachments/assets/cca3cc2d-3464-4945-acd5-f946f09eddf2)

Observed route headings:

- Home: `URL Pattern Recognition`
- Recognizer: `URL Pattern Recognition`
- How it Works: `How it Works`
- About Us: `About Us`

## Defect register and retest evidence

| ID | Reproduction | Expected | Actual | Owner | Retest status |
| --- | --- | --- | --- | --- | --- |
| None | No reproducible release-blocking defect found on the locked candidate | Candidate behavior matches language, API and UI contracts | All listed checks passed | N/A | N/A |

No implementation files were edited and no defect was repaired as part of this
QA package. The only intended change is this QA-owned report.

## Final disposition

The candidate commit and tested results are explicit above. Cross-layer corpus
agreement, transport boundaries, browser route coverage, accepted/rejected
traces, offline/request-error/retry behavior and automated timeout coverage all
passed. This report is ready for Ranee's review and acceptance; it does not
constitute a commit or merge into `main`.
