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
      ValidatorPage.jsx                    Sean: interaction/results
      api.js                               Sean: frontend HTTP calls; contract is locked by Ranee
    style.css                              Isaiah: layout/styles
    App.test.jsx                           Paul: cross-feature regression tests
backend/
  app.py                                   Jared: Flask factory and global errors
  routes/validation.py                     Jared: HTTP routes and status codes
  services/validation.py                  Jared: payload checks and simulator call
  automata/
    simulator.py                           Explicit DFA transition function and trace generation
  requirements.txt and requirements-dev.txt Backend dependencies only
tests/test_api.py                          Paul: API contract and boundary tests
docs/phases/week-1.md through week-4.md     Weekly work packages and phase gates
.github/workflows/checks.yml               Ranee: CI and live API smoke job
scripts/check_all.py                       Ranee: one-command project verification
scripts/smoke_api.py                       Ranee: live API contract smoke test
compose.yaml and deployment/               Ranee: production-like container setup
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
- `tests/fixtures/url_cases.json` — Paul maintains boundary coverage; changes to approved expectations require Ranee's decision.
- `tests/test_simulator.py` — Jared owns simulator unit tests; Paul records cross-layer verification separately.
- `docs/qa/` — Paul; case coverage, findings and release evidence.
- `docs/report/evidence-index.md` — Cedric's only report file in GitHub; links the shared Google Docs paper, section owners, real evidence and status. Report chapters, APA references, contribution matrix, decision notes and demo/presentation outline live in that Google Doc. Final slides and submission exports are linked from the index.
- `docs/release/` — Ranee; delivery plan, clean-setup record and release checklist.

## Request flow
Browser input -> ValidatorPage -> api.js -> Flask route -> validation service -> future simulator -> future approved DFA model -> JSON result -> React result and trace.

The service now runs the approved core language through the DFA simulator and returns a verdict and trace. The formal RE, NFA, subset construction, minimization evidence, and reviewed machine-readable minimized model remain Phase 2 deliverables.

## Phase 2 onward ownership rules

Ranee owns project-wide verification, CI smoke testing, deployment configuration,
integration, and phase control. Member-owned paths reduce collisions; they do not
limit Ranee's authority to modify any file for integration, urgent fixes, or
deadline recovery when the reason is recorded in the PR. Isaiah owns global presentation/CSS; Sean owns validator
interaction and frontend API calls; Jared owns backend routes, services,
simulator, and backend unit/API tests; Ralph and Pamela own their separate formal
artifacts; Paul owns fixtures, cross-layer QA evidence, and QA-specific tests;
Cedric owns report and presentation files.

Frontend owners must not edit `backend/`; backend owners must not edit `frontend/`.
Formal, QA, and paper owners must stay within their listed implementation and
evidence files. These restrictions apply to members; Ranee may make cross-cutting
integration or deadline fixes and records the affected issue in the PR.

Members start every portion supported by the locked files already on `main`. When a required dependency is later merged, the dependent owner pulls `main` and continues without seeking a message, peer review, or handoff acceptance. See [Independent work-package template](work-package-template.md).
