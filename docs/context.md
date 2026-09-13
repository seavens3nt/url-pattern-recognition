# Project context

## Purpose
Build a web application for an Automata Theory project. The academic focus is a documented regular expression -> NFA -> DFA -> minimized DFA -> simulator pipeline. React is the browser frontend; Flask exposes the Python simulator through an API.

## Agreed decisions
- Final deadline: 2026-09-29. Phase 1 assignments are due Wednesday, 2026-09-16; Phase 2 runs 2026-09-17 through 2026-09-20; Phase 3 runs 2026-09-21 through 2026-09-25; and Phase 4 runs 2026-09-26 through 2026-09-28. September 29 is reserved for submission.
- React + Vite, CSS, Python + Flask, Graphviz, and the testing tools in the tech stack.
- Eight roles with UI/UX, frontend, backend, QA, and documentation work distributed as listed in team-roles.md.
- No database, account system, or AI/ML is needed for the core scope.
- The simulator will inspect input text. It will not visit the submitted URL or check whether a website exists.
- DFA transitions must decide acceptance; a built-in URL parser or regex-only validator is not a substitute for the academic implementation.
- The approved core language is the bounded subset in [language-spec.md](language-spec.md): lowercase HTTP/HTTPS, DNS-style hostnames and an optional simple path. Ports, queries, fragments, IP literals, raw Unicode, Punycode and uppercase input are excluded from the first release.

## Open decisions
The hosting destination remains to be confirmed. The URL-language decisions and sprint dates are approved; do not expand them from examples or browser behavior.

## Boundaries
The 2048-character API input limit is a transport constraint, not the formal language specification. The current API returns 501 for a well-shaped request because automata validation is not implemented. A successful health check proves connectivity only.

## Handoffs
The canonical owner and deliverable list is in [Team roles](team-roles.md). The dependency order and phase gates are in the [Roadmap](roadmap.md); the active week’s exact coordination is in its phase guide. This file records project decisions rather than repeating assignments.

## Maintenance
Record approved decisions here with the decision date and related issue or PR. Keep current status in status.md, planned work in roadmap.md, and API details in api-contract.md. The shared Google Doc remains linked from the README for coordination.
