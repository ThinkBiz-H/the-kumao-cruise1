import Container from '../components/ui/Container';
import ImageMosaic from '../components/ui/ImageMosaic';
import SectionHeading from '../components/ui/SectionHeading';
import { discover } from '../data/siteContent';

export default function Discover() {
  return (
    <section id="discover" aria-labelledby="discover-title" className="py-16 md:py-24">
      <Container>
        <SectionHeading
          id="discover-title"
          eyebrow={discover.eyebrow}
          title={discover.title}
          description={discover.description}
          className="mb-10 md:mb-[52px]"
        />
        <ImageMosaic items={discover.items} rows="tall" label="Sights around Kausani" />
      </Container>
    </section>
  );
}
