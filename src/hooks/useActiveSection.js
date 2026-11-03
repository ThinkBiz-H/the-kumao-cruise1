import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in the reading zone of the viewport.
 * Re-observes when sections mount later (lazy-loaded sections).
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState('');
  const key = ids.join('|');

  useEffect(() => {
    const visible = new Map();
    const observed = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        });
        const next = [...visible.entries()].sort((a, b) => a[1] - b[1])[0];
        setActive(next ? next[0] : '');
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );

    const observeAvailable = () => {
      key.split('|').forEach((id) => {
        const el = document.getElementById(id);
        if (el && !observed.has(el)) {
          observed.add(el);
          observer.observe(el);
        }
      });
    };

    observeAvailable();
    const mutation = new MutationObserver(observeAvailable);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, [key]);

  return active;
}
