# Validator accessibility and responsive checklist

**Owner:** Isaiah @m1nay3on

**Issue:** #39

**Authoritative inputs:** `docs/ui/wireframes.md`, `docs/ui/component-plan.md`, and `docs/api-contract.md`

## Structure and controls

- [/] The form contains one clearly labelled URL input.
- [/] Native form submission supports Enter/Return without a pointer.
- [/] The URL input exposes help or error text through `aria-describedby`.
- [/] Invalid input uses `aria-invalid` and an alert message.
- [/] Loading disables the input and submit button to prevent duplicate requests.
- [x] The loading state is announced through a polite live status region.
- [/] Accepted and rejected DFA outcomes use status semantics.
- [/] Invalid requests, offline failures, and unexpected responses use alert semantics and are not labelled as DFA rejections.
- [/] Offline results provide an optional keyboard-accessible retry control.

## Results and trace

- [/] Accepted and rejected results display the backend message and final state when supplied.
- [/] Trace rows render `position`, `symbol`, `from_state`, and `to_state` in order.
- [/] The trace table has a caption and scoped column headings.
- [/] The trace region is keyboard focusable when horizontal scrolling is required.
- [/] An empty trace has a readable status message.

## Responsive and visual behavior

- [/] Layout rules cover desktop, tablet, and narrow mobile widths.
- [/] Interactive controls have visible keyboard focus styles.
- [/] Text and status colors preserve readable foreground/background contrast.
- [/] Tables scroll horizontally rather than clipping or widening the page.
- [/] Reduced-motion preferences disable nonessential motion.
- [/] No remote font, large remote image, or new runtime package blocks the validator UI.

## Verification required in the PR

- [/] UI-state evidence is linked from Issue #39: [submitted UI evidence](https://docs.google.com/document/d/1rJ7sjaEbUEu1-0TR8gnLj1r9Zup-S-qPlkYuNo63J5w/edit?usp=sharing).
- [/] Native form submission, retry, accessible navigation, and focusable trace scrolling are represented by semantic controls and component tests.
- [/] Production build recorded: JavaScript 198.86 kB (62.85 kB gzip), CSS 10.01 kB (2.80 kB gzip), and favicon 244.52 kB.
- [/] Verification on September 23, 2026: 28 frontend tests, ESLint, Vite production build, 446 backend tests, and `git diff --check` passed.
