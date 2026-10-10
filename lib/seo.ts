import type { Metadata } from "next";

// The public apex domain currently redirects here. Keep canonicals and the sitemap aligned.
export const SITE_URL = "https://www.dreamkeykol.com";
export const SITE_NAME = "Dream Key Reality";

export const SEO_PAGES = {
  "/": {
    title: "Real Estate Consultants in Kolkata | Dream Key Reality",
    description:
      "Dream Key Reality connects buyers, tenants and sellers with property options and local brokers in Kolkata. Speak to our New Town real estate team.",
  },
  "/buy": {
    title: "Flats & Houses for Sale in Kolkata | Dream Key Reality",
    description:
      "Explore an illustrative selection of flats, houses and villas in Kolkata. Ask Dream Key Reality about current availability, pricing and buying assistance.",
  },
  "/rent": {
    title: "Rental Homes & Flats in Kolkata | Dream Key Reality",
    description:
      "Explore illustrative rental homes in Kolkata. Share your neighbourhood, budget and bedroom preferences with Dream Key Reality to discuss available options.",
  },
  "/sell": {
    title: "Sell Your Property in Kolkata | Dream Key Reality",
    description:
      "Talk to Dream Key Reality about selling your Kolkata property, from presentation and enquiries to viewings and the next steps.",
  },
  "/services": {
    title: "Real Estate Services in Kolkata | Dream Key Reality",
    description:
      "Buying, renting, selling and property investment consulting in Kolkata. Dream Key Reality connects your requirements with local brokers and consultants.",
  },
  "/about": {
    title: "About Our Kolkata Real Estate Team | Dream Key Reality",
    description:
      "Meet the founders of Dream Key Reality, a real estate consultancy in Kolkata helping buyers, sellers, tenants, owners and investors.",
  },
  "/contact": {
    title: "Contact Our New Town, Kolkata Team | Dream Key Reality",
    description:
      "Contact Dream Key Reality in New Town, Kolkata. Call +91 86975 59123 or send an enquiry about buying, renting, selling or property consulting.",
  },
  "/careers": {
    title: "Real Estate Careers in Kolkata | Dream Key Reality",
    description:
      "Explore the careers page at Dream Key Reality in Kolkata. Contact our team to confirm current openings and application details.",
  },
  "/privacy": {
    title: "Privacy Policy | DreamKey Reality",
    description: "Privacy Policy for DreamKey Reality website and services.",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | DreamKey Reality",
    description:
      "Terms and conditions for DreamKey Reality website and services.",
  },
  "/login": {
    title: "Login | Dream Key",
    description:
      "Log in to your Dream Key account and continue your property search in Kolkata.",
    noIndex: true,
  },
  "/register": {
    title: "Create Account | Dream Key",
    description:
      "Create your Dream Key account to begin your property search in Kolkata.",
    noIndex: true,
  },
} as const;

export type SEOPath = keyof typeof SEO_PAGES;

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata(
  path: SEOPath,
  overrides: { canonical?: string; title?: string; noIndex?: boolean } = {},
): Metadata {
  const page = SEO_PAGES[path];
  const title = overrides.title ?? page.title;
  const noIndex = overrides.noIndex ?? ("noIndex" in page && page.noIndex);
  const url = absoluteUrl(overrides.canonical ?? path);
  const images = [
    {
      url: absoluteUrl("/images/OG.webp"),
      width: 1920,
      height: 862,
      type: "image/webp",
      alt: "Dream Key Reality — Kolkata homes and property services",
    },
  ];

  return {
    title,
    description: page.description,
    alternates: { canonical: url },
    icons: { icon: path === "/" ? "/logo2.png" : "/images/pages/favicon.png" },
    openGraph: {
      title,
      description: page.description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images,
    },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
