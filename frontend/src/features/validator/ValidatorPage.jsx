import { useEffect, useState } from 'react';
import { getHealth, validateUrl } from './api.js';

export default function ValidatorPage() {
  const [health, setHealth] = useState('Checking backend…');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    getHealth(controller.signal).then(data => {
      setHealth(data.status === 'ok' ? 'Backend connected' : 'Backend unavailable');
    }).catch(e => { if (e.name !== 'AbortError') setHealth('Backend unavailable — start Flask in terminal 1.'); });
    return () => controller.abort();
  }, []);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setResult(null);
    try {
      const data = await validateUrl(url);
      setResult(data);
    } catch { setResult({ message: 'Cannot reach the backend. Check that Flask is running.', code: 'offline' }); }
    finally { setBusy(false); }
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
        <input id="url" type="text" required maxLength={2048} value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" autoComplete="off" />
        <button disabled={busy}>{busy ? 'Checking…' : 'Run DFA'}</button>
      </form>
      {result && <div role="status" className={`result ${result.accepted === true ? 'accepted' : result.accepted === false ? 'rejected' : 'request-error'}`}>
        <strong>{result.accepted === true ? 'Accepted' : result.accepted === false ? 'Rejected' : 'Request error'}</strong>
        <p>{result.message || 'Unexpected response. Check the backend terminal.'}</p>
        {result.final_state && <p className="state">Final state: <code>{result.final_state}</code></p>}
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
