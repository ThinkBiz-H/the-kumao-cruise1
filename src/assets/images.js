/**
 * Image manifest. Files live in /public/images so they keep stable URLs
 * (needed for the hero preload in index.html and absolute Open Graph URLs).
 * Alt text describes what each photo actually shows.
 */
const image = (file, width, height, alt) => ({
  src: `/images/${file}`,
  width,
  height,
  alt,
});

export const images = {
  himalayaView: image(
    'himalaya-view.jpg',
    900,
    506,
    'Snow-capped Himalayan range above the red roofs and marigolds of The Kumaon Crest, Kausani',
  ),
  aerialProperty: image(
    'aerial-property.jpg',
    550,
    293,
    'Aerial view of the painted cottages and terraced garden at The Kumaon Crest',
  ),
  gardenPineView: image(
    'garden-pine-view.jpg',
    500,
    625,
    'Garden and pine trees at The Kumaon Crest looking out toward the valley',
  ),
  pinkCottagesEvening: image(
    'pink-cottages-evening.jpg',
    500,
    625,
    'Pink garden cottages with lit porches at dusk',
  ),
  pinkCottageSteps: image(
    'pink-cottage-steps.jpg',
    500,
    625,
    'Pink cottage exterior with blue doors and terracotta steps',
  ),
  rainbowSteps: image(
    'rainbow-steps.jpg',
    500,
    374,
    'Hand-painted rainbow steps and bicycle mural in the garden',
  ),
  kausaniSunset: image('kausani-sunset.jpg', 650, 347, 'Sunset over the Himalayan range, Kausani'),
  anasaktiMonkeys: image(
    'anasakti-monkeys.jpg',
    650,
    484,
    'Three monkey statues at Anasakti Ashram, Kausani',
  ),
  trishulNandaDevi: image(
    'trishul-nanda-devi.jpg',
    650,
    308,
    'Snow-capped Trishul and Nanda Devi peaks from Kausani',
  ),
};

export const ogImage = images.himalayaView;
