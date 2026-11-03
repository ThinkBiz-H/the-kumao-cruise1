import { useHashScroll } from '../../hooks/useHashScroll';

/** Mounted after lazy sections resolve, so deep links like /#contact land correctly. */
export default function HashScroll() {
  useHashScroll();
  return null;
}
