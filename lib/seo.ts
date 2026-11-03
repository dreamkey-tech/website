import type { Metadata } from "next";

// The public apex domain currently redirects here. Keep canonicals and the sitemap aligned.
export const SITE_URL = "https://www.dreamkeykol.com";
export const SITE_NAME = "DreamkeyKol Reality LLP";

export const SEO_PAGES = {
  "/": {
    title: "Real Estate Consultancy in Kolkata | DreamkeyKol Reality",
    description:
      "Buy, rent or sell property in Kolkata with DreamkeyKol Reality. Explore suitable options, local broker connections and property documentation assistance.",
  },
  "/buy": {
    title: "Buy Flats in Kolkata | DreamkeyKol Reality",
    description:
      "Explore flats and properties for sale in Kolkata with DreamkeyKol Reality. Share your location, budget and priorities for buying assistance through our local network.",
  },
  "/rent": {
    title: "Flats for Rent in Kolkata | DreamkeyKol Reality",
    description:
      "Explore sample rental homes in Kolkata, then share your preferred area, budget and requirements with DreamkeyKol Reality to discuss current rental options.",
  },
  "/sell": {
    title: "Sell Property in Kolkata | DreamkeyKol Reality",
    description:
      "Planning to sell property in Kolkata? DreamkeyKol Reality connects your property information with potential buyers, local brokers and property consultants.",
  },
  "/services": {
    title: "Real Estate Services in Kolkata | DreamkeyKol Reality",
    description:
      "Discover property buying, rental and selling assistance, real estate investment consulting and documentation support in Kolkata with DreamkeyKol Reality.",
  },
  "/about": {
    title: "About DreamkeyKol Reality | Kolkata Property Consultants",
    description:
      "Meet DreamkeyKol Reality LLP, a Kolkata real estate consultancy connecting buyers, tenants, owners and investors with local brokers and property consultants.",
  },
  "/contact": {
    title: "Contact DreamkeyKol Reality | Property Consultant Kolkata",
    description:
      "Contact DreamkeyKol Reality in New Town, Kolkata for buying, renting, selling or property consulting. Call +91 79801 33881 or share your requirements online.",
  },
  "/careers": {
    title: "Real Estate Careers Enquiries | DreamkeyKol Reality",
    description:
      "Interested in real estate work in Kolkata? Contact DreamkeyKol Reality to discuss property consulting, sales or marketing roles and confirm current openings.",
  },
  "/privacy": {
    title: "Privacy Policy | DreamkeyKol Reality LLP",
    description:
      "Read how the Dreamkey website handles personal information, enquiries, cookies and optional analytics, and how to manage your privacy preferences.",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | DreamkeyKol Reality LLP",
    description:
      "Read the terms for using the Dreamkey website, including property information, enquiries, third-party services and responsibilities when exploring a transaction.",
  },
  "/login": {
    title: "Log In | DreamkeyKol Reality",
    description:
      "Log in to your Dream Key account and continue your property search in Kolkata.",
    noIndex: true,
  },
  "/register": {
    title: "Create Account | DreamkeyKol Reality",
    description:
      "Create your Dream Key account to begin your property search in Kolkata.",
    noIndex: true,
  },
  "/forgot-password": {
    title: "Reset Password | DreamkeyKol Reality",
    description:
      "Reset your Dream Key account password with an email verification code.",
    noIndex: true,
  },
} as const;

export type SEOPath = keyof typeof SEO_PAGES;

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata(
  path: SEOPath,
  overrides: {
    canonical?: string;
    title?: string;
    description?: string;
    noIndex?: boolean;
  } = {},
): Metadata {
  const page = SEO_PAGES[path];
  const title = overrides.title ?? page.title;
  const description = overrides.description ?? page.description;
  const noIndex = overrides.noIndex ?? ("noIndex" in page && page.noIndex);
  const url = absoluteUrl(overrides.canonical ?? path);
  const images = [
    {
      url: absoluteUrl("/images/OG.webp"),
      width: 1920,
      height: 862,
      type: "image/webp",
      alt: "DreamkeyKol Reality LLP — real estate consultancy in Kolkata",
    },
  ];

  return {
    title,
    description,
    alternates: { canonical: url },
    icons: { icon: path === "/" ? "/logo2.png" : "/images/pages/favicon.png" },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
