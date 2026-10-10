import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import styles from "./DesignGallery.module.css";

export type DesignGalleryItem = {
  image: string;
  alt: string;
  title: string;
  href: string;
  imageAspectRatio?: number;
};

export default function DesignGalleryCard({
  image,
  alt,
  title,
  href,
  imageAspectRatio = 4 / 5,
}: DesignGalleryItem) {
  const coverFactor = Math.max(1, imageAspectRatio / (4 / 5));
  const photo = (
    <Image
      src={image}
      alt={alt}
      fill
      sizes={`(max-width: 767px) calc((100vw - 40px) * ${0.85 * coverFactor}), (max-width: 1100px) calc((100vw - 72px) * ${0.42 * coverFactor}), (min-width: 1440px) ${Math.ceil(366 * coverFactor)}px, calc((100vw - 112px) * ${0.275 * coverFactor})`}
      draggable={false}
      className={styles.image}
    />
  );

  return (
    <Link
      href={href}
      draggable={false}
      className={`${styles.card} ${styles.featured}`}
      aria-label={`Explore ${title.toLowerCase()}`}
    >
      {photo}
      <div className={styles.caption}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.arrow} aria-hidden="true">
          <ArrowUpRight size={22} />
        </span>
      </div>
    </Link>
  );
}
