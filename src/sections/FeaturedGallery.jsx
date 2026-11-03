import { m } from 'framer-motion';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import SmartImage from '../components/ui/SmartImage';
import { featuredGallery } from '../data/siteContent';
import { fadeUp, stagger } from '../utils/motion';

export default function FeaturedGallery() {
  return (
    <section id="featured-gallery" aria-labelledby="featured-gallery-title" className="py-16 md:py-24">
      <Container>
        <SectionHeading
          id="featured-gallery-title"
          title={featuredGallery.title}
          description={featuredGallery.description}
          className="mb-10 md:mb-[52px]"
        />
        <Reveal as="ul" variants={stagger(0.12)} amount={0.1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featuredGallery.items.map((image) => (
            <m.li key={image.src} variants={fadeUp} className="group">
              <SmartImage
                image={image}
                zoom
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[3/2] rounded-2xl shadow-card"
              />
            </m.li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
