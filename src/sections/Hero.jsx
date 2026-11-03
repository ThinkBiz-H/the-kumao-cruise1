import { m } from 'framer-motion';
import { HiMapPin } from 'react-icons/hi2';
import HeroBackground from '../components/HeroBackground';
import Button from '../components/ui/Button';
import Eyebrow from '../components/ui/Eyebrow';
import { hero, site } from '../data/siteContent';
import { EASE, stagger } from '../utils/motion';

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[88svh] items-end overflow-hidden bg-[#15110c]"
    >
      <HeroBackground />

      <m.div
        className="relative z-[2] mx-auto w-full max-w-[1160px] px-5 pt-32 pb-14 text-white sm:px-7 sm:pb-16"
        variants={stagger(0.12, 0.15)}
        initial="hidden"
        animate="visible"
      >
        <m.div variants={rise}>
          <Eyebrow className="mb-3.5 text-gold">{hero.eyebrow}</Eyebrow>
        </m.div>

        <m.h1
          id="hero-title"
          variants={rise}
          className="max-w-[820px] text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] text-white"
        >
          {hero.titleLines.map((line, i) => (
            <span key={line} className="block">
              {line}
              {i < hero.titleLines.length - 1 && ' '}
            </span>
          ))}
        </m.h1>

        <m.p variants={rise} className="mt-[18px] max-w-[520px] text-[1.05rem] text-[#eee6d8]">
          {hero.lead}
        </m.p>

        <m.div variants={rise} className="mt-8 flex flex-wrap gap-3 sm:gap-4">
          <Button href={hero.primaryCta.href} size="lg">
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="glass" size="lg">
            {hero.secondaryCta.label}
          </Button>
        </m.div>

        <m.p variants={rise} className="mt-[26px] flex items-center gap-2 text-[0.88rem] text-[#d8cfbf]">
          <HiMapPin className="size-4 shrink-0 text-gold" aria-hidden="true" />
          {site.address.full}
        </m.p>
      </m.div>
    </section>
  );
}
