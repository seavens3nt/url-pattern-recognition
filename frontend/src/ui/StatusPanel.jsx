import SpecularButton from "./SpecularButton.jsx";
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

function explainVerdict(accepted, payload) {
  if (accepted) {
    return "The lowercase scheme, hostname, and optional path satisfy the approved grammar; the DFA ended in an accepting state.";
  }

  const firstSinkStep = payload?.trace?.find((step) =>
    typeof step.to_state === "string" && step.to_state.toLowerCase().includes("sink")
  );
  if (firstSinkStep) {
    const symbol = firstSinkStep.symbol;
    const rule = symbol === "?"
      ? "Query strings are not supported."
      : symbol === "#"
        ? "Fragments are not supported."
        : /[A-Z]/.test(symbol)
          ? "Only lowercase letters are supported."
          : /\s/.test(symbol)
            ? "Whitespace is not supported."
            : symbol.codePointAt(0) > 127
              ? "Raw Unicode characters are not supported."
              : "That character is not allowed at this point in the approved URL format.";
    return `At trace position ${firstSinkStep.position}, ${JSON.stringify(symbol)} sent the DFA to its rejecting sink. ${rule}`;
  }
  if (typeof payload?.final_state === "string" && payload.final_state.toLowerCase().includes("sink")) {
    return "The DFA reached its rejecting sink because part of the input is not allowed in the approved URL format.";
  }
  return "The input ended in a non-accepting state. Check that the scheme, hostname, top-level label, and any path segment are complete.";
}

export default function StatusPanel({ status = STATUS.IDLE, payload, onRetry, stepCount }) {
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
          <SpecularButton type="button" className="upr-button h-[34px] min-w-[98px] cursor-pointer rounded-full border-0 bg-[var(--upr-teal-dark)] px-6 text-[14px] font-bold text-white hover:bg-[#105f63]" onClick={onRetry}>
            Retry
          </SpecularButton>
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
        className={`upr-banner mx-auto my-0 w-full max-w-[820px] rounded-xl px-5 py-4 text-center text-white motion-reduce:animate-none ${
          accepted ? "upr-banner--accepted" : "upr-banner--rejected"
        } ${accepted ? 'bg-[var(--upr-green-dark)] shadow-[0_8px_20px_rgba(11,138,75,0.25)]' : 'border-2 border-[#1e7ce0] bg-[var(--upr-red)] shadow-[0_8px_20px_rgba(142,17,22,0.25)]'}`}
        role="status"
      >
        <h2 className="upr-banner__title m-0 text-[clamp(18px,2.5vw,24px)] font-extrabold tracking-[0.4px]">
          {accepted ? "Accepted" : "Rejected"}{" "}
          <span aria-hidden="true">{accepted ? "\u2705" : "\u274C"}</span>
        </h2>
        <p className="upr-banner__meta mx-auto mt-1 max-w-[720px] text-[13px] leading-[1.45] opacity-95">{message}</p>
        <p className="upr-banner__reason mx-auto mt-2 max-w-[720px] text-[13px] leading-[1.45] text-white">
          <strong>Why:</strong> {explainVerdict(accepted, payload)}
        </p>
        {(finalState || stepCount !== undefined) && (
          <p className="upr-banner__meta mt-2 text-[12px] opacity-90">
            {finalState && <><span>Final state:</span> <code>{finalState}</code></>}
            {finalState && stepCount !== undefined && <span aria-hidden="true"> · </span>}
            {stepCount !== undefined && <span>{stepCount} transitions</span>}
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
