# Current status

**Gate decision:** September 29, 2026 (Asia/Manila). The Phase 3 evidence and
older candidate results remain in
[the release-gate log](release/phase-3-release-gate.md).

| Status field | Value |
| --- | --- |
| Gate decision | **GO to Phase 4.** Ranee delegated this decision to Codex on September 29 after asking it to merge PR #75 and decide. |
| Phase 3 tracker | [#65](https://github.com/seavens3nt/url-pattern-recognition/issues/65); the gate decision is recorded here and in the tracker. |
| Frozen application commit | `0eb389bac3f50d3ed0a2cae70bb8a36e6b79e480` (squash merge of [PR #75](https://github.com/seavens3nt/url-pattern-recognition/pull/75)); no new product features after this revision without an explicit release-blocker decision. |
| Post-merge CI | Project checks succeeded on `0eb389b` (backend, frontend, API smoke). |
| Next milestones | Submission September 29; final presentation October 6 |
| Hosting destination | [Vercel production](https://url-pattern-recognition.vercel.app) published and smoke-tested October 2 from remote `deploy/vercel` commit `d651f59`; PR review/merge pending. [Deployment evidence](release/vercel-deployment.md). |

## Phase 3 evidence on current main

- The NFA, DFA/model, backend, UI, frontend behavior, and QA Phase 3 PRs
  [#66–#73](https://github.com/seavens3nt/url-pattern-recognition/pulls?q=is%3Apr+is%3Amerged+phase+3)
  are merged. Ranee merged [report PR #74](https://github.com/seavens3nt/url-pattern-recognition/pull/74)
  and closed [Issue #42](https://github.com/seavens3nt/url-pattern-recognition/issues/42).
  The report content is synchronized; final editorial, slides, and submission
  checks belong to Phase 4.
- Current main had successful backend, frontend, and API-smoke GitHub checks.
  The local retest passed Ruff, 454 backend tests, ESLint, 38 frontend tests,
  and a Vite production build. The first sandboxed Vitest attempt failed to
  read its config; the normal-access rerun passed.
- The September 28 local Compose build and browser run at localhost:8080
  passed accepted A01, rejected R01, full transition traces, HTTP 400/413
  boundaries, offline display, and Retry recovery. The corrected health badge
  displayed Backend connected after Retry. See
  [the exact test record](release/phase-3-release-gate.md).
- The October 2 production dependency audit reported zero advisories. Two
  moderate and one high advisory remain in development tooling. The 1.76 MB
  About Us image remains a non-blocking load follow-up; the initial Vercel
  bundle was measured separately from that lazy-loaded route.

## Phase 4 gate decision

**GO.** The formal model, integrated app, independent QA, report
synchronization, local Compose/browser run, and post-merge CI satisfy the
Phase 3 technical gate. The application is frozen at `0eb389b`; subsequent
governance, report, and presentation edits do not change that application
baseline. Ranee explicitly delegated the merge and go/no-go choice to Codex
on September 29. The missing saved screenshot from the exact September 28
port-8080 run is accepted as a documented Phase 3 evidence exception because
the visual browser behavior and API results were observed and recorded. Phase
4 should still collect final working-system screenshots for the submission
package if required by the course rubric.

Phase 4 may now start with final regression, clean setup, paper export,
submission, and October 6 defense preparation. Vercel was selected October 1
and the site passed preview and production smoke checks October 2. The live
artifact's deployment configuration remains on a remote branch pending GitHub
review and merge. This decision does not authorize new product features or
claim that the final course submission has occurred.

## Locked scope

The approved lowercase HTTP/HTTPS grammar in
[language-spec.md](language-spec.md) remains unchanged. The validator treats
input as text and never visits submitted websites. New product features,
general URL support, databases, and unrelated redesigns are outside the
release. The authoritative API behavior is in
[api-contract.md](api-contract.md); the final work packages are in
[week-4.md](phases/week-4.md).
