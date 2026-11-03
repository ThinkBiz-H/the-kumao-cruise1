import { m } from 'framer-motion';
import Eyebrow from './Eyebrow';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';
import { cn } from '../../utils/cn';

const TONES = {
  default: { eyebrow: 'text-accent', title: 'text-ink', body: 'text-ink-soft' },
  pine: { eyebrow: 'text-gold-light', title: 'text-white', body: 'text-stay-muted' },
  contact: { eyebrow: 'text-gold', title: 'text-white', body: 'text-contact-muted' },
};

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  tone = 'default',
  className,
  children,
}) {
  const colors = TONES[tone];
  return (
    <m.div
      className={cn('max-w-[640px]', className)}
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {eyebrow && (
        <m.div variants={fadeUp}>
          <Eyebrow className={colors.eyebrow}>{eyebrow}</Eyebrow>
        </m.div>
      )}
      <m.h2
        id={id}
        variants={fadeUp}
        className={cn('mt-2.5 text-[clamp(1.85rem,3.4vw,2.6rem)] leading-[1.12]', colors.title)}
      >
        {title}
      </m.h2>
      {description && (
        <m.p variants={fadeUp} className={cn('mt-4 text-[1.02rem]', colors.body)}>
          {description}
        </m.p>
      )}
      {children}
    </m.div>
  );
}
