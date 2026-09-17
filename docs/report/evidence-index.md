# Evidence index

This file tracks the repo-backed evidence for the course report and keeps the shared Google Doc separated from the verified project artifacts in GitHub. It intentionally distinguishes what is already evidenced from what is still pending formal review and report writing.

## Shared Google Doc

- Google Doc link: https://docs.google.com/document/d/1qoo1uikbvgz3ryrP2cxPXJKNrFWNfft_6i-fbwAKvMg/edit
- Status: Active
- Notes: The live report remains the final authoring location for the paper. This GitHub evidence index links each required section to the repository artifacts that are actually available and reviewed.

## Status key

- Complete: the Phase 1 report structure and supporting evidence were verified
- Pending: the required artifact or final evidence is not yet available
- Blocked: work cannot continue until Ranee resolves a recorded issue

## Verified project overview

The project is a web application for automata theory that validates URLs against the approved core language with an explicit DFA-based simulation. The current repo verifies the starter integration, backend API, and frontend UI behavior:

- React + Vite frontend and Flask backend are set up and working together.
- The backend exposes health and validation endpoints and returns a verdict plus an ordered transition trace.
- The accepted language is the bounded subset described in the agreed project decisions and source materials.
- The formal NFA/DFA/minimized-DFA artifacts remain pending review and are not yet backed by final repo evidence.

Sources consulted:

- [README.md](../../README.md)
- [docs/context.md](../context.md)
- [docs/status.md](../status.md)
- [docs/roadmap.md](../roadmap.md)
- [docs/architecture.md](../architecture.md)
- [docs/how-to-run.md](../how-to-run.md)
- [docs/team-roles.md](../team-roles.md)
- [tests/test_api.py](../../tests/test_api.py)
- [tests/test_simulator.py](../../tests/test_simulator.py)
- [docs/qa/clean-setup-evidence.md](../qa/clean-setup-evidence.md)

## API reference section

### Verified API behavior

The verified contract for this repository is the one implemented in code and tests:

- GET /api/health returns HTTP 200 with status ok and validator_ready true.
- POST /api/validate accepts a JSON body with a url field and returns HTTP 200 with accepted true/false, final_state, and trace for well-formed requests.
- Missing, blank, non-string, oversized, and over-2048-character requests are rejected upstream with HTTP 400 or 413 as defined in the service.
- The simulator does not fetch the supplied URL; it evaluates the submitted string against the DFA model.

Sources consulted:

- [docs/api-contract.md](../api-contract.md)
- [backend/app.py](../../backend/app.py)
- [backend/routes/validation.py](../../backend/routes/validation.py)
- [backend/services/validation.py](../../backend/services/validation.py)
- [tests/test_api.py](../../tests/test_api.py)

## Required course sections

| Report Section | Responsible Member | Evidence Link | Status |
| --- | --- | --- | --- |
| Cover Page | Cedric | Present in the shared Google Doc | Complete |
| Table of Contents | Cedric | Present in the shared Google Doc; final page numbers remain a release task | Complete |
| Introduction | Cedric / team | [README.md](../../README.md), [docs/context.md](../context.md) | Complete |
| Project Objectives | Ranee / Cedric | [README.md](../../README.md), [docs/roadmap.md](../roadmap.md) | Complete |
| Scope and Limitations | Isaiah / Ranee | [docs/language-spec.md](../language-spec.md), [docs/context.md](../context.md) | Complete |
| Formal Language Definition | Isaiah / Ralph | [docs/language-spec.md](../language-spec.md) | Complete |
| Alphabet and Strings | Isaiah / Ralph | [docs/language-spec.md](../language-spec.md), [docs/automata/notation.md](../automata/notation.md) | Complete |
| Accepted and Rejected Input Examples | Paul / Jared | [tests/fixtures/url_cases.json](../../tests/fixtures/url_cases.json), [docs/qa/clean-setup-evidence.md](../qa/clean-setup-evidence.md) | Complete |
| Regular Expression | Ralph | [docs/automata/regular-expression.md](../automata/regular-expression.md) | Complete |
| NFA Formal Definition | Ralph | No final reviewed NFA artifact is available | Pending |
| NFA Transition Table and Diagram | Ralph | No final reviewed NFA table or diagram is available | Pending |
| NFA-to-DFA Conversion | Ralph / Pamela | Waiting for the reviewed subset-construction artifact | Pending |
| DFA Transition Table and Diagram | Pamela | Waiting for the reviewed DFA artifact and diagram | Pending |
| DFA Minimization | Pamela | Waiting for the minimized-model evidence and review | Pending |
| Minimized DFA Diagram | Pamela | Waiting for the final reviewed minimized diagram | Pending |
| System Design | Ranee / Jared / Sean | [docs/architecture.md](../architecture.md), [docs/api-contract.md](../api-contract.md) | Complete |
| Implementation / Source Code | Jared / Sean | [backend/app.py](../../backend/app.py), [backend/automata/simulator.py](../../backend/automata/simulator.py), [frontend/src/features/validator/ValidatorPage.jsx](../../frontend/src/features/validator/ValidatorPage.jsx) | Complete |
| Test Cases and Results | Paul / Jared | [tests/test_api.py](../../tests/test_api.py), [tests/test_simulator.py](../../tests/test_simulator.py), [docs/qa/clean-setup-evidence.md](../qa/clean-setup-evidence.md) | Complete |
| Screenshots of the Working System | Sean / Isaiah | No final UI screenshots are available | Pending |
| Discussion of Results | Cedric / Paul | [docs/status.md](../status.md), [docs/qa/clean-setup-evidence.md](../qa/clean-setup-evidence.md) | Complete |
| Conclusion | Cedric / Ranee | Phase 1 conclusion is present in the shared Google Doc; the final conclusion remains a release task | Complete |
| References | Cedric | Sources are listed, but two broken URLs and the missing course-brief entry still need correction in the shared Google Doc | Pending |
| Individual Contribution Matrix | Cedric | All eight members are listed in the shared Google Doc; final contributions will be updated from merged evidence | Complete |

