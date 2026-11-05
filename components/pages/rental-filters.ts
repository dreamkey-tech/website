import {
  AREAS,
  BEDROOMS,
  PROPERTY_TYPES,
  parseBuyFilters,
  type BuySearchParams,
} from "@/components/buy/website-filters";

export { AREAS, BEDROOMS, PROPERTY_TYPES };
export type { BuySearchParams as RentSearchParams };
export const RENT_BUDGETS = [
  ["30000", "Up to ₹30,000"],
  ["50000", "Up to ₹50,000"],
  ["75000", "Up to ₹75,000"],
  ["100000", "Up to ₹1,00,000"],
] as const;
export const RENT_SORTS = [
  ["recommended", "Newest first"],
  ["price-low", "Rent: low to high"],
  ["price-high", "Rent: high to low"],
  ["area-desc", "Carpet area: largest first"],
] as const;
export interface RentFilters {
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

export function parseRentFilters(query: BuySearchParams): RentFilters {
  // Share public location/type/BHK normalization, but never Buy's crore units.
  const shared = parseBuyFilters(query);
  return {
    ...shared,
    budget: choice(first(query.budget), RENT_BUDGETS),
    maxPrice: choice(first(query.maxPrice), RENT_BUDGETS),
    sort: choice(first(query.sort), RENT_SORTS) || "recommended",
  };
}
export function rentQueryEntries(filters: RentFilters) {
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
export function rentHref(
  filters: RentFilters,
  changes: Partial<RentFilters> = {},
) {
  const query = new URLSearchParams(
    rentQueryEntries({ ...filters, ...changes }),
  ).toString();
  return `/rent${query ? `?${query}` : ""}#rental-homes`;
}
export function rentalApiQuery(filters: RentFilters) {
  const params = new URLSearchParams({
    pricingType: "RENT",
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
  const cap = Math.min(
    filters.budget ? Number(filters.budget) : Infinity,
    filters.maxPrice ? Number(filters.maxPrice) : Infinity,
  );
  if (Number.isFinite(cap)) params.set("maxPrice", String(cap));
  params.set(
    "sortBy",
    filters.sort === "area-desc"
      ? "carpetAreaSqFt"
      : filters.sort.startsWith("price-")
        ? "askingPrice"
        : "createdAt",
  );
  params.set("sortOrder", filters.sort === "price-low" ? "asc" : "desc");
  return params;
}
export function activeRentFilters(filters: RentFilters) {
  const chips: { key: string; label: string; href: string }[] = [];
  const add = (key: string, label: string, changes: Partial<RentFilters>) =>
    chips.push({
      key,
      label,
      href: rentHref(filters, { ...changes, page: 1 }),
    });
  if (filters.q) add("q", `“${filters.q}”`, { q: "" });
  for (const [key, options] of [
    ["location", AREAS],
    ["type", PROPERTY_TYPES],
    ["budget", RENT_BUDGETS],
    ["bedrooms", BEDROOMS],
  ] as const)
    if (filters[key])
      add(
        key,
        options.find(([value]) => value === filters[key])?.[1] || filters[key],
        { [key]: "" },
      );
  if (filters.maxPrice)
    add(
      "maxPrice",
      `Up to ₹${Number(filters.maxPrice).toLocaleString("en-IN")} rent`,
      { maxPrice: "" },
    );
  return chips;
}
