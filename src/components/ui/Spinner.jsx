import { cn } from '../../utils/cn';

export default function Spinner({ className }) {
  return (
    <span
      className={cn(
        'inline-block size-4 animate-spin-fast rounded-full border-2 border-current border-r-transparent',
        className,
      )}
      aria-hidden="true"
    />
  );
}
