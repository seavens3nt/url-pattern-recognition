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
  const healthRequestRef = useRef(null);
  const lastUrlRef = useRef('');

  useEffect(() => {
    const controller = new AbortController();
    healthRequestRef.current = controller;
    getHealth(controller.signal).then(data => {
      if (!controller.signal.aborted) {
        setHealth(data.status === 'ok' ? 'Backend connected' : 'Backend unavailable');
      }
    }).catch(e => {
      if (!controller.signal.aborted && e.name !== 'AbortError') {
        setHealth('Backend unavailable — start Flask in terminal 1.');
      }
    });
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
    // A validation result is fresher than the mount-time health check.
    if (healthRequestRef.current) {
      healthRequestRef.current.abort();
      healthRequestRef.current = null;
    }
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
      setHealth('Backend connected');
      setResult(data);
    } catch (err) {
      if (requestRef.current !== controller) return;
      if (SILENT_CODES.has(err.code)) return;
      if (err.code === 'offline') {
        setHealth('Backend unavailable — start Flask in terminal 1.');
      }
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
    <main className="upr-main w-full flex-[1_0_auto] px-6 pt-14 pb-24 text-center" id="section-recognizer">
      <h1 className="upr-title m-0 text-[clamp(30px,4vw,40px)] font-extrabold tracking-[-0.5px] text-[var(--upr-navy)]">URL Pattern Recognition</h1>
      <p className="upr-subtitle mt-[14px] text-[14px] leading-[1.5] text-[var(--upr-navy)] opacity-75">
        Enter one URL and follow the DFA transitions used to accept or reject it.
      </p>
      <p role="status" className="upr-health mx-auto mt-[18px] w-fit rounded-full border border-[rgba(26,140,146,0.22)] bg-[rgba(26,140,146,0.1)] px-[14px] py-[7px] text-[12px] font-bold text-[var(--upr-navy)]">{health}</p>

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
        <section className="upr-results mx-auto mt-[30px] w-full max-w-[1000px] overflow-hidden rounded-[14px] border border-[rgba(12,33,96,0.08)] bg-[var(--upr-panel-bg)] text-left shadow-[0_14px_34px_rgba(8,26,77,0.1)] motion-reduce:animate-none" aria-labelledby="validation-result-heading">
          <h2 id="validation-result-heading" className="upr-results__header m-0 bg-[var(--upr-teal-dark)] px-[22px] py-6 text-[14px] font-bold tracking-[0.2px] text-white">
            Validation result
          </h2>
          <div className={`upr-results__body min-h-[230px] px-[30px] pt-8 pb-10 max-[900px]:px-4 max-[900px]:pt-6 max-[900px]:pb-8${busy ? ' is-centered grid place-items-center px-6 pt-10 pb-12' : ''}`}>
            <StatusPanel status={status} payload={result} onRetry={retry} />

            {showTrace && (
              <section className="upr-section mt-[26px]" aria-labelledby="trace-heading">
                <h3 id="trace-heading" className="upr-section__title mb-[10px] text-[12px] font-extrabold text-[var(--upr-navy)]">
                  View transition trace ({result.trace.length} steps)
                </h3>
                <div className="upr-panel upr-panel--table overflow-x-auto rounded-lg border border-[rgba(12,33,96,0.1)] bg-white p-0">
                  <TraceTable trace={result.trace} />
                </div>
              </section>
            )}
          </div>
        </section>
      )}

      <p className="upr-scope-note mx-auto mt-7 w-full max-w-[760px] text-[12px] leading-[1.6] text-[#52607d]">
        Core scope: lowercase HTTP/HTTPS, a DNS-style hostname, and an optional simple path.
      </p>
    </main>
  );
}
