import { useEffect, useReducer } from 'react';
import { useReducedMotion } from 'framer-motion';
import sunrise from '../assets/hero/01-himalaya-sunrise.webp';
import sunriseSm from '../assets/hero/01-himalaya-sunrise-sm.webp';
import panorama from '../assets/hero/02-himalaya-panorama.webp';
import panoramaSm from '../assets/hero/02-himalaya-panorama-sm.webp';
import homestay from '../assets/hero/03-homestay-exterior.webp';
import pineForest from '../assets/hero/04-pine-forest.webp';
import pineForestSm from '../assets/hero/04-pine-forest-sm.webp';
import teaGarden from '../assets/hero/05-tea-garden.webp';
import teaGardenSm from '../assets/hero/05-tea-garden-sm.webp';
import sunset from '../assets/hero/06-mountain-sunset.webp';
import sunsetSm from '../assets/hero/06-mountain-sunset-sm.webp';
import { cn } from '../utils/cn';

const slide = (src, small) => ({ src, srcSet: small ? `${small} 1080w, ${src} 1920w` : undefined });

/** The first slide is also preloaded from index.html — keep the two in sync. */
const SLIDES = [
  slide(sunrise, sunriseSm),
  slide(panorama, panoramaSm),
  slide(homestay),
  slide(pineForest, pineForestSm),
  slide(teaGarden, teaGardenSm),
  slide(sunset, sunsetSm),
];

const INTERVAL = 5000; // time between crossfades
const FADE = 1500; // must match duration-1500 on the layers
const SETTLE = FADE + 100; // after this the outgoing layer is fully hidden

/** Fetch + decode each slide once, choosing the same srcset candidate the <img> will. */
const decoded = new Map();
function preload({ src, srcSet }) {
  if (!decoded.has(src)) {
    const img = new Image();
    img.sizes = '100vw';
    if (srcSet) img.srcset = srcSet;
    img.src = src;
    decoded.set(src, img.decode().catch(() => {}));
  }
  return decoded.get(src);
}

const wait = (ms, timers) => new Promise((resolve) => timers.push(setTimeout(resolve, ms)));

/**
 * Two stacked layers take turns being in front. `animating` drives the Ken
 * Burns drift; it stays on while a layer fades out and is only cleared once
 * the layer is invisible, so the reset back to scale(1) is never seen.
 */
const initialState = {
  front: 0,
  layers: [
    { image: 0, animating: true },
    { image: null, animating: false },
  ],
};

function reducer(state, action) {
  const back = 1 - state.front;
  const layers = [...state.layers];
  if (action.type === 'show') {
    layers[back] = { image: action.image, animating: true };
    return { front: back, layers };
  }
  if (action.type === 'retire') {
    layers[back] = { ...layers[back], animating: false };
    return { ...state, layers };
  }
  return state;
}

/** Full-bleed crossfading slideshow behind the hero content. Decorative only. */
export default function HeroBackground() {
  const reducedMotion = useReducedMotion();
  const [{ front, layers }, dispatch] = useReducer(reducer, initialState);
  const currentImage = layers[front].image;

  // Fetch the remaining slides once the page (and the first slide) has loaded.
  useEffect(() => {
    if (reducedMotion) return undefined;
    const warm = () => SLIDES.slice(1).forEach(preload);
    if (document.readyState === 'complete') {
      warm();
      return undefined;
    }
    window.addEventListener('load', warm, { once: true });
    return () => window.removeEventListener('load', warm);
  }, [reducedMotion]);

  // Crossfade loop: never swap in a slide until it is decoded, so no blank frames.
  useEffect(() => {
    if (reducedMotion) return undefined;
    let cancelled = false;
    const timers = [];

    (async () => {
      let nextImage = (currentImage + 1) % SLIDES.length;
      let hold = INTERVAL;
      while (!cancelled) {
        await Promise.all([wait(hold, timers), preload(SLIDES[nextImage])]);
        if (cancelled) return;
        dispatch({ type: 'show', image: nextImage });

        await wait(SETTLE, timers);
        if (cancelled) return;
        dispatch({ type: 'retire' });

        nextImage = (nextImage + 1) % SLIDES.length;
        hold = INTERVAL - SETTLE;
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // currentImage only seeds the loop when it (re)starts; the loop owns it after that.
  }, [reducedMotion]);

  const visibleLayers = reducedMotion ? [{ image: 0, animating: false }] : layers;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {visibleLayers.map((layer, i) => {
        // The back layer stays mounted (without a src until first used) so its
        // opacity always transitions instead of popping in on mount.
        const { src, srcSet } = SLIDES[layer.image] ?? {};
        const isFront = reducedMotion || i === front;
        return (
          <img
            key={i}
            src={src}
            srcSet={srcSet}
            sizes="100vw"
            alt=""
            loading="eager"
            decoding={i === 0 ? 'sync' : 'async'}
            fetchpriority={i === 0 ? 'high' : 'auto'}
            className={cn(
              'absolute inset-0 size-full object-cover backface-hidden will-change-[opacity,transform]',
              'transition-opacity duration-1500 ease-in-out',
              isFront ? 'opacity-100' : 'opacity-0',
              layer.animating && 'animate-ken-burns motion-reduce:animate-none',
            )}
          />
        );
      })}
      <div className="hero-overlay absolute inset-0" />
    </div>
  );
}
