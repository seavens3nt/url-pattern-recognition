# UI/UX wireframe handoff

**Owner:** Isaiah @m1nay3on  
**Reviewed:** 2026-09-13  
**Design:** [URL Pattern Recognizer in Figma](https://www.figma.com/design/lBD7rgDXgzb58vlPBPXmUT/url-patter-recognizer?node-id=0-1)

The reviewed Figma file contains the home, recognizer, accepted, rejected, loading, invalid-request, backend-offline, how-it-works, and about screens. This file records the implementation meaning of those states so frontend and backend work use the same labels.

| UI state | Trigger | Required behavior |
| --- | --- | --- |
| Input/idle | Page is ready and no request is active. | Show the URL input and submit control. Do not display an acceptance claim. |
| Loading | A validation request is awaiting a response. | Disable repeated submission and show visible progress. |
| Accepted | API returns HTTP 200 with `accepted: true`. | Show the accepted verdict, readable message, final state, and transition trace. |
| Rejected | API returns HTTP 200 with `accepted: false`. | Show the rejected verdict, reason or failure position, final state, and available trace. |
| Invalid request | API returns HTTP 400 or 413. | Explain how to correct the input. Do not label it as a DFA rejection. |
| Backend offline | The request cannot reach Flask. | Explain that the server is unavailable and allow retry. Do not display accepted or rejected. |

The site fades in on initial load, including the navbar; page content fades in
on navigation. Home sections, How It Works steps, About
cards, and team members reveal once when they enter the viewport. Reduced-motion
preferences disable these effects, keyboard focus reveals its containing content,
and content stays visible when intersection observers are unavailable.

## Implementation handoff

- Isaiah owns layout, visual consistency, responsive behavior, and accessible labels.
- Sean owns React state changes and rendering of the result and trace.
- Jared owns the HTTP responses that select each request state.
- Paul verifies that each state can be reproduced and is not confused with another state.
- Any visual example URL must follow [`docs/language-spec.md`](../language-spec.md).

Before Phase 3, Sean and Isaiah should record desktop and mobile measurements from Figma and confirm keyboard focus, contrast, error association, and progress indication.

The Start, Check URL Pattern, and Retry action buttons share a lightweight CSS specular rim. The highlight follows the pointer and fades on hover or keyboard focus without replacing the existing navy/teal backgrounds, sizing, or actions. Disabled buttons and reduced-motion preferences omit the decoration; no WebGL dependency or idle animation loop is required.

Action buttons ease into a small hover enlargement and a brief press compression. The Anatomy Bento controls retain their positions while one full-width explanation panel below them fades and expands or collapses. Closed panels remain mounted for the closing transition but are hidden from assistive technology and inert. The transition-trace disclosure also animates its opening in supported browsers. All interaction motion is disabled for reduced-motion preferences. The three What is a URL cards use white backgrounds and dark text.
