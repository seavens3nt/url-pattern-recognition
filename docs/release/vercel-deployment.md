# Vercel deployment runbook

The October 2 deployment keeps the approved DFA and API behavior.
Vercel builds the React/Vite site from `frontend/` and runs `api/index.py` as a
Python Flask function on the same origin. The browser continues to call
`/api/health` and `POST /api/validate`; no CORS exception or external URL fetch
is required. The function includes `backend/automata/url_dfa.json` and uses
Python 3.12. `vercel.json` routes API paths to Flask before the SPA fallback.

The deployment configuration is on `main`. The completed application revision
is `e3e6f595f4d791fb65e94c4f431c85af4af9f7c3` (PR #98), deployed October 4
through Vercel's GitHub integration. The production alias is
[url-pattern-recognition.vercel.app](https://url-pattern-recognition.vercel.app).
The October 2 record below preserves the first deployment's historical evidence.

## Current production verification — October 4

- Application source: merged `main` revision `e3e6f59`.
- Production deployment: `dpl_2asvRvCYudoHxkfZ1dMLV7i1VvJk`.
- Public health returned `status: "ok"` and `validator_ready: true`.
- `https://example.com` returned accepted, `M13`, 19 trace rows.
- `ftp://example.com` returned rejected, `M_sink`, 17 trace rows.
- About portraits use optimized WebP assets, approximately 5–22 kB each in
  the October 4 build, replacing the earlier large-image follow-up.
- These are functional smoke results, not a public load-test benchmark.

Ranee declared the project finished October 4. [Current status](../status.md)
owns the completion record and latest automated checks.

## Before deployment

1. Start from current reviewed `main` in a clean checkout. Record its commit.
   Keep report-only work on its separate branch.
2. Run `python -m pytest -q --basetemp .pytest-tmp`, frontend `npm run lint`,
   `npm test`, and `npm run build`. On a Windows sandbox that prevents Vite's
   default config bundling, `npm test -- --configLoader runner` and
   `npm run build -- --configLoader runner` exercise the same project config.
3. Check that `api/index.py` imports the Flask factory and that the packaged
   model JSON is present. No environment secret is needed for the core app.
4. Link only the intended Vercel project. Deploy a preview first, record the
   exact source revision, then test it before promoting or deploying to
   production.

## Preview and production smoke checks

- `GET /` loads the React app with its assets. Check Home, Recognizer, How It
  Works, and About Us at desktop and narrow widths. The About portraits load
  only when the About route opens.
- `GET /api/health` returns 200 with `status: "ok"` and
  `validator_ready: true`. This proves readiness but not DFA correctness.
- `POST /api/validate` with `{"url":"https://example.com"}` returns 200,
  `accepted: true`, final state `M13`, and 19 ordered trace rows.
- `POST /api/validate` with `{"url":"ftp://example.com"}` returns 200,
  `accepted: false`, final state `M_sink`, and 17 trace rows.
- A malformed JSON request returns 400; a request body above Flask's 16 KiB
  limit returns 413. Both remain distinct from DFA rejection in the UI.
- Check `Cache-Control: no-store` on API responses and the security response
  headers. Confirm there is no cross-origin API request and no Vercel 5xx in
  runtime logs. Measure the first-page asset load; a Vercel `READY` state
  alone is insufficient.

## Rollback

If production fails the live API or browser checks, use the Vercel dashboard
or `vercel rollback` to restore the immediately preceding production
deployment, then repeat the health and accepted/rejected checks. The Hobby
plan may only roll back to the immediately previous production deployment.
Record the failing deployment URL and error logs before rebuilding a fix.

## First deployment record — October 2 (historical)

| Field | Verified value |
| --- | --- |
| Source revision | Remote `deploy/vercel` commit `d651f593639b4d60821982228169eed9bf9c27d3` (application and Vercel configuration); PR review and merge pending. |
| Preview URL and smoke evidence | [Preview](https://url-pattern-recognition-fpvjhu6k3-seavens3nts-projects.vercel.app), deployment `dpl_2xe47KP22wro3sM4JqADyaf48EqQ`, READY October 2. Authenticated HTTP smoke passed page/assets, health, accepted `M13`/19 transitions, rejected `M_sink`/17 transitions, malformed 400, oversized 413, no-store and security headers. Browser confirmed connected backend, both verdicts, and lazy-loaded About page. |
| Production URL and smoke evidence | [Public site](https://url-pattern-recognition.vercel.app), deployment `dpl_BbGB7AvDb5dxSk2zb6RKEXXWU4mH`, READY October 2 after promotion. Public HTTP smoke repeated the preview checks; production runtime error log was empty after those requests. |
| Ranee release decision | Ranee authorized Vercel deployment. Production was published after the preview checks passed. PR review/merge, final course submission, and issue closure are separate pending decisions. |

The initial site build loads about 68.6 KiB of compressed JavaScript and 4.6
KiB of compressed CSS; the team page is loaded only when opened. The About
page then contained a 1.76 MB portrait, recorded as a performance follow-up
and subsequently replaced. The October 2 production dependency audit found no advisories;
the full development-tool audit found two moderate and one high advisory.
