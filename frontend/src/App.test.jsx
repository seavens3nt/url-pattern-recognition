import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App.jsx';
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it('connects to the backend and displays the honest not-implemented result', async () => {
  const fetch = vi.fn().mockResolvedValueOnce({ ok: true, json: async () => ({ status: 'ok' }) }).mockResolvedValueOnce({ status: 501, json: async () => ({ message: 'DFA validation is not implemented yet.' }) });
  vi.stubGlobal('fetch', fetch); render(<App />);
  await screen.findByText('Backend connected');
  fireEvent.change(screen.getByLabelText('URL to inspect'), { target: { value: 'https://example.com' } });
  fireEvent.click(screen.getByRole('button', { name: 'Send to backend' }));
  await screen.findByText('DFA validation is not implemented yet.');
  expect(JSON.parse(fetch.mock.calls[1][1].body)).toEqual({ url: 'https://example.com' });
});
it('explains a failed backend connection', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
  render(<App />); await screen.findByText(/Backend unavailable/);
});
