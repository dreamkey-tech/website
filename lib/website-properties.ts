import { z } from "zod";

export function publicMediaUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

const optionalText = z
  .string()
  .nullable()
  .optional()
  .transform((value) => value?.trim() || null);
const quantity = z
  .preprocess(
    (value) =>
      typeof value === "string" && value.trim() ? Number(value) : value,
    z.number().finite().nonnegative().nullable().optional(),
  )
  .transform((value) => value ?? null);
const image = z.unknown().transform(publicMediaUrl);
const publicMediaSchema = z
  .object({
    category: z.enum(["PHOTOGRAPH", "FLOOR_PLAN"]),
    url: z.string().transform(publicMediaUrl).pipe(z.string()),
    mimeType: z.enum([
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/gif",
      "application/pdf",
    ]),
    title: optionalText,
    order: z.number().int().optional().default(0),
    isCover: z.boolean().optional().default(false),
  })
  .refine(
    (value) =>
      value.category === "FLOOR_PLAN" || value.mimeType.startsWith("image/"),
  );

// Whitelist the website DTO. Never spread CRM response objects into page props.
export const propertyCardSchema = z.object({
  id: z.uuid(),
  propertyType: z.string(),
  societyBuildingName: optionalText,
  locationArea: optionalText,
  city: optionalText,
  carpetAreaSqFt: quantity,
  superBuiltUpAreaSqFt: quantity,
  askingPrice: quantity,
  pricingType: z.enum(["SALE", "RENT"]),
  bedrooms: quantity,
  bathrooms: quantity,
  amenities: z
    .array(z.string())
    .nullish()
    .transform((value) => value ?? []),
  availabilityStatus: optionalText,
  coverImage: image,
  previewImages: z
    .array(image)
    .nullish()
    .transform(
      (value) => value?.filter((url): url is string => Boolean(url)) ?? [],
    ),
});

export const propertyDetailSchema = propertyCardSchema.extend({
  pincode: optionalText,
  floorNumber: z
    .preprocess(
      (value) =>
        typeof value === "string" && value.trim() ? Number(value) : value,
      z.number().int().nullable().optional(),
    )
    .transform((value) => value ?? null),
  totalFloors: quantity,
  balconies: quantity,
  availabilityDate: optionalText,
  builderName: optionalText,
  yearOfConstruction: quantity,
  totalUnits: quantity,
  // Keys follow the documented property-create media DTO. Detail items remain
  // unspecified in OpenAPI, so discard entries that do not match this allowlist.
  media: z
    .array(z.unknown())
    .nullish()
    .transform((items) =>
      (items ?? []).flatMap((item) => {
        const parsed = publicMediaSchema.safeParse(item);
        return parsed.success ? [parsed.data] : [];
      }),
    ),
});

export const propertyListSchema = z.object({
  success: z.literal(true),
  properties: z.array(propertyCardSchema),
  pagination: z.object({
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    limit: z.number().int().positive().max(50),
    totalPages: z.number().int().nonnegative(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
  }),
});

export type WebsitePropertyCard = z.infer<typeof propertyCardSchema>;
export type WebsiteProperty = z.infer<typeof propertyDetailSchema>;
export type PropertyList = z.infer<typeof propertyListSchema>;

export const PROPERTY_LABELS: Record<string, string> = {
  FLAT: "Apartment",
  LAND: "Land",
  WAREHOUSE: "Warehouse",
  COMMERCIAL: "Commercial property",
  OTHER: "Property",
};
export const AVAILABILITY_LABELS: Record<string, string> = {
  AVAILABLE: "Available",
  UNAVAILABLE: "Unavailable",
  SOLD: "Sold",
  RENTED: "Rented",
};
export function propertyName(property: WebsitePropertyCard) {
  return (
    property.societyBuildingName ||
    PROPERTY_LABELS[property.propertyType] ||
    "Property listing"
  );
}
export function propertyAddress(property: WebsitePropertyCard) {
  return (
    [property.locationArea, property.city].filter(Boolean).join(", ") ||
    "Location on request"
  );
}
export function propertyPrice(property: WebsitePropertyCard) {
  const price = property.askingPrice;
  if (price === null || price === 0) return "Price on request";
  if (price >= 10000000) return `₹${Number((price / 10000000).toFixed(2))} Cr`;
  if (price >= 100000) return `₹${Number((price / 100000).toFixed(2))} L`;
  return `₹${price.toLocaleString("en-IN")}`;
}
export function propertyArea(value: number | null) {
  return value === null
    ? "Area on request"
    : `${value.toLocaleString("en-IN")} sq.ft`;
}
export function propertyHref(property: Pick<WebsitePropertyCard, "id">) {
  return `/buy/${encodeURIComponent(property.id)}`;
}
export function propertyEnquiryHref(property: WebsitePropertyCard) {
  const query = new URLSearchParams({
    purpose: property.pricingType === "RENT" ? "rent" : "buy",
    property: propertyName(property),
  });
  return `/contact?${query}`;
}
