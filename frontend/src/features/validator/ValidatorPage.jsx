import { useEffect, useRef, useState } from 'react';
import { getHealth, validateUrl } from './api.js';

// Codes that mean "a newer request has already superseded this one" —
// never shown to the user, never stored as a result.
const SILENT_CODES = new Set(['cancelled']);

// Heading shown when result.accepted is undefined (i.e. not a DFA verdict).
// Per docs/ui/component-plan.md, invalid-request and backend-offline are
// distinct panels: a 400/413 is a request error and must never read "Rejected".
function headingFor(result) {
  if (result.code === 'offline' || result.code === 'timeout') return 'Backend unavailable';
  return 'Request error';
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

  return <main>
    <p className="eyebrow">AUTOMATA THEORY / TEAM WORKSPACE</p>
    <h1>URL Pattern<br/>Recognition</h1>
    <p className="intro">Explore how a finite automaton reads a URL, one transition at a time.</p>
    <section aria-labelledby="validator-heading">
      <div className="section-top"><h2 id="validator-heading">Test a URL</h2><span className="badge">DFA simulator</span></div>
      <p role="status" className="health">{health}</p>
      <form onSubmit={submit}>
        <label htmlFor="url">URL to inspect</label>
        <input id="url" type="text" required maxLength={2048} value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" autoComplete="off" disabled={busy} />
        <button disabled={busy}>{busy ? 'Checking…' : 'Run DFA'}</button>
      </form>
      {result && <div role="status" className={`result ${result.accepted === true ? 'accepted' : result.accepted === false ? 'rejected' : 'request-error'}`}>
        <strong>{result.accepted === true ? 'Accepted' : result.accepted === false ? 'Rejected' : headingFor(result)}</strong>
        <p>{result.message || 'Unexpected response. Check the backend terminal.'}</p>
        {result.final_state && <p className="state">Final state: <code>{result.final_state}</code></p>}
        {result.accepted === undefined && result.code && result.code !== 'invalid_request' && result.code !== 'payload_too_large' &&
          <button type="button" onClick={retry} disabled={busy}>Retry</button>}
      </div>}
      {result?.trace?.length > 0 && <details>
        <summary>View transition trace ({result.trace.length} steps)</summary>
        <div className="trace-wrap"><table><thead><tr><th>Pos.</th><th>Symbol</th><th>From</th><th>To</th></tr></thead>
          <tbody>{result.trace.map(step => <tr key={step.position}><td>{step.position}</td><td><code>{step.symbol}</code></td><td>{step.from_state}</td><td>{step.to_state}</td></tr>)}</tbody>
        </table></div>
      </details>}
      <p className="note">Core scope: lowercase HTTP/HTTPS, a DNS-style hostname, and an optional simple path. The simulator reads the text only and never visits the URL.</p>
    </section>
    <footer>React + Vite · Python + Flask · No database required</footer>
  </main>;
}