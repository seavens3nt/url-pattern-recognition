export default function LoadingIndicator({
  title = "Validating URL",
  message = "Running the DFA simulator...",
}) {
  return (
    <div
      className="upr-loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="upr-spinner" role="presentation">
        <span className="upr-spinner__ring" />
        <span className="upr-spinner__pulse" />
        <span className="upr-spinner__core">
          <span className="upr-spinner__dot" />
        </span>
      </div>
      <h2 className="upr-loading__title">{title}</h2>
      <p className="upr-loading__text">{message}</p>
    </div>
  );
}
