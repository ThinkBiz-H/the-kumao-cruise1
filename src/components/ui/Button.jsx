import { forwardRef } from 'react';
import { m } from 'framer-motion';
import { buttonMotion } from '../../utils/motion';
import { cn } from '../../utils/cn';

const VARIANTS = {
  primary:
    'bg-terracotta border-terracotta text-white hover:bg-terracotta-dark hover:border-terracotta-dark',
  gold: 'bg-gold border-gold text-[#241f19] hover:bg-gold-dark hover:border-gold-dark',
  ghost: 'bg-transparent border-pine-text text-pine-text hover:bg-pine hover:border-pine hover:text-white',
  glass:
    'bg-white/10 border-white/50 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/80',
};

const SIZES = {
  sm: 'px-5 py-2.5 text-[0.9rem]',
  md: 'px-[22px] py-[11px] text-[0.9rem]',
  lg: 'px-7 py-3.5 text-[0.95rem]',
};

/**
 * Renders an anchor when `href` is set, otherwise a button.
 * Scale-on-hover comes from Framer Motion; colour changes from CSS.
 */
const Button = forwardRef(function Button(
  { href, variant = 'primary', size = 'md', className, children, disabled, ...rest },
  ref,
) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xs border font-semibold tracking-[0.01em] whitespace-nowrap',
    'shadow-[0_1px_0_rgb(0_0_0/0.04)] transition-colors duration-200',
    'disabled:cursor-not-allowed disabled:opacity-70',
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  const motionProps = disabled ? {} : buttonMotion;

  if (href) {
    return (
      <m.a ref={ref} href={href} className={classes} {...motionProps} {...rest}>
        {children}
      </m.a>
    );
  }

  return (
    <m.button ref={ref} className={classes} disabled={disabled} {...motionProps} {...rest}>
      {children}
    </m.button>
  );
});

export default Button;
