import { useEffect, useRef, useState } from "react";
import "../style.css";

const NAV_LINKS = ["Home", "Recognizer", "How it Works", "About Us"];
const LOADING_MS = 1600;

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  INVALID: "invalid",
  ERROR: "error",
};


function validateInputs(pattern, url) {
  const reasons = [];
  const p = pattern.trim();
  const u = url.trim();

  if (!p) {
    reasons.push(
      "The URL pattern field is empty. Provide a pattern such as /users/:userID/posts/:postId."
    );
  } else {
    if (!p.startsWith("/")) {
      reasons.push("The URL pattern must begin with a forward slash (/).");
    }
    if (/\s/.test(p)) {
      reasons.push(
        "The URL pattern contains whitespace. Remove spaces or encode them as %20."
      );
    }
    if (p.split("/").some((segment) => segment === ":")) {
      reasons.push(
        "A dynamic segment is missing its parameter name. Use the form :name."
      );
    }

    const keys = p
      .split("/")
      .filter((segment) => segment.startsWith(":"))
      .map((segment) => segment.slice(1));
    const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
    if (duplicates.length > 0) {
      reasons.push(
        `Duplicate parameter name detected: :${[...new Set(duplicates)].join(
          ", :"
        )}. Each parameter key must be unique.`
      );
    }
  }

  if (!u) {
    reasons.push(
      "The test URL field is empty. Provide an absolute or relative URL to evaluate."
    );
  } else {
    if (/\s/.test(u)) {
      reasons.push("The test URL contains whitespace, which is not valid in a URL.");
    }
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(u) && !/^https?:\/\//i.test(u)) {
      reasons.push(
        "Unsupported protocol. Only http:// and https:// schemes can be evaluated."
      );
    }
  }

  return reasons;
}


   /*Data type inference for the extracted parameters table*/

function inferType(value) {
  if (/^\d+$/.test(value)) return "Numeric String";
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
  ) {
    return "UUID";
  }
  if (/^[a-z]+$/i.test(value)) return "Alphabetic String";
  if (/^[a-z0-9\-_.]+$/i.test(value)) return "Alphanumeric String";
  return "Encoded String";
}

/*Core analysis for ACCEPTED and REJECTED*/

function analyze(pattern, url, caseSensitive) {
  const startedAt = performance.now();

  const cleanPattern = pattern.trim();
  const raw = url.trim();

  let protocol = "";
  let hostname = "";
  let pathname = raw;
  let search = "";

  if (/^https?:\/\//i.test(raw)) {
    const parsed = new URL(raw);
    protocol = `${parsed.protocol}//`;
    hostname = parsed.hostname;
    pathname = parsed.pathname;
    search = parsed.search;
  } else {
    const queryIndex = raw.indexOf("?");
    if (queryIndex > -1) {
      search = raw.slice(queryIndex);
      pathname = raw.slice(0, queryIndex);
    }
    protocol = "relative";
    hostname = "n/a";
  }

  const patternSegments = cleanPattern.split("/").filter(Boolean);
  const urlSegments = pathname.split("/").filter(Boolean);
  const normalize = (value) => (caseSensitive ? value : value.toLowerCase());

  const reasons = [];
  const params = [];

  if (patternSegments.length !== urlSegments.length) {
    reasons.push(
      `Segment count mismatch. The pattern expects ${patternSegments.length} path segment(s) but the URL provides ${urlSegments.length}.`
    );
  }

  const limit = Math.min(patternSegments.length, urlSegments.length);
  for (let i = 0; i < limit; i += 1) {
    const patternSeg = patternSegments[i];
    const urlSeg = urlSegments[i];

    if (patternSeg.startsWith(":")) {
      const decoded = decodeURIComponent(urlSeg);
      params.push({
        key: patternSeg,
        value: decoded,
        type: inferType(decoded),
        origin: `Segment ${i + 1}`,
      });
      continue;
    }

    if (normalize(patternSeg) !== normalize(urlSeg)) {
      const caseOnly = patternSeg.toLowerCase() === urlSeg.toLowerCase();
      reasons.push(
        caseOnly
          ? `Case mismatch at segment ${i + 1}. Expected "${patternSeg}" but received "${urlSeg}". Turn off Case Sensitivity to allow this.`
          : `Literal mismatch at segment ${i + 1}. The pattern expects "${patternSeg}" but the URL provides "${urlSeg}".`
      );
    }
  }

  const query = Array.from(new URLSearchParams(search).entries()).map(
    ([key, value]) => ({
      key,
      value,
      type: "Query String",
      origin: "Key-Value Pair",
    })
  );

  const executionTime = (performance.now() - startedAt).toFixed(2);
  const firstStatic = patternSegments.filter((s) => !s.startsWith(":"))[0] || "";

  const anatomy = {
    Protocol: protocol,
    Hostname: hostname,
    "Path Prefix": `/${firstStatic}/`,
    "Matched Pattern": cleanPattern,
    "Query Parameters": search ? search.replace(/^\?/, "") : "none",
  };

  return {
    matched: reasons.length === 0,
    reasons,
    executionTime,
    anatomy,
    rows: [...params, ...query],
  };
}


   /*Presentational pieces*/

