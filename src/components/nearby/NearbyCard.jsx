import { m } from 'framer-motion';
import { HiOutlineMapPin, HiOutlinePhoto } from 'react-icons/hi2';
import Button from '../ui/Button';
import SmartImage from '../ui/SmartImage';
import { EASE, fadeUp } from '../../utils/motion';
import { cn } from '../../utils/cn';

const hoverLift = { y: -6, transition: { duration: 0.4, ease: EASE } };

/**
 * One attraction in the nearby grid. Clicking anywhere on the card opens its
 * gallery. The "View Photos" button is the keyboard and screen-reader control.
 */
export default function NearbyCard({ place, onOpen }) {
  const hasPhotos = place.galleryImages.length > 0;

  return (
    <m.li variants={fadeUp} whileHover={hasPhotos ? hoverLift : undefined} className="h-full">
      <article
        onClick={hasPhotos ? onOpen : undefined}
        className={cn(
          'group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-cream shadow-card transition-shadow duration-500',
          hasPhotos && 'cursor-pointer hover:shadow-lift',
        )}
      >
        {place.coverImage ? (
          <SmartImage
            image={{ src: place.coverImage }}
            alt={place.title}
            zoom
            className="aspect-4/3 w-full"
          />
        ) : (
          <div className="aspect-4/3 w-full bg-cream-2" aria-hidden="true" />
        )}

        <div className="flex flex-1 flex-col px-6 pt-6 pb-7 md:px-7">
          <p className="flex items-center gap-1.5 text-[0.78rem] font-medium tracking-[0.08em] text-accent uppercase">
            <HiOutlineMapPin className="size-4 shrink-0" aria-hidden="true" />
            <span>
              {place.distance}
              <span className="sr-only"> from The Kumaon Crest</span>
            </span>
          </p>
          <h3 className="mt-2.5 text-[1.3rem] leading-snug">{place.title}</h3>
          <p className="mt-3 line-clamp-3 text-[0.95rem]">{place.description}</p>

          <div className="mt-auto pt-6">
            <Button
              variant="ghost"
              size="sm"
              disabled={!hasPhotos}
              onClick={(event) => {
                event.stopPropagation();
                onOpen();
              }}
            >
              <HiOutlinePhoto className="size-4" aria-hidden="true" />
              {hasPhotos ? 'View Photos' : 'Photos coming soon'}
              <span className="sr-only"> of {place.title}</span>
            </Button>
          </div>
        </div>
      </article>
    </m.li>
  );
}
