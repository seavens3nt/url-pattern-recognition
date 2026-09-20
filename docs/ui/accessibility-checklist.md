# Validator accessibility and responsive checklist

**Owner:** Isaiah @m1nay3on

**Issue:** #39

**Reviewed inputs:** `docs/ui/wireframes.md`, `docs/ui/component-plan.md`, and `docs/api-contract.md`

## Structure and controls

- [x] The page has one main landmark, one visible page heading, and a labelled validator section.
- [x] The URL field has a programmatic label, help text, URL autocomplete, and the 2048-character limit.
- [x] Native form submission supports Enter/Return without a pointer.
- [x] Loading disables the input and submit button, preventing duplicate requests.
- [x] Buttons, the URL input, the trace disclosure, the scrollable trace region, and the brand link have visible keyboard focus.
- [x] No component calls the backend directly; components receive values and callbacks through props.

## Status and result states

- [x] Loading is announced with `role="status"`, `aria-live="polite"`, and `aria-busy="true"`.
- [x] Accepted, rejected, invalid-request, offline, timeout, and unexpected-response results use a live status region.
- [x] Verdicts use text and icons in addition to color.
- [x] Invalid requests are labelled **Request error**, never **Rejected**.
- [x] Offline, timeout, malformed-response, and server-error states expose a keyboard-accessible retry control.
- [x] Final-state values use readable text and code styling.

## Transition trace

- [x] The trace uses a table with a caption and scoped column headers.
- [x] Rows remain in the API-provided transition order.
- [x] The table has a keyboard-focusable horizontal scroll region on narrow screens.
- [x] Empty traces display explanatory text instead of an empty table.

## Responsive and visual checks

- [x] Desktop content is capped at 980px and remains readable on wide screens.
- [x] At 680px and below, the form becomes a single column and the submit button fills the available width.
- [x] The trace keeps its column structure and scrolls horizontally rather than shrinking into unreadable cells.
- [x] Text and status colors maintain strong contrast against their backgrounds.
- [x] The page uses system fonts and CSS decoration only; there are no remote fonts, large images, or new runtime packages.
- [x] Reduced-motion preferences slow the loading animation and remove transitions.

## Automated evidence

`frontend/src/ui/ui.test.jsx` covers the labelled input, keyboard form submission, disabled/loading behavior, live status semantics, invalid-request separation, offline retry, empty trace, populated trace, and semantic table headers. The integrated validator tests cover accepted, rejected, 400, 413, offline, timeout, malformed-response, duplicate-submission, and retry behavior.

The manual state evidence supplied with Issue #39 is recorded in Isaiah's linked [UI states document](https://docs.google.com/document/d/1rJ7sjaEbUEu1-0TR8gnLj1r9Zup-S-qPlkYuNo63J5w/edit?usp=sharing). Static marketing pages are outside this issue and are not required for Phase 2 acceptance.