function Logo({ size = "large" }) {
  return (
    <div className={`upr-logo upr-logo--${size}`} aria-label="URL logo">
      <span className="upr-logo__dome" />
      <span className="upr-logo__text">
        <span>U</span>
        <span>R</span>
        <span>L</span>
      </span>
    </div>
  );
}

function Spinner() {
  return (
    <div className="upr-spinner" role="presentation">
      <span className="upr-spinner__ring" />
      <span className="upr-spinner__pulse" />
      <span className="upr-spinner__core">
        <span className="upr-spinner__dot" />
      </span>
    </div>
  );
}

function ReasonsBlock({ reasons }) {
  return (
    <div className="upr-section">
      <h3 className="upr-section__title">Reasons</h3>
      <div className="upr-panel">
        <ul className="upr-reasons">
          {reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/*Main component*/

export default function UrlPatternRecognizer() {
  const [pattern, setPattern] = useState("/users/:userID/posts/:postId");
  const [testUrl, setTestUrl] = useState(
    "https://api.example.com/users/99/post/abc-123?sort=desc"
  );
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [payload, setPayload] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleVerify = (event) => {
    event.preventDefault();
    clearTimeout(timerRef.current);

    setPayload(null);
    setStatus(STATUS.LOADING);

    timerRef.current = setTimeout(() => {
      try {
        const invalidReasons = validateInputs(pattern, testUrl);
        if (invalidReasons.length > 0) {
          setPayload({ reasons: invalidReasons });
          setStatus(STATUS.INVALID);
          return;
        }

        const outcome = analyze(pattern, testUrl, caseSensitive);
        setPayload(outcome);
        setStatus(outcome.matched ? STATUS.ACCEPTED : STATUS.REJECTED);
      } catch {
        setPayload(null);
        setStatus(STATUS.ERROR);
      }
    }, LOADING_MS);
  };

  const isLoading = status === STATUS.LOADING;
  const showPanel = status !== STATUS.IDLE;

  return (
    <div className="upr-page">
      <header className="upr-header">
        <Logo size="large" />
        <nav className="upr-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}>
              {link}
            </a>
          ))}
        </nav>
      </header>

      <main className="upr-main">
        <h1 className="upr-title">URL Pattern Recognizer</h1>
        <p className="upr-subtitle">
          Welcome to the automated URL Patter Recognizer!
          <br />
          Type in your URL pattern and test URL
        </p>

        <form className="upr-card" onSubmit={handleVerify}>
          <label className="upr-label" htmlFor="pattern">
            Enter URL Pattern
          </label>
          <input
            id="pattern"
            className="upr-input"
            type="text"
            value={pattern}
            onChange={(event) => setPattern(event.target.value)}
            placeholder="/users/:userID/posts/:postId"
            spellCheck="false"
            disabled={isLoading}
          />

          <label className="upr-label" htmlFor="test-url">
            Enter URL
          </label>
          <input
            id="test-url"
            className="upr-input"
            type="text"
            value={testUrl}
            onChange={(event) => setTestUrl(event.target.value)}
            placeholder="https://api.example.com/users/99/posts/abc-123?sort=desc"
            spellCheck="false"
            disabled={isLoading}
          />

          <div className="upr-toggle-row">
            <span className="upr-toggle-label" id="case-label">
              Case Sensitivity
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={caseSensitive}
              aria-labelledby="case-label"
              className={`upr-switch${caseSensitive ? " is-on" : ""}`}
              onClick={() => setCaseSensitive((value) => !value)}
              disabled={isLoading}
            >
              <span className="upr-switch__knob" />
            </button>
          </div>

          <div className="upr-actions">
            <button type="submit" className="upr-button" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>

        {showPanel && (
          <section
            className="upr-results"
            aria-live="polite"
            aria-busy={isLoading}
          >
            <div className="upr-results__header">Match Results</div>

            <div
              className={`upr-results__body${isLoading ? " is-centered" : ""}`}
            >
              {/* ---------- LOADING ---------- */}
              {status === STATUS.LOADING && (
                <div className="upr-loading">
                  <Spinner />
                  <h2 className="upr-loading__title">Preparing results</h2>
                  <p className="upr-loading__text">
                    Analyzing pattern and rules...
                  </p>
                </div>
              )}

              {/* ---------- ERROR ---------- */}
              {status === STATUS.ERROR && (
                <div className="upr-notice">
                  <h2 className="upr-notice__title">OOPS! :(</h2>
                  <p className="upr-notice__text">
                    We encountered a problem. Please try again
                  </p>
                </div>
              )}

              {/* ---------- INPUT INVALID ---------- */}
              {status === STATUS.INVALID && (
                <>
                  <div className="upr-notice upr-notice--solo">
                    <h2 className="upr-notice__title upr-notice__title--wide">
                      INPUT INVALID
                    </h2>
                  </div>
                  <ReasonsBlock reasons={payload?.reasons ?? []} />
                </>
              )}

              {/* ---------- REJECTED ---------- */}
              {status === STATUS.REJECTED && (
                <>
                  <div className="upr-banner upr-banner--rejected">
                    <h2 className="upr-banner__title">
                      REJECTED <span aria-hidden="true">&#10060;</span>
                    </h2>
                    <p className="upr-banner__meta">
                      (HTTP 404 Not Found Equivalent) Execution Time:{" "}
                      {payload?.executionTime} ms
                    </p>
                  </div>
                  <ReasonsBlock reasons={payload?.reasons ?? []} />
                </>
              )}

              {/* ---------- ACCEPTED ---------- */}
              {status === STATUS.ACCEPTED && (
                <>
                  <div className="upr-banner upr-banner--accepted">
                    <h2 className="upr-banner__title">
                      ACCEPTED <span aria-hidden="true">&#9989;</span>
                    </h2>
                    <p className="upr-banner__meta">
                      (HTTP 200 OK Equivalent) Execution Time:{" "}
                      {payload?.executionTime} ms
                    </p>
                  </div>

                  <div className="upr-section">
                    <h3 className="upr-section__title">URL Segment Anatomy</h3>
                    <div className="upr-panel">
                      <dl className="upr-anatomy">
                        {Object.entries(payload?.anatomy ?? {}).map(
                          ([key, value]) => (
                            <div className="upr-anatomy__row" key={key}>
                              <dt>{key}:</dt>
                              <dd>{value}</dd>
                            </div>
                          )
                        )}
                      </dl>
                    </div>
                  </div>

                  <div className="upr-section">
                    <h3 className="upr-section__title">
                      Extracted Dynamic Parameters
                    </h3>
                    <div className="upr-panel upr-panel--table">
                      <table className="upr-table">
                        <thead>
                          <tr>
                            <th>Parameter Key</th>
                            <th>Extracted Value</th>
                            <th>Data Type</th>
                            <th>Origin Path Segment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(payload?.rows ?? []).map((row) => (
                            <tr key={`${row.key}-${row.origin}`}>
                              <td>{row.key}</td>
                              <td>{row.value}</td>
                              <td>{row.type}</td>
                              <td>{row.origin}</td>
                            </tr>
                          ))}
                          {(payload?.rows ?? []).length === 0 && (
                            <tr>
                              <td colSpan="4" className="upr-table__empty">
                                No dynamic parameters in this pattern.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="upr-footer">
        <Logo size="small" />
        <p className="upr-copy">
          &copy; 2026 [@matthewvisuals]. All rights reserved.
        </p>
        <nav className="upr-footer-nav" aria-label="Footer navigation">
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}>
              {link}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}
