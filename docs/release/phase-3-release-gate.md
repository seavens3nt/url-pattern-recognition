# Phase 3 release-gate evidence

**Owner:** Ranee Mikaella V. Gutierrez

**Checked:** September 25, 2026, Asia/Manila

**Candidate tested:** `a86e13877d658e7283c02ac143be35a5c7389a4a` on `main`
**Issue:** [#58](https://github.com/seavens3nt/url-pattern-recognition/issues/58)

The September 25 results below are retained as history. A separate September
28 retest on current `main` follows; do not attribute its passes to the
original candidate. This document does not declare a hosted release or choose
Ranee's feature-freeze commit.

## Verification on the locked candidate

| Check | Result | Evidence |
| --- | --- | --- |
| Full checker | Passed | `446` pytest tests, Ruff, ESLint, `29` Vitest tests, and Vite production build passed with `scripts/check_all.py`. |
| API smoke | Passed | `scripts/smoke_api.py` passed health, accepted `A01`, and rejected `R01` against a local Flask process. |
| Invalid request | Passed | `POST /api/validate` with `{"url":12}` returned HTTP `400`. |
| Oversized request | Passed | A 17,000-byte body sent with JSON content type to `POST /api/validate` returned HTTP `413`. |
| Compose configuration | Passed | `docker compose config --quiet` returned exit code `0`. |
| Candidate CI | Passed at merge | [PR #57](https://github.com/seavens3nt/url-pattern-recognition/pull/57) merged as `a86e138` with six successful checks. |
| Container/browser at port 8080 | **Pending** | Docker Desktop's Linux engine was unreachable; no container build or browser validation at port 8080 was completed. |

## September 28 local Compose retest on current main

**Tested revision:** `7da852001fbfa3f536e1bfe417e45713c04ec4c6`
(merged [PR #74](https://github.com/seavens3nt/url-pattern-recognition/pull/74)).
The isolated checkout used for the run had no tracked-file difference from
this commit (`git diff --exit-code origin/main HEAD` passed). This is a local
production-like test, not evidence of a hosted deployment.

| Check | Observed result |
| --- | --- |
| Full checker | Ruff and 454 backend tests passed; ESLint passed. The first sandboxed Vitest invocation could not read the Vite config, then normal-access Vitest passed 38 tests across three files. The frontend production build passed. |
| Compose build and startup | `docker compose config --quiet`, `docker compose build`, and `docker compose up -d --no-build` passed. The backend became healthy and Nginx served the frontend at localhost:8080. |
| Home and routes | HTTP 200 for home, recognizer, How it Works, and About Us; the home HTML had the correct title. Browser inspection showed the recognizer and connected status. |
| Accepted A01 | POST through localhost:8080 with `http://example.com` returned HTTP 200, accepted `true`, final state `M13`, and 18 trace rows for 18 input characters. The rendered browser result displayed Accepted, `M13`, and all 18 steps. |
| Rejected R01 | POST with `ftp://example.com` returned HTTP 200, accepted `false`, final state `M_sink`, and 17 trace rows for 17 characters. The rendered browser result displayed Rejected and `M_sink`. |
| HTTPS sample | `https://example.com` returned Accepted, `M13`, and 19 trace rows. |
| Request boundaries | An empty JSON object returned HTTP 400; a 17,000-character request body returned HTTP 413 through Nginx. |
| Offline and recovery | With only this project's backend container stopped, the browser showed Backend unavailable and Retry. After restarting it, Retry returned Accepted, `M13`, 19 trace rows, and the health badge changed to Backend connected. This independently retests the fix merged in [PR #73](https://github.com/seavens3nt/url-pattern-recognition/pull/73). |
| Local response times | One PowerShell sample measured 39 ms for A01, 9 ms for R01, and 9 ms for the HTTPS sample. These are local single requests, not a load test or hosted latency claim. |
| Dependency audit | `npm audit --omit=dev` reported zero production advisories. The full audit reported two moderate advisories in Vitest/test tooling; no high or critical finding. |

The browser run was inspected visually and through its accessibility tree. No
new screenshot file was saved from the port-8080 retest; the earlier
[interface screenshots](../ui/screenshots/) document the Phase 2 layout, not
this exact container run. If a persisted container screenshot is required for
submission, it remains an evidence item for Ranee before final release.
The temporary project containers and network were removed with
`docker compose down`; no hosted environment was changed.

The first sandboxed pytest run had 440 passes and six setup errors because
Windows denied access to the existing `.pytest-tmp` folder. The same checker
then passed all 446 tests with normal local filesystem access. Those first six
errors were not application test failures.

## Startup and production-build measurements

The local environment used Windows, Python 3.14.2, Node.js 22.22.0, npm
10.9.4, and Docker Compose 5.4.0. The values below are single-run observations,
not a load test or a hosted-deployment benchmark.

| Measurement | Observation |
| --- | --- |
| Flask process start to successful `/api/health` | Approximately `657 ms` |
| First accepted `POST /api/validate` after health | Approximately `8 ms`; accepted, final state `M13`, 18 trace rows |
| Vite build | `51` modules transformed; build completed in about `1.02 s` |
| Built JavaScript | `217,706` bytes (`68.59 kB` gzip reported by Vite) |
| Built CSS | `21,993` bytes (`5.19 kB` gzip reported by Vite) |
| All built assets | `2,797,687` bytes across 11 asset files |
| Largest asset | `isaiah-C578o1Ri.png`, `1,764,747` bytes; it belongs to the About Us team images |

The large team image is a performance follow-up for Isaiah's UI package
([Issue #62](https://github.com/seavens3nt/url-pattern-recognition/issues/62)).
Its transfer impact and any optimized replacement still need browser evidence.
The timing above uses Flask's local development server, so it does not prove
container startup or first-response time behind Nginx.

## September 25 container blocker and recovery instructions (historical)

Docker Desktop was launched and its restart command was attempted. `docker
info` still could not connect to `npipe:////./pipe/dockerDesktopLinuxEngine`;
the `docker-desktop` WSL distribution was stopped, and this session could not
start `com.docker.service`. No port-8080 service was listening. These are local
engine/access conditions, not a demonstrated Compose or application failure.
The September 28 container/browser retest above resolved this local check;
the instructions below are retained for repeat verification.

To repeat the check, run from the repository root:

```powershell
docker compose config --quiet
docker compose up --build
```

At `http://localhost:8080`, validate `A01` (`http://example.com`) and `R01`
(`ftp://example.com`). Record both verdicts, final states, traces, a screenshot,
container startup/first-response timing, and the exact tested commit. Then
stop only this project's containers with `docker compose down`. A successful
health check alone does not satisfy this gate.

## Review and freeze decision

Phase 3 member PRs
[#66](https://github.com/seavens3nt/url-pattern-recognition/pull/66)–[#74](https://github.com/seavens3nt/url-pattern-recognition/pull/74)
were merged by September 28. Ranee merged PR #74 and closed
[Issue #42](https://github.com/seavens3nt/url-pattern-recognition/issues/42).
The current `main` commit `7da8520` has three successful GitHub checks
(backend, frontend, and API smoke). Paul's Phase 3 QA report is on `main`;
its original failed offline check and later retest remain separately dated.

**Gate assessment:** the local technical checks now pass. Before Ranee
activates Phase 4, the corrected API contract and report/status records must
merge, CI must pass on that commit, and she must record her chosen frozen
commit and go/no-go decision in [status.md](../status.md) and
[tracker #65](https://github.com/seavens3nt/url-pattern-recognition/issues/65).
The screenshot item above is explicit so it can be completed or accepted as a
documented evidence exception. September 29 submission and October 6
presentation are separate milestones.
