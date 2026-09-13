# Approved URL language — core release

**Decision date:** 2026-09-13  
**Deadline:** 2026-09-29  
**Decision owner:** Ranee Mikaella V. Gutierrez  
**Source task:** GitHub issue #2

This is the authoritative input language for the first release. Ralph uses it for the regular expression and NFA, Pamela for the DFA and minimization, Jared for the simulator, Sean and Isaiah for interface messages, and Paul for QA. Examples elsewhere must agree with this file.

## Scope decision

The release recognizes a deliberately small, regular subset of URLs:

```text
scheme://hostname[/path]
```

Only the rules below are supported. A real-world URL can be valid in a browser and still be rejected by this academic recognizer.

## Final rules

| Part | Accepted rule | Rejected in the core release |
| --- | --- | --- |
| Scheme | Exactly lowercase `http` or `https`, followed by `://`. | FTP, other schemes, uppercase or mixed-case schemes, and scheme-less input. |
| Hostname | At least two dot-separated labels. A label starts and ends with `a-z` or `0-9`; hyphens may appear only inside a label. | Single-label hosts, empty labels, leading/trailing hyphens, underscores, and spaces. |
| Top-level label | At least two lowercase letters `a-z`. | Numeric, one-character, uppercase, or mixed-character top-level labels. |
| Subdomains | Allowed under the same hostname-label rule. There is no separate depth limit; the whole input remains limited to 2048 characters by the API. | Any subdomain containing a character or boundary that violates the hostname rule. |
| Port | Not supported. | Any `:port` after the hostname. |
| Path | Optional. It begins with `/`. Segments may contain lowercase letters, digits, `-`, `_`, `.`, or `~`. Single slashes separate segments; one trailing slash is allowed. | Spaces, uppercase letters, percent escapes, an empty middle segment (`//`), and other punctuation. |
| Query | Not supported. | Any `?query`. |
| Fragment | Not supported. | Any `#fragment`. |
| Case | Case-sensitive. Accepted letters are lowercase only. | Uppercase or mixed-case input anywhere. |
| Whitespace | Not supported anywhere. The simulator does not trim the input. | Leading, trailing, or internal whitespace. |
| Non-ASCII | Not supported. | Raw Unicode, Punycode hostnames, emoji, and other non-ASCII characters. |
| IP addresses | Not supported as hostnames. | IPv4 and bracketed IPv6 literals. |

The recognizer inspects the submitted string only. It never opens the URL, checks DNS, or tests whether a website exists.

## Compact grammar

The notation below is a shared design target. Ralph must still document the formal regular expression and NFA rather than treating this grammar as the final automaton artifact.

```text
URL       := SCHEME "://" HOST [PATH]
SCHEME    := "http" | "https"
HOST      := LABEL "." LABEL ("." LABEL)*
LABEL     := ALNUM | ALNUM LABEL_INNER* ALNUM
LABEL_INNER := ALNUM | "-"
PATH      := "/" | "/" SEGMENT ("/" SEGMENT)* ["/"]
SEGMENT   := PATH_CHAR+
ALNUM     := "a".."z" | "0".."9"
PATH_CHAR := ALNUM | "-" | "_" | "." | "~"
```

For the top-level label, apply the stricter rule of two or more lowercase letters. Ralph and Pamela must show how that constraint is represented in the formal construction.

## Approved examples

The machine-readable source is [`tests/fixtures/url_cases.json`](../tests/fixtures/url_cases.json). Paul may add boundary cases, but changing an expected result or expanding the language requires Ranee's scope approval and coordinated updates to this file, the fixture, formal artifacts, API/UI messages, and affected tests.

## Required handoff

1. Ralph confirms the language is regular and feasible by 2026-09-14.
2. Paul checks every fixture result and reason against these rules by 2026-09-14.
3. Sean and Jared confirm the accepted, rejected, invalid-request, and offline messages by 2026-09-15.
4. Ranee resolves disagreements. Work on the final RE/NFA/DFA uses this version unless an approved PR changes it.
