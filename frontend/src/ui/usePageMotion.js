import { useEffect } from 'react';

// Animation is progressive enhancement: content stays visible without observers.
export default function usePageMotion(rootRef, route) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const pages = new Set();
    const targets = new Set();
    const reveal = (element) => {
      element.classList.add('is-visible');
      observer?.unobserve(element);
    };
    const observer = typeof window.IntersectionObserver === 'function'
      ? new window.IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target);
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -24px 0px' })
      : null;

    const registerContent = () => {
      root.querySelectorAll('main').forEach((page) => {
        if (pages.has(page)) return;
        pages.add(page);
        page.classList.add('upr-page-enter');
      });
      if (!observer) return;
      root.querySelectorAll('[data-reveal]').forEach((element) => {
        if (targets.has(element)) return;
        targets.add(element);
        element.classList.add('upr-reveal');
        observer.observe(element);
      });
    };

    // About loads lazily, so register its content when Suspense replaces the fallback.
    const mutations = new MutationObserver(registerContent);
    mutations.observe(root, { childList: true, subtree: true });
    registerContent();

    const revealFocusedContent = (event) => {
      let element = event.target.closest('[data-reveal]');
      while (element && root.contains(element)) {
        reveal(element);
        element = element.parentElement?.closest('[data-reveal]');
      }
    };
    root.addEventListener('focusin', revealFocusedContent);

    return () => {
      mutations.disconnect();
      observer?.disconnect();
      root.removeEventListener('focusin', revealFocusedContent);
      pages.forEach((page) => page.classList.remove('upr-page-enter'));
      targets.forEach((element) => element.classList.remove('upr-reveal', 'is-visible'));
    };
  }, [rootRef, route]);
}
