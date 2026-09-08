# Project guidance

Read docs/context.md and docs/status.md before substantial project work. Use docs/roadmap.md for planned dependencies and docs/api-contract.md for interface decisions.

Do not invent an approved URL grammar. The current endpoint is deliberately unimplemented; preserve that distinction until the formal artifacts support acceptance decisions. Input URLs are strings to simulate, never network destinations to fetch.

Keep frontend code in frontend/src, API code in backend, automata logic in backend/automata, and backend tests in tests. Use the setup and checks in docs/how-to-run.md. Keep personal credentials and dependency folders out of commits.

When changing behavior, add tests for actual contract and language cases, update affected documentation, and report checks actually run. This file does not authorize publishing, inviting collaborators, or changing repository settings beyond the user's request.

Use docs/architecture.md for current versus planned paths. React API calls belong in frontend/src/features/validator/api.js; Flask HTTP routes belong in backend/routes/validation.py and request/engine coordination in backend/services/validation.py. Keep docs/phases and the Google Docs guide aligned when changing team assignments; this is a manual review step, not a live sync.
