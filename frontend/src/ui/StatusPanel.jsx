import LoadingIndicator from "./LoadingIndicator.jsx";

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  INVALID: "invalid",
  INVALID_REQUEST: "invalid-request",
  OFFLINE: "offline",
  ERROR: "error",
  UNEXPECTED: "unexpected",
};

export default function StatusPanel({ status = STATUS.IDLE, payload, onRetry }) {
  if (status === STATUS.IDLE) return null;

  if (status === STATUS.LOADING) {
    return <LoadingIndicator />;
  }

  const message =
    payload?.message || "The validator did not return a result message.";
  const finalState = payload?.final_state;

  const isOffline =
    status === STATUS.OFFLINE ||
    (status === STATUS.ERROR &&
      (payload?.code === "offline" || payload?.code === "timeout"));

  if (isOffline || status === STATUS.ERROR || status === STATUS.UNEXPECTED) {
    const heading = isOffline
      ? "Backend unavailable"
      : status === STATUS.UNEXPECTED
        ? "Unexpected response"
        : "Request error";

    return (
      <div className="upr-notice mx-auto mt-[26px] w-full max-w-[620px] rounded-lg bg-[var(--upr-grey-box)] px-6 py-[18px] text-center motion-reduce:animate-none" role="alert">
        <h2 className="upr-notice__title m-0 text-[15px] font-extrabold tracking-[0.3px] text-[var(--upr-navy)]">{heading}</h2>
        <p className="upr-notice__text mt-[6px] text-[12px] text-[var(--upr-navy)] opacity-75">{message}</p>
        {onRetry && (
          <button type="button" className="upr-button h-[34px] min-w-[98px] cursor-pointer rounded-full border-0 bg-[var(--upr-teal-dark)] px-6 text-[14px] font-bold text-white hover:bg-[#105f63]" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    );
  }

  if (status === STATUS.INVALID || status === STATUS.INVALID_REQUEST) {
    return (
      <div className="upr-notice upr-notice--solo mx-auto mt-[26px] mb-[30px] w-full max-w-[620px] rounded-lg bg-[var(--upr-grey-box)] px-6 py-[18px] text-center motion-reduce:animate-none" role="alert">
        <h2 className="upr-notice__title m-0 text-[15px] font-extrabold tracking-[0.3px] text-[var(--upr-navy)]">Request error</h2>
        <p className="upr-notice__text mt-[6px] text-[12px] text-[var(--upr-navy)] opacity-75">{message}</p>
      </div>
    );
  }

  if (status === STATUS.ACCEPTED || status === STATUS.REJECTED) {
    const accepted = status === STATUS.ACCEPTED;
    return (
      <div
        className={`upr-banner mx-auto mt-3 mb-[30px] w-full max-w-[680px] rounded-lg px-5 py-[14px] text-center text-white motion-reduce:animate-none ${
          accepted ? "upr-banner--accepted" : "upr-banner--rejected"
        } ${accepted ? 'bg-[var(--upr-green-dark)] shadow-[0_8px_20px_rgba(11,138,75,0.25)]' : 'border-2 border-[#1e7ce0] bg-[var(--upr-red)] shadow-[0_8px_20px_rgba(142,17,22,0.25)]'}`}
        role="status"
      >
        <h2 className="upr-banner__title m-0 text-[15px] font-extrabold tracking-[1px]">
          {accepted ? "Accepted" : "Rejected"}{" "}
          <span aria-hidden="true">{accepted ? "\u2705" : "\u274C"}</span>
        </h2>
        <p className="upr-banner__meta mt-[5px] text-[11px] opacity-90">{message}</p>
        {finalState && (
          <p className="upr-banner__meta mt-[5px] text-[11px] opacity-90">
            Final state: <code>{finalState}</code>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="upr-notice mx-auto mt-[26px] w-full max-w-[620px] rounded-lg bg-[var(--upr-grey-box)] px-6 py-[18px] text-center motion-reduce:animate-none" role="alert">
      <h2 className="upr-notice__title m-0 text-[15px] font-extrabold tracking-[0.3px] text-[var(--upr-navy)]">Unexpected response</h2>
      <p className="upr-notice__text mt-[6px] text-[12px] text-[var(--upr-navy)] opacity-75">{message}</p>
    </div>
  );
}
