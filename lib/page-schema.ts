import { absoluteUrl, SEO_PAGES, type SEOPath } from "@/lib/seo";

type PublicSEOPath = Exclude<
  SEOPath,
  "/login" | "/register" | "/forgot-password"
>;

const pageNames: Record<PublicSEOPath, string> = {
  "/": "Home",
  "/buy": "Buy property",
  "/rent": "Rental assistance",
  "/sell": "Sell property",
  "/services": "Real estate services",
  "/about": "About Dreamkey",
  "/contact": "Contact Dreamkey",
  "/careers": "Careers enquiries",
  "/privacy": "Privacy policy",
  "/terms-and-conditions": "Terms and conditions",
};

/** Public page identity only; never add account data, search text or gated inventory. */
export function pageSchema(path: PublicSEOPath, pageNumber = 1) {
  const paginated =
    path === "/buy" && Number.isSafeInteger(pageNumber) && pageNumber > 1;
  const url = absoluteUrl(paginated ? `/buy?page=${pageNumber}` : path);
  const page = SEO_PAGES[path];
  const type =
    path === "/about"
      ? "AboutPage"
      : path === "/contact"
        ? "ContactPage"
        : ["/buy", "/rent", "/services"].includes(path)
          ? "CollectionPage"
          : "WebPage";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": absoluteUrl("/#website") },
        about: { "@id": absoluteUrl("/#organization") },
        ...(path !== "/" && { breadcrumb: { "@id": `${url}#breadcrumb` } }),
      },
      ...(path === "/"
        ? []
        : [
            {
              "@type": "BreadcrumbList",
              "@id": `${url}#breadcrumb`,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: absoluteUrl("/"),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: pageNames[path],
                  item: url,
                },
              ],
            },
          ]),
    ],
  };
}
