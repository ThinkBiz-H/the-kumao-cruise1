import { lazy, Suspense } from 'react';
import Seo from '../components/seo/Seo';
import { lodgingSchema, nearbySchema, websiteSchema } from '../components/seo/schema';
import Stripe from '../components/ui/Stripe';
import SectionFallback from '../components/ui/SectionFallback';
import HashScroll from '../components/layout/HashScroll';
import Hero from '../sections/Hero';
import FeaturedGallery from '../sections/FeaturedGallery';
import About from '../sections/About';

const Stay = lazy(() => import('../sections/Stay'));
const Gallery = lazy(() => import('../sections/Gallery'));
const Nearby = lazy(() => import('../sections/Nearby'));
const NearbyGallerySection = lazy(() => import('../sections/NearbyGallerySection'));
const Discover = lazy(() => import('../sections/Discover'));
const Contact = lazy(() => import('../sections/Contact'));

export default function Home() {
  return (
    <>
      <Seo schema={[lodgingSchema(), websiteSchema(), nearbySchema()]} />

      <Hero />
      <Stripe />
      <FeaturedGallery />
      <About />

      <Suspense fallback={<SectionFallback />}>
        <Stay />
        <Stripe thin />
        <Gallery />
        <Nearby />
        <NearbyGallerySection />
        <Discover />
        <Stripe thin />
        <Contact />
        <HashScroll />
      </Suspense>
    </>
  );
}
