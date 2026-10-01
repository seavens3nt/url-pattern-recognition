# Project context

## Purpose
Build a web application for an Automata Theory project. The academic focus is a documented regular expression -> NFA -> DFA -> minimized DFA -> simulator pipeline. React is the browser frontend; Flask exposes the Python simulator through an API.

## Agreed decisions
- Submission deadline: 2026-09-29. The final presentation is 2026-10-06,
  per Ranee's September 28 clarification. Phase 1 assignments were due
  2026-09-16; Phase 2 ran 2026-09-17 through 2026-09-20; Phase 3 was planned
  for 2026-09-21 through 2026-09-25. Phase 4 covers release/submission and
  the later defense preparation. September 29 remains reserved for submission.
- React + Vite, CSS, Python + Flask, Graphviz, and the testing tools in the tech stack.
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

## Open decisions
Ranee selected Vercel as the hosting destination on October 1, 2026. The app
was deployed and live-tested on October 2; see
[Vercel deployment](release/vercel-deployment.md). Its source commit is on the
remote deployment branch pending GitHub review and merge. Final course
acceptance remains separate. The URL-language decisions and sprint dates are
approved; do not expand them from examples or browser behavior.

## Boundaries
The 2048-character API input limit is a transport constraint, not the formal language specification. A well-shaped request is simulated by the current DFA and returns HTTP 200 with either verdict; malformed requests remain HTTP errors. A successful health check proves connectivity only.

## Handoffs
The canonical owner and deliverable list is in [Team roles](team-roles.md). The dependency order and phase gates are in the [Roadmap](roadmap.md); the active week’s exact coordination is in its phase guide. This file records project decisions rather than repeating assignments.

## Maintenance
Record approved decisions here with the decision date and related issue or PR. Keep current status in status.md, planned work in roadmap.md, and API details in api-contract.md. The shared Google Doc remains linked from the README for coordination.
