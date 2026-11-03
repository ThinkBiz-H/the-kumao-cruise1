import { images } from '../../assets/images';
import { about, nearby, site, stay } from '../../data/siteContent';
import { absoluteUrl } from '../../utils/site';

/** schema.org LodgingBusiness for the homestay. */
export function lodgingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${absoluteUrl('/')}#lodging`,
    name: site.name,
    description: site.description,
    url: absoluteUrl('/'),
    image: [images.himalayaView, images.aerialProperty, images.pinkCottagesEvening].map((img) =>
      absoluteUrl(img.src),
    ),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    hasMap: site.mapsUrl,
    priceRange: stay.room.priceRange,
    currenciesAccepted: 'INR',
    numberOfRooms: Number(about.stats[0].value),
    amenityFeature: stay.room.amenities.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    containsPlace: {
      '@type': 'HotelRoom',
      name: stay.room.name,
      description: stay.room.description,
    },
  };
}

/** schema.org WebSite entry. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: absoluteUrl('/'),
    inLanguage: 'en-IN',
  };
}

/** Nearby attractions as an ItemList. */
export function nearbySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: nearby.title,
    itemListElement: nearby.places.map((place, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'TouristAttraction',
        name: place.name,
        description: `${place.distance} from ${site.name}, Kausani`,
      },
    })),
  };
}
