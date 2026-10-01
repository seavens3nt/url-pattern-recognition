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


# Phase 4 visual and accessibility verification

**Owner:** Isaiah @m1nay3on

**Work package:** [Issue #79](https://github.com/seavens3nt/url-pattern-recognition/issues/79)

**Application baseline:** `0eb389bac3f50d3ed0a2cae70bb8a36e6b79e480`

**Evidence review:** October 1, 2026 (Asia/Manila), on PR head `cd81e6455f7e1d7ad794c1916c4f118717c7f5ae`. The PR branch has no `frontend/` or `backend/` differences from the frozen application baseline.

Isaiah's [Phase 4 screenshot document](https://docs.google.com/document/d/1kgIVnh0rDMMab4bt6ZEOv-JcAgGUh3PCDiFc8kA_C6U/edit?usp=sharing) contains desktop, tablet, and mobile captures. These representative PNGs were copied unchanged from that document into the repository so the evidence survives a separate document link:

- [Desktop recognizer: URL input and accepted result](screenshots/phase-4-recognizer-desktop-result.png)
- [Desktop recognizer: accepted result and transition trace](screenshots/phase-4-recognizer-desktop-trace.png)
- [390 x 844 mobile recognizer: result and trace](screenshots/phase-4-recognizer-mobile-result-trace.png)

The captures show `https://example.com/users/123` accepted at `M15` with 29 transition steps. On October 1, the same input was submitted with Enter to the frozen React app and a running local Flask backend; the live result was Accepted, `M15`, and 29 ordered rows. The screenshot document does not record its own capture commit or an automated overflow measurement; the identical application files and live result support the comparison but do not prove capture timing.

## Viewports and routes

| Supplied capture viewport | Home | Recognizer | How it Works | About Us | Overflow evidence |
| --- | --- | --- | --- | --- | --- |
| 1280 x 720 desktop | Captured | Captured with result | Captured | Captured | October 1 live recognizer: document width 1265 px within a 1280 px viewport. |
| 768 x 900 tablet | Captured | Captured with result | Captured | Captured | No visible clipping in supplied captures; scroll width not measured. |
| 390 x 844 narrow mobile | Captured | Captured with result | Captured | Captured | No visible clipping in supplied captures; scroll width not measured. |

## Interaction and accessibility findings

| Check | Result and evidence | Limit |
| --- | --- | --- |
| URL label and keyboard submission | Pass in October 1 live browser run: the input was exposed as `URL to inspect`; Enter submitted `https://example.com/users/123`. | Tested at the 1280 x 720 browser viewport. |
| Focus order and visible focus | Pass in the live recognizer: Tab moved from URL input to `Run DFA`, then to the `DFA transition trace` region. The button had an outline and the trace region had a solid focus outline. | Other routes and viewport-specific keyboard order were not independently retested in this review. |
| Result announcement semantics | The accepted result is a `role="status"` region; request errors use `role="alert"` in the frozen component. | Screen-reader announcement timing was not measured. |
| Transition trace | The live result exposed a named, keyboard-focusable region, table caption, column headers, and 29 ordered rows. The supplied desktop and mobile captures show readable trace columns. | A wider trace requiring horizontal scrolling was not exercised. |
| Responsive route visibility | Isaiah's linked document shows all four routes at the three stated viewports. | Screenshots support visual appearance, not keyboard behavior or automated overflow claims. |

## Visual follow-up and defense scope

The frozen UI still renders the heading as **“Validation result”**, with a lowercase `r`; the earlier claim that “Validation Result” capitalization was implemented was incorrect. The results container uses a 14 px corner radius in the frozen CSS. This documentation-only PR does not change either value or assert an independently verified Figma match. A visual change after the freeze requires Ranee to identify it as a release blocker and assign the affected file.

For the defense, describe this UI as a text-only URL recognizer: it sends the entered string to the local Flask validator, then displays the DFA verdict, final state, and ordered transitions. It does not visit the URL or validate arbitrary URL syntax. The evidence above is from local development and supplied screenshots; it is not a public-hosting audit or a measured screen-reader test.
