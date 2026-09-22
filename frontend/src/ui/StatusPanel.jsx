import LoadingIndicator from "./LoadingIndicator.jsx";

const STATUS = {
  LOADING: "loading",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  INVALID: "invalid",
  ERROR: "error",
};

export default function StatusPanel({ status, payload }) {
  if (status === STATUS.LOADING) {
    return <LoadingIndicator />;
  }

  const message =
    payload?.message || "The validator did not return a result message.";
  const finalState = payload?.final_state;

  if (status === STATUS.ERROR) {
    return (
      <div className="upr-notice" role="alert">
        <h2 className="upr-notice__title">
          {payload?.code === "offline" || payload?.code === "timeout"
            ? "Backend unavailable"
            : "Request error"}
        </h2>
        <p className="upr-notice__text">{message}</p>
      </div>
    );
  }

  if (status === STATUS.INVALID) {
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

  return null;
}
