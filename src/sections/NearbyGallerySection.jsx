import { useCallback, useState } from "react";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import NearbyCard from "../components/nearby/NearbyCard";
import ImageGalleryModal from "../components/nearby/ImageGalleryModal";
import { useLightbox } from "../hooks/useLightbox";
import { nearbyGallery, nearbyPlaces } from "../data/nearbyPlaces";
import { stagger } from "../utils/motion";

export default function NearbyGallerySection() {
  // The place stays set after closing so the modal can finish its exit fade.
  const [activePlace, setActivePlace] = useState(null);
  const lightbox = useLightbox(activePlace?.galleryImages.length ?? 0);
  const { open } = lightbox;

  const openPlace = useCallback(
    (place) => {
      setActivePlace(place);
      open(0);
    },
    [open],
  );

  return (
    <section
      id="explore-nearby"
      aria-labelledby="explore-nearby-title"
      className="py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          id="explore-nearby-title"
          eyebrow={nearbyGallery.eyebrow}
          title={nearbyGallery.title}
          description={nearbyGallery.description}
          className="mb-10 md:mb-[52px]"
        />

        <Reveal
          as="ul"
          variants={stagger(0.08)}
          amount={0.05}
          className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
          aria-label="Nearby attractions"
        >
          {nearbyPlaces.map((place) => (
            <NearbyCard
              key={place.id}
              place={place}
              onOpen={() => openPlace(place)}
            />
          ))}
        </Reveal>
      </Container>

      <ImageGalleryModal
        place={activePlace}
        index={lightbox.index}
        onClose={lightbox.close}
        onNext={lightbox.next}
        onPrev={lightbox.prev}
      />
    </section>
  );
}
