/** Existing illustrative catalog. These are not live property listings. */
export const BUY_HOMES: BuyHome[] = [
  {
    id: 1,
    title: "DreamKey Altura",
    location: "New Town Action Area II, Kolkata",
    description: "3 & 4 BHK Luxury High-rise Residences",
    bhk: "3 & 4 BHK",
    size: "1,850 - 2,750 sq.ft",
    price: "₹1.85 Cr",
    amenitiesText: "Lake Facing • Sky Lounge",
    corridor: "new-town",
    type: "apartment",
    status: "construction",
    bedrooms: [3, 4],
    amenities: ["water", "club"],
    image: "/images/kolkata-urbana-inspired-hero.webp",
    imageAlt: "Illustrative Kolkata-inspired residential high-rises",
    priceCr: 1.85,
    maxSqft: 2750,
  },
  {
    id: 2,
    title: "DreamKey Residences",
    location: "Ballygunge Circular Rd, South Kolkata",
    description: "3 & 4 BHK Heritage Inspired Luxury Suites",
    bhk: "3 & 4 BHK",
    size: "1,920 - 3,100 sq.ft",
    price: "₹2.25 Cr",
    amenitiesText: "Private Terrace • Concierge",
    corridor: "ballygunge",
    type: "heritage",
    status: "ready",
    bedrooms: [3, 4],
    amenities: ["terrace", "concierge"],
    image: "/images/pages/sell-residence.webp",
    imageAlt:
      "Illustrative sunlit apartment interior with residential skyline views",
    priceCr: 2.25,
    maxSqft: 3100,
  },
  {
    id: 3,
    title: "DreamKey Heights",
    location: "Rajarhat Expressway Belt, Kolkata",
    description: "3 BHK Contemporary High-speed Corridor Vistas",
    bhk: "3 BHK",
    size: "1,350 - 2,100 sq.ft",
    price: "₹1.45 Cr",
    amenitiesText: "Airport Corridor • Grand Club",
    corridor: "rajarhat",
    type: "apartment",
    status: "construction",
    bedrooms: [3],
    amenities: ["club"],
    image: "/images/pages/contact-kolkata.webp",
    imageAlt: "Illustrative Kolkata-inspired residential avenue",
    priceCr: 1.45,
    maxSqft: 2100,
  },
  {
    id: 4,
    title: "DreamKey Icon",
    location: "Alipore Green Avenue, Kolkata",
    description: "4 BHK Bespoke Penthouse & Sky Haven",
    bhk: "4 BHK",
    size: "2,800 - 4,100 sq.ft",
    price: "₹3.85 Cr",
    amenitiesText: "Plunge Pool • 3 Covered Parks",
    corridor: "alipore",
    type: "penthouse",
    status: "ready",
    bedrooms: [4],
    amenities: ["pool", "parking"],
    image: "/images/pages/rent-living.webp",
    imageAlt:
      "Illustrative sunlit apartment interior with residential skyline views",
    priceCr: 3.85,
    maxSqft: 4100,
  },
  {
    id: 5,
    title: "DreamKey Grand",
    location: "EM Bypass Waterfront, Kolkata",
    description: "4 BHK Sky Condominiums",
    bhk: "4 BHK",
    size: "2,250 - 3,500 sq.ft",
    price: "₹2.90 Cr",
    amenitiesText: "180° Wetland Panorama",
    corridor: "em-bypass",
    type: "apartment",
    status: "waitlist",
    bedrooms: [4],
    amenities: ["water"],
    image: "/images/kolkata-urbana-inspired-hero.webp",
    imageAlt: "Illustrative Kolkata-inspired residential high-rises",
    priceCr: 2.9,
    maxSqft: 3500,
  },
  {
    id: 6,
    title: "DreamKey Prime",
    location: "Salt Lake Sector V, Kolkata",
    description: "2 & 3 BHK Tech Executive Smart Flats",
    bhk: "2 & 3 BHK",
    size: "1,250 - 1,950 sq.ft",
    price: "₹1.15 Cr",
    amenitiesText: "Walk-to-Work • Smart Automation",
    corridor: "salt-lake",
    type: "apartment",
    status: "ready",
    bedrooms: [2, 3],
    amenities: ["automation"],
    image: "/images/design-gallery/designer-interior.webp",
    imageAlt: "Illustrative contemporary designer interior",
    priceCr: 1.15,
    maxSqft: 1950,
  },
  {
    id: 7,
    title: "DreamKey Sky Mansions",
    location: "New Town Boulevard, Kolkata",
    description: "4 & 5 BHK Duplex Signature Penthouses",
    bhk: "4 & 5 BHK",
    size: "3,400 - 5,200 sq.ft",
    price: "₹4.20 Cr",
    amenitiesText: "Double Height Living • Direct Lift",
    corridor: "new-town",
    type: "penthouse",
    status: "launch",
    bedrooms: [4, 5],
    amenities: ["lift"],
    image: "/images/pages/sell-residence.webp",
    imageAlt:
      "Illustrative sunlit apartment interior with residential skyline views",
    priceCr: 4.2,
    maxSqft: 5200,
  },
  {
    id: 8,
    title: "DreamKey Serene Villas",
    location: "Vedic Village Corridor, Rajarhat",
    description: "4 & 5 BHK Independent Gated Villas",
    bhk: "4 & 5 BHK",
    size: "3,200 - 4,800 sq.ft",
    price: "₹3.40 Cr",
    amenitiesText: "Private Lawn • Solar Microgrid",
    corridor: "rajarhat",
    type: "villa",
    status: "ready",
    bedrooms: [4, 5],
    amenities: ["garden", "solar"],
    image: "/images/design-gallery/villa-timber.webp",
    imageAlt: "Illustrative contemporary villa exterior",
    priceCr: 3.4,
    maxSqft: 4800,
  },
];

