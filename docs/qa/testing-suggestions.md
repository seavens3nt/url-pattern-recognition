# QA testing suggestions

These are follow-up test scenarios for review. They are not release blockers
and do not change the approved language or API contract.

| ID | Suggested check | Expected review outcome | Reviewers |
| --- | --- | --- | --- |
| S-001 | Run https://xn--example.com through the published RE, NFA/DFA construction, simulator, API, and UI. | Confirm that every artifact rejects the Punycode hostname required by the approved language. | Isaiah, Ralph, Pamela, Jared |
| S-002 | Submit https://example.com?query and compare its trace length with the raw input length. | Confirm that rejection-trace behavior matches the API contract's intended trap-state display. | Pamela, Jared, Sean |

Record the result of each suggestion with the corpus ID or API test used, the
observed result, reviewer, and review date.