### APA reference entries for the Google Doc

Use the following APA 7-style entries in the report's References section. The
repository files are undated working documents, so they use the group author
and `n.d.`. Apply a hanging indent after pasting them into Google Docs.

URL Pattern Recognition Team. (n.d.-a). *API contract*. GitHub. Retrieved
September 17, 2026, from https://github.com/seavens3nt/url-pattern-recognition/blob/main/docs/api-contract.md

URL Pattern Recognition Team. (n.d.-b). *Architecture and file ownership*.
GitHub. Retrieved September 17, 2026, from
https://github.com/seavens3nt/url-pattern-recognition/blob/main/docs/architecture.md

URL Pattern Recognition Team. (n.d.-c). *Approved URL language: Core release*.
GitHub. Retrieved September 17, 2026, from
https://github.com/seavens3nt/url-pattern-recognition/blob/main/docs/language-spec.md

URL Pattern Recognition Team. (n.d.-d). *Clean-setup and corpus evidence*.
GitHub. Retrieved September 17, 2026, from
https://github.com/seavens3nt/url-pattern-recognition/blob/main/docs/qa/clean-setup-evidence.md

URL Pattern Recognition Team. (n.d.-e). *Project context*. GitHub. Retrieved
September 17, 2026, from
https://github.com/seavens3nt/url-pattern-recognition/blob/main/docs/context.md

URL Pattern Recognition Team. (n.d.-f). *Project status*. GitHub. Retrieved
September 17, 2026, from
https://github.com/seavens3nt/url-pattern-recognition/blob/main/docs/status.md

URL Pattern Recognition Team. (n.d.-g). *Regular-expression design: Core URL
language*. GitHub. Retrieved September 17, 2026, from
https://github.com/seavens3nt/url-pattern-recognition/blob/main/docs/automata/regular-expression.md

URL Pattern Recognition Team. (n.d.-h). *Roadmap*. GitHub. Retrieved September
17, 2026, from
https://github.com/seavens3nt/url-pattern-recognition/blob/main/docs/roadmap.md

URL Pattern Recognition Team. (n.d.-i). *Team roles*. GitHub. Retrieved
September 17, 2026, from
https://github.com/seavens3nt/url-pattern-recognition/blob/main/docs/team-roles.md

URL Pattern Recognition Team. (n.d.-j). *URL pattern recognition* [Computer
software]. GitHub. Retrieved September 17, 2026, from
https://github.com/seavens3nt/url-pattern-recognition

Caluya, S. S. (2026). *CCAUTOMA - 1st AY 2026 course project* [Course project
brief].

## Additional planning sections

| Section | Status | Responsible member | Evidence and notes |
| --- | --- | --- | --- |
| Presentation Planning | Pending | Cedric / Ranee | The approved 13-minute plan and eight-member speaking order are recorded below; the shared Google Doc still needs to be corrected to match. |
| Deployment / performance / security evidence | Pending | Ranee / Paul | This should be documented later under system design and test results only as team quality evidence, not as extra course-imposed requirements. No verified deployment or security evidence exists yet in the repo. |

## Contribution matrix

