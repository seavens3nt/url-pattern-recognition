# Contributing

1. Accept the GitHub collaborator invitation and clone the repository.
2. Create a branch for your task, such as `feature/url-language` or `docs/dfa-design`.
3. Keep changes focused on the assigned task and coordinate shared interfaces with the integration lead.
4. Add relevant tests when implementing behavior. Check valid, invalid, and boundary URL inputs against the agreed language specification.
5. Open a pull request to `main` explaining the change and how it was checked.
6. Request a teammate's review and resolve feedback before merging.

Never commit credentials, `.env` files, dependency folders, or generated build outputs. Commit dependency manifests and lockfiles when they are introduced.

Use the DFA transition logic for acceptance decisions. Document changes to the language, state definitions, or API contract so frontend, backend, and tests remain consistent.


## Four-week phase workflow
All changes go through a reviewed PR; no direct commits to main. Use phase-specific branches such as `phase-2/nfa-construction`. Coordinate cross-area changes with the relevant owner before implementation. See [weekly delegation](docs/roadmap.md).
