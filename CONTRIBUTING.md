# Contributing

Start with [GitHub Desktop: clone, branch and PR](docs/github-desktop-guide.md) and [How to run](docs/how-to-run.md).

1. Read your task issue and phase guide. Fetch/pull main, then create a task branch such as phase-2/nfa-construction.
2. Coordinate shared files and API/model changes with the responsible member before editing. See docs/architecture.md.
3. Keep changes focused; install frontend dependencies in frontend and maintain Python dependency manifests in backend.
4. Check behavior and inspect the diff. Do not commit credentials, .env, .venv, node_modules or build outputs.
5. Commit and publish your branch. Open a PR into main with the issue, changes, checks, screenshots/examples and coordination evidence.
6. Request @seavens3nt. Technical peer review helps verify correctness, but Ranee’s code-owner approval is required for teammates’ PRs.
7. Address feedback on the same branch and push again. New commits dismiss prior approval. Resolve review discussions before merge.
8. After merge, update main before creating your next task branch.

The active main ruleset requires a PR and code-owner approval, dismisses stale approvals, resolves review threads, and blocks force pushes/deletion. Only @seavens3nt has a PR-only bypass for her own PRs. CODEOWNERS names Ranee for every file. Do not push directly to main.

Use DFA transitions for acceptance; never replace the academic simulator with a regex-only check or fetch submitted URLs. Record changes to the language, automata or API in the same reviewed handoff.
