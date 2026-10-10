import { OFFICE_MAP_URL } from "@/lib/office-location";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";
import { propertyServices } from "@/components/services/services-content";

export const BUSINESS_ID = absoluteUrl("/#organization");

/** Public details already shown on Contact, About and marketing footers. */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": BUSINESS_ID,
        name: SITE_NAME,
        url: absoluteUrl("/"),
        description:
          "Real estate consultancy in Kolkata for buying, renting, selling and property investment consulting.",
        logo: absoluteUrl("/logo2.png"),
        image: absoluteUrl("/about/officeExterior.webp"),
        telephone: "+91 86975 59123",
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
        contactPoint: [
          "+91 86975 59123",
          "+91 81003 79277",
          "+91 62914 25620",
        ].map((telephone) => ({
          "@type": "ContactPoint",
          telephone,
          contactType: "customer service",
        })),
        sameAs: [
          "https://www.instagram.com/dream_key_kolkata/",
          "https://www.youtube.com/@dream_key_kolkata",
          "https://www.facebook.com/profile.php?id=61594174244288",
          "https://www.linkedin.com/company/dreamkeykol-reality/home/",
        ],
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
      },
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
    "@graph": propertyServices.map((service) => ({
      "@type": "Service",
      "@id": absoluteUrl(`/services#${service.id}-service`),
      name: service.category,
      serviceType: service.category,
      description: service.description,
      url: absoluteUrl(`/services#${service.id}-title`),
      provider: {
        "@type": "RealEstateAgent",
        "@id": BUSINESS_ID,
        name: SITE_NAME,
        url: absoluteUrl("/"),
      },
      areaServed: { "@type": "City", name: "Kolkata" },
    })),
  };
}
