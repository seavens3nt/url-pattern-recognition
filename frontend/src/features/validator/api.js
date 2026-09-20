// Sean and Jared coordinate changes to this boundary through docs/api-contract.md.

const DEFAULT_TIMEOUT_MS = 10000;

function getBaseUrl() {
  // Vite exposes env vars prefixed with VITE_ on import.meta.env, so
  // deployments can point at a different backend without a code change.
  const configured =
    typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL;
  return configured || '/api';
}

export async function getHealth(signal) {
  const response = await fetch(`${getBaseUrl()}/health`, { signal });
  if (!response.ok) throw new Error('Health check failed');
  return response.json();
}

/**
 * Combines a caller-supplied AbortSignal (for cancelling a stale request)
 * with an internal timeout, and reports which one actually fired.
 */
function withTimeout(externalSignal, timeoutMs) {
  const controller = new AbortController();
  let reason = null;

  const timeoutId = setTimeout(() => {
    reason = 'timeout';
    controller.abort();
  }, timeoutMs);

  const onExternalAbort = () => {
    reason = 'cancelled';
    controller.abort();
  };

  if (externalSignal) {
    if (externalSignal.aborted) {
      reason = 'cancelled';
      controller.abort();
    } else {
      externalSignal.addEventListener('abort', onExternalAbort);
    }
  }

  return {
    signal: controller.signal,
    getReason: () => reason,
    cleanup: () => {
      clearTimeout(timeoutId);
      if (externalSignal) externalSignal.removeEventListener('abort', onExternalAbort);
    },
  };
}

function isTraceEntryValid(entry) {
  return (
    entry &&
    typeof entry === 'object' &&
    typeof entry.position === 'number' &&
    typeof entry.symbol === 'string' &&
    typeof entry.from_state === 'string' &&
    (entry.to_state === null || typeof entry.to_state === 'string')
  );
}

// Matches the HTTP 200 schema in docs/api-contract.md exactly.
function isResultShapeValid(data) {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.accepted === 'boolean' &&
    typeof data.message === 'string' &&
    (data.final_state === null || typeof data.final_state === 'string') &&
    Array.isArray(data.trace) &&
    data.trace.every(isTraceEntryValid)
  );
}

/**
 * POSTs { url } to /api/validate.
 *
 * - Resolves with the DFA result on HTTP 200: { accepted, message, final_state, trace }.
 * - Resolves with a request-error object on HTTP 400/413: { code, message } —
 *   same shape the UI already renders as "Request error", never "Rejected".
 * - Throws an Error with a `.code` of "offline", "timeout", "cancelled", or
 *   "malformed_response" for everything else that isn't a clean request error.
 *
 * @param {string} url
 * @param {object} [options]
 * @param {AbortSignal} [options.signal] - cancels this request (e.g. a newer one superseded it).
 * @param {number} [options.timeoutMs] - bounded timeout, defaults to 10s.
 */
export async function validateUrl(url, { signal: externalSignal, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  const { signal, getReason, cleanup } = withTimeout(externalSignal, timeoutMs);

  let response;
  try {
    response = await fetch(`${getBaseUrl()}/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
      signal,
    });
  } catch (err) {
    cleanup();
    if (err && err.name === 'AbortError') {
      const reason = getReason();
      const e = new Error(
        reason === 'cancelled' ? 'Request was cancelled.' : 'The request took too long and timed out.'
      );
      e.code = reason === 'cancelled' ? 'cancelled' : 'timeout';
      throw e;
    }
    const e = new Error('Cannot reach the backend. Check that Flask is running.');
    e.code = 'offline';
    throw e;
  }
  cleanup();

  let data = null;
  try {
    data = await response.json();
  } catch {
    // fall through; handled below based on response.ok
  }

  if (response.ok === false) {
    // HTTP 400/413 already carry { code, message } per the contract — pass
    // that straight through so it renders as a request error, not "Rejected".
    if (data && typeof data.message === 'string') {
      return {
        code: data.code || (response.status === 413 ? 'payload_too_large' : 'invalid_request'),
        message: data.message,
      };
    }
    const e = new Error(`Unexpected server error (HTTP ${response.status}).`);
    e.code = 'malformed_response';
    throw e;
  }

  if (!isResultShapeValid(data)) {
    const e = new Error('The server returned an unexpected response.');
    e.code = 'malformed_response';
    throw e;
  }

  return data;
}
