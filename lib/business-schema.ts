import { OFFICE_MAP_URL } from "@/lib/office-location";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";
import { propertyServices } from "@/components/services/services-content";
import { SOCIAL_PROFILES } from "@/lib/social-profiles";
import { pageSchema } from "@/lib/page-schema";

export const BUSINESS_ID = absoluteUrl("/#organization");

/** One public business entity per page, shared by Home and Services. */
function businessEntity() {
  return {
    "@type": "RealEstateAgent",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    legalName: SITE_NAME,
    alternateName: ["Dream Key Reality", "DreamKey"],
    url: absoluteUrl("/"),
    description:
      "DreamkeyKol Reality LLP is a Kolkata real estate consultancy offering buying, rental and selling assistance, investment consulting and property documentation support through its local broker and consultant network.",
    logo: absoluteUrl("/logo2.png"),
    image: absoluteUrl("/about/officeExterior.webp"),
    telephone: "+91 79801 33881",
    email: "info@dreamkeykol.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "AA 52, st-69, AA block, Newtown",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      postalCode: "700156",
      addressCountry: "IN",
    },
    areaServed: { "@type": "City", name: "Kolkata" },
    hasMap: OFFICE_MAP_URL,
    contactPoint: ["+91 79801 33881"].map((telephone) => ({
      "@type": "ContactPoint",
      telephone,
      contactType: "customer service",
    })),
    sameAs: Object.values(SOCIAL_PROFILES),
    founder: [
      {
        "@type": "Person",
        name: "Sayan Dutta",
        sameAs: "https://www.linkedin.com/in/sayan-dutta-1763b8250/",
      },
      {
        "@type": "Person",
        name: "Mainak Maji",
        sameAs: "https://www.linkedin.com/in/mainakdreamkey/",
      },
      {
        "@type": "Person",
        name: "Siddhant Singh",
        sameAs: "https://www.linkedin.com/in/siddhant-singh-5600a2308/",
      },
    ],
  };
}

/** Public details already shown on Contact, About and marketing footers. */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...pageSchema("/")["@graph"],
      businessEntity(),
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: SITE_NAME,
        alternateName: "DreamKey",
        inLanguage: "en-IN",
        publisher: { "@id": BUSINESS_ID },
      },
    ],
  };
}

/** Describe the visible services, never the sample inventory as real Offers. */
export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...pageSchema("/services")["@graph"],
      businessEntity(),
      ...propertyServices.map((service) => ({
        "@type": "Service",
        "@id": absoluteUrl(`/services#${service.id}-service`),
        name: service.category,
        serviceType: service.category,
        description: service.description,
        url: absoluteUrl(`/services#${service.id}-title`),
        provider: { "@id": BUSINESS_ID },
        areaServed: { "@type": "City", name: "Kolkata" },
      })),
    ],
  };
}
