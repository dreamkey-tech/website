// Loopback-only browser/SSR contract fixture. Does not forward HTTP or send email.
const http = require("node:http");
const id = (n) => `10000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const photos = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
];
const records = Array.from({ length: 8 }, (_, i) => ({
  id: id(i + 1),
  propertyType: i === 2 ? "COMMERCIAL" : "FLAT",
  societyBuildingName: `Test ${i === 2 ? "Commercial Suite" : "Riverside Residence"} ${i + 1}`,
  locationArea: i % 2 ? "Rajarhat Main Road" : "New Town Action Area II",
  city: "Kolkata",
  carpetAreaSqFt: 1100 + i * 100,
  superBuiltUpAreaSqFt: 1450 + i * 100,
  askingPrice: 7500000 + i * 1500000,
  pricingType: i === 7 ? "RENT" : "SALE",
  bedrooms: i === 2 ? null : 2 + (i % 3),
  bathrooms: 2,
  amenities: ["Covered Parking", "Clubhouse", "Security"],
  availabilityStatus: "AVAILABLE",
  coverImage: photos[i % photos.length],
  previewImages: photos.slice(0, 2),
}));
let flags = {},
  clicks = [],
  attempts = [],
  lists = [],
  details = [];
const user = {
  id: "local-customer",
  name: "Test Resident",
  email: "resident@example.com",
  emailVerified: true,
};
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  const route = url.pathname;
  const verified =
    req.headers.cookie?.includes("access_token=local-property-verified") ||
    req.headers.cookie?.includes(
      "better-auth.session_token=local-property-oauth",
    );
  const send = (status, data) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };
  const clear = () =>
    res.setHeader("Set-Cookie", [
      "access_token=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0",
      "better-auth.session_token=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0",
    ]);
  if (route === "/__mock/state")
    return send(200, { clicks, attempts, lists, details, flags });
  let raw = "";
  for await (const c of req) raw += c;
  let body;
  try {
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return send(400, { message: "Invalid JSON" });
  }
  if (route === "/__mock/reset") {
    flags = body;
    clicks = [];
    attempts = [];
    lists = [];
    details = [];
    return send(200, { success: true });
  }
  if (route === "/__mock/flags") {
    flags = { ...flags, ...body };
    return send(200, { success: true });
  }
  if (route === "/api/auth/get-session") return send(200, null);
  if (route === "/v1/user/auth/me")
    return verified
      ? send(200, { user })
      : send(401, { message: "Login required" });
  if (route === "/v1/user/auth/login")
    return send(200, {
      success: true,
      requiresOtp: true,
      email: body.email,
      message: "A verification code has been sent to your email.",
    });
  if (route === "/v1/user/auth/register") {
    res.setHeader(
      "Set-Cookie",
      "access_token=local-provisional; HttpOnly; Path=/; SameSite=Lax",
    );
    return send(201, { user: { ...user, emailVerified: false } });
  }
  if (
    route === "/v1/user/auth/resend-otp" ||
    route === "/v1/user/auth/forgot-password"
  )
    return send(200, { message: "Check your email for a new 4-digit code." });
  if (route === "/v1/user/auth/verify-login-otp") {
    if (body.otp !== "0123")
      return send(400, { message: "Invalid or expired OTP" });
    res.setHeader(
      "Set-Cookie",
      "access_token=local-property-verified; HttpOnly; Path=/; SameSite=Lax",
    );
    return send(200, { success: true, user });
  }
  if (route === "/v1/user/auth/logout" || route === "/api/auth/sign-out") {
    clear();
    return send(200, { message: "Signed out" });
  }
  const base = "/v1/website/properties/list";
  if (route === base) {
    lists.push(Object.fromEntries(url.searchParams));
    if (flags.listFailure)
      return send(503, { success: false, message: "Temporary fixture outage" });
    let found = records.filter(
      (x) =>
        x.pricingType ===
        (url.searchParams.get("pricingType") || x.pricingType),
    );
    for (const field of ["city", "locationArea", "propertyType"])
      if (url.searchParams.get(field))
        found = found.filter((x) =>
          x[field]
            ?.toLowerCase()
            .includes(url.searchParams.get(field).toLowerCase()),
        );
    if (url.searchParams.get("search"))
      found = found.filter((x) =>
        `${x.societyBuildingName} ${x.locationArea} ${x.city}`
          .toLowerCase()
          .includes(url.searchParams.get("search").toLowerCase()),
      );
    const beds = url.searchParams.get("bedrooms");
    if (beds)
      found = found.filter(
        (x) =>
          x.bedrooms !== null &&
          (beds.endsWith("+")
            ? x.bedrooms >= Number(beds.slice(0, -1))
            : x.bedrooms === Number(beds)),
      );
    if (url.searchParams.has("minPrice"))
      found = found.filter(
        (x) => x.askingPrice >= Number(url.searchParams.get("minPrice")),
      );
    if (url.searchParams.has("maxPrice"))
      found = found.filter(
        (x) => x.askingPrice <= Number(url.searchParams.get("maxPrice")),
      );
    const key = url.searchParams.get("sortBy");
    if (["askingPrice", "carpetAreaSqFt"].includes(key))
      found.sort(
        (a, b) =>
          (a[key] - b[key]) *
          (url.searchParams.get("sortOrder") === "asc" ? 1 : -1),
      );
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1),
      limit = Math.min(50, Number(url.searchParams.get("limit")) || 12),
      total = found.length,
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
  if (route.startsWith(base + "/")) {
    const propertyId = route.slice(base.length + 1).split("/")[0];
    const property = records.find((x) => x.id === propertyId);
    if (route.endsWith("/click")) {
      attempts.push({ propertyId, authenticated: Boolean(verified) });
      if (!verified || flags.clickFailure === 401)
        return send(401, { message: "Website login required" });
      if (flags.clickFailure) return send(503, { success: false });
      if (!property) return send(404, { message: "Property not found" });
      clicks.push(propertyId);
      return send(201, {
        success: true,
        message: "Property click recorded successfully",
      });
    }
    details.push({ propertyId, authenticated: Boolean(verified) });
    if (!verified) return send(401, { message: "Website login required" });
    if (!property) return send(404, { message: "Property not found" });
    if (flags.detailFailure) return send(503, { success: false });
    return send(200, {
      success: true,
      property: {
        ...property,
        pincode: "700156",
        floorNumber: 0,
        totalFloors: 20,
        balconies: 2,
        builderName: "Test Builder",
        yearOfConstruction: 2024,
        totalUnits: 120,
        availabilityDate: null,
        media: [
          ...photos.map((url, i) => ({
            url,
            category: "PHOTOGRAPH",
            mimeType: "image/jpeg",
            order: i,
            isCover: i === 0,
            title: `Room ${i + 1}`,
          })),
          {
            url: "https://example.com/public-floor-plan.pdf",
            category: "FLOOR_PLAN",
            mimeType: "application/pdf",
            title: "Floor plan",
          },
          {
            url: "https://example.com/CRM_PRIVATE_BROCHURE.pdf",
            category: "BROCHURE",
            mimeType: "application/pdf",
          },
        ],
        internalNotes: "CRM_INTERNAL_DO_NOT_RENDER",
        owner: { phone: "PRIVATE_OWNER_PHONE" },
        privatePdfs: ["PRIVATE_PDF_DO_NOT_RENDER"],
      },
    });
  }
  send(404, { message: "Fixture route not found" });
});
server.listen(4188, "127.0.0.1", () =>
  console.log(
    "Local property/auth fixture ready on 127.0.0.1:4188; no outbound HTTP",
  ),
);
