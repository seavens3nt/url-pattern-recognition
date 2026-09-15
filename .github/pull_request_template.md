## Change

- Correct the run-guide guidance for `/api/validate`: well-formed requests now
  receive an HTTP 200 DFA verdict rather than an expected 501.
- Correct the shared-corpus count and browser-result evidence in `docs/status.md`.
- Document API/UI fixture consumption as future work until those parameterized
  tests are added.
- Enforce the `category` and `source_rule` fixture contract in the shared
  corpus test.

Refs #5

## Validation

- [x] `./.venv/Scripts/python.exe -m pytest`
- [x] `./.venv/Scripts/python.exe -m ruff check backend tests`

No UI code changed, so no screenshot is required.

## Review
- [x] Relevant tests pass
- [x] Language and API changes are documented
- [x] No credentials or generated dependency folders included

## Coordination and handoff
- Phase and issue: Phase 1 — `Refs #5` (owner acceptance pending)
- Owner consulted before cross-area edits: Required acceptance is recorded
  below; no acceptance is claimed before the owners respond.
- Receiving teammate and agreed schema/artifact: Isaiah (language-rule labels),
  Ralph and Pamela (formal boundary categories and source rules), and Jared
  (fixture/API request handling) review `tests/fixtures/url_cases.json` and
  its enforced test contract.
- Reviewer and evidence links:
  - [ ] Isaiah: accepts fixture expected outcomes and source-rule labels.
  - [ ] Ralph: accepts fixture formal-language boundaries and source rules.
  - [ ] Pamela: accepts boundary categories and DFA-rule compatibility.
  - [ ] Jared: accepts fixture/API request-handling compatibility.
  - Evidence: `docs/qa/clean-setup-evidence.md` and the checks listed above.
