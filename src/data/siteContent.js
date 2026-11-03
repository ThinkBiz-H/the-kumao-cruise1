import { images } from '../assets/images';
import aerialCottages from '../assets/WhatsApp Image 2026-11-03 at 4.49.07 PM (1).jpeg';
import blueBedroom from '../assets/WhatsApp Image 2026-11-03 at 4.49.07 PM.jpeg';
import propertyCollage from '../assets/WhatsApp Image 2026-11-03 at 4.49.08 PM.jpeg';

export const site = {
  name: 'The Kumaon Crest',
  tagline: 'Kausani · Uttarakhand',
  title: 'The Kumaon Crest — Homestay in Kausani, Uttarakhand',
  description:
    'The Kumaon Crest is a family-run hillside homestay in Kausani, Uttarakhand — painted cottages, marigold gardens and a wraparound view of the Himalayan snow line.',
  locale: 'en_IN',
  themeColor: '#1f4d3a',
  address: {
    street: 'Near VIP Guest House',
    locality: 'Kausani',
    region: 'Uttarakhand',
    postalCode: '263620',
    country: 'IN',
    full: 'Near VIP Guest House, Kausani, Uttarakhand 263620',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=The+Kumaon+Crest+VIP+Guest+House+Kausani+Uttarakhand+263620',
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'stay', label: 'Stay' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'nearby', label: 'Nearby' },
  { id: 'discover', label: 'Discover' },
];

export const hero = {
  eyebrow: 'A hillside homestay in Kausani',
  titleLines: ['Wake up facing', 'the Himalayas.'],
  lead: 'Painted cottages, marigold gardens and a wraparound view of the snow line — The Kumaon Crest is a family-run retreat on the ridge above Kausani.',
  primaryCta: { label: 'Check Availability', href: '#contact' },
  secondaryCta: { label: 'Explore the Property', href: '#about' },
};

export const about = {
  eyebrow: 'Our story',
  title: 'A garden on the ridge, built one colour at a time',
  paragraphs: [
    'The Kumaon Crest sits on a terraced hillside in Kausani, one of the finest viewpoints in the Kumaon Himalayas. Every cottage here is hand-painted — coral pinks, rainbow stripes, marigold borders — set among pine trees, roses and a kitchen garden that climbs the slope.',
    'It began as a family home and grew, room by room, into a small homestay where the garden is tended by hand and the view of the Trishul and Nanda Devi range is unobstructed on a clear morning.',
  ],
  stats: [
    { value: '7', label: 'Rooms & cottages' },
    { value: '6,300ft', label: 'Above sea level' },
    { value: '360°', label: 'Mountain views' },
  ],
  image: images.aerialProperty,
};

export const stay = {
  eyebrow: 'Where to stay',
  title: 'Rooms built for slow mornings',
  description:
    'Pine-panelled interiors, quilted beds and a private balcony looking straight at the hills. Simple, warm, and quiet.',
  room: {
    name: 'Deluxe Mountain Room',
    description:
      'Wood-panelled walls, a plush double bed, sit-out balcony and views over the garden toward the valley.',
    image: images.gardenPineView,
    amenities: [
      'Private balcony',
      'Hot water geyser',
      'Garden & valley view',
      'Bonfire on request',
      'Home-cooked meals',
      'Free parking',
    ],
    priceLabel: 'Starting from',
    price: '₹3,500 / night',
    priceRange: '₹3,500 onwards',
    cta: { label: 'Reserve a Room', href: '#contact' },
  },
  features: [
    { label: 'Garden Cottages', image: images.pinkCottageSteps },
    { label: 'Indoor Games Room', image: images.pinkCottagesEvening },
  ],
};

export const gallery = {
  eyebrow: 'A look around',
  title: 'The colours of Kausani',
  description:
    'A few corners of the property — the rainbow steps, the pine-view rooms, and quiet evenings on the porch.',
  items: [
    { image: images.himalayaView, layout: 'feature' },
    { image: images.rainbowSteps, layout: 'tile' },
    { image: images.gardenPineView, layout: 'tile' },
    { image: images.aerialProperty, layout: 'tile' },
    { image: images.pinkCottageSteps, layout: 'tile' },
  ],
};

export const featuredGallery = {
  title: 'Gallery',
  description: 'Experience the Beauty of The Kumaon Crest',
  items: [
    {
      src: aerialCottages,
      width: 1600,
      height: 900,
      alt: 'Aerial view of the orange cottages, lawn seating and terraced gardens at The Kumaon Crest',
    },
    {
      src: blueBedroom,
      width: 1536,
      height: 1024,
      alt: 'Bright guest room with a white double bed, blue walls and a garden-facing window',
    },
    {
      src: propertyCollage,
      width: 1521,
      height: 1034,
      alt: 'Guest room, rainbow-painted courtyard café and the cottages under winter snow',
    },
  ],
};

export const nearby = {
  eyebrow: 'Beyond the garden gate',
  title: 'Worth the walk (or the drive)',
  description:
    "Kausani sits at the centre of some of Kumaon's best-loved viewpoints, ashrams and temples — most within an hour's drive.",
  note: 'Ask at the front desk for a taxi to any of these — most drivers know the routes well and can suggest the best time of day to visit for light and crowds.',
  places: [
    { name: 'Starscapes Observatory', distance: '1.7 km' },
    { name: 'Anasakti Ashram', distance: '2.1 km' },
    { name: 'Kausani Lakshmi (Sarala Behn) Ashram', distance: '3.5 km' },
    { name: 'Kausani Tea Estate', distance: '5.8 km' },
    { name: 'Pinath Temple', distance: '12 km' },
    { name: 'Rudradhari Waterfall', distance: '12 km' },
    { name: 'Baijnath Temple', distance: '19 km' },
    { name: 'Kot Bhramari Temple', distance: '24 km' },
    { name: 'Bagnath Temple', distance: '40 km' },
    { name: 'Chandika Mata Temple', distance: '42 km' },
  ],
};

export const discover = {
  eyebrow: 'Discover Kausani',
  title: 'What the ridge is known for',
  description:
    'A few of the sights within a short drive — the Gandhi memorial at Anasakti Ashram, and the sunrise the region is named for.',
  items: [
    { image: images.kausaniSunset, layout: 'wide' },
    { image: images.anasaktiMonkeys, layout: 'tile' },
    { image: images.trishulNandaDevi, layout: 'tile' },
  ],
};

export const contact = {
  eyebrow: 'Get in touch',
  title: 'Plan your stay',
  description:
    "Tell us your dates and how many are travelling — we'll reply with availability and directions for the last stretch of the drive up.",
  details: [
    {
      label: 'Address',
      lines: ['The Kumaon Crest, Near VIP Guest House,', 'Kausani, Uttarakhand 263620'],
      size: 'lg',
    },
    {
      label: 'Getting here',
      lines: ['Nearest railhead: Kathgodam (~130 km)', 'Nearest airport: Pantnagar (~130 km)'],
      size: 'md',
    },
  ],
  directionsLabel: 'Get Directions',
};
