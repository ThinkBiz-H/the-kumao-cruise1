import { m } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import EnquiryForm from '../components/enquiry/EnquiryForm';
import { contact, site } from '../data/siteContent';
import { fadeUp, slideFrom, stagger } from '../utils/motion';
import { cn } from '../utils/cn';

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-contact py-16 text-white md:py-24">
      <Container className="grid gap-12 md:grid-cols-2 md:gap-[60px]">
        <div>
          <SectionHeading
            id="contact-title"
            tone="contact"
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
          />

          <Reveal as="address" variants={stagger(0.1, 0.1)} className="mt-[30px] flex flex-col gap-[26px] not-italic">
            {contact.details.map((detail) => (
              <m.div key={detail.label} variants={fadeUp}>
                <span className="mb-1.5 block text-[0.72rem] uppercase tracking-[0.1em] text-gold">{detail.label}</span>
                <span
                  className={cn(
                    'block font-display leading-snug text-white',
                    detail.size === 'lg' ? 'text-[1.1rem]' : 'text-[0.95rem]',
                  )}
                >
                  {detail.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </m.div>
            ))}
            <m.div variants={fadeUp}>
              <Button href={site.mapsUrl} target="_blank" rel="noopener noreferrer" variant="gold">
                {contact.directionsLabel}
                <HiArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </Button>
            </m.div>
          </Reveal>
        </div>

        <Reveal variants={slideFrom('right', 32)} amount={0.1}>
          <EnquiryForm />
        </Reveal>
      </Container>
    </section>
  );
}
