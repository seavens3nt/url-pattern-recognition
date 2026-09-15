# Independent work-package template — Phase 2 onward

Use this structure for every Phase 2, Phase 3, and Phase 4 member issue. Phase 1 issues keep their existing wording and history.

## Objective

State one complete result owned by one member.

## Start status

Choose one:

- **Ready now:** every authoritative input is already on `main`.
- **Partial start allowed:** list the work that can begin now and name the one merged file required for final completion.
- **Blocked by locked input:** Ranee records the missing file and does not assign dependent completion work yet.

Members do not wait for another member's message, meeting, review, or approval. When a required file appears on `main`, they pull and continue.

## Authoritative input files

- List every exact repository path the member must read.
- Record the locked commit when correctness depends on an exact version.
- If inputs conflict, the owner comments on this issue and Ranee decides.

## Owned files

Show the exact editable paths as a code block. No two active packages may own the same editable file.

For coding work, state the boundary explicitly:

- Frontend package: must not edit `backend/`.
- Backend package: must not edit `frontend/`.
- Formal-automata package: must not edit application code unless Ranee creates a separate coding issue.
- QA package: reports defects and does not fix implementation files.
- Paper package: compiles merged evidence and does not edit technical source artifacts.

## Specific tasks

- Use action verbs and list concrete steps.
- Keep related work with the same owner.
- Do not add approval or coordination tasks involving another member.

## Required output

- List every expected file, behavior, table, diagram, screenshot, or report in bullet form.
- Include quantities when relevant, such as 10 accepted and 10 rejected cases.

## How to verify it

- List exact commands or manual checks.
- Require evidence appropriate to the package.
- Include `git diff --check` and the relevant project tests.

## Done when

- [ ] Every required output exists.
- [ ] Only owned files changed.
- [ ] Required checks pass.
- [ ] Documentation matches the delivered behavior.
- [ ] Blockers are resolved by Ranee or recorded clearly.
- [ ] The PR links this issue.
- [ ] Ranee approves and merges the PR.

## PR submission instructions

1. Pull the latest `main`.
2. Create the issue's named branch.
3. Complete and verify the work.
4. Inspect the changed-file list for ownership violations.
5. Commit and push the branch.
6. Open a PR to `main` with `Closes #<issue-number>`.
7. List outputs and checks in the PR description.
8. Request only Ranee's review.

## Ownership conflict rule

Do not edit an unowned file to solve a blocker. Comment with the file, expected behavior, actual behavior, and why it blocks the package. Ranee either changes the locked decision, expands the issue's owned paths, or creates a separate issue for the correct owner.
