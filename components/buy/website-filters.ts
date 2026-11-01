import { BUDGETS, BEDROOMS, LOCATIONS, type BuySearchParams } from "./buy-data";
export { BUDGETS, BEDROOMS };
export const SORTS = [
  ["recommended", "Newest first"],
  ["price-asc", "Price: low to high"],
  ["price-desc", "Price: high to low"],
  ["area-desc", "Carpet area: largest first"],
] as const;
export type { BuySearchParams };

export const PROPERTY_TYPES = [
  ["FLAT", "Apartment"],
  ["LAND", "Land"],
  ["WAREHOUSE", "Warehouse"],
  ["COMMERCIAL", "Commercial"],
  ["OTHER", "Other"],
] as const;
export const AREAS = LOCATIONS.map(
  ([key, label]) => [key, key === "ballygunge" ? "Ballygunge" : label] as const,
);
export interface BuyFilters {
  q: string;
  location: string;
  type: string;
  budget: string;
  bedrooms: string;
  maxPrice: string;
  sort: string;
  page: number;
}
const first = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value) || "";
const choice = (
  value: string,
  options: readonly (readonly [string, ...unknown[]])[],
) => (options.some(([key]) => key === value) ? value : "");
export function parseBuyFilters(query: BuySearchParams): BuyFilters {
  const cap = Number(first(query.maxPrice));
  const page = Number(first(query.page));
  const requestedType = first(query.type);
  const location = first(query.location);
  const bedroomInput = first(query.bedrooms).toLowerCase();
  const bedrooms =
    bedroomInput === "4bhk" ? "4+" : bedroomInput.replace("bhk", "");
  return {
    q: first(query.q).trim().slice(0, 120),
    location: choice(location, AREAS),
    type: choice(
      requestedType === "apartment" ? "FLAT" : requestedType.toUpperCase(),
      PROPERTY_TYPES,
    ),
    budget: choice(first(query.budget), BUDGETS),
    bedrooms: choice(bedrooms, BEDROOMS),
    maxPrice:
      Number.isFinite(cap) && cap >= 0.35 && cap <= 6 ? String(cap) : "",
    sort: choice(first(query.sort), SORTS) || "recommended",
    page: Number.isSafeInteger(page) && page > 0 ? Math.min(page, 10000) : 1,
  };
}
export function buyQueryEntries(filters: BuyFilters) {
  const entries: [string, string][] = [];
  for (const key of [
    "q",
    "location",
    "type",
    "budget",
    "bedrooms",
    "maxPrice",
  ] as const)
    if (filters[key]) entries.push([key, filters[key]]);
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
  return `/buy${query ? `?${query}` : ""}#homes`;
}
export function saleApiQuery(filters: BuyFilters) {
  const params = new URLSearchParams({
    pricingType: "SALE",
    city: "Kolkata",
    page: String(filters.page),
    limit: "6",
  });
  if (filters.q) params.set("search", filters.q);
  if (filters.location)
    params.set(
      "locationArea",
      AREAS.find(([key]) => key === filters.location)![1],
    );
  if (filters.type) params.set("propertyType", filters.type);
  if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
  const band = BUDGETS.find(([key]) => key === filters.budget);
  if (band && band[2] > 0)
    params.set("minPrice", String(Math.round(band[2] * 10000000)));
  const max = Math.min(
    band?.[3] ?? Infinity,
    filters.maxPrice ? Number(filters.maxPrice) : Infinity,
  );
  if (Number.isFinite(max))
    params.set("maxPrice", String(Math.round(max * 10000000)));
  params.set(
    "sortBy",
    filters.sort === "area-desc"
      ? "carpetAreaSqFt"
      : filters.sort.startsWith("price-")
        ? "askingPrice"
        : "createdAt",
  );
  params.set("sortOrder", filters.sort === "price-asc" ? "asc" : "desc");
  return params;
}
export function activeBuyFilters(filters: BuyFilters) {
  const chips: { key: string; label: string; href: string }[] = [];
  const add = (key: string, label: string, changes: Partial<BuyFilters>) =>
    chips.push({ key, label, href: buyHref(filters, { ...changes, page: 1 }) });
  if (filters.q) add("q", `“${filters.q}”`, { q: "" });
  for (const [key, options] of [
    ["location", AREAS],
    ["type", PROPERTY_TYPES],
    ["budget", BUDGETS],
    ["bedrooms", BEDROOMS],
  ] as const)
    if (filters[key])
      add(
        key,
        options.find(([value]) => value === filters[key])?.[1] || filters[key],
        { [key]: "" },
      );
  if (filters.maxPrice)
    add("maxPrice", `Up to ₹${filters.maxPrice} Cr`, { maxPrice: "" });
  return chips;
}
