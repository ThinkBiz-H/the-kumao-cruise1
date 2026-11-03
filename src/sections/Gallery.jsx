import Container from '../components/ui/Container';
import ImageMosaic from '../components/ui/ImageMosaic';
import SectionHeading from '../components/ui/SectionHeading';
import { gallery } from '../data/siteContent';

export default function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-16 md:py-24">
      <Container>
        <SectionHeading
          id="gallery-title"
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          description={gallery.description}
          className="mb-10 md:mb-[52px]"
        />
        <ImageMosaic items={gallery.items} rows="compact" label="Property photos" />
      </Container>
    </section>
  );
}
