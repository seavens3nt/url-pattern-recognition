# Current status

Updated: 2026-09-10. This is a maintained project snapshot, not a live GitHub dashboard.

## Current phase
Week 1 of the four-week plan - foundation and specification. The repository is private under seavens3nt. Seven teammate collaborator invitations were sent. All seven teammates have accepted their collaborator invitations.

## Included in the starter
- React + Vite input page and backend connection indicator.
- Flask health endpoint and honest pending-implementation validation endpoint.
- Frontend and backend checks, GitHub Actions, and contribution templates.
- Beginner run guide, sprint roadmap, project context, team roles and skills.
- Repository-local Codex instructions and two reusable skills.

## Not implemented or approved
Formal URL language, RE/NFA/DFA artifacts, minimization, real acceptance simulation, final UI, production deployment, and defense deliverables remain pending. No claim of URL validation correctness is made by this starter.

## Next actions
1. Each teammate accepts their invite and follows how-to-run.md on their computer.
2. Ranee sets sprint dates and confirms the submission deadline.
3. Isaiah proposes the language specification and responsive wireframes.
4. Jared and Sean review the draft API contract; Paul begins the shared corpus.

Update this file at each sprint review with completed PR links, verification results, blockers, and the next milestone. Do not mark a deliverable done based on a plan alone.

## Setup verification
- Backend: 10 pytest cases passed; Ruff passed.
- Frontend: 2 Vitest cases passed; ESLint and production build passed.
- Browser: desktop and mobile layouts inspected; React reached Flask; submitting a URL displayed the intentional not-implemented message.
- Both repository-local Codex skills passed their validator.
- GitHub: four active weekly milestones with the original 13 deliverable issues remapped and four phase coordination issues. Issue assignments are maintained on GitHub.
- Teammate-machine onboarding and production deployment are still pending.

[Task backlog](https://github.com/seavens3nt/url-pattern-recognition/issues) · [Sprint milestones](https://github.com/seavens3nt/url-pattern-recognition/milestones)

## Detailed execution guide update
The Google Docs guide and repository phase guides now provide exact numbered tasks, file targets, named coordination partners, inputs, deadlines and handoff acceptance for all 32 member-week assignments. The starter separates the React feature/API boundary and Flask factory/routes/service. The real automata model remains pending. The starter-boundary changes are on main. Current work refreshes the team allocation, phase instructions and GitHub Desktop guide through a PR.

## Revised team allocation
Three backend: Ralph (RE/NFA), Pamela (DFA/minimization), Jared (simulator/API). Two frontend: Isaiah (layout/UI/UX), Sean (behavior/API integration). Paul is QA; Cedric leads the paper. Ranee owns both frontend/backend setup, project coordination and final PR approval, with backend and paper support.

The main ruleset is active; CODEOWNERS requires @seavens3nt, with an account-specific PR-only bypass for her own changes. Grammar and delivery decisions remain pending until reviewed.
