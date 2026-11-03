import { cn } from '../../utils/cn';

const FIELD_BASE =
  'w-full rounded-xs border bg-white/[0.06] px-4 py-3.5 text-[0.95rem] text-white placeholder:text-white/45 ' +
  'transition-[border-color,background-color,box-shadow] duration-200 ' +
  'hover:border-white/35 focus:border-gold focus:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-gold/30 ' +
  'disabled:opacity-60';

/** Labelled input/textarea with inline, screen-reader-linked error text. */
export default function FormField({
  id,
  label,
  optional = false,
  error,
  multiline = false,
  className,
  hint,
  ...inputProps
}) {
  const errorId = `${id}-error`;
  const hintId = hint ? `${id}-hint` : undefined;
  const Control = multiline ? 'textarea' : 'input';
  const describedBy = [error ? errorId : null, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[0.82rem] font-medium text-contact-muted">
        <span>
          {label}
          {!optional && (
            <span className="text-gold" aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </span>
        {optional && <span className="text-[0.75rem] font-normal text-white/60">Optional</span>}
      </label>
      <Control
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        aria-required={optional ? undefined : 'true'}
        className={cn(
          FIELD_BASE,
          multiline && 'min-h-[132px] resize-y leading-relaxed',
          error ? 'border-[#f08a6c]' : 'border-white/20',
        )}
        {...inputProps}
      />
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-[0.78rem] text-white/60">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-[0.8rem] text-[#f5a58c]">
          {error}
        </p>
      )}
    </div>
  );
}
