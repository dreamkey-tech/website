import "server-only";
import { cache } from "react";
import { z } from "zod";
import {
  bestPropertiesSchema,
  propertyDetailSchema,
  propertyListSchema,
} from "./website-properties";
import {
  parseBuyFilters,
  saleApiQuery,
  type BuyFilters,
} from "@/components/buy/website-filters";

const API_PATH = "/v1/website/properties/list";
async function request(path: string, cookie?: string) {
  const base = process.env.API_URL;
  if (!base) throw new Error("Property service is not configured");
  return fetch(`${base.replace(/\/$/, "")}${path}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
    headers: cookie
      ? { Cookie: cookie, Accept: "application/json" }
      : { Accept: "application/json" },
  });
}

/** Public, backend-selected showcase. Never forward visitor session cookies. */
export const getBestProperties = cache(async () => {
  try {
    const response = await request("/v1/best-properties");
    if (!response.ok) return { kind: "error" as const };
    const data = bestPropertiesSchema.parse(await response.json());
    return { kind: "ready" as const, ...data };
  } catch {
    return { kind: "error" as const };
  }
});

export const getSaleCatalogue = cache(async (query: string) => {
  let filters: BuyFilters = parseBuyFilters(
    Object.fromEntries(new URLSearchParams(query)),
  );
  try {
    const range = saleApiQuery(filters);
    if (
      Number(range.get("minPrice") ?? 0) >
      Number(range.get("maxPrice") ?? Infinity)
    ) {
      return {
        kind: "ready" as const,
        success: true as const,
        filters: { ...filters, page: 1 },
        properties: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 6,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }
    async function fetchPage() {
      const response = await request(`${API_PATH}?${saleApiQuery(filters)}`);
      if (!response.ok) throw new Error("Property service unavailable");
      return propertyListSchema.parse(await response.json());
    }
    let result = await fetchPage();
    const pages = Math.max(1, result.pagination.totalPages);
    if (filters.page > pages) {
      filters = { ...filters, page: pages };
      result = await fetchPage();
    }
    // Guard the Buy boundary even if the upstream ignores its SALE filter.
    if (result.properties.some((property) => property.pricingType !== "SALE"))
      throw new Error("Unexpected listing category");
    return { kind: "ready" as const, filters, ...result };
  } catch {
    // Never substitute illustrative stock for a failed live inventory request.
    return { kind: "error" as const, filters };
  }
});

export async function getWebsiteProperty(id: string, cookie: string) {
  if (!cookie) return { kind: "login" as const };
  try {
    const response = await request(
      `${API_PATH}/${encodeURIComponent(id)}`,
      cookie,
    );
    if (response.status === 401 || response.status === 403)
      return { kind: "login" as const };
    if (response.status === 404) return { kind: "missing" as const };
    if (!response.ok) return { kind: "error" as const };
    const data = z
      .object({ success: z.literal(true), property: propertyDetailSchema })
      .parse(await response.json());
    if (data.property.id !== id) return { kind: "error" as const };
    return { kind: "ready" as const, property: data.property };
  } catch {
    return { kind: "error" as const };
  }
}
