/**
 * Photo galleries for the "Explore Nearby Attractions" section.
 *
 * Each place has three photos in src/assets/nearby/ named <slug>-1.webp,
 * <slug>-2.webp and <slug>-3.webp, plus <slug>-1-sm.webp — a smaller copy of
 * the first photo used on the card. Photos come from Unsplash and Pexels
 * (free to use, no attribution required) or from the property's own set.
 *
 * Where no free photo of the place itself exists, the gallery uses nearby
 * Kumaon scenes instead. Their captions say what they really show, and the
 * card is flagged with `areaPhotos` so guests aren't misled.
 */
const photos = import.meta.glob('../assets/nearby/*.webp', { eager: true, import: 'default' });

const photo = (file) => {
  const src = photos[`../assets/nearby/${file}`];
  if (!src) throw new Error(`Missing nearby photo: src/assets/nearby/${file}`);
  return src;
};

const place = ({ id, slug, title, distance, description, captions, areaPhotos = false }) => ({
  id,
  title,
  distance,
  description,
  areaPhotos,
  coverImage: photo(`${slug}-1.webp`),
  cardImage: photo(`${slug}-1-sm.webp`),
  galleryImages: captions.map((alt, i) => ({ src: photo(`${slug}-${i + 1}.webp`), alt })),
});

export const nearbyGallery = {
  eyebrow: 'Day trips from the Crest',
  title: 'Explore Nearby Attractions',
  description:
    'Discover beautiful places around The Kumaon Crest that can easily be visited during your stay.',
};

export const nearbyPlaces = [
  place({
    id: 1,
    slug: 'starscape',
    title: 'Starscapes Observatory',
    distance: '1.7 km',
    description:
      'Clear mountain air and very little light pollution make Kausani one of the best places in the hills to look up. Guided sessions point telescopes at planets, star clusters and the Milky Way.',
    captions: [
      'The Milky Way over the forest at Kausani',
      'Stars at twilight over Mukteshwar, Kumaon',
      'Night sky over the hills at Pangot, Kumaon',
    ],
    areaPhotos: true,
  }),
  place({
    id: 2,
    slug: 'anasakti',
    title: 'Anasakti Ashram',
    distance: '2.1 km',
    description:
      'Mahatma Gandhi stayed here in 1929 and wrote his commentary on the Gita, Anasakti Yoga. A small museum, a prayer hall and a garden look out over the Himalayan range.',
    captions: [
      'The three wise monkeys at Anasakti Ashram',
      'Cloud rolling over the Kausani ridge',
      'Trishul and Nanda Devi from Kausani',
    ],
  }),
  place({
    id: 3,
    slug: 'lakshmi',
    title: 'Kausani Lakshmi Ashram',
    distance: '3.5 km',
    description:
      "Founded in 1946 by Sarala Behn, one of Gandhi's followers, as a school for girls from the hills. The campus is quiet and set among pine trees, and visitors are welcome.",
    captions: [
      'Fields and misty hills around Kausani',
      'Pine forest at Binsar, Kumaon',
      'Sunset over the Himalaya from Kausani',
    ],
    areaPhotos: true,
  }),
  place({
    id: 4,
    slug: 'tea-estate',
    title: 'Kausani Tea Estate',
    distance: '5.8 km',
    description:
      'Terraced rows of tea plants run down the slopes toward the valley. You can walk through the gardens, see how the leaves are processed, and buy fresh Kumaoni tea.',
    captions: [
      'The viewpoint gazebo at Kausani Tea Estate',
      'Tea bushes under the pines, Kausani',
      'Terraced hills near Kausani',
    ],
  }),
  place({
    id: 5,
    slug: 'pinath',
    title: 'Pinath Temple',
    distance: '12 km',
    description:
      'An old hilltop Shiva temple reached by a forest trail through oak and rhododendron. The views across the valley from the top are worth the climb.',
    captions: [
      'A forest trail near Almora',
      'A small hilltop shrine at Nauna, Kumaon',
      'A shrine among the pines at Nauna, Kumaon',
    ],
    areaPhotos: true,
  }),
  place({
    id: 6,
    slug: 'rudradhari',
    title: 'Rudradhari Waterfall',
    distance: '12 km',
    description:
      'A walk through terraced fields and pine forest leads to a waterfall and a set of ancient caves linked to Shiva and Vishnu. It is at its best just after the monsoon.',
    captions: [
      'A waterfall near Lansdowne, Uttarakhand',
      'Kempty Falls, Uttarakhand',
      'Pine forest near Almora',
    ],
    areaPhotos: true,
  }),
  place({
    id: 7,
    slug: 'baijnath',
    title: 'Baijnath Temple',
    distance: '19 km',
    description:
      'A group of stone temples from the Katyuri period on the banks of the Gomti river, dedicated to Shiva. The riverside setting and the old carvings make it a peaceful half-day trip.',
    captions: [
      'The river at Baijnath',
      'Nandakot peak from Dhakuri, Bageshwar district',
      'Morning cloud over the hills of Bageshwar district',
    ],
  }),
  place({
    id: 8,
    slug: 'kot-bhramari',
    title: 'Kot Bhramari Temple',
    distance: '24 km',
    description:
      'A hilltop shrine to Goddess Bhramari, closely tied to the Nanda Devi tradition of Kumaon. It hosts a popular fair each autumn and has wide views over the Katyur valley.',
    captions: [
      'The Himalaya from the viewpoint at Almora',
      'A red hill temple among the pines at Binsar, Kumaon',
      'A temple garden at Binsar, Kumaon',
    ],
    areaPhotos: true,
  }),
  place({
    id: 9,
    slug: 'bagnath',
    title: 'Bagnath Temple',
    distance: '40 km',
    description:
      'The main temple of Bageshwar, dedicated to Shiva, stands where the Saryu and Gomti rivers meet. It is the centre of the Uttarayani fair every January.',
    captions: [
      'The riverfront at Bageshwar',
      'The Shiva statue on the Bageshwar riverfront',
      'The rocky riverbed at Bageshwar',
    ],
    areaPhotos: true,
  }),
  place({
    id: 10,
    slug: 'chandika',
    title: 'Chandika Mata Temple',
    distance: '42 km',
    description:
      'A goddess temple on a ridge above Bageshwar, with a calm setting and views over the town and the river valley. It is especially busy during Navratri.',
    captions: [
      'Haystacks on terraced fields, Bageshwar',
      'Hillside homes in Bageshwar',
      'The Shiva statue at Bageshwar',
    ],
    areaPhotos: true,
  }),
];
