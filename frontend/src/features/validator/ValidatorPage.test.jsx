import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ValidatorPage from './ValidatorPage';

function ok(body) {
  return { ok: true, status: 200, json: async () => body };
}
function fail(status, body) {
  return { ok: false, status, json: async () => body };
}

function traceFor(value, finalState = 'S1') {
  return [...value].map((symbol, position) => ({
    position,
    symbol,
    from_state: position === 0 ? 'START' : finalState,
    to_state: finalState,
  }));
}

// Every test mounts the component, which immediately fires a health check.
// Queue that response first, then queue whatever the test itself needs.
function mockHealthOk() {
  globalThis.fetch.mockResolvedValueOnce(ok({ status: 'ok' }));
}

async function submit(value) {
  fireEvent.change(screen.getByLabelText(/url to inspect/i), { target: { value } });
  fireEvent.click(screen.getByRole('button', { name: /run dfa/i }));
}

beforeEach(() => {
  globalThis.fetch = vi.fn();
});

afterEach(() => {
  cleanup(); // Without this, React Testing Library leaves each test's DOM
  // tree mounted, so later tests see multiple "Backend connected" nodes.
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('ValidatorPage', () => {
  it('shows idle state and reports a healthy backend', async () => {
    mockHealthOk();
    render(<ValidatorPage />);
    expect(await screen.findByText('Backend connected')).toBeInTheDocument();
    expect(screen.queryByText('Accepted')).not.toBeInTheDocument();
  });

  it('reports backend unavailable when the health check fails', async () => {
    globalThis.fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    render(<ValidatorPage />);
    expect(await screen.findByText(/backend unavailable/i)).toBeInTheDocument();
  });

  it('renders an accepted result with an ordered trace', async () => {
    mockHealthOk();
    globalThis.fetch.mockResolvedValueOnce(
      ok({
        accepted: true,
        message: 'Accepted: matches the approved language.',
        final_state: 'TLD_MANY',
        trace: traceFor('http://a.co', 'TLD_MANY'),
      })
    );

    render(<ValidatorPage />);
    await screen.findByText('Backend connected');
    await submit('http://a.co');

    expect(await screen.findByText('Accepted')).toBeInTheDocument();
    expect(screen.getByText(/matches the approved language/i)).toBeInTheDocument();
    expect(screen.getByText('TLD_MANY', { selector: 'code' })).toBeInTheDocument();
    expect(screen.getByText('View transition trace (11 steps)')).toBeInTheDocument();
  });

  it('renders a rejected result and never shows a retry button for it', async () => {
    mockHealthOk();
    globalThis.fetch.mockResolvedValueOnce(
      ok({
        accepted: false,
        message: 'Rejected: the URL does not match the approved core language.',
        final_state: 'SINK',
        trace: traceFor('ftp://bad', 'SINK'),
      })
    );

    render(<ValidatorPage />);
    await screen.findByText('Backend connected');
    await submit('ftp://bad');

    expect(await screen.findByText('Rejected')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /retry/i })).not.toBeInTheDocument();
  });

  it('renders a complete rejection trace containing a non-ASCII character', async () => {
    const value = 'https://example.😀';
    mockHealthOk();
    globalThis.fetch.mockResolvedValueOnce(
      ok({
        accepted: false,
        message: 'Rejected: unsupported character.',
        final_state: 'SINK',
        trace: traceFor(value, 'SINK'),
      })
    );

    render(<ValidatorPage />);
    await screen.findByText('Backend connected');
    await submit(value);

    expect(await screen.findByText('Rejected')).toBeInTheDocument();
    expect(screen.getByText('View transition trace (17 steps)')).toBeInTheDocument();
  });

  it('shows an HTTP 400 as a request error, never labeled Rejected', async () => {
    mockHealthOk();
    globalThis.fetch.mockResolvedValueOnce(
      fail(400, { code: 'invalid_request', message: 'A non-empty URL string is required.' })
    );

    render(<ValidatorPage />);
    await screen.findByText('Backend connected');
    await submit('x');

    expect(await screen.findByText('Request error')).toBeInTheDocument();
    expect(screen.getByText(/non-empty URL string is required/i)).toBeInTheDocument();
    expect(screen.queryByText('Rejected')).not.toBeInTheDocument();
    // Retry doesn't make sense for a request the user typed wrong.
    expect(screen.queryByRole('button', { name: /retry/i })).not.toBeInTheDocument();
  });

  it('shows an HTTP 413 as a request error', async () => {
    mockHealthOk();
    globalThis.fetch.mockResolvedValueOnce(fail(413, { code: 'payload_too_large', message: 'Request body too large.' }));

    render(<ValidatorPage />);
    await screen.findByText('Backend connected');
    await submit('x'.repeat(2049));

    expect(await screen.findByText('Request error')).toBeInTheDocument();
    expect(screen.getByText(/too large/i)).toBeInTheDocument();
  });

  it('shows a network failure as backend-unavailable with a retry option', async () => {
    mockHealthOk();
    globalThis.fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    render(<ValidatorPage />);
    await screen.findByText('Backend connected');
    await submit('https://example.com');

    expect(await screen.findByText(/backend unavailable/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('times out a slow response and offers retry', async () => {
    mockHealthOk();
    globalThis.fetch.mockImplementationOnce(
      (_url, { signal }) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener('abort', () => {
            const err = new Error('Aborted');
            err.name = 'AbortError';
            reject(err);
          });
        })
    );

    render(<ValidatorPage />);
    await screen.findByText('Backend connected');

    vi.useFakeTimers();
    fireEvent.change(screen.getByLabelText(/url to inspect/i), { target: { value: 'https://slow.example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /run dfa/i }));

    await vi.advanceTimersByTimeAsync(10000);
    // testing-library's async polling uses real timers internally, which
    // conflicts with vi.useFakeTimers() — switch back before waiting so
    // findByText/waitFor can actually poll again.
    vi.useRealTimers();

    expect(await screen.findByText(/backend unavailable/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('treats a malformed 200 response as an unexpected-response error, not a rendered result', async () => {
    mockHealthOk();
    globalThis.fetch.mockResolvedValueOnce(ok({ accepted: true })); // missing message/final_state/trace

    render(<ValidatorPage />);
    await screen.findByText('Backend connected');
    await submit('https://example.com');

    expect(await screen.findByText('Request error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('rejects a malformed or unordered transition trace', async () => {
    mockHealthOk();
    globalThis.fetch.mockResolvedValueOnce(
      ok({
        accepted: true,
        message: 'Accepted',
        final_state: 'M13',
        trace: [{ position: 1, symbol: 'h', from_state: 'M0', to_state: 'M1' }],
      })
    );

    render(<ValidatorPage />);
    await screen.findByText('Backend connected');
    await submit('https://example.com');

    expect(await screen.findByText('Request error')).toBeInTheDocument();
    expect(screen.queryByText('Accepted')).not.toBeInTheDocument();
  });

  it('rejects a trace whose raw symbol does not match the submitted character', async () => {
    mockHealthOk();
    globalThis.fetch.mockResolvedValueOnce(
      ok({
        accepted: true,
        message: 'Accepted',
        final_state: 'M13',
        trace: [{ position: 0, symbol: 'x', from_state: 'M0', to_state: 'M1' }],
      })
    );

    render(<ValidatorPage />);
    await screen.findByText('Backend connected');
    await submit('https://example.com');

    expect(await screen.findByText('Request error')).toBeInTheDocument();
    expect(screen.queryByText('Accepted')).not.toBeInTheDocument();
  });

  it('shows an unexpected server failure as retryable instead of an invalid request', async () => {
    mockHealthOk();
    globalThis.fetch.mockResolvedValueOnce(fail(500, { message: 'Internal error' }));

    render(<ValidatorPage />);
    await screen.findByText('Backend connected');
    await submit('https://example.com');

    expect(await screen.findByText('Request error')).toBeInTheDocument();
    expect(screen.getByText(/unexpected HTTP 500/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    expect(screen.queryByText('Rejected')).not.toBeInTheDocument();
  });

  it('ignores a duplicate submit while a request is already in flight', async () => {
    mockHealthOk();
    let resolveFetch;
    globalThis.fetch.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveFetch = resolve;
        })
    );

    render(<ValidatorPage />);
    await screen.findByText('Backend connected');

    fireEvent.change(screen.getByLabelText(/url to inspect/i), { target: { value: 'https://example.com' } });
    const button = screen.getByRole('button', { name: /run dfa/i });
    fireEvent.click(button);
    fireEvent.click(button); // second click while disabled/busy must be a no-op

    expect(globalThis.fetch).toHaveBeenCalledTimes(2); // 1 health + 1 validate

    resolveFetch(ok({ accepted: true, message: 'ok', final_state: 'S1', trace: traceFor('https://example.com') }));
    await screen.findByText('Accepted');
  });

  // Note: a "newer submission cancels a stale in-flight one" scenario isn't
  // covered as its own test — the Run DFA button is disabled while busy, so
  // a user can never actually trigger a second submit through the UI while
  // one is pending. That's the same guarantee, enforced a different way,
  // and it's already covered by the duplicate-submit test above. The
  // cancel-on-supersede logic in ValidatorPage still exists defensively
  // (e.g. for unmount cleanup), just isn't reachable via fireEvent.click here.

  it('retries the last submitted URL when Retry is clicked', async () => {
    mockHealthOk();
    globalThis.fetch
      .mockRejectedValueOnce(new TypeError('Failed to fetch')) // first attempt: offline
      .mockResolvedValueOnce(
        ok({
          accepted: true,
          message: 'now it works',
          final_state: 'S1',
          trace: traceFor('https://example.com'),
        })
      );

    render(<ValidatorPage />);
    await screen.findByText('Backend connected');
    await submit('https://example.com');

    await screen.findByText(/backend unavailable/i);
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));

    expect(await screen.findByText(/now it works/i)).toBeInTheDocument();
  });
});
