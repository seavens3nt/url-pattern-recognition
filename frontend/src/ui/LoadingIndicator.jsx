export default function LoadingIndicator() {
  return (
    <div className="loading-panel" role="status" aria-live="polite" aria-busy="true">
      <span className="loading-spinner" aria-hidden="true" />
      <span>
        <strong>Checking the URL…</strong>
        <small>The DFA is reading one character at a time.</small>
      </span>
    </div>
  );
}
