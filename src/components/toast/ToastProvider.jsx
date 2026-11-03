import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiXMark } from 'react-icons/hi2';
import { ToastContext } from './ToastContext';
import { EASE } from '../../utils/motion';
import { cn } from '../../utils/cn';

const DURATION_MS = 6000;

const TONES = {
  success: { icon: HiCheckCircle, accent: 'text-sage', bar: 'bg-sage' },
  error: { icon: HiExclamationCircle, accent: 'text-terracotta', bar: 'bg-terracotta' },
  info: { icon: HiInformationCircle, accent: 'text-sky', bar: 'bg-sky' },
};

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
  }, []);

  const notify = useCallback(
    ({ type = 'info', title, message }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((list) => [...list.slice(-2), { id, type, title, message }]);
      timers.current.set(id, setTimeout(() => dismiss(id), DURATION_MS));
      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex flex-col items-center gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-end sm:px-6 sm:pb-6"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => {
            const tone = TONES[toast.type] ?? TONES.info;
            const Icon = tone.icon;
            return (
              <m.div
                key={toast.id}
                role={toast.type === 'error' ? 'alert' : 'status'}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35, ease: EASE }}
                className="pointer-events-auto relative flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-card border border-line bg-cream py-4 pr-10 pl-4 shadow-lift"
              >
                <span className={cn('absolute inset-y-0 left-0 w-1', tone.bar)} aria-hidden="true" />
                <Icon className={cn('mt-0.5 size-5 shrink-0', tone.accent)} aria-hidden="true" />
                <div className="min-w-0">
                  <p className="font-display text-base font-medium leading-snug text-ink">{toast.title}</p>
                  {toast.message && <p className="mt-1 text-sm leading-relaxed">{toast.message}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(toast.id)}
                  className="absolute top-3 right-3 rounded-xs p-1 text-ink-soft transition-colors hover:text-ink"
                  aria-label="Dismiss notification"
                >
                  <HiXMark className="size-4" aria-hidden="true" />
                </button>
              </m.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