| Member | Role | Planned responsibility | Verified contribution in repo |
| --- | --- | --- | --- |
| Ranee Mikaella V. Gutierrez | PM / Project Setup | Project coordination, setup, release gate, approvals | Setup guide, project status, roadmap, and coordination decisions in [docs/how-to-run.md](../how-to-run.md), [docs/status.md](../status.md), [docs/roadmap.md](../roadmap.md) |
| Isaiah Jasser C. Otilano | Frontend / UI/UX | Interface design and URL-language presentation | Role and scope are documented in [docs/team-roles.md](../team-roles.md); no final UI artifact is yet linked as a finished report section |
| Ralph Kenneth G. Punzalan | Backend / RE and NFA | Regular expression and NFA formal artifacts | Role documentation in [docs/team-roles.md](../team-roles.md); formal artifact ownership remains pending |
| Pamela R. Babaran | Backend / DFA and Minimization | DFA construction and minimization | Role documentation in [docs/team-roles.md](../team-roles.md); formal minimization artifact remains pending |
| Sean Matthew E. Tumolac | Frontend API Integration | UI validation and API wiring | Frontend flow and architecture in [docs/architecture.md](../architecture.md); current validator page implementation in [frontend/src/features/validator/ValidatorPage.jsx](../../frontend/src/features/validator/ValidatorPage.jsx) |
| Jared L. Noel | Backend / Simulator and API | DFA simulator and Flask integration | Backend implementation in [backend/app.py](../../backend/app.py), [backend/services/validation.py](../../backend/services/validation.py), [backend/automata/simulator.py](../../backend/automata/simulator.py) |
| Paul Joshua R. Campos | QA / Testing | Corpus, QA evidence, defect tracking | Clean setup evidence and verification notes in [docs/qa/clean-setup-evidence.md](../qa/clean-setup-evidence.md); tests in [tests/test_api.py](../../tests/test_api.py) and [tests/test_simulator.py](../../tests/test_simulator.py) |
| Cedric Kristoff R. Sigue | Paper and Presentation Lead | Report compilation, source traceability, slides | Evidence index and project-source traceability are maintained in this file; final report and presentation plan remain in the Google Doc |

## Presentation planning

The report should include a short presentation outline for the project demo and Q&A. The current repo verifies the live project behavior and the schedule, but the final narrative should still be composed in the shared Google Doc.

### Proposed timing

- 13-minute target within the required 12-15 minute total
- 9 minutes: presentation and live demo
- 4 minutes: Q&A and technical discussion

### Proposed speaking order

1. Ranee: project overview, scope and project decisions
2. Isaiah: language rules and interface design
3. Ralph: regular expression and NFA
4. Pamela: subset construction and DFA minimization
5. Jared: backend validation and simulator behavior
6. Sean: frontend/API interaction and result states
7. Paul: test cases, results, security and performance evidence
8. Cedric: report evidence, discussion and conclusion

### Participation requirement

Every member should speak, even if only briefly, so the final presentation reflects the team’s contribution and the evidence trail in the project repo.

Sources for the planning structure:

- [docs/status.md](../status.md)
- [docs/roadmap.md](../roadmap.md)
- [docs/team-roles.md](../team-roles.md)

## PM decisions and source links

The following project decisions are explicitly supported by repo sources and should be recorded in the Google Doc with those links:

- The active phase is Phase 1 foundation and specification, as recorded in [docs/status.md](../status.md).
- The four-week roadmap and phase gates are in [docs/roadmap.md](../roadmap.md).
- The API contract and request/response behavior are in [docs/api-contract.md](../api-contract.md).
- The project boundaries and approved language decisions are in [docs/context.md](../context.md).
- The execution structure and file ownership are in [docs/architecture.md](../architecture.md).
- The setup and verification flow is in [docs/how-to-run.md](../how-to-run.md).

No additional PM decision should be invented beyond these verified materials.

## Verified current behavior summary

The repository currently verifies the following checks:

- Backend: 34 pytest tests passed; Ruff passed.
- Frontend: 2 Vitest tests passed; ESLint passed; production build passed.
- Health check: Flask responded at the configured local API endpoint and returned the expected readiness payload.
- Validation: the simulator accepted a valid URL and returned a DFA verdict along with an ordered transition trace.

Evidence:

- [docs/status.md](../status.md)
- [docs/qa/clean-setup-evidence.md](../qa/clean-setup-evidence.md)
- [tests/test_api.py](../../tests/test_api.py)
- [tests/test_simulator.py](../../tests/test_simulator.py)

## PM note

This evidence index intentionally separates the verified starter implementation from the later formal automata and report-writing deliverables. The NFA, DFA, minimized-DFA, screenshots, and final Google Doc report sections remain explicit follow-up work and should not be marked complete until they are reviewed and linked as final evidence.

Before Issue #13 is closed, the shared Google Doc must also use the heading `NFA Formal Definition`, use the report's own Google Doc link in its evidence summary, include working source links in the PM decision section, repair the two broken reference URLs, add the course-project brief to References, and match the timing and speaking order in this index.
