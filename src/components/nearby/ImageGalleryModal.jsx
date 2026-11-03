import Lightbox from "../ui/Lightbox";

export default function ImageGalleryModal({
  place,
  index,
  onClose,
  onNext,
  onPrev,
}) {
  const images = place?.galleryImages ?? [];

  return (
    <Lightbox
      images={images}
      index={index}
      onClose={onClose}
      onNext={onNext}
      onPrev={onPrev}
    />
  );
}
