export interface RentalHome {
  id: string;
  title: string;
  location: string;
  area: string;
  bedrooms: number;
  sqft: number;
  rent: number;
  furnishing: "Furnished" | "Semi-furnished" | "Unfurnished";
  image: string;
  imageAlt: string;
}

/** Illustrative collection for the design preview, not live property inventory. */
export const RENTAL_HOMES: RentalHome[] = [
  {
    id: "new-town-three",
    title: "Room for a slower morning",
    location: "New Town",
    area: "Action Area II",
    bedrooms: 3,
    sqft: 1850,
    rent: 65000,
    furnishing: "Furnished",
    image: "/images/pages/rent-living.webp",
    imageAlt:
      "Illustrative bright apartment with a dining nook and skyline views",
  },
  {
    id: "salt-lake-two",
    title: "A little closer to everything",
    location: "Salt Lake",
    area: "Sector V neighbourhood",
    bedrooms: 2,
    sqft: 1120,
    rent: 32000,
    furnishing: "Semi-furnished",
    image: "/images/design-gallery/designer-interior.webp",
    imageAlt:
      "Illustrative contemporary interior with understated designer furniture",
  },
  {
    id: "bypass-four",
    title: "Space for the whole family",
    location: "EM Bypass",
    area: "Anandapur neighbourhood",
    bedrooms: 4,
    sqft: 2400,
    rent: 85000,
    furnishing: "Furnished",
    image: "/images/pages/sell-residence.webp",
    imageAlt:
      "Illustrative spacious living room with large windows and residential tower views",
  },
  {
    id: "new-town-two",
    title: "Make the city feel like home",
    location: "New Town",
    area: "Action Area I",
    bedrooms: 2,
    sqft: 1050,
    rent: 28000,
    furnishing: "Unfurnished",
    image: "/images/kolkata-urbana-inspired-hero.webp",
    imageAlt: "Illustrative Kolkata-inspired residential high-rises",
  },
];

export interface RentalFilters {
  location: string;
  budget: string;
  bedrooms: string;
  furnishing: string;
}
export const EMPTY_RENTAL_FILTERS: RentalFilters = {
  location: "",
  budget: "",
  bedrooms: "",
  furnishing: "",
};

export function filterRentalHomes(
  homes: RentalHome[],
  filters: RentalFilters,
  sort = "recommended",
) {
  const result = homes.filter(
    (home) =>
      (!filters.location || home.location === filters.location) &&
      (!filters.budget || home.rent <= Number(filters.budget)) &&
      (!filters.bedrooms || home.bedrooms === Number(filters.bedrooms)) &&
      (!filters.furnishing || home.furnishing === filters.furnishing),
  );
  if (sort === "price-low") result.sort((a, b) => a.rent - b.rent);
  if (sort === "price-high") result.sort((a, b) => b.rent - a.rent);
  return result;
}
