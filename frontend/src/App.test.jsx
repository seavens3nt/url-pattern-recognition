import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App.jsx';
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it('connects to the backend and displays an accepted DFA result', async () => {
  const fetch = vi.fn().mockResolvedValueOnce({ ok: true, json: async () => ({ status: 'ok', validator_ready: true }) }).mockResolvedValueOnce({ status: 200, json: async () => ({ accepted: true, message: 'Accepted: the URL matches the approved core language.', final_state: 'TLD_MANY', trace: [{ position: 0, symbol: 'h', from_state: 'START', to_state: 'H' }] }) });
  vi.stubGlobal('fetch', fetch); render(<App />);
  await screen.findByText('Backend connected');
  fireEvent.change(screen.getByLabelText('URL to inspect'), { target: { value: 'https://example.com' } });
  fireEvent.click(screen.getByRole('button', { name: 'Run DFA' }));
  await screen.findByText('Accepted: the URL matches the approved core language.');
  expect(screen.getByText('Final state:')).toBeInTheDocument();
  expect(JSON.parse(fetch.mock.calls[1][1].body)).toEqual({ url: 'https://example.com' });
});
it('explains a failed backend connection', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
  render(<App />); await screen.findByText(/Backend unavailable/);
});
it('shows the offline message when validation times out', async () => {
  const fetch = vi.fn()
    .mockResolvedValueOnce({ ok: true, json: async () => ({ status: 'ok', validator_ready: true }) })
    .mockRejectedValueOnce(new Error('timeout'));
  vi.stubGlobal('fetch', fetch);
  render(<App />);
  await screen.findByText('Backend connected');
  fireEvent.change(screen.getByLabelText('URL to inspect'), { target: { value: 'https://example.com' } });
  fireEvent.click(screen.getByRole('button', { name: 'Run DFA' }));
  await screen.findByText('Cannot reach the backend. Check that Flask is running.');
});
it('prevents duplicate submissions while validation is pending', async () => {
  let resolveValidation;
  const fetch = vi.fn()
    .mockResolvedValueOnce({ ok: true, json: async () => ({ status: 'ok', validator_ready: true }) })
    .mockImplementationOnce(() => new Promise(resolve => { resolveValidation = resolve; }));
  vi.stubGlobal('fetch', fetch);
  render(<App />);
  await screen.findByText('Backend connected');
  fireEvent.change(screen.getByLabelText('URL to inspect'), { target: { value: 'https://example.com' } });
  const button = screen.getByRole('button', { name: 'Run DFA' });
  fireEvent.click(button);
  expect(button).toBeDisabled();
  fireEvent.click(button);
  expect(fetch).toHaveBeenCalledTimes(2);
  resolveValidation({
    ok: true,
    status: 200,
    json: async () => ({ accepted: true, message: 'done', final_state: 'M13', trace: [] }),
  });
  await screen.findByText('done');
});
it('renders a request error for a malformed validation response', async () => {
  const fetch = vi.fn()
    .mockResolvedValueOnce({ ok: true, json: async () => ({ status: 'ok', validator_ready: true }) })
    .mockResolvedValueOnce({ status: 200, json: async () => ({}) });
  vi.stubGlobal('fetch', fetch);
  render(<App />);
  await screen.findByText('Backend connected');
  fireEvent.change(screen.getByLabelText('URL to inspect'), { target: { value: 'https://example.com' } });
  fireEvent.click(screen.getByRole('button', { name: 'Run DFA' }));
  await screen.findByText('Request error');
  expect(screen.getByText('The server returned an unexpected response.')).toBeInTheDocument();
});
