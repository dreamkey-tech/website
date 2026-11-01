import {
  AMENITIES,
  BUY_HOMES,
  LOCATIONS,
  PROPERTY_TYPES,
  STATUSES,
  buyPropertyHref,
  type BuyHome,
} from "@/components/buy/buy-data";

export interface PropertyPhoto {
  src: string;
  alt: string;
  label: string;
}

/** Unknown unit-level fields stay empty until supplied by the listings backend. */
export interface PropertyDetails {
  home: BuyHome;
  photos: PropertyPhoto[];
  type: string;
  status: string;
  neighbourhood: string;
  description: string;
  highlights: string[];
  bathrooms: number | null;
  balconies: number | null;
  carpetSqft: number | null;
  areaBasis: string | null;
  floor: string | null;
  facing: string | null;
  furnishing: string | null;
  ownership: string | null;
  parking: string | null;
  possessionDate: string | null;
}

const descriptions: Record<number, string> = {
  1: "A high-rise home concept in New Town, with a choice of three or four bedrooms. The collection pairs its residential tower setting with a lake-facing outlook and a sky lounge.",
  2: "An apartment concept on Ballygunge Circular Road, bringing three- and four-bedroom layouts to a South Kolkata setting. A private terrace and concierge are part of the illustrative collection.",
  3: "A three-bedroom apartment concept along the Rajarhat corridor. This collection focuses on contemporary homes, with a clubhouse and an airport-corridor setting.",
  4: "A four-bedroom penthouse concept in Alipore. The illustrative collection includes a plunge pool and covered parking, with space for a larger household.",
  5: "A four-bedroom apartment concept along the EM Bypass. Water views are the focus of this collection. Ask our team about the waitlist and alternative homes.",
  6: "A two- and three-bedroom apartment concept in Salt Lake Sector V. The collection brings together a work-neighbourhood setting and home automation.",
  7: "A duplex penthouse concept in New Town, with four- and five-bedroom options. Double-height living and direct lift access define this illustrative collection.",
  8: "An independent villa concept in the Vedic Village corridor of Rajarhat. Four- and five-bedroom options, a private lawn and solar power feature in the collection.",
};

const supportingPhotos: PropertyPhoto[] = [
  {
    src: "/images/pages/sell-residence.webp",
    alt: "Illustrative apartment living room with a Kolkata-inspired skyline",
    label: "Living room",
  },
  {
    src: "/images/property/bedroom-v1.webp",
    alt: "Illustrative contemporary apartment bedroom with a city outlook",
    label: "Bedroom",
  },
  {
    src: "/images/pages/rent-living.webp",
    alt: "Illustrative sunlit apartment lounge and seating area",
    label: "Living space",
  },
  {
    src: "/images/kolkata-newtown-hero-v1.webp",
    alt: "Illustrative Kolkata-inspired residential towers and neighbourhood",
    label: "Surroundings",
  },
];

export function getPropertyDetails(slug: string): PropertyDetails | undefined {
  const home = BUY_HOMES.find(
    (item) => buyPropertyHref(item) === `/buy/${slug}`,
  );
  if (!home) return;
  const photos: PropertyPhoto[] = [
    {
      src: home.image,
      alt: home.imageAlt,
      label:
        home.image.includes("sell-residence") ||
        home.image.includes("rent-living")
          ? "Living room"
          : "Property concept",
    },
    ...supportingPhotos.filter((photo) => photo.src !== home.image),
  ];
  if (photos.length < 5)
    photos.push({
      src: "/images/kolkata-urbana-inspired-hero.webp",
      alt: "Illustrative Kolkata residential tower exterior",
      label: "Architecture",
    });
  return {
    home,
    photos,
    type:
      PROPERTY_TYPES.find(([value]) => value === home.type)?.[1] ?? "Residence",
    status:
      STATUSES.find(([value]) => value === home.status)?.[1] ??
      "Confirm availability",
    neighbourhood:
      LOCATIONS.find(([value]) => value === home.corridor)?.[1] ?? "Kolkata",
    description: descriptions[home.id],
    highlights: home.amenities
      .map((value) => AMENITIES.find(([key]) => key === value)?.[1])
      .filter((label) => label !== undefined),
    bathrooms: null,
    balconies: null,
    carpetSqft: null,
    areaBasis: null,
    floor: null,
    facing: null,
    furnishing: null,
    ownership: null,
    parking: home.id === 4 ? "3 covered spaces" : null,
    possessionDate: null,
  };
}
