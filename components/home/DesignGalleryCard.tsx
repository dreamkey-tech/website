import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import styles from "./DesignGallery.module.css";

export type DesignGalleryItem = {
  image: string;
  alt: string;
  title: string;
  href: string;
};

export default function DesignGalleryCard({ image, alt, title, href }: DesignGalleryItem) {
  const photo = (
    <Image
      src={image}
      alt={alt}
      fill
      sizes="(max-width: 767px) calc(100vw - 40px), (min-width: 1440px) 317px, calc((100vw - 172px) / 4)"
      className={styles.image}
    />
  );

  return (
    <Link href={href} className={`${styles.card} ${styles.featured}`} aria-label={`Explore ${title.toLowerCase()}`}>
      {photo}
      <div className={styles.caption}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.arrow} aria-hidden="true"><ArrowUpRight size={22} /></span>
      </div>
    </Link>
  );
}
