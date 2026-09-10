# Project context

## Purpose
Build a web application for an Automata Theory project. The academic focus is a documented regular expression -> NFA -> DFA -> minimized DFA -> simulator pipeline. React is the browser frontend; Flask exposes the Python simulator through an API.

## Agreed decisions
- Project duration: four weeks total, confirmed 2026-09-09. Week 1 includes remaining onboarding; calendar dates are still to be set.
- React + Vite, CSS, Python + Flask, Graphviz, and the testing tools in the tech stack.
- Eight roles with UI/UX, frontend, backend, QA, and documentation work distributed as listed in team-roles.md.
- No database, account system, or AI/ML is needed for the core scope.
- The simulator will inspect input text. It will not visit the submitted URL or check whether a website exists.
- DFA transitions must decide acceptance; a built-in URL parser or regex-only validator is not a substitute for the academic implementation.

## Open decisions
Supported schemes, character alphabet, domain rules, ports, paths, query strings, fragments, case handling, and internationalized names are not approved yet. The team must also set the submission date, sprint dates, and hosting destination. Do not infer these decisions from the example URL in the starter screen.

## Boundaries
The 2048-character API input limit is a transport constraint, not the formal language specification. The current API returns 501 for a well-shaped request because automata validation is not implemented. A successful health check proves connectivity only.

## Handoffs
The canonical owner and deliverable list is in [Team roles](team-roles.md). The dependency order and phase gates are in the [Roadmap](roadmap.md); the active week’s exact coordination is in its phase guide. This file records project decisions rather than repeating assignments.

## Maintenance
Record approved decisions here with the decision date and related issue or PR. Keep current status in status.md, planned work in roadmap.md, and API details in api-contract.md. The shared Google Doc remains linked from the README for coordination.
