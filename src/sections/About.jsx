import { m } from 'framer-motion';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import Reveal from '../components/ui/Reveal';
import SmartImage from '../components/ui/SmartImage';
import { about } from '../data/siteContent';
import { fadeUp, slideFrom, stagger } from '../utils/motion';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-16 md:py-24">
      <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-[60px]">
        <Reveal variants={stagger(0.1)}>
          <m.div variants={fadeUp}>
            <Eyebrow className="text-pine-text">{about.eyebrow}</Eyebrow>
          </m.div>
          <m.h2
            id="about-title"
            variants={fadeUp}
            className="mt-3 text-[clamp(1.85rem,3.2vw,2.5rem)] leading-[1.12]"
          >
            {about.title}
          </m.h2>
          {about.paragraphs.map((text) => (
            <m.p key={text.slice(0, 24)} variants={fadeUp} className="mt-[18px] max-w-[62ch]">
              {text}
            </m.p>
          ))}

          <m.dl variants={fadeUp} className="mt-9 flex flex-wrap gap-x-9 gap-y-5">
            {about.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-[0.82rem] text-ink-soft">{stat.label}</dt>
                <dd className="m-0 font-display text-[2rem] leading-tight text-accent">{stat.value}</dd>
              </div>
            ))}
          </m.dl>
        </Reveal>

        <Reveal variants={slideFrom('right')} className="group">
          <SmartImage
            image={about.image}
            zoom
            className="aspect-[550/293] rounded-card shadow-card"
          />
        </Reveal>
      </Container>
    </section>
  );
}
