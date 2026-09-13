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
