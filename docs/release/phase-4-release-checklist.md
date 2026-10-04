# Phase 4 release-control checklist

> Historical verification record: the checks below describe September 29
> and its frozen revision. Ranee declared the project complete October 4.
> Hosting, portrait optimization and later application changes have shipped.
> Use [Current status](../status.md) and [Vercel deployment](vercel-deployment.md)
> for current evidence. Preserve the original observations below rather than
> treating them as current open blockers.

**Owner:** Ranee Mikaella V. Gutierrez

**Issue:** [#78](https://github.com/seavens3nt/url-pattern-recognition/issues/78)

**Checked:** September 29, 2026 (Asia/Manila)

**Frozen application commit:** `0eb389bac3f50d3ed0a2cae70bb8a36e6b79e480`
**Main checked:** `94fabf95ed1a7aed84c62516f9991be8c6bdbb77`

The only tracked change between those commits is `docs/status.md`, the Phase 4
GO record. The application tested here therefore matches the frozen code. This
is a local release verification, not a claim of a public deployment or a
completed course submission.

## Verified on the frozen application

| Check | Result and evidence |
| --- | --- |
| GitHub CI | The `Project checks` run on `94fabf9` passed backend, frontend, and API-smoke jobs. The earlier post-merge run on frozen commit `0eb389b` also passed all three jobs. |
| Full checker in working checkout | Using the project's Python virtual environment, `scripts/check_all.py` passed Ruff, 454 backend tests, ESLint, 38 frontend tests, and the Vite production build. Built JS was 218.28 kB (68.75 kB gzip) and CSS was 22.21 kB (5.23 kB gzip). |
| Clean clone and setup | A fresh shallow clone of `main` at `94fabf9`, newly created Python 3.14 virtual environment, `pip install -r backend/requirements-dev.txt`, and `npm ci` completed. Running that clone's full checker passed the same 454 backend tests, 38 frontend tests, lint and build. The temporary clone was removed after verification. |
| Compose build and startup | `docker compose config --quiet`, `docker compose build`, and `docker compose up -d --no-build` passed. The backend became healthy; Nginx served the app at `http://127.0.0.1:8080`. Only this checkout's containers/network were created and later removed with `docker compose down`. |
| API smoke and routes | With `API_BASE_URL=http://127.0.0.1:8080`, `scripts/smoke_api.py` passed A01 and R01. Home, Recognizer, How It Works and About Us routes each returned HTTP 200. |
| Accepted and rejected samples | `http://example.com` returned HTTP 200, `accepted: true`, final state `M13`, 18 trace rows. `ftp://example.com` returned HTTP 200, `accepted: false`, final state `M_sink`, 17 rows. `https://example.com` returned accepted, `M13`, 19 rows. |
| Request boundaries | Empty JSON returned HTTP 400; a JSON body containing 17,000 `a` characters returned HTTP 413 through Nginx. A 413 from Nginx may be HTML rather than Flask's JSON shape. |
| Restart recovery | Stopping only the project backend made `/api/health` through Nginx return HTTP 504. Restarting that backend restored the A01/R01 API smoke. This retest confirms routing recovery; the browser's visual offline/Retry state was verified on September 28 in the [Phase 3 gate record](phase-3-release-gate.md), not repeated visually in this check. |
| Production dependency audit | `npm audit --omit=dev --audit-level=moderate` reported zero production advisories. The clean `npm ci` reported two moderate advisories in development tooling. |

The first local checker attempt used system Python, which lacked Ruff. The next
sandboxed run reached Vitest but could not read its Vite config. A normal-access
run then encountered a stale, access-denied `.pytest-tmp`; after removing only
that verified project-local temporary directory, the complete checker passed.
These were environment/setup interruptions, not application-test failures.

## Release limits and decisions

- **No application blocker found in these checks.** New product features remain
  frozen. Any later reproducible blocker needs an issue, an owner, a targeted
  fix with tests, and Ranee's explicit release decision.
- **Public hosting is unverified.** The hosting destination is unselected. Do
  not label local Compose, a healthy endpoint, or a build as a public release.
  `/api/health` reports connectivity; its current `validator_ready` field does
  not load or validate the DFA model. Use an accepted validation smoke case to
  prove the model can run.
- **Performance:** one local HTTP sample measured 185 ms for the first accepted
  request, then 15 ms for the rejected and 6 ms for the HTTPS request. These
  are single local observations, not a load test or hosted latency. The About
  Us `isaiah` image remains 1.76 MB; Isaiah's final visual package owns the
  user-visible assessment and any assigned optimization.
- **Evidence:** the missing screenshot from the exact September 28 container
  run was accepted as a Phase 3 evidence exception. Isaiah's current Phase 4
  screenshots and Paul's independent final QA remain separate deliverables.
- **Final tag:** not created. Hold until the final package and tested release
  revision are accepted. No GitHub Release has been published.
- **Submission receipt:** not available. Ranee confirmed on September 29 that
  no portal submission is required yet; a portal URL/cutoff and Cedric's final
  export/slides were not provided in this verification. Do not mark submission
  complete until the actual files, links and receipt are checked.
- **October 6 presentation:** rehearsal, speaking order and fallback still
  require the Phase 4 team packages. This check does not certify defense
  readiness.

## Submission and demo sequence

1. Review Cedric's final report export, references, slides and links against
   `docs/report/evidence-index.md`; inspect the exported pages and actual
   files. Confirm the portal and its real cutoff when submission is required.
2. Review Paul's clean-run/QA report and Isaiah's final screenshots. Triage
   reproducible release blockers. Re-run the affected checks on any changed
   application commit and record the new exact revision before tagging.
3. On the accepted release revision, run the full checker, API smoke and local
   demo; verify the published commit's CI. Only then choose a final tag and
   record it here. A tag is not a submission receipt.
4. When instructed to submit, upload the verified files, reopen every submitted
   link, and save the portal receipt. Record the actual time and destination;
   do not infer submission from a GitHub merge.
5. Before October 6, time the eight-member explanation and live demo. Keep a
   local Compose or documented two-terminal Flask/Vite run as the fallback.
   If a later hosted deployment exists, smoke its public URL and API separately.

For a local rollback after a release-blocking change, retain the frozen
`0eb389b` revision in a separate clean checkout, rebuild this project's Compose
stack from it, repeat A01/R01/API smoke, and switch the demo to that verified
local stack. Do not reset someone else's working branch or delete shared
containers. For a public deployment, define the host-specific rollback before
deploying; no host has been selected here.
