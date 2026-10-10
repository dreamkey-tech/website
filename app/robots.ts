import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const publicPages = {
    allow: "/",
    disallow: ["/api/", "/api-proxy/", "/profile", "/settings"],
  };
  return {
    rules: [
      { userAgent: "*", ...publicPages },
      // Search visibility is separate from GPTBot's model-training purpose.
      // Specific groups must repeat restrictions; they don't inherit '*' rules.
      { userAgent: "OAI-SearchBot", ...publicPages },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