export interface BuyHome {
  id: number;
  title: string;
  location: string;
  description: string;
  bhk: string;
  size: string;
  price: string;
  amenitiesText: string;
  corridor: string;
  type: string;
  status: string;
  bedrooms: number[];
  amenities: string[];
  image: string;
  imageAlt: string;
  priceCr: number;
  maxSqft: number;
}
export const LOCATIONS = [
  ["new-town", "New Town"],
  ["ballygunge", "Ballygunge & South Kolkata"],
  ["alipore", "Alipore"],
  ["rajarhat", "Rajarhat"],
  ["em-bypass", "EM Bypass"],
  ["salt-lake", "Salt Lake"],
  ["central-kolkata", "Central Kolkata"],
] as const;
export const PROPERTY_TYPES = [
  ["apartment", "Apartment"],
  ["penthouse", "Penthouse"],
  ["villa", "Villa"],
  ["heritage", "Heritage suite"],
  ["studio", "Studio"],
] as const;
export const BUDGETS = [
  ["35l-75l", "₹35L - ₹75L", 0.35, 0.75],
  ["75l-1.5cr", "₹75L - ₹1.5 Cr", 0.75, 1.5],
  ["under-1.5", "Up to ₹1.5 Cr", 0, 1.5],
  ["1.5-2.5", "₹1.5 Cr - ₹2.5 Cr", 1.5, 2.5],
  ["1.5cr-3cr", "₹1.5 Cr - ₹3 Cr", 1.5, 3],
  ["2.5-4", "₹2.5 Cr - ₹4 Cr", 2.5, 4],
  ["3cr+", "₹3 Cr & above", 3, Infinity],
  ["above-4", "₹4 Cr & above", 4, Infinity],
] as const;
export const BEDROOMS = [
  ["1", "1 BHK"],
  ["2", "2 BHK"],
  ["3", "3 BHK"],
  ["4", "4 BHK"],
  ["4+", "4+ BHK"],
  ["5+", "5+ BHK"],
  ["3+", "3+ BHK"],
] as const;
export const STATUSES = [
  ["ready", "Ready to move"],
  ["construction", "Under construction"],
  ["launch", "New launch"],
  ["waitlist", "Sold out / waitlist"],
] as const;
export const AMENITIES = [
  ["water", "Lake or water views"],
  ["terrace", "Private terrace"],
  ["club", "Clubhouse / lounge"],
  ["pool", "Pool"],
  ["parking", "Covered parking"],
  ["automation", "Home automation"],
  ["lift", "Direct lift access"],
  ["garden", "Private lawn"],
  ["solar", "Solar power"],
  ["concierge", "Concierge"],
] as const;
export const SORTS = [
  ["recommended", "Recommended"],
  ["price-asc", "Price: low to high"],
  ["price-desc", "Price: high to low"],
  ["area-desc", "Size: largest first"],
] as const;
export interface BuyFilters {
  q: string;
  locations: string[];
  type: string;
  budget: string;
  bedrooms: string;
  maxPrice: string;
  status: string;
  amenities: string[];
  sort: string;
  page: number;
}
export const EMPTY_BUY_FILTERS: BuyFilters = {
  q: "",
  locations: [],
  type: "",
  budget: "",
  bedrooms: "",
  maxPrice: "",
  status: "",
  amenities: [],
  sort: "recommended",
  page: 1,
};
export type BuySearchParams = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value) || "";
const choices = (
  value: string | string[] | undefined,
  options: readonly (readonly [string, ...unknown[]])[],
) => [
  ...new Set(
    (Array.isArray(value) ? value : value ? [value] : []).filter((item) =>
      options.some((option) => option[0] === item),
    ),
  ),
];
const choice = (
  value: string | string[] | undefined,
  options: readonly (readonly [string, ...unknown[]])[],
) => choices(first(value), options)[0] || "";
export function parseBuyFilters(query: BuySearchParams): BuyFilters {
  const bedroomValue = first(query.bedrooms).replace("bhk", "").toLowerCase();
  const cap = Number(first(query.maxPrice));
  const page = Number(first(query.page));
  return {
    q: first(query.q).trim().slice(0, 120),
    locations: choices(query.location, LOCATIONS),
    type: choice(first(query.type).toLowerCase(), PROPERTY_TYPES),
    budget: choice(query.budget, BUDGETS),
    bedrooms: choice(
      bedroomValue === "4" && first(query.bedrooms) === "4bhk"
        ? "4+"
        : bedroomValue,
      BEDROOMS,
    ),
    maxPrice:
      Number.isFinite(cap) && cap >= 0.35 && cap <= 6 ? String(cap) : "",
    status: choice(query["status-filter"] ?? query.status, STATUSES),
    amenities: choices(query.amenity, AMENITIES),
    sort: choice(query.sort, SORTS) || "recommended",
    page: Number.isSafeInteger(page) && page > 0 ? Math.min(page, 10000) : 1,
  };
}
export function buyQueryEntries(filters: BuyFilters) {
  const entries: [string, string][] = [];
  for (const key of [
    "q",
    "type",
    "budget",
    "bedrooms",
    "maxPrice",
    "status",
  ] as const)
    if (filters[key]) entries.push([key, filters[key]]);
  filters.locations.forEach((value) => entries.push(["location", value]));
  filters.amenities.forEach((value) => entries.push(["amenity", value]));
  if (filters.sort !== "recommended") entries.push(["sort", filters.sort]);
  if (filters.page > 1) entries.push(["page", String(filters.page)]);
  return entries;
}
export function buyHref(
  filters: BuyFilters,
  changes: Partial<BuyFilters> = {},
) {
  const query = new URLSearchParams(
    buyQueryEntries({ ...filters, ...changes }),
  ).toString();
  return "/buy" + (query ? "?" + query : "") + "#homes";
}
export function filterBuyHomes(homes: BuyHome[], filters: BuyFilters) {
  const words = filters.q.toLowerCase().split(/\s+/).filter(Boolean);
  const band = BUDGETS.find((option) => option[0] === filters.budget);
  const result = homes.filter((home) => {
    const text =
      `${home.title} ${home.location} ${home.description} ${home.amenitiesText}`.toLowerCase();
    const beds = filters.bedrooms.endsWith("+")
      ? home.bedrooms.some((n) => n >= Number(filters.bedrooms.slice(0, -1)))
      : home.bedrooms.includes(Number(filters.bedrooms));
    return (
      words.every((word) => text.includes(word)) &&
      (!filters.locations.length ||
        filters.locations.includes(home.corridor)) &&
      (!filters.type || home.type === filters.type) &&
      (!band || (home.priceCr >= band[2] && home.priceCr <= band[3])) &&
      (!filters.bedrooms || beds) &&
      (!filters.maxPrice || home.priceCr <= Number(filters.maxPrice)) &&
      (!filters.status || home.status === filters.status) &&
      filters.amenities.every((amenity) => home.amenities.includes(amenity))
    );
  });
  if (filters.sort === "price-asc")
    result.sort((a, b) => a.priceCr - b.priceCr);
  if (filters.sort === "price-desc")
    result.sort((a, b) => b.priceCr - a.priceCr);
  if (filters.sort === "area-desc")
    result.sort((a, b) => b.maxSqft - a.maxSqft);
  return result;
}
export function activeBuyFilters(filters: BuyFilters) {
  const chips: { key: string; label: string; href: string }[] = [];
  const add = (key: string, label: string, changes: Partial<BuyFilters>) =>
    chips.push({ key, label, href: buyHref(filters, { ...changes, page: 1 }) });
  if (filters.q) add("q", `“${filters.q}”`, { q: "" });
  filters.locations.forEach((value) =>
    add(value, LOCATIONS.find((option) => option[0] === value)?.[1] || value, {
      locations: filters.locations.filter((item) => item !== value),
    }),
  );
  for (const [key, options] of [
    ["type", PROPERTY_TYPES],
    ["budget", BUDGETS],
    ["bedrooms", BEDROOMS],
    ["status", STATUSES],
  ] as const) {
    if (filters[key])
      add(
        key,
        options.find((option) => option[0] === filters[key])?.[1] ||
          filters[key],
        { [key]: "" },
      );
  }
  if (filters.maxPrice)
    add("maxPrice", `Up to ₹${filters.maxPrice} Cr`, { maxPrice: "" });
  filters.amenities.forEach((value) =>
    add(value, AMENITIES.find((option) => option[0] === value)?.[1] || value, {
      amenities: filters.amenities.filter((item) => item !== value),
    }),
  );
  return chips;
}
export function buyEnquiryHref(home: BuyHome) {
  return (
    "/contact?purpose=buy&property=" +
    encodeURIComponent(
      home.title +
        (home.status === "waitlist" ? " (waitlist / alternatives)" : ""),
    )
  );
}
