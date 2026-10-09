/** Matching illustrative architectural photographs, rather than live listings. */
export const HERO_SLIDES = [
  {
    src: "/images/kolkata-urbana-inspired-hero.webp",
    alt: "Generated illustration of Urbana-inspired residential high-rise towers above the Kolkata skyline.",
    label: "Kolkata high-rises",
  },
  {
    src: "/images/kolkata-residence-hero-v2.webp",
    alt: "Illustrative contemporary Kolkata residence with clean balconies and a blue-sky river panorama.",
    label: "Contemporary residences",
  },
] as const;

// Account for the landscape image covering a tall hero, including mobile crops.
export const HERO_IMAGE_SIZES =
  "(max-width: 767px) max(1175px, calc(178svh - 157px)), (min-width: 1600px) max(1568px, calc(178svh - 178px)), max(calc(100vw - 32px), 1140px, calc(178svh - 178px))";
