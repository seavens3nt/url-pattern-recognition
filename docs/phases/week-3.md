# Phase 3 — Integrated web application

**Sprint goal:** connect the reviewed minimized DFA to Flask and React so the browser shows real verdicts and traces.

**Dates:** September 21–25, 2026

**End-of-phase gate:** representative corpus cases pass through simulator, API and UI; trace rows match the reviewed model; new features freeze.

This phase starts only after Phase 2 acceptance. Open only Phase 3 issues at kickoff.

## Assignments

| Owner | Specific work | Coordinate with | Deliverable and acceptance |
| --- | --- | --- | --- |
| **Ranee** | Open/assign Phase 3 work, coordinate integration order, decide local or hosted delivery and freeze features after review. | Jared supplies backend by Day 2; Sean integrates by Day 3; Paul gives risk evidence; Cedric records actual flow. | Integrated candidate and delivery decision with no unresolved critical correctness defect. |
| **Isaiah** | Apply reviewed layout, responsive and accessibility fixes to the working validator; keep content aligned with scope. | Sean pairs on shared components; Paul reproduces UX defects; Ranee approves changes. | Desktop/mobile validator is readable, keyboard usable and consistent across all response states. |
| **Sean** | Connect the form to the real API; render verdict, message, final state and ordered transition rows; handle transport/request errors separately. | Jared confirms exact JSON; Isaiah reviews UI; Pamela confirms state labels; Paul checks behavior. | Integrated React flow and component tests pass for accepted, rejected, invalid and offline cases by Day 3. |
| **Ralph** | Trace selected cases through RE/NFA and investigate the first point of divergence from runtime results. | Pamela maps NFA/DFA states; Jared compares runtime; Paul reproduces issues; Cedric records reviewed examples. | Worked examples agree with runtime or produce a precisely documented correction. |
| **Pamela** | Audit runtime state IDs, accepting/sink states and transitions against the minimized mapping. | Ralph reviews mapping; Jared fixes encoding/traversal; Paul adds reproducing tests. | State-mapping audit approves the encoded model or lists exact state/symbol mismatches. |
| **Jared** | Load and validate the reviewed DFA model; consume the whole input; return actual verdict, final state and per-symbol trace by Day 2. | Pamela and Ralph approve model encoding; Sean checks response compatibility; Paul checks corpus; Ranee approves readiness flag. | Real validation API returns 200 for valid accepted/rejected requests and keeps request/availability errors distinct. |
| **Paul** | Run the same corpus through simulator, API and representative browser flows; test malformed input, limits, offline behavior, retries and traces. | Route defects to Jared/Sean/Isaiah or formal discrepancies to Ralph/Pamela; Ranee prioritizes. | Integration report lists case IDs, environment, severity and retest evidence by Day 4. |
| **Cedric** | Write code-aligned implementation/architecture sections; capture reviewed screenshots and prepare the demo sequence. | Jared verifies backend flow; Sean verifies UI; Ralph/Pamela verify traces; Paul supplies check evidence. | Implementation draft and demo script describe the actual candidate and contain no placeholder claims. |

## Coordination checkpoints

- **Day 2:** Jared provides real-model API evidence and sample responses.
- **Day 3:** Sean demonstrates the complete browser flow; Isaiah reviews layout.
- **Day 4:** Paul publishes integration results; formal owners resolve any trace mismatch.
- **Day 5:** Ranee holds feature-freeze review and confirms delivery method.

## Completion checklist

- [ ] Runtime model matches the reviewed minimized mapping.
- [ ] Full-input acceptance and actual trace are verified.
- [ ] React clearly separates rejection, bad request and connection failure.
- [ ] Shared corpus agrees across simulator/API/UI.
- [ ] Critical defects are fixed and retested.
- [ ] Implementation chapter and demo draft match the candidate.
- [ ] Feature freeze and Phase 4 activation are recorded.
