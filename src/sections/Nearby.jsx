import { m } from 'framer-motion';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import { nearby } from '../data/siteContent';
import { fadeIn, fadeUp, stagger } from '../utils/motion';

export default function Nearby() {
  return (
    <section id="nearby" aria-labelledby="nearby-title" className="bg-cream-2 py-16 md:py-24">
      <Container className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-[60px]">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHeading
            id="nearby-title"
            eyebrow={nearby.eyebrow}
            title={nearby.title}
            description={nearby.description}
          />
          <Reveal variants={fadeIn} className="mt-7 rounded-xs border-l-[3px] border-gold bg-cream px-[22px] py-5 shadow-card">
            <p className="text-[0.9rem]">{nearby.note}</p>
          </Reveal>
        </div>

        <Reveal
          as="ol"
          variants={stagger(0.05)}
          amount={0.1}
          className="m-0 list-none border-t border-line p-0"
          aria-label="Nearby places by distance"
        >
          {nearby.places.map((place, i) => (
            <m.li
              key={place.name}
              variants={fadeUp}
              className="group flex items-baseline gap-4 border-b border-line py-4 transition-colors duration-200 hover:bg-cream/60 sm:px-2"
            >
              <span className="w-[22px] shrink-0 text-[0.72rem] font-semibold text-accent" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 text-[1.02rem] text-ink transition-transform duration-300 group-hover:translate-x-1">
                {place.name}
              </span>
              <span className="font-display text-[0.95rem] whitespace-nowrap text-ink-soft italic">
                {place.distance}
              </span>
            </m.li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
