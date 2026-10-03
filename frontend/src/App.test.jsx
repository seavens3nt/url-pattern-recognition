import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App.jsx';

const traceForUrl = (value, finalState = 'M13') => [...value].map((symbol, position) => ({
  position,
  symbol,
  from_state: position === 0 ? 'START' : finalState,
  to_state: finalState,
}));
beforeEach(() => { window.location.hash = '/recognizer'; });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); window.location.hash = ''; });
it('opens the full home page and navigates into the styled recognizer', async () => {
  window.location.hash = '/home';
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ status: 'ok', validator_ready: true }),
  }));

  render(<App />);
  expect(screen.getByRole('heading', { name: 'URL Pattern Recognition' })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Start' }));

  expect(await screen.findByLabelText('URL to inspect')).toBeInTheDocument();
  expect(screen.queryByText('Checking backend…')).not.toBeInTheDocument();
  expect(screen.queryByText('Backend connected')).not.toBeInTheDocument();
});
it('connects to the backend and displays an accepted DFA result', async () => {
  const fetch = vi.fn().mockResolvedValueOnce({ status: 200, json: async () => ({ accepted: true, message: 'Accepted: the URL matches the approved core language.', final_state: 'TLD_MANY', trace: traceForUrl('https://example.com', 'TLD_MANY') }) });
  vi.stubGlobal('fetch', fetch); render(<App />);
  fireEvent.change(screen.getByLabelText('URL to inspect'), { target: { value: 'https://example.com' } });
  fireEvent.click(screen.getByRole('button', { name: 'Run DFA' }));
  await screen.findByText('Accepted: the URL matches the approved core language.');
  expect(screen.getByText('Final state:')).toBeInTheDocument();
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({ url: 'https://example.com' });
});
it('shows an offline result only after a failed validation request', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
  render(<App />);
  expect(screen.queryByText(/Backend unavailable/)).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('URL to inspect'), { target: { value: 'https://example.com' } });
  fireEvent.click(screen.getByRole('button', { name: 'Run DFA' }));
  expect(await screen.findByRole('heading', { name: 'Backend unavailable' })).toBeInTheDocument();
});
it('shows the offline message when validation times out', async () => {
  const fetch = vi.fn().mockRejectedValueOnce(new Error('timeout'));
  vi.stubGlobal('fetch', fetch);
  render(<App />);
  fireEvent.change(screen.getByLabelText('URL to inspect'), { target: { value: 'https://example.com' } });
  fireEvent.click(screen.getByRole('button', { name: 'Run DFA' }));
  await screen.findByText('Cannot reach the backend. Check that Flask is running.');
});
it('prevents duplicate submissions while validation is pending', async () => {
  let resolveValidation;
  const fetch = vi.fn().mockImplementationOnce(() => new Promise(resolve => { resolveValidation = resolve; }));
  vi.stubGlobal('fetch', fetch);
  render(<App />);
  fireEvent.change(screen.getByLabelText('URL to inspect'), { target: { value: 'https://example.com' } });
  const button = screen.getByRole('button', { name: 'Run DFA' });
  fireEvent.click(button);
  expect(button).toBeDisabled();
  fireEvent.click(button);
  expect(fetch).toHaveBeenCalledTimes(1);
  resolveValidation({
    ok: true,
    status: 200,
    json: async () => ({ accepted: true, message: 'done', final_state: 'M13', trace: traceForUrl('https://example.com') }),
  });
  await screen.findByText('done');
});
it('renders a request error for a malformed validation response', async () => {
  const fetch = vi.fn().mockResolvedValueOnce({ status: 200, json: async () => ({}) });
  vi.stubGlobal('fetch', fetch);
  render(<App />);
  fireEvent.change(screen.getByLabelText('URL to inspect'), { target: { value: 'https://example.com' } });
  fireEvent.click(screen.getByRole('button', { name: 'Run DFA' }));
  await screen.findByText('Request error');
  expect(screen.getByText('The server returned an unexpected response.')).toBeInTheDocument();
});
