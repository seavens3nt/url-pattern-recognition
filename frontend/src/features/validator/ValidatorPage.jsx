import { useEffect, useRef, useState } from 'react';
import LoadingIndicator from '../../ui/LoadingIndicator.jsx';
import StatusPanel from '../../ui/StatusPanel.jsx';
import TraceTable from '../../ui/TraceTable.jsx';
import UrlForm from '../../ui/UrlForm.jsx';
import { getHealth, validateUrl } from './api.js';

const SILENT_CODES = new Set(['cancelled']);

export default function ValidatorPage() {
  const [health, setHealth] = useState('Checking backend…');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const requestRef = useRef(null);
  const lastUrlRef = useRef('');

  useEffect(() => {
    const controller = new AbortController();
    getHealth(controller.signal)
      .then(data => setHealth(data.status === 'ok' ? 'Backend connected' : 'Backend unavailable'))
      .catch(error => {
        if (error.name !== 'AbortError') setHealth('Backend unavailable — start Flask in terminal 1.');
      });
    return () => controller.abort();
  }, []);

  useEffect(() => () => requestRef.current?.abort(), []);

  async function runValidation(targetUrl) {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    lastUrlRef.current = targetUrl;
    setBusy(true);
    setResult(null);

    try {
      const data = await validateUrl(targetUrl, { signal: controller.signal });
      if (requestRef.current === controller) setResult(data);
    } catch (error) {
      if (requestRef.current !== controller || SILENT_CODES.has(error.code)) return;
      setResult({ message: error.message, code: error.code || 'offline' });
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setBusy(false);
      }
    }
  }

  function submit(event) {
    event.preventDefault();
    if (!busy && url.trim()) runValidation(url);
  }

  function retry() {
    if (!busy) runValidation(lastUrlRef.current || url);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#validator" aria-label="URL Pattern Recognition home">
          <span className="brand-mark" aria-hidden="true">URL</span>
          <span>URL Pattern Recognition</span>
        </a>
        <span className="course-badge">Automata Theory Project</span>
      </header>

      <main id="validator" className="validator-page">
        <section className="hero" aria-labelledby="page-title">
          <p className="eyebrow">DETERMINISTIC FINITE AUTOMATON</p>
          <h1 id="page-title">See how a machine reads your URL.</h1>
          <p>
            Submit one URL to inspect whether it belongs to our approved regular language,
            then follow every state transition made by the DFA.
          </p>
        </section>

        <section className="validator-card" aria-labelledby="validator-heading">
          <div className="card-heading">
            <div>
              <p className="card-kicker">URL recognizer</p>
              <h2 id="validator-heading">Test a URL</h2>
            </div>
            <p role="status" className="health"><span aria-hidden="true" />{health}</p>
          </div>

          <UrlForm url={url} onUrlChange={setUrl} onSubmit={submit} loading={busy} />
          {busy && <LoadingIndicator />}
          <StatusPanel result={result} onRetry={retry} loading={busy} />
          {result && Array.isArray(result.trace) && <TraceTable trace={result.trace} />}

          <aside className="scope-note" aria-label="Supported URL scope">
            <strong>Core scope</strong>
            <span>Lowercase HTTP/HTTPS, DNS-style hostnames, and an optional simple path.</span>
          </aside>
        </section>
      </main>

      <footer className="site-footer">
        <span>React + Flask</span>
        <span>The submitted URL is simulated locally and is never opened.</span>
      </footer>
    </div>
  );
}
