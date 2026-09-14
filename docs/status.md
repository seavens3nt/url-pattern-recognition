# Current status

| Status field | Value |
| --- | --- |
| Evidence date | 2026-09-14 |
| Active sprint | Phase 1 — Foundation and specification |
| Active guide | [Phase 1 assignments](phases/week-1.md) |
| Phase 1 deadline | Wednesday, September 16, 2026 |

This is a reviewed snapshot. GitHub issues and PRs contain the live task state.

Phase 2 is planned in the repository guide only. Its GitHub tracker and member issues must remain unopened until Ranee accepts the Phase 1 gate.

## Ready

- React and Flask starter with a visible connection check.
- Beginner run and GitHub Desktop guides.
- All eight members completed repository onboarding and ran both servers; Ranee confirmed that no setup blocker remains.
- Backend and frontend automated checks in GitHub Actions.
- Private repository access accepted by all seven teammates.
- Main-branch PR rule and Ranee’s required code-owner approval.
- Four-week roadmap, file ownership and active Phase 1 assignments.
- Deadline-safe core URL language, 10 accepted cases, 10 rejected cases, and the required Figma states.
- Reviewed regular-expression draft aligned with the approved core language and shared fixture.
- Reviewed validation API contract.
- Working DFA simulator, Flask integration, React verdict states, and transition trace display on the integration branch.

## Pending in Phase 1

- Pamela defines automata notation and worksheets.
- Sean completes the component and API interaction plan against the reviewed API contract.
- Paul submitted the clean-setup evidence and 32-case shared corpus; Isaiah, Ralph, Pamela, and Jared still need to record their acceptance of the expectations and fixture contract.
- Cedric creates the report structure and decision log.

## Current boundary

The core language, regular expression, API contract and starter integration are reviewed on `main`. The automata notation, NFA, subset-construction DFA, minimized model, final UI review, deployment and defense materials still need their assigned evidence and reviews.

Paul's clean-setup and corpus handoff is recorded in
[clean-setup evidence](qa/clean-setup-evidence.md). Follow-up scenarios for
formal and API testing are documented separately for the receiving reviewers.

## Verified starter checks

- Backend: 34 pytest tests and Ruff passed.
- Frontend: 2 Vitest tests, ESLint and production build passed.
- Browser: React reached Flask on desktop and mobile layouts; form submission showed the intentional pending message.

At the Phase 1 review, update this page with PR links, check results, blockers and the Phase 2 activation decision.

## Completed Phase 1 member tasks

- Ranee: project setup and onboarding ([issue #1](https://github.com/seavens3nt/url-pattern-recognition/issues/1)).
- Isaiah: language specification and wireframes ([issue #2](https://github.com/seavens3nt/url-pattern-recognition/issues/2)).
- Jared: validation API contract ([issue #4](https://github.com/seavens3nt/url-pattern-recognition/issues/4)).
- Ralph: regular-expression draft and regularity review ([issue #6](https://github.com/seavens3nt/url-pattern-recognition/issues/6)).
