import { afterEach, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Layout from './HeaderFooter.jsx';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function Page({ extra = false }) {
  return <Layout current="home"><main>
    <section data-reveal><button>Read more</button></section>
    {extra && <section data-reveal>Loaded content</section>}
  </main></Layout>;
}

it('keeps content available when intersection observers are unavailable', () => {
  vi.stubGlobal('IntersectionObserver', undefined);
  render(<Page />);
  expect(screen.getByRole('button', { name: 'Read more' }).closest('section')).not.toHaveClass('upr-reveal');
});

it('respects reduced motion without hiding content', () => {
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })));
  const observer = vi.fn();
  vi.stubGlobal('IntersectionObserver', observer);
  render(<Page />);
  expect(observer).not.toHaveBeenCalled();
  expect(screen.getByRole('main')).not.toHaveClass('upr-page-enter');
  expect(screen.getByRole('button', { name: 'Read more' }).closest('section')).not.toHaveClass('upr-reveal');
});

it('reveals content on entry or keyboard focus, including lazily loaded content', async () => {
  let onIntersection;
  const observe = vi.fn();
  const unobserve = vi.fn();
  const disconnect = vi.fn();
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback) { onIntersection = callback; }
    observe = observe;
    unobserve = unobserve;
    disconnect = disconnect;
  });
  const { rerender, unmount } = render(<Page />);
  const section = screen.getByRole('button', { name: 'Read more' }).closest('section');
  act(() => onIntersection([{ target: section, isIntersecting: true }]));
  expect(section).toHaveClass('is-visible');
  expect(unobserve).toHaveBeenCalledWith(section);

  rerender(<Page extra />);
  const lazySection = screen.getByText('Loaded content');
  await waitFor(() => expect(observe).toHaveBeenCalledWith(lazySection));
  fireEvent.focus(lazySection);
  expect(lazySection).toHaveClass('is-visible');
  unmount();
  expect(disconnect).toHaveBeenCalledOnce();
});
