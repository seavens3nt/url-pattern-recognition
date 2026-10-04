# Project context

## Purpose
Build a web application for an Automata Theory project. The academic focus is a documented regular expression -> NFA -> DFA -> minimized DFA -> simulator pipeline. React is the browser frontend; Flask exposes the Python simulator through an API.

## Agreed decisions
- Submission deadline: 2026-09-29. The final presentation is 2026-10-06,
  per Ranee's September 28 clarification. Phase 1 assignments were due
  2026-09-16; Phase 2 ran 2026-09-17 through 2026-09-20; Phase 3 was planned
  for 2026-09-21 through 2026-09-25. Phase 4 covers release/submission and
  the later defense preparation. September 29 remains reserved for submission.
- React + Vite with Tailwind CSS v4 utilities and component CSS for the
  existing graphics and animations; Python + Flask, Graphviz, and the testing
  tools remain in the tech stack. Tailwind does not change the URL grammar,
  API, or DFA behavior.
- Eight roles with UI/UX, frontend, backend, QA, and documentation work distributed as listed in team-roles.md.
- No database, account system, or AI/ML is needed for the core scope.
- The simulator will inspect input text. It will not visit the submitted URL or check whether a website exists.
- DFA transitions must decide acceptance; a built-in URL parser or regex-only validator is not a substitute for the academic implementation.
- The approved core language is the bounded subset in
  [language-spec.md](language-spec.md): lowercase HTTP/HTTPS, DNS-style
  hostnames and an optional simple path. Ports, queries, fragments, IP
  literals, raw Unicode, IDN decoding and uppercase input are excluded. An
  ASCII `xn--` label is accepted when it meets the ordinary hostname rule;
  the recognizer does not decode or verify Punycode.

## Completion decision
Ranee declared the project finished October 4, 2026. The completed application
is on `main` at `e3e6f59` (PR #98) and runs on Vercel production. See
[Current status](status.md) for the authoritative completion record and
[Vercel deployment](release/vercel-deployment.md) for hosting details.
The October 6 presentation remains scheduled. Completion does not claim
presentation delivery, course grading or a portal submission has occurred.
The approved URL language remains unchanged.

## Boundaries
The 2048-character API input limit is a transport constraint, not the formal language specification. A well-shaped request is simulated by the current DFA and returns HTTP 200 with either verdict; malformed requests remain HTTP errors. A successful health check proves connectivity only.

## Handoffs
The canonical owner and deliverable list is in [Team roles](team-roles.md).
The [Roadmap](roadmap.md) and phase guides preserve completed-project planning
history. This file records decisions rather than repeating assignments.

## Maintenance
Record approved decisions here with the decision date and related issue or PR. Keep current status in status.md, planned work in roadmap.md, and API details in api-contract.md. The shared Google Doc remains linked from the README for coordination.
