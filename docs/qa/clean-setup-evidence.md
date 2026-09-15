# Clean-setup and corpus evidence

**Recorded:** 2026-09-14  
**Tester:** Paul  
**Guide revision:** docs/how-to-run.md on the checked-out main revision  
**Environment:** Windows; Git 2.51.0.windows.1; Node v24.12.0; npm 11.6.2;
Python 3.14.4. The clone was created in a new temporary directory, not from
the existing working copy.

## Result

| Guide activity | Result | Evidence |
| --- | --- | --- |
| Clone | Pass | git clone --no-local completed with exit 0. This verifies a fresh checkout, but not GitHub invitation/authentication. |
| Python virtual environment | Pass | python -m venv .venv exit 0. |
| Python dependencies | Pass after approved network retry | The restricted runner first raised WinError 10013 while resolving Flask; the same command with normal network access installed Flask 3.1.3, pytest 9.1.1, and Ruff 0.16.7. This is runner isolation, not a teammate blocker. |
| Frontend dependencies | Pass | npm ci added 239 packages. |
| Backend checks | Pass | 34 pytest tests and Ruff passed. |
| Frontend checks | Pass after normal filesystem retry | ESLint passed. Vitest (2 tests) and production build passed when esbuild could read the temporary clone; the restricted runner had denied that directory. |
| Backend startup and health | Pass | Flask started at 127.0.0.1:5000; GET /api/health returned status ok and validator_ready true. |
| Starter validation | Pass | POST /api/validate with https://example.com returned HTTP 200, accepted true, final_state TLD_MANY, and a 19-transition trace. |

## Guide corrections applied

The guide retained former pending-starter expectations: validator_ready false
and DFA validation is not implemented yet. The implemented API is ready and
validates the sample URL, so the guide now records the current response.

## Corpus review

tests/fixtures/url_cases.json contains 20 unique raw inputs: 10 accepted and
10 rejected, including four explicitly labeled boundary cases. Every row has
its source rule, reason, and expected Boolean verdict. The reusable
cross-layer format is documented in tests/fixtures/README.md.

The follow-up scenarios for formal and API testing are collected in
[QA testing suggestions](testing-suggestions.md). Review acceptance is pending
from Isaiah (expected labels), Ralph and Pamela (formal boundaries), and Jared
(fixture/API-negative handling).
