import { m } from 'framer-motion';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import SmartImage from '../components/ui/SmartImage';
import { stay } from '../data/siteContent';
import { EASE, fadeUp, stagger } from '../utils/motion';

export default function Stay() {
  const { room, features } = stay;

  return (
    <section id="stay" aria-labelledby="stay-title" className="bg-pine py-16 text-white md:py-24">
      <Container>
        <SectionHeading
          id="stay-title"
          tone="pine"
          eyebrow={stay.eyebrow}
          title={stay.title}
          description={stay.description}
          className="mb-10 md:mb-[52px]"
        />

        <Reveal variants={stagger(0.12)} amount={0.1} className="grid items-stretch gap-5 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <m.article variants={fadeUp} className="group h-full">
            <m.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex h-full flex-col overflow-hidden rounded-card border border-white/15 bg-white/[0.06] shadow-[0_24px_48px_-28px_rgb(0_0_0/0.55)] transition-shadow duration-300 hover:shadow-[0_32px_56px_-26px_rgb(0_0_0/0.7)]"
            >
              <SmartImage image={room.image} zoom className="h-[260px] bg-pine-dark sm:h-[340px]" />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-[1.4rem] text-white">{room.name}</h3>
                <p className="mt-2.5 text-stay-muted">{room.description}</p>

                <ul className="m-0 mt-[22px] grid list-none grid-cols-1 gap-x-5 gap-y-3 p-0 sm:grid-cols-2">
                  {room.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-baseline gap-2.5 text-[0.92rem] text-[#e7f0ea]">
                      <span className="text-gold" aria-hidden="true">
                        —
                      </span>
                      {amenity}
                    </li>
                  ))}
                </ul>

                <div className="min-h-[26px] flex-1" aria-hidden="true" />
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-[22px]">
                  <p className="leading-tight">
                    <span className="block text-[0.78rem] tracking-[0.04em] text-stay-muted">{room.priceLabel}</span>
                    <span className="mt-1 block font-display text-[1.9rem] text-white">{room.price}</span>
                  </p>
                  <Button href={room.cta.href} variant="gold">
                    {room.cta.label}
                  </Button>
                </div>
              </div>
            </m.div>
          </m.article>

          <m.ul variants={stagger(0.12)} className="m-0 flex list-none flex-col gap-5 p-0">
            {features.map((feature) => (
              <m.li
                key={feature.label}
                variants={fadeUp}
                className="group flex min-h-[180px] flex-1"
              >
                <m.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative size-full min-h-[180px] overflow-hidden rounded-card shadow-[0_24px_48px_-28px_rgb(0_0_0/0.6)]"
                >
                  <SmartImage image={feature.image} zoom className="absolute inset-0 bg-pine-dark" />
                  <div className="card-scrim absolute inset-0" aria-hidden="true" />
                  <h3 className="absolute bottom-4 left-5 z-[2] text-[1.15rem] text-white">{feature.label}</h3>
                </m.div>
              </m.li>
            ))}
          </m.ul>
        </Reveal>
      </Container>
    </section>
  );
}
