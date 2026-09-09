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
      ValidatorPage.jsx                    Sean: input, loading, message and layout
      api.js                               Sean + Jared: HTTP boundary
    style.css                              Sean: styles, reviewed by Isaiah
    App.test.jsx                           Paul: browser-component behavior tests
backend/
  app.py                                   Jared: Flask factory and global errors
  routes/validation.py                     Jared: HTTP routes and status codes
  services/validation.py                   Jared: payload checks and pending engine boundary
  automata/                                Formal model and simulator destination
  requirements.txt and requirements-dev.txt Backend dependencies only
tests/test_api.py                          Paul: API contract and boundary tests
docs/phases/week-1.md through week-4.md     Weekly work and named coordination
.github/workflows/checks.yml               Ranee: CI with Paul reviewing checks
```

## Planned artifacts and files
These paths are delivery targets; their absence does not mean the task is finished. Do not create fabricated academic outputs just to fill a path.

- `docs/language-spec.md` — Isaiah; approved schemes, alphabet and component rules.
- `docs/ui/wireframes.md` — Isaiah; Figma link, screen behavior and accessibility notes.
- `docs/automata/notation.md` — Pamela; state naming and character-class conventions.
- `docs/automata/regular-expression.md` and `nfa.md` — Ralph; RE and epsilon-NFA construction.
- `docs/automata/dfa.md` — Pamela; epsilon closures and subset construction.
- `docs/automata/minimization.md` — Sean; partitions and original-to-minimized mapping.
- `docs/automata/diagrams/*.dot` — artifact owner; editable Graphviz diagram sources.
- `backend/automata/model.py` — Jared implements data structures agreed with Pamela and Sean.
- `backend/automata/simulator.py` — Jared; deterministic traversal independent of Flask.
- `backend/automata/url_dfa.json` — Sean supplies reviewed transitions; Jared integrates. No approved model exists yet.
- `tests/fixtures/url_cases.json` — Paul, expected outcomes reviewed by Isaiah.
- `tests/test_simulator.py` — Paul with Jared; real transitions, acceptance and trace behavior.
- `docs/qa/` — Paul; case coverage, findings and release evidence.
- `docs/report/`, `docs/presentation/` — Cedric; report, slides outline, demo and defense material.
- `docs/release/` — Ranee; delivery plan, clean-setup record and release checklist.

## Request flow
Browser input -> ValidatorPage -> api.js -> Flask route -> validation service -> future simulator -> future approved DFA model -> JSON result -> React result and trace.

Today the service ends with HTTP 501 and `accepted: null`. The model and simulator are future work. The refactor preserves the existing endpoint behavior; it does not claim real URL validation.

## Coordination rules
Sean owns the React feature; Jared owns backend route/service changes. API field changes require both to agree in the linked issue before implementation; Paul updates contract tests with the same PR. Formal model changes require the originating designer and the next recipient to review. Cross-area edits require coordination with the owner first. Ranee manages integration and resolves unresolved ownership conflicts.
