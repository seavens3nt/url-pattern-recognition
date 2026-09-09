# GitHub Desktop: clone, branch and submit a PR

This guide is for all eight project members. Ranee prepares the frontend/backend starter and helps with setup. GitHub Desktop handles version control; use your editor’s terminals to run React and Flask as explained in [How to run](how-to-run.md).

## Words you will see
- Repository: the shared project and its change history.
- Clone: download a working copy with Git history to your computer.
- Branch: a separate line of work for one task.
- Commit: save a named snapshot locally; it is not uploaded yet.
- Push: upload your commits. Publish branch uploads a new branch for the first time.
- Fetch: check for remote updates. Pull: bring those updates into your local branch.
- Pull request (PR): ask to merge your branch into main after review.
- Merge: incorporate the approved changes into the destination branch.

## 1. Sign in and clone once
1. Accept the private repository invitation using your assigned GitHub account.
2. Install [GitHub Desktop](https://desktop.github.com/) and sign in to that same account.
3. Select File > Clone repository > URL.
4. Enter https://github.com/seavens3nt/url-pattern-recognition.git.
5. Choose a local folder for school projects and click Clone. This creates your local copy; you do not need a new repository or fork.
6. Use Repository > Open in Visual Studio Code if that editor is configured, or open the cloned folder in your preferred editor.
7. Follow docs/how-to-run.md to install dependencies and start both parts. Cloning alone does not install Node, Python or project packages.

If the repository is missing, confirm the invitation and account with Ranee. Do not create a replacement repository.

[GitHub’s cloning instructions](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop)

## 2. Start each task from updated main
1. Check Current repository is url-pattern-recognition.
2. Save and commit any unfinished work on its existing task branch before switching. Do not discard work to clear a warning.
3. Choose Current branch > main, click Fetch origin, then Pull origin if updates are available.
4. Choose Current branch > New branch and create it from main. Use a specific name, such as phase-1/url-rules, phase-2/nfa-construction or phase-3/trace-table.
5. Confirm Current branch shows your task branch before editing. Ranee reviews changes to main through PRs.

## 3. Edit, check and commit
1. Read the assigned issue and phase section. Agree cross-area changes with the affected owner first.
2. Make one focused change. Isaiah and Sean agree shared component edits; Jared and Ranee agree backend support changes.
3. Run the relevant checks in docs/how-to-run.md. For UI changes, also inspect the page and capture a screenshot when helpful.
4. In Desktop’s Changes tab, inspect every selected file and diff. Exclude credentials, .env, .venv, node_modules and generated build files. Dependency changes should include the appropriate manifest and lockfile.
5. Enter a descriptive Summary, such as Add DFA subset construction table, and click Commit to your branch. Explain additional detail in Description if needed.
6. Click Publish branch on the first upload, or Push origin for subsequent commits.

## 4. Open a pull request
1. Click Preview Pull Request, verify the base is main and the compare branch is your task branch, then choose Create Pull Request to continue on GitHub.
2. Review the changed files again. Write a title that describes the deliverable.
3. Fill the PR template: linked issue, changes, files/areas affected, checks actually run, screenshots/examples, and coordination decisions.
4. Use Closes #N only when this PR fully completes issue N. Use Related to #N for a partial checkpoint.
5. Create the PR and request @seavens3nt as reviewer if GitHub has not requested her automatically. If unfinished, mark it as draft and switch it to ready when complete.
6. Share technical questions with the relevant teammate in the issue/PR. Ranee’s approval is required for merging; another teammate’s approval does not substitute for it.

[GitHub’s PR instructions](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/creating-an-issue-or-pull-request-from-github-desktop)

## 5. Respond to feedback and failed checks
- Read the Files changed comments and Checks tab on GitHub.
- Fix feedback on the same task branch, commit, and Push origin. The existing PR updates automatically; do not open another PR for the same fixes.
- Reply with what changed and the checks you ran. Resolve discussions only when the concern is addressed; ask the reviewer if the outcome is unclear.
- If checks fail, open the failed job and find the first useful error. Reproduce it locally using the documented commands. Ask the responsible developer or Paul for help with the exact error and commit.
- New changes dismiss an earlier approval. Request another review from Ranee when ready.
- PR authors cannot approve their own PRs. Ranee has an account-specific PR bypass for her own changes; teammates do not.

## 6. After the PR is merged
1. Confirm GitHub says Merged, not merely Closed or Approved.
2. Save remaining local changes, switch to main, Fetch origin, and Pull origin.
3. Delete the completed task branch only after its work is merged and nothing uncommitted or unpushed remains.
4. Create a new branch from updated main for the next task.
5. If dependency files changed, rerun the installation steps in docs/how-to-run.md. Restart servers after dependency or configuration changes.

## 7. Update a task branch or handle conflicts
With local work saved and committed, fetch remote changes. While on your task branch, use Branch > Merge into current branch and select main to incorporate its updates. If Git reports conflicts, inspect each affected file with its owner, keep the intended combined behavior, remove conflict markers, run checks, and complete the merge through Desktop. Ask Ranee for help before choosing a version you do not understand. Do not force-push or blindly discard either person’s changes.

[GitHub’s branch syncing guide](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/syncing-your-branch-in-github-desktop)

## Optional terminal alternative
Run each command separately. Replace the example branch name with your task. Start only with saved work and a clean working tree when switching branches.

```text
git clone https://github.com/seavens3nt/url-pattern-recognition.git
cd url-pattern-recognition
git switch main
git pull --ff-only
git switch -c phase-1/url-rules
git status
```

After editing and checking the specific file:

```text
git add docs/language-spec.md
git commit -m "Document supported URL rules"
git push -u origin phase-1/url-rules
```

Open the repository on GitHub and use Compare & pull request, with main as base. For review fixes, commit the specific changed files and run git push again. After merge, switch to main and run git pull --ff-only. The example file must exist before git add; stage your actual task files instead.

## Team completion rule
A commit is local, a push uploads it, a PR proposes it, and a merge incorporates it. A task is complete only when its acceptance criteria, checks, documentation and recipient handoff are satisfied—not just because a branch was published.
