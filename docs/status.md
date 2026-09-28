# Current status

**Evidence updated:** September 28, 2026 (Asia/Manila). This is the current
Phase 3 gate record; older candidate results remain in
[the release-gate log](release/phase-3-release-gate.md).

| Status field | Value |
| --- | --- |
| Active gate | [Phase 3 tracker #65](https://github.com/seavens3nt/url-pattern-recognition/issues/65), awaiting Ranee's go/no-go decision |
| Current main checked | `7da852001fbfa3f536e1bfe417e45713c04ec4c6` (PR #74) |
| Feature-freeze commit | **Not declared.** Ranee selects it after this documentation correction merges and CI passes. |
| Next milestones | Submission September 29; final presentation October 6 |
| Hosting destination | Not yet selected; local Compose at port 8080 was verified, not a public deployment |

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
- The production dependency audit reported zero advisories. Two moderate
  advisories remain in development test tooling. The 1.76 MB About Us image is
  a non-blocking load follow-up; a hosted performance result is not claimed.

## Decision to open Phase 4

The application has passed the local technical gate, but Phase 4 has **not**
been activated. The corrected API contract and this evidence update must merge
with passing CI. Ranee then records the frozen commit and go/no-go decision in
this file and [tracker #65](https://github.com/seavens3nt/url-pattern-recognition/issues/65).
The local browser run was observed but no new port-8080 screenshot file was
saved; Ranee must either add it or accept that documented evidence exception.
Do not treat issue closure, a health response, or a green build alone as the
Phase 4 decision.

## Locked scope

The approved lowercase HTTP/HTTPS grammar in
[language-spec.md](language-spec.md) remains unchanged. The validator treats
input as text and never visits submitted websites. New product features,
general URL support, databases, and unrelated redesigns are outside the
release. The authoritative API behavior is in
[api-contract.md](api-contract.md); the final work packages are in
[week-4.md](phases/week-4.md).
