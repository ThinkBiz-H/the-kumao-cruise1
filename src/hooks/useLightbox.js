import { useCallback, useState } from 'react';

/** Index-based open/close/next/prev state for an image lightbox. */
export function useLightbox(count) {
  const [index, setIndex] = useState(-1);

  const open = useCallback((i) => setIndex(i), []);
  const close = useCallback(() => setIndex(-1), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  return { index, isOpen: index > -1, open, close, next, prev };
}
