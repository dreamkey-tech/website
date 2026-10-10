import type { MetadataRoute } from "next";
import { absoluteUrl, SEO_PAGES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(SEO_PAGES)
    .filter(([, page]) => !("noIndex" in page && page.noIndex))
    .map(([path]) => ({ url: absoluteUrl(path) }));
  // Add CMS modification dates when available; build times are not content updates.
}
