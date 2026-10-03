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
    <form className="upr-card mx-auto mt-10 w-full max-w-[1040px] rounded-[26px] bg-[var(--upr-navy)] px-10 pt-10 pb-11 text-center shadow-[0_24px_50px_rgba(8,26,77,0.22)] max-[900px]:rounded-[20px] max-[900px]:px-5 max-[900px]:pt-[26px] max-[900px]:pb-8" onSubmit={handleSubmit} noValidate={!required}>
      <label className="upr-label mb-3 block text-[16px] font-bold text-white" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="upr-input mb-[26px] h-14 w-full rounded-full border-2 border-transparent bg-white px-6 text-center text-[17px] leading-normal text-[#3b4a6b] outline-none transition-[border-color,box-shadow] duration-[180ms] placeholder:text-[#52607d] focus:border-[var(--upr-teal)] focus:shadow-[0_0_0_4px_rgba(26,140,146,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
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
        <p id={errorId} className="upr-help upr-help--error mx-auto mt-[-14px] mb-[22px] text-[12px] leading-[1.5] text-[#ffb4b4]" role="alert">
          {errorText}
        </p>
      ) : helpText ? (
        <p id={helpId} className="upr-help mx-auto mt-[-14px] mb-[22px] text-[14px] leading-[1.5] text-[#c8d2e8]">
          {helpText}
        </p>
      ) : null}

      <div className="upr-actions flex justify-center">
        <button type="submit" className="upr-button min-h-12 min-w-[136px] cursor-pointer rounded-full border-0 bg-[var(--upr-teal-dark)] px-7 text-[16px] font-bold text-white transition-[background,transform] duration-[180ms] hover:not-disabled:bg-[#105f63] active:not-disabled:translate-y-px disabled:cursor-progress disabled:opacity-75" disabled={isDisabled}>
          {loading ? loadingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}
