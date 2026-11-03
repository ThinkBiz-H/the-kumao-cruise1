import { m } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../utils/motion';

/**
 * Scroll-triggered reveal. Children that declare their own `variants`
 * inherit the "visible" state, so passing `stagger()` here staggers them.
 */
export default function Reveal({ as = 'div', variants = fadeUp, amount, className, children, ...rest }) {
  const Component = m[as] ?? m.div;
  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={amount ? { ...viewportOnce, amount } : viewportOnce}
      {...rest}
    >
      {children}
    </Component>
  );
}
