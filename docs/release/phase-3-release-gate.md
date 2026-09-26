# Phase 3 release-gate evidence

**Owner:** Ranee Mikaella V. Gutierrez

**Checked:** September 25, 2026, Asia/Manila

**Candidate tested:** `a86e13877d658e7283c02ac143be35a5c7389a4a` on `main`
**Issue:** [#58](https://github.com/seavens3nt/url-pattern-recognition/issues/58)

This record separates checks that ran on the locked candidate from checks that
still require the Docker engine or accepted Phase 3 member work. It does not
declare a feature-freeze commit or a deployed release.

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

## Container blocker and recovery check

Docker Desktop was launched and its restart command was attempted. `docker
info` still could not connect to `npipe:////./pipe/dockerDesktopLinuxEngine`;
the `docker-desktop` WSL distribution was stopped, and this session could not
start `com.docker.service`. No port-8080 service was listening. These are local
engine/access conditions, not a demonstrated Compose or application failure.

When the engine is available, run from the repository root:

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

Phase 3 member PRs [#66](https://github.com/seavens3nt/url-pattern-recognition/pull/66),
[#67](https://github.com/seavens3nt/url-pattern-recognition/pull/67),
[#68](https://github.com/seavens3nt/url-pattern-recognition/pull/68),
[#69](https://github.com/seavens3nt/url-pattern-recognition/pull/69), and
[#70](https://github.com/seavens3nt/url-pattern-recognition/pull/70) remain open
for Ranee's review. Cedric's [Issue #42](https://github.com/seavens3nt/url-pattern-recognition/issues/42)
and the older conflicting [PR #55](https://github.com/seavens3nt/url-pattern-recognition/pull/55)
also remain unresolved. Paul's PR reports no critical or high-severity defects,
but that report has not yet been accepted on `main`.

**Gate assessment: hold feature freeze and Phase 4 activation.** The required
port-8080 deployment proof and accepted member audits are missing. Ranee's
final go/no-go decision and the frozen commit must be recorded after these
inputs are reviewed. Until then, `a86e138` is the tested Phase 2 candidate,
not a declared Phase 3 release candidate.
