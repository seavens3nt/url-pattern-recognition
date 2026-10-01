# Vercel deployment runbook

The October 1 deployment candidate keeps the approved DFA and API behavior.
Vercel builds the React/Vite site from `frontend/` and runs `api/index.py` as a
Python Flask function on the same origin. The browser continues to call
`/api/health` and `POST /api/validate`; no CORS exception or external URL fetch
is required. The function includes `backend/automata/url_dfa.json` and uses
Python 3.12. `vercel.json` routes API paths to Flask before the SPA fallback.

This document describes the deployment candidate. It does not claim that a
Vercel deployment exists until a URL and the checks below are recorded.

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

## Deployment record

| Field | Verified value |
| --- | --- |
| Source revision | Pending deployment |
| Preview URL and smoke evidence | Pending |
| Production URL and smoke evidence | Pending |
| Ranee release decision | Pending |
