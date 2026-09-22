export default function LoadingIndicator() {
  return (
    <div className="upr-loading">
      <div className="upr-spinner" role="presentation">
        <span className="upr-spinner__ring" />
        <span className="upr-spinner__pulse" />
        <span className="upr-spinner__core">
          <span className="upr-spinner__dot" />
        </span>
      </div>
      <h2 className="upr-loading__title">Validating URL</h2>
      <p className="upr-loading__text">Running the DFA simulator...</p>
    </div>
  );
}
