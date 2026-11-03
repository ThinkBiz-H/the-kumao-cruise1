import { m } from 'framer-motion';
import { HiArrowsPointingOut } from 'react-icons/hi2';
import SmartImage from './SmartImage';
import Lightbox from './Lightbox';
import Reveal from './Reveal';
import { useLightbox } from '../../hooks/useLightbox';
import { fadeUp, stagger } from '../../utils/motion';
import { cn } from '../../utils/cn';

/** Grid spans per tile role. Mobile is 2 columns, md+ is 4. */
const LAYOUTS = {
  feature: 'col-span-2 md:row-span-2',
  wide: 'col-span-2',
  tile: 'col-span-1',
};

const ROW_HEIGHTS = {
  compact: 'auto-rows-[140px] sm:auto-rows-[170px] md:auto-rows-[190px]',
  tall: 'auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[220px]',
};

/**
 * Image grid shared by Gallery and Discover. Each tile opens the
 * lightbox; tiles are real buttons so they work with keyboard and SR.
 */
export default function ImageMosaic({ items, rows = 'compact', label }) {
  const lightbox = useLightbox(items.length);
  const lightboxImages = items.map((item) => item.image);

  return (
    <>
      <Reveal
        as="ul"
        variants={stagger(0.08)}
        amount={0.1}
        className={cn('m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4 md:gap-3.5', ROW_HEIGHTS[rows])}
        aria-label={label}
      >
        {items.map((item, i) => (
          <m.li key={`${item.image.src}-${i}`} variants={fadeUp} className={LAYOUTS[item.layout]}>
            <button
              type="button"
              onClick={() => lightbox.open(i)}
              className="group relative block size-full cursor-zoom-in overflow-hidden rounded-card shadow-card transition-shadow duration-300 hover:shadow-lift"
              aria-label={`View larger: ${item.image.alt}`}
            >
              <SmartImage image={item.image} zoom className="size-full" />
              <span
                className="absolute right-3 bottom-3 grid size-9 translate-y-1 place-items-center rounded-full bg-[#15110c]/55 text-white opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                aria-hidden="true"
              >
                <HiArrowsPointingOut className="size-4" />
              </span>
            </button>
          </m.li>
        ))}
      </Reveal>

      <Lightbox
        images={lightboxImages}
        index={lightbox.index}
        onClose={lightbox.close}
        onNext={lightbox.next}
        onPrev={lightbox.prev}
      />
    </>
  );
}
