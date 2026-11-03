import { useEffect } from 'react';

/**
 * Lazy sections mount after the browser has already tried to honour the
 * URL hash, so scroll to it once they are in the DOM.
 */
export function useHashScroll() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash.length < 2) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }, []);
}
