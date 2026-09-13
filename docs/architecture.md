# File architecture and ownership

## What exists now
```text
frontend/
  package.json and package-lock.json        Frontend dependencies only
  vite.config.js                           Local /api proxy to Flask
  src/
    main.jsx                               React entry point
    App.jsx                                Application composition
    features/validator/
      ValidatorPage.jsx                    Sean: interaction/results; Isaiah: layout via agreed components
      api.js                               Sean + Jared: HTTP boundary
    style.css                              Isaiah: layout/styles, coordinated with Sean
    App.test.jsx                           Paul: browser-component behavior tests
backend/
  app.py                                   Jared: Flask factory and global errors
  routes/validation.py                     Jared: HTTP routes and status codes
    services/validation.py                   Jared: payload checks and simulator handoff
  automata/
    simulator.py                           Explicit DFA transition function and trace generation
  requirements.txt and requirements-dev.txt Backend dependencies only
tests/test_api.py                          Paul: API contract and boundary tests
docs/phases/week-1.md through week-4.md     Weekly work and named coordination
.github/workflows/checks.yml               Ranee: CI with Paul reviewing checks
```

## Planned artifacts and files
These paths are delivery targets; their absence does not mean the task is finished. Do not create fabricated academic outputs just to fill a path.

- `docs/language-spec.md` — approved core schemes, alphabet and component rules; Isaiah maintains it through reviewed PRs.
- `docs/ui/wireframes.md` — reviewed Figma link and screen behavior; Isaiah maintains accessibility and responsive notes.
- `docs/automata/notation.md` — Pamela; state naming and character-class conventions.
- `docs/automata/regular-expression.md` and `nfa.md` — Ralph; RE and epsilon-NFA construction.
- `docs/automata/dfa.md` — Pamela; epsilon closures and subset construction.
- `docs/automata/minimization.md` — Pamela; partitions and original-to-minimized mapping.
- `docs/automata/diagrams/*.dot` — artifact owner; editable Graphviz diagram sources.
- `backend/automata/model.py` — Jared implements data structures agreed with Pamela and Ralph.
- `backend/automata/simulator.py` — Jared; deterministic traversal independent of Flask.
- `backend/automata/url_dfa.json` — Pamela supplies reviewed transitions; Jared integrates. No approved model exists yet.
- `tests/fixtures/url_cases.json` — shared approved corpus; Paul maintains boundary coverage with Isaiah reviewing expected outcomes.
- `tests/test_simulator.py` — Paul with Jared; real transitions, acceptance and trace behavior.
- `docs/qa/` — Paul; case coverage, findings and release evidence.
- `docs/report/`, `docs/presentation/` — Cedric; report, slides outline, demo and defense material.
- `docs/release/` — Ranee; delivery plan, clean-setup record and release checklist.

## Request flow
Browser input -> ValidatorPage -> api.js -> Flask route -> validation service -> future simulator -> future approved DFA model -> JSON result -> React result and trace.

The service now runs the approved core language through the DFA simulator and returns a verdict and trace. The formal RE, NFA, subset construction, minimization evidence, and reviewed machine-readable minimized model remain Phase 2 deliverables.

## Coordination rules
Isaiah owns layout/CSS; Sean owns React interactions/API integration; Jared owns backend route/service changes. API field changes require both to agree in the linked issue before implementation; Paul updates contract tests with the same PR. Formal model changes require the originating designer and the next recipient to review. Cross-area edits require coordination with the owner first. Ranee prepares both frontend and backend setup, agrees support tasks with Jared, manages integration and resolves unresolved ownership conflicts.
