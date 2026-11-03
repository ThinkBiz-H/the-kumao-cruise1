import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiXMark } from 'react-icons/hi2';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { EASE } from '../../utils/motion';

const CONTROL =
  'grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25';

/** Accessible full-screen image viewer: Esc closes, ← → navigate, focus is trapped and restored. */
export default function Lightbox({ images, index, onClose, onNext, onPrev }) {
  const isOpen = index > -1;
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocus = useRef(null);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return undefined;
    returnFocus.current = document.activeElement;
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') onNext();
      else if (event.key === 'ArrowLeft') onPrev();
      else if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      returnFocus.current?.focus?.();
    };
  }, [isOpen, onClose, onNext, onPrev]);

  const current = isOpen ? images[index] : null;
  const multiple = images.length > 1;

  return createPortal(
    <AnimatePresence>
      {current && (
        <m.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} of ${images.length}: ${current.alt}`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#15110c]/92 p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <m.figure
            key={current.src}
            className="relative m-0 flex max-h-full max-w-5xl flex-col items-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={current.src}
              width={current.width}
              height={current.height}
              alt={current.alt}
              className="max-h-[78vh] w-auto rounded-card object-contain shadow-2xl"
            />
            <figcaption className="mt-4 max-w-xl text-center text-sm text-[#e7dfd1]">
              {current.alt}
              <span className="ml-2 text-white/60">
                {index + 1} / {images.length}
              </span>
            </figcaption>
          </m.figure>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={`${CONTROL} absolute top-[max(1rem,env(safe-area-inset-top))] right-4`}
            aria-label="Close photo viewer"
          >
            <HiXMark className="size-6" aria-hidden="true" />
          </button>

          {multiple && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onPrev();
                }}
                className={`${CONTROL} absolute top-1/2 left-3 -translate-y-1/2 sm:left-6`}
                aria-label="Previous photo"
              >
                <HiChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onNext();
                }}
                className={`${CONTROL} absolute top-1/2 right-3 -translate-y-1/2 sm:right-6`}
                aria-label="Next photo"
              >
                <HiChevronRight className="size-6" aria-hidden="true" />
              </button>
            </>
          )}
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
