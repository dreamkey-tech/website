// Loopback-only rental catalogue fixture. No external HTTP, email or CRM writes.
const http = require("node:http");
const id = (n) => `20000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const photo =
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80";
const records = Array.from({ length: 10 }, (_, index) => ({
  id: id(index + 1),
  propertyType: index === 5 ? "COMMERCIAL" : "FLAT",
  societyBuildingName: `${index < 7 ? "Rental" : "Sale"} Fixture Residence ${index + 1}`,
  locationArea: [
    "New Town Action Area III",
    "Salt Lake Sector V",
    "EM Bypass Anandapur",
  ][index % 3],
  city: "Kolkata",
  carpetAreaSqFt: 900 + index * 100,
  superBuiltUpAreaSqFt: 1200 + index * 100,
  askingPrice: index < 7 ? 24000 + index * 6000 : 8500000 + index * 1000000,
  pricingType: index < 7 ? "RENT" : "SALE",
  bedrooms: index === 5 ? null : 2 + (index % 3),
  bathrooms: index === 5 ? null : 2,
  amenities: ["Security", "Covered parking"],
  availabilityStatus: "AVAILABLE",
  coverImage: index === 6 ? null : photo,
  previewImages: index === 6 ? [] : [photo],
  owner: { phone: "PRIVATE_OWNER_DO_NOT_RENDER" },
  internalNotes: "PRIVATE_RENTAL_CRM_NOTE",
}));
let flags = {},
  lists = [],
  details = [],
  attempts = [];
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  const send = (status, data) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };
  const verified = req.headers.cookie?.includes(
    "access_token=local-rent-verified",
  );
  let body = "";
  for await (const part of req) body += part;
  try {
    body = body ? JSON.parse(body) : {};
  } catch {
    return send(400, { success: false });
  }
  if (url.pathname === "/__mock/reset") {
    flags = body;
    lists = [];
    details = [];
    attempts = [];
    return send(200, { success: true });
  }
  if (url.pathname === "/__mock/flags") {
    flags = { ...flags, ...body };
    return send(200, { success: true });
  }
  if (url.pathname === "/__mock/state")
    return send(200, { flags, lists, details, attempts });
  if (url.pathname === "/api/auth/get-session") return send(200, null);
  if (url.pathname === "/v1/user/auth/me")
    return verified
      ? send(200, {
          user: {
            id: "local-rent-user",
            name: "Fixture Resident",
            email: "fixture@example.com",
            emailVerified: true,
          },
        })
      : send(401, { message: "Login required" });
  const base = "/v1/website/properties/list";
  if (url.pathname === base) {
    lists.push({
      query: Object.fromEntries(url.searchParams),
      cookie: req.headers.cookie || null,
    });
    if (flags.listFailure) return send(503, { success: false });
    let found = records.filter(
      (record) =>
        flags.ignorePricingType ||
        !url.searchParams.get("pricingType") ||
        record.pricingType === url.searchParams.get("pricingType"),
    );
    for (const field of ["city", "locationArea", "propertyType"]) {
      const value = url.searchParams.get(field)?.toLowerCase();
      if (value)
        found = found.filter((record) =>
          record[field]?.toLowerCase().includes(value),
        );
    }
    const search = url.searchParams.get("search")?.toLowerCase();
    if (search)
      found = found.filter((record) =>
        `${record.societyBuildingName} ${record.locationArea}`
          .toLowerCase()
          .includes(search),
      );
    const bedrooms = url.searchParams.get("bedrooms");
    if (bedrooms)
      found = found.filter(
        (record) =>
          record.bedrooms !== null &&
          (bedrooms.endsWith("+")
            ? record.bedrooms >= Number(bedrooms.slice(0, -1))
            : record.bedrooms === Number(bedrooms)),
      );
    if (url.searchParams.has("minPrice"))
      found = found.filter(
        (record) =>
          record.askingPrice >= Number(url.searchParams.get("minPrice")),
      );
    if (url.searchParams.has("maxPrice"))
      found = found.filter(
        (record) =>
          record.askingPrice <= Number(url.searchParams.get("maxPrice")),
      );
    const key = url.searchParams.get("sortBy");
    if (["askingPrice", "carpetAreaSqFt"].includes(key))
      found.sort(
        (a, b) =>
          (a[key] - b[key]) *
          (url.searchParams.get("sortOrder") === "asc" ? 1 : -1),
      );
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
    const limit = Math.min(50, Number(url.searchParams.get("limit")) || 6);
    const total = found.length,
      totalPages = Math.ceil(total / limit);
    return send(200, {
      success: true,
      properties: found.slice((page - 1) * limit, page * limit),
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  }
  if (url.pathname.startsWith(`${base}/`)) {
    const propertyId = url.pathname.slice(base.length + 1).split("/")[0];
    if (url.pathname.endsWith("/click")) {
      attempts.push({ propertyId, authenticated: Boolean(verified) });
      return verified
        ? send(201, { success: true })
        : send(401, { message: "Login required" });
    }
    details.push({ propertyId, authenticated: Boolean(verified) });
    if (!verified) return send(401, { message: "Login required" });
    const property = records.find((record) => record.id === propertyId);
    if (!property) return send(404, { message: "Property not found" });
    return send(200, {
      success: true,
      property: {
        ...property,
        floorNumber: 3,
        totalFloors: 12,
        builderName: "Fixture Builder",
        media: [],
      },
    });
  }
  return send(404, { message: "Fixture route not found" });
});
server.listen(4189, "127.0.0.1", () =>
  console.log("Rental fixture ready on 127.0.0.1:4189; no outbound HTTP"),
);
