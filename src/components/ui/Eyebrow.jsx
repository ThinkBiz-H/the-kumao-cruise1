import { cn } from '../../utils/cn';

export default function Eyebrow({ className, children }) {
  return (
    <p className={cn('text-[0.85rem] font-medium uppercase tracking-[0.08em] leading-snug', className)}>
      {children}
    </p>
  );
}
