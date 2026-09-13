# Regular Expression Draft — URL Pattern Recognition

## 1. Regularity check

Every rule in the language spec is still expressible as a regular expression.
Bounded ranges (port 0-65535, hostname labels 1-63 chars, total hostname
253 chars), repetition (path segments, query pairs), and character-class
restrictions are all finite and regular. Nothing requires unbounded counting
or nested matching, so nothing is flagged as non-regular.

Two items from the spec are flagged as needing a team decision rather than
being resolved here, since the spec itself leaves them open:

- Whether underscores are allowed in hostname labels (spec lists `exa_mple.com`
  as a rejected example but notes some browsers tolerate it and says to
  "decide explicitly").
- Mixed-script homograph hostnames (e.g. Cyrillic characters mixed with Latin
  ones to spoof a known domain). This is checkable with a regex against a
  finite confusables list, but no such list is defined in the spec yet, so it
  isn't built into this draft.

As before, case normalization (rule 8) and Punycode/percent-encoding
normalization (rule 10) are treated as preprocessing steps applied before the
string reaches the automaton, not as part of the accept/reject grammar
itself.

## 2. Named components

Character classes:

```
ALPHA        = [A-Za-z]
DIGIT        = [0-9]
NONZERO-DIGIT = [1-9]
HEXDIG       = [0-9A-Fa-f]
ALPHANUM     = [A-Za-z0-9]
UNRESERVED   = ALPHANUM | "-" | "." | "_" | "~"
PCT-ENCODED  = "%" HEXDIG HEXDIG
```

Scheme (matched case-insensitively):

```
SCHEME = "http" | "https" | "ftp"
```

Hostname labels are now bounded at 1-63 characters and cannot start or end
with a hyphen:

```
LABEL     = ALPHANUM
          | ALPHANUM (ALPHANUM | "-"){0,61} ALPHANUM
HOSTNAME  = LABEL ("." LABEL)*   (total length bounded to 253 chars)
```

A double dot (`www..example.com`) is rejected because it would require an
empty label between the dots, and LABEL requires at least one character.

IP literals:

```
IPv4        = DIGIT{1,3} "." DIGIT{1,3} "." DIGIT{1,3} "." DIGIT{1,3}
              (each octet additionally bounded to 0-255)
IPv6-LITERAL = "[" HEXDIG{1,4} (":" HEXDIG{1,4})* "]"
```

Authority, with the port now excluding leading zeros and requiring at least
one digit (an empty port after `:` is invalid):

```
AUTHORITY = (HOSTNAME | IPv4 | IPv6-LITERAL) PORT?
PORT      = ":" ("0" | NONZERO-DIGIT DIGIT{0,4})
            (value additionally bounded to 0-65535)
```

Path, with segments required to be non-empty so that a double slash
(`//users`) cannot occur mid-path:

```
PATH         = "/" (PATH-SEGMENT ("/" PATH-SEGMENT)*)?
PATH-SEGMENT = (UNRESERVED | PCT-ENCODED)+
```

Because PCT-ENCODED requires exactly two hex digits after `%`, a dangling
percent (`/users/123%`) already fails to match without any extra rule.

Query, with keys required to be non-empty so an empty pair between double
delimiters (`id=123&&sort=asc`) is rejected, while a valueless key (`?flag`)
still matches:

```
QUERY      = "?" QUERY-PAIR (("&" | ";") QUERY-PAIR)*
QUERY-PAIR = QUERY-KEY ("=" QUERY-VALUE)?
QUERY-KEY  = (UNRESERVED | PCT-ENCODED)+
QUERY-VALUE = (UNRESERVED | PCT-ENCODED)*
```

An empty query string (`?` alone) is rejected, since QUERY requires at least
one QUERY-PAIR.

Fragment (excluding `#` from the allowed characters is what rejects a second
`#` delimiter, and also rejects a bare trailing `##` once the full URL is
required to match end to end):

```
FRAGMENT = "#" (UNRESERVED | PCT-ENCODED)*
```

Full URL:

```
URL = SCHEME "://" AUTHORITY PATH? QUERY? FRAGMENT?
```

Raw whitespace, raw non-ASCII characters, and other control characters are
rejected implicitly: no character class in this draft includes them, so a URL
containing any of them fails to match rather than needing a separate negative
rule.

## 3. Worked cases

**Accepted — `https://example.com/users/123`**
SCHEME matches `https`. AUTHORITY matches `example.com` as a single-dot
HOSTNAME, each label within the 1-63 char bound. PATH matches `/users/123` as
two non-empty segments. Full match, ACCEPT.

**Accepted — `http://my-site.co.uk:8080/search?q=hello%20world`**
SCHEME matches `http`. AUTHORITY matches `my-site.co.uk` (three labels) plus
PORT `:8080`, which has no leading zero and is within range. PATH matches
`/search`. QUERY matches `?q=hello%20world`, with QUERY-KEY `q` non-empty and
the space correctly given as a PCT-ENCODED sequence inside QUERY-VALUE. Full
match, ACCEPT.

**Rejected — `htp://example.com/`**
SCHEME must match `http`, `https`, or `ftp`. `htp` does not match any
alternative, so the match fails at the SCHEME component before authority is
even considered. REJECT.

**Rejected — `https://example.com/?id=1&&sort=asc`**
SCHEME and AUTHORITY match normally. QUERY matches the first pair `id=1`, then
`&`, then attempts to match the next QUERY-PAIR starting at the second `&`.
QUERY-KEY requires one or more characters, but the next character is `&`
itself, so QUERY-KEY cannot match. The empty pair fails, and the match fails
partway through QUERY. REJECT.

## 4. Open questions / ambiguity log

- Spec lists scheme as "an allowed set (e.g., http, https, ftp)" — still
  unclear whether other schemes are permitted. Need a closed list.
- Underscore in hostname labels: spec explicitly says "decide explicitly" —
  this needs a team decision, not just a reading of the doc.
- Mixed-script homograph hostnames are flagged as a security concern in the
  spec but no confusables list or rule is defined. Needs a decision on
  whether this is in scope for Phase 1 at all, since it would require a
  separate reference list, not just grammar rules.
- Malformed multi-byte UTF-8 in percent-encoded sequences (e.g. `%C3` alone,
  without a valid continuation byte) is called out in the spec. The current
  PCT-ENCODED rule validates each `%XX` independently but does not enforce
  valid multi-byte UTF-8 continuation structure across sequences. This is
  still regular to check (UTF-8 byte validity is itself a regular language),
  but is more involved than the current draft models. Need to confirm whether
  that level of validation is required for Phase 1 or can be deferred.
- Subdomain depth limit: spec says "up to you (e.g., max 5 levels)" — needs an
  explicit number if the team wants a limit enforced.
- Fragment "well-formedness" beyond a second `#` isn't otherwise defined, and
  the spec notes `##` (empty fragment with malformed delimiter) as ambiguous.
  Under this draft, a bare `#` with no content is accepted, but a trailing
  stray `##` is rejected once the full string must match end to end.
  Confirming that's the intended behavior.