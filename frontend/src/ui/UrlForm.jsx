import "../style.css";

const DEFAULT_ID = "url";

export default function UrlForm({
  value = "",
  onChange,
  onSubmit,
  label = "URL to inspect",
  helpText,
  errorText,
  disabled = false,
  loading = false,
  submitLabel = "Validate",
  loadingLabel = "Validating...",
  id = DEFAULT_ID,
  name = DEFAULT_ID,
  placeholder = "https://example.com",
  required = true,
  maxLength = 2048,
}) {
  const isDisabled = disabled || loading;
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const describedBy = errorText ? errorId : helpText ? helpId : undefined;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <form className="upr-card" onSubmit={handleSubmit} noValidate={!required}>
      <label className="upr-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="upr-input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        spellCheck="false"
        autoComplete="url"
        required={required}
        maxLength={maxLength}
        disabled={isDisabled}
        aria-invalid={Boolean(errorText)}
        aria-describedby={describedBy}
      />

      {errorText ? (
        <p id={errorId} className="upr-help upr-help--error" role="alert">
          {errorText}
        </p>
      ) : helpText ? (
        <p id={helpId} className="upr-help">
          {helpText}
        </p>
      ) : null}

      <div className="upr-actions">
        <button type="submit" className="upr-button" disabled={isDisabled}>
          {loading ? loadingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}
