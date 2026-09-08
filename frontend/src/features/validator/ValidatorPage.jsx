import { useEffect, useState } from 'react';
import { getHealth, validateUrl } from './api.js';

export default function ValidatorPage() {
  const [health, setHealth] = useState('Checking backend…');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    getHealth(controller.signal).then(data => {
      setHealth(data.status === 'ok' ? 'Backend connected' : 'Backend unavailable');
    }).catch(e => { if (e.name !== 'AbortError') setHealth('Backend unavailable — start Flask in terminal 1.'); });
    return () => controller.abort();
  }, []);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const data = await validateUrl(url);
      setMessage(data.message || 'Unexpected response. Check the backend terminal.');
    } catch { setMessage('Cannot reach the backend. Check that Flask is running.'); }
    finally { setBusy(false); }
  }
  return <main>
    <p className="eyebrow">AUTOMATA THEORY / TEAM WORKSPACE</p>
    <h1>URL Pattern<br/>Recognition</h1>
    <p className="intro">Explore how a finite automaton reads a URL, one transition at a time.</p>
    <section aria-labelledby="validator-heading">
      <div className="section-top"><h2 id="validator-heading">Try the connection</h2><span className="badge">Starter version</span></div>
      <p role="status" className="health">{health}</p>
      <form onSubmit={submit}>
        <label htmlFor="url">URL to inspect</label>
        <input id="url" type="text" required maxLength={2048} value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" autoComplete="off" />
        <button disabled={busy}>{busy ? 'Sending…' : 'Send to backend'}</button>
      </form>
      {message && <p role="status" className="result">{message}</p>}
      <p className="note">The connection works independently of the validator. Acceptance results will be available after the team approves the URL language and implements the DFA.</p>
    </section>
    <footer>React + Vite · Python + Flask · No database required</footer>
  </main>;
}
