import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import styles from "./DesignGallery.module.css";

export type DesignGalleryItem = {
  image: string;
  alt: string;
  title: string;
  description?: string;
  href: string;
  imageAspectRatio?: number;
};

export default function DesignGalleryCard({
  image,
  alt,
  title,
  description,
  href,
  imageAspectRatio = 4 / 5,
}: DesignGalleryItem) {
  const categoryName: Record<string, string> = {
    "Apartments / Flats": "apartments_flats",
    "Independent Houses": "independent_houses",
    Villas: "villas",
    Penthouses: "penthouses",
    "Duplex Homes": "duplex_homes",
    "Studio Apartments": "studio_apartments",
    "Residential Plots": "residential_plots",
    "Commercial Properties": "commercial_properties",
  };
  const coverFactor = Math.max(1, imageAspectRatio / (4 / 5));
  const photo = (
    <Image
      src={image}
      alt={alt}
      fill
      sizes={`(max-width: 767px) calc((100vw - 40px) * ${0.85 * coverFactor}), (max-width: 1100px) calc((100vw - 72px) * ${0.42 * coverFactor}), (min-width: 1920px) ${Math.ceil(365.2 * 1.3 * coverFactor)}px, (min-width: 1480px) ${(24.727084 * coverFactor).toFixed(4)}vw, (min-width: 1440px) ${Math.ceil(366 * coverFactor)}px, calc((100vw - 112px) * ${0.275 * coverFactor})`}
      draggable={false}
      className={styles.image}
    />
  );

  return (
    <Link
      href={href}
      draggable={false}
      className={`${styles.card} ${styles.featured}${description ? ` ${styles.withDescription}` : ""}`}
      aria-label={`Explore ${title.toLowerCase()}${description ? ` — ${description}` : ""}`}
      data-analytics-event={categoryName[title] ? "cta_click" : undefined}
      data-cta-name={
        categoryName[title] ? `category_${categoryName[title]}` : undefined
      }
      data-component-name="home_gallery"
    >
      {photo}
      <div className={styles.caption}>
        <div className={styles.captionCopy}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <span className={styles.arrow} aria-hidden="true">
          <ArrowUpRight size="1.375rem" />
        </span>
      </div>
    </Link>
  );
}
