import { useEffect, useRef, useState } from 'react';
import StatusPanel from '../../ui/StatusPanel.jsx';
import TraceTable from '../../ui/TraceTable.jsx';
import UrlForm from '../../ui/UrlForm.jsx';
import { getHealth, validateUrl } from './api.js';

// Codes that mean "a newer request has already superseded this one" —
// never shown to the user, never stored as a result.
const SILENT_CODES = new Set(['cancelled']);

function statusFor(result, busy) {
  if (busy) return 'loading';
  if (!result) return 'idle';
  if (result.accepted === true) return 'accepted';
  if (result.accepted === false) return 'rejected';
  if (result.code === 'invalid_request' || result.code === 'payload_too_large') {
    return 'invalid-request';
  }
  if (result.code === 'offline' || result.code === 'timeout') return 'offline';
  return 'error';
}

export default function ValidatorPage() {
  const [health, setHealth] = useState('Checking backend…');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const requestRef = useRef(null); // AbortController for the in-flight validate call
  const lastUrlRef = useRef('');

  useEffect(() => {
    const controller = new AbortController();
    getHealth(controller.signal).then(data => {
      setHealth(data.status === 'ok' ? 'Backend connected' : 'Backend unavailable');
    }).catch(e => { if (e.name !== 'AbortError') setHealth('Backend unavailable — start Flask in terminal 1.'); });
    return () => controller.abort();
  }, []);

  // Cancel any in-flight validation on unmount so a late response never
  // tries to set state after the component is gone.
  useEffect(() => {
    return () => {
      if (requestRef.current) requestRef.current.abort();
    };
  }, []);

  async function runValidation(targetUrl) {
    // A new request always supersedes a pending one — prevents duplicate
    // concurrent requests and guarantees the most recent submission wins.
    if (requestRef.current) requestRef.current.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    lastUrlRef.current = targetUrl;

    setBusy(true);
    setResult(null);

    try {
      const data = await validateUrl(targetUrl, { signal: controller.signal });
      if (requestRef.current !== controller) return; // superseded while awaiting
      setResult(data);
    } catch (err) {
      if (requestRef.current !== controller) return;
      if (SILENT_CODES.has(err.code)) return;
      setResult({ message: err.message, code: err.code || 'offline' });
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setBusy(false);
      }
    }
  }

  function submit(event) {
    event.preventDefault();
    if (busy || !url.trim()) return; // guards against duplicate submission
    runValidation(url);
  }

  function retry() {
    if (busy) return;
    runValidation(lastUrlRef.current || url);
  }

  const status = statusFor(result, busy);
  const showResult = busy || result;
  const showTrace = !busy && (result?.accepted === true || result?.accepted === false);

  return (
    <main className="upr-main" id="section-recognizer">
      <h1 className="upr-title">URL Pattern Recognition</h1>
      <p className="upr-subtitle">
        Enter one URL and follow the DFA transitions used to accept or reject it.
      </p>
      <p role="status" className="upr-health">{health}</p>

      <UrlForm
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        onSubmit={submit}
        disabled={busy}
        loading={busy}
        submitLabel="Run DFA"
        loadingLabel="Checking..."
        helpText="The simulator reads the text only and never visits the submitted website."
      />

      {showResult && (
        <section className="upr-results" aria-labelledby="validation-result-heading">
          <h2 id="validation-result-heading" className="upr-results__header">
            Validation result
          </h2>
          <div className={`upr-results__body${busy ? ' is-centered' : ''}`}>
            <StatusPanel status={status} payload={result} onRetry={retry} />

            {showTrace && (
              <section className="upr-section" aria-labelledby="trace-heading">
                <h3 id="trace-heading" className="upr-section__title">
                  View transition trace ({result.trace.length} steps)
                </h3>
                <div className="upr-panel upr-panel--table">
                  <TraceTable trace={result.trace} />
                </div>
              </section>
            )}
          </div>
        </section>
      )}

      <p className="upr-scope-note">
        Core scope: lowercase HTTP/HTTPS, a DNS-style hostname, and an optional simple path.
      </p>
    </main>
  );
}
