# Phase 2 — Automata construction and owned feature packages

**Dates:** September 17–20, 2026

**Sprint goal:** complete the formal automata pipeline and prepare independently owned frontend, backend, QA, and paper packages for final integration.

**Activation rule:** Phase 1 remains active through Wednesday, September 16. Do not create Phase 2 GitHub issues yet. Ranee opens them only after the Phase 1 gate is accepted.

**End-of-phase gate:** the RE, NFA, DFA, minimized DFA, runtime model, interface states, tests, and theory chapter use the same approved language and state names.

## How work is divided

- One member owns each complete package and all closely related files inside it.
- Members work independently from the approved scope, API contract, fixtures, and Figma handoff.
- Coordination happens only for one required input, one completed handoff, or one review.
- A receiver reviews the completed package; they do not share ownership of its routine work.
- If a shared-file change is unavoidable, Ranee assigns one editor before work begins.

## Member work packages

| Owner | Complete package | Work that owner completes independently | Required handoff only | Deliverable and acceptance |
| --- | --- | --- | --- | --- |
| **Ranee** @seavens3nt | Phase gate and integration control | Confirm the Phase 1 gate, open one Phase 2 issue per package after activation, assign shared files, review PRs, and decide whether Phase 3 can start. | Receives the final readiness report from Paul on September 20. | Phase tracker, reviewed PR links, blockers, and a written Phase 3 go/no-go decision. |
| **Isaiah** @m1nay3on | Complete visual interface package | Implement the visual system, layout, navigation, responsive behavior, accessible labels, and the idle, loading, accepted, rejected, invalid-request, and offline appearances. Own CSS and presentational UI files assigned by Ranee. | Gives Sean the finished presentational components and their props once, by September 19. | Figma-aligned desktop/mobile interface; keyboard-visible focus; lint and build pass; no API or DFA logic in visual files. |
| **Sean** @bonkbonkboomeykwkwkw | Complete frontend interaction package | Own form state, API calls, loading control, result/error selection, trace rendering, retry behavior, and frontend component tests inside the validator feature. | Receives Isaiah’s presentational components, then gives the completed browser flow to Paul by September 19. | Accepted, rejected, invalid-request, loading, and offline flows render from real API responses; frontend tests pass. |
| **Ralph** @rlken | Complete RE and NFA package | Finalize the regular expression; construct and explain the epsilon-NFA; produce the transition table, editable diagram, and worked accepted/rejected traces using the approved corpus. | Hands one reviewed RE/NFA package to Pamela by September 17. | `regular-expression.md`, `nfa.md`, editable diagram source, transition table, and examples agree with the approved language. |
| **Pamela** @Qiuyuan26 | Complete DFA and minimization package | Perform epsilon closures and subset construction; build the complete DFA; minimize it; map original states to minimized states; produce diagrams and the machine-readable transition model. | Receives Ralph’s final NFA, then hands one deterministic model package to Jared by September 19. | DFA table, partition history, minimized table, state mapping, editable diagrams, and model file are internally consistent and complete. |
| **Jared** @AshenDary | Complete simulator and API package | Own model validation/loading, deterministic traversal, sink behavior, full-input consumption, trace creation, Flask responses, and backend unit/API tests. Reconcile the existing prototype simulator with Pamela’s reviewed model. | Receives Pamela’s model once, then gives the tested API package to Paul by September 19. | Approved corpus passes through the reviewed model; API keeps DFA rejection separate from malformed request and offline errors; backend tests pass. |
| **Paul** @paulccampos | Complete QA and verification package | Own the 10 accepted/10 rejected fixture, boundary additions, formal comparison matrix, simulator/API/UI regression, defect log, and clean-run evidence. Route a defect to its package owner without co-owning the fix. | Receives completed formal, backend, and frontend packages and gives one readiness report to Ranee on September 20. | Every case has an ID, expected result, source rule, actual result, and evidence; critical mismatches are resolved or explicitly block Phase 3. |
| **Cedric** @cedricsigue | Complete Phase 2 paper package | Write the RE→NFA→DFA→minimized-DFA theory section, insert reviewed tables/diagrams, maintain references and figure captions, and record each owner’s supplied explanation. | Receives final artifacts after their owner’s review; gives the complete theory section to Ranee on September 20. | Theory chapter uses the exact approved notation and state names and makes no claims beyond checked evidence. |

## Required handoffs

| Date | Sender → Receiver | Package |
| --- | --- | --- |
| **Sep 16** | Ranee → Team | Phase 1 gate decision and Phase 2 activation. |
| **Sep 17** | Ralph → Pamela | Final RE/NFA package. |
| **Sep 19** | Pamela → Jared | Reviewed DFA, minimized DFA, mapping, and model file. |
| **Sep 19** | Isaiah → Sean | Finished visual components and fixed props. |
| **Sep 19** | Jared and Sean → Paul | Testable backend and browser packages. |
| **Sep 20** | Paul and Cedric → Ranee | QA readiness report and theory chapter. |

These are handoff points, not recurring meetings. Owners ask for help only when an input is missing, an interface contradicts the approved contract, or a blocker cannot be solved inside their package.

## File ownership during Phase 2

| Package | Primary paths |
| --- | --- |
| Visual interface | `frontend/src/ui/`, assigned presentational components, `frontend/src/style.css` |
| Frontend interaction | `frontend/src/features/validator/`, frontend tests |
| RE/NFA | `docs/automata/regular-expression.md`, `docs/automata/nfa.md`, related `.dot` sources |
| DFA/minimization | `docs/automata/dfa.md`, `docs/automata/minimization.md`, `backend/automata/url_dfa.json` |
| Simulator/API | `backend/automata/`, `backend/routes/`, `backend/services/`, backend tests |
| QA evidence | `tests/fixtures/`, `tests/test_*`, `docs/qa/` |
| Paper | `docs/report/`, figure captions and reference list |

## Completion checklist

- [ ] Phase 1 gate accepted and Phase 2 issues activated by Ranee.
- [ ] Ralph’s RE/NFA package is complete and handed to Pamela.
- [ ] Pamela’s DFA/minimization package is complete and handed to Jared.
- [ ] Jared’s reviewed-model simulator/API package passes backend tests.
- [ ] Isaiah’s complete visual package matches every required Figma state.
- [ ] Sean’s frontend interaction package passes component tests with real responses.
- [ ] Paul’s corpus and cross-layer verification report have no unresolved critical mismatch.
- [ ] Cedric’s theory chapter matches the reviewed artifacts.
- [ ] Ranee records the Phase 3 activation decision.
