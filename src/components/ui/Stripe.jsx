import { cn } from '../../utils/cn';

/** The original multi-colour band between sections. */
export default function Stripe({ thin = false }) {
  return <div className={cn('stripe-band', thin ? 'h-1' : 'h-2')} aria-hidden="true" />;
}
