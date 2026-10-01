# Phase 3 responsive and accessibility audit

**Owner:** Isaiah @m1nay3on

**Work package:** [Issue #62](https://github.com/seavens3nt/url-pattern-recognition/issues/62)

**Inputs:** `docs/phases/week-3.md`, `docs/ui/wireframes.md`, `docs/ui/component-plan.md`, and `docs/api-contract.md`

**Visual evidence:** [UI Audit Screenshots](https://docs.google.com/document/d/1FLFJqerU3ZYDHHtStmigZ-snSNzBHi-Ia2rvBomjq9I/edit?tab=t.0)

This is the Phase 3 audit of the integrated web app. The earlier Phase 2
component checklist was completed under [Issue #39](https://github.com/seavens3nt/url-pattern-recognition/issues/39);
its September 23 results are historical, not a retest of this PR. A pass below
means the stated check was observed or inspected as described. It is not a claim
that a screen reader or a production deployment was tested.

## Viewports and routes

| Viewport | Home | Recognizer | How it Works | About Us | Horizontal page overflow |
| --- | --- | --- | --- | --- | --- |
| 1280 x 720 desktop | Pass | Pass | Pass | Pass | None observed |
| 768 x 900 tablet | Pass | Pass | Pass | Pass | None observed |
| 390 x 844 narrow mobile | Pass | Pass | Pass | Pass | None observed |

The browser audit loaded each route at each width and compared the document
scroll width with the viewport. The responsive screenshots in the linked document
show representative Home and Recognizer layouts; the live route checks above
also include How it Works and About Us. At tablet and narrow widths, navigation
collapses into a labelled button. At desktop width, the full navigation is shown.

## Interactions and semantics

| Check | Result | Evidence or limit |
| --- | --- | --- |
| One labelled URL input and native Enter submission | Pass | Live browser: Enter submitted `https://example.com` and `https://example.com?x=1`. |
| Accepted verdict, final state, ordered trace | Pass | Live browser: `https://example.com` returned Accepted, `M13`, and 19 ordered rows. |
| Rejected URL stays distinct from a bad request | Pass | Live browser: `https://example.com?x=1` returned Rejected, `M_sink`, and 23 rows. The component test covers the separate request-error panel. |
| Input help/error and loading semantics | Pass by code and component tests | `UrlForm.jsx` links help/error via `aria-describedby`, uses `aria-invalid`, and disables controls while loading. `LoadingIndicator.jsx` uses a polite live status. A fast local response did not permit a visual loading screenshot. |
| Verdict, request-error and empty-trace semantics | Pass by code and component tests | `StatusPanel.jsx` uses status for DFA verdicts and alert for request errors; `TraceTable.jsx` gives an empty trace a readable status. No screen-reader announcement timing was measured. |
| Trace structure and keyboard reachability | Pass | The trace has a caption, scoped column headings, ordered `position`, `symbol`, `from_state`, `to_state` cells, and a focusable scroll region. The sampled mobile trace fit its container; horizontal scrolling for a wider trace was not exercised. |
| Mobile navigation and focus | Pass | The labelled hamburger changed `aria-expanded` on click and Return; keyboard Tab reached it and displayed a 2 px focus outline. |
| Reduced motion | Pass by CSS inspection | The results/status animations and page motion have reduced-motion rules. This PR also removes hamburger transitions and opening animation when reduced motion is requested. Device-level preference emulation was not run. |
| Text contrast on corrected controls | Pass by color calculation | White on dark teal button/header: 5.45:1; white on dark green accepted banner: 6.26:1; placeholder on white: 6.31:1. These are source-color ratios, not a whole-page automated contrast scan. |

## Findings outside this package

- **Offline classification:** With Flask stopped behind the Vite development
  proxy, a new validation request rendered `Request error` and
  `The backend returned an unexpected HTTP 500 response.` It did not render
  `Backend unavailable`. The state mapping belongs to Sean's validator feature
  package. This audit does not mark the offline behavior as passing or change
  `frontend/src/features/validator/`.
- **Large presentation asset:** The production build emitted
  `frontend/profile_pics/isaiah.png` at 1,764.75 kB. This file is outside the
  owned Phase 3 UI package. It was not modified in this PR; Ranee can assign
  an image optimization separately if the release budget requires it.

## Verification

- `npm run lint`: passed.
- `npm test`: 29 frontend tests passed across 3 files.
- `npm run build`: passed; CSS 22.21 kB (5.23 kB gzip), JavaScript 217.71 kB
  (68.59 kB gzip).
- Live browser: the 12 route/viewport combinations above, Enter submission,
  accepted/rejected result and trace, mobile navigation, and keyboard focus.
- Record the final pushed commit and CI result in PR #68 after the changes are
  committed. The historical Phase 2 test counts are not reused as Phase 3
  evidence.


# Phase 4 Visual and Accessibility Verification

**Owner:** Isaiah @m1nay3on

**Work package:** [Issue #79](https://github.com/seavens3nt/url-pattern-recognition/issues/79)

**Visual evidence:** [Phase 4 UI Visual & Accessibility Verification](https://docs.google.com/document/d/1kgIVnh0rDMMab4bt6ZEOv-JcAgGUh3PCDiFc8kA_C6U/edit?usp=sharing)

## Summary of Verification
- Desktop/mobile and keyboard findings are recorded on the frozen baseline.
- Keyboard-test focus order, visible focus, labels, submit/result announcements and trace-table readability are all functioning for all viewports
- Changes requested in Phase 3 are now implemented in current `main` branch
- Current screenshots and the accessibility checklist are available in Visual evidence. 


## Viewports and routes

| Viewport | Home | Recognizer | How it Works | About Us | Horizontal page overflow |
| --- | --- | --- | --- | --- | --- |
| 1280 x 720 desktop | Pass | Pass | Pass | Pass | None observed |
| 768 x 900 tablet | Pass | Pass | Pass | Pass | None observed |
| 390 x 844 narrow mobile | Pass | Pass | Pass | Pass | None observed |

## Revisions from Phase 3
- Proper Capitalization of "Validation Result" is applied
- Corner Rounding of Validation Result Section is same with approved Figma UI