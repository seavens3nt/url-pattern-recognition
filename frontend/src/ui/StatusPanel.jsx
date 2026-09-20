function panelDetails(result) {
  if (result.accepted === true) return { heading: 'Accepted', tone: 'accepted' };
  if (result.accepted === false) return { heading: 'Rejected', tone: 'rejected' };
  if (result.code === 'offline' || result.code === 'timeout') {
    return { heading: 'Backend unavailable', tone: 'offline' };
  }
  return { heading: 'Request error', tone: 'error' };
}

function canRetry(result) {
  return (
    result.accepted === undefined &&
    result.code &&
    result.code !== 'invalid_request' &&
    result.code !== 'payload_too_large'
  );
}

export default function StatusPanel({ result, onRetry, loading = false }) {
  if (!result) return null;
  const { heading, tone } = panelDetails(result);

  return (
    <section className={`status-panel status-panel--${tone}`} role="status" aria-live="polite">
      <div className="status-panel__heading">
        <span className="status-panel__icon" aria-hidden="true">
          {tone === 'accepted' ? '✓' : tone === 'rejected' ? '×' : '!'}
        </span>
        <div>
          <p className="status-panel__eyebrow">Validation result</p>
          <h2>{heading}</h2>
        </div>
      </div>
      <p className="status-panel__message">
        {result.message || 'The server returned an unexpected response.'}
      </p>
      {result.final_state && (
        <p className="final-state">
          Final state: <code>{result.final_state}</code>
        </p>
      )}
      {canRetry(result) && (
        <button type="button" className="secondary-button" onClick={onRetry} disabled={loading}>
          Retry validation
        </button>
      )}
    </section>
  );
}
