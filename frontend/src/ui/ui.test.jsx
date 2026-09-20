import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import LoadingIndicator from './LoadingIndicator.jsx';
import StatusPanel from './StatusPanel.jsx';
import TraceTable from './TraceTable.jsx';
import UrlForm from './UrlForm.jsx';

afterEach(cleanup);

describe('UrlForm', () => {
  it('labels one URL input and submits it with the keyboard', () => {
    const onSubmit = vi.fn(event => event.preventDefault());
    const onUrlChange = vi.fn();
    const { container } = render(
      <UrlForm url="https://example.com" onUrlChange={onUrlChange} onSubmit={onSubmit} />
    );

    const input = screen.getByLabelText('URL to inspect');
    expect(input).toHaveAttribute('maxlength', '2048');
    fireEvent.change(input, { target: { value: 'https://example.org' } });
    expect(onUrlChange).toHaveBeenCalledWith('https://example.org');
    fireEvent.submit(container.querySelector('form'));
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it('disables the field and button while loading', () => {
    render(<UrlForm url="https://example.com" onUrlChange={() => {}} onSubmit={() => {}} loading />);
    expect(screen.getByLabelText('URL to inspect')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Checking…' })).toBeDisabled();
  });
});

describe('status components', () => {
  it('announces loading progress', () => {
    render(<LoadingIndicator />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Checking the URL…')).toBeInTheDocument();
  });

  it('renders an accepted verdict and final state', () => {
    render(
      <StatusPanel result={{ accepted: true, message: 'Accepted by the DFA.', final_state: 'M13' }} />
    );
    expect(screen.getByRole('heading', { name: 'Accepted' })).toBeInTheDocument();
    expect(screen.getByText('M13')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('keeps invalid requests separate from rejected verdicts', () => {
    render(<StatusPanel result={{ code: 'invalid_request', message: 'Enter a URL.' }} />);
    expect(screen.getByRole('heading', { name: 'Request error' })).toBeInTheDocument();
    expect(screen.queryByText('Rejected')).not.toBeInTheDocument();
  });

  it('offers retry for an offline backend', () => {
    const retry = vi.fn();
    render(<StatusPanel result={{ code: 'offline', message: 'Cannot reach Flask.' }} onRetry={retry} />);
    fireEvent.click(screen.getByRole('button', { name: 'Retry validation' }));
    expect(retry).toHaveBeenCalledOnce();
  });
});

describe('TraceTable', () => {
  it('explains an empty trace', () => {
    render(<TraceTable trace={[]} />);
    expect(screen.getByText('No transitions were produced for this input.')).toBeInTheDocument();
  });

  it('renders ordered trace rows with semantic headers', () => {
    render(
      <TraceTable
        trace={[
          { position: 0, symbol: 'h', from_state: 'M0', to_state: 'M1' },
          { position: 1, symbol: 't', from_state: 'M1', to_state: 'M2' },
        ]}
      />
    );
    expect(screen.getByText('View transition trace (2 steps)')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'From state' })).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });
});
