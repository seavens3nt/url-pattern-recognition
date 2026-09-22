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
      <div className="upr-notice" role="alert">
        <h2 className="upr-notice__title">{heading}</h2>
        <p className="upr-notice__text">{message}</p>
        {isOffline && onRetry && (
          <button type="button" className="upr-button" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    );
  }

  if (status === STATUS.INVALID || status === STATUS.INVALID_REQUEST) {
    return (
      <div className="upr-notice upr-notice--solo" role="alert">
        <h2 className="upr-notice__title">Request error</h2>
        <p className="upr-notice__text">{message}</p>
      </div>
    );
  }

  if (status === STATUS.ACCEPTED || status === STATUS.REJECTED) {
    const accepted = status === STATUS.ACCEPTED;
    return (
      <div
        className={`upr-banner ${
          accepted ? "upr-banner--accepted" : "upr-banner--rejected"
        }`}
        role="status"
      >
        <h2 className="upr-banner__title">
          {accepted ? "Accepted" : "Rejected"}{" "}
          <span aria-hidden="true">{accepted ? "\u2705" : "\u274C"}</span>
        </h2>
        <p className="upr-banner__meta">{message}</p>
        {finalState && (
          <p className="upr-banner__meta">
            Final state: <code>{finalState}</code>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="upr-notice" role="alert">
      <h2 className="upr-notice__title">Unexpected response</h2>
      <p className="upr-notice__text">{message}</p>
    </div>
  );
}
