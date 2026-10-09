import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bed, CornersOut } from "@phosphor-icons/react/dist/ssr";
import type { RentalHome } from "./rental-data";
import styles from "./Interior.module.css";

export default function RentalCard({ home }: { home: RentalHome }) {
  const href = `/contact?purpose=rent&property=${encodeURIComponent(`${home.bedrooms} BHK in ${home.location}, ${home.area}`)}`;
  return (
    <article className={styles.rentalCard}>
      <Link
        href={href}
        className={styles.rentalCardPhoto}
        aria-label={`Ask about ${home.bedrooms} BHK rentals in ${home.location}`}
      >
        <Image
          src={home.image}
          alt={home.imageAlt}
          fill
          sizes="(max-width: 520px) 100vw, (max-width: 1440px) 50vw, 650px"
        />
        <span className={styles.cardArrow}>
          <ArrowUpRight size={19} aria-hidden="true" />
        </span>
      </Link>
      <p className={styles.cardLocation}>
        {home.location} · {home.area}
      </p>
      <div className={styles.cardTitleRow}>
        <h3>
          <Link href={href}>{home.title}</Link>
        </h3>
        <p className={styles.cardPrice}>
          ₹{home.rent.toLocaleString("en-IN")}
          <span> / mo</span>
        </p>
      </div>
      <div className={styles.cardSpecs}>
        <span>
          <Bed size={16} aria-hidden="true" />
          {home.bedrooms} bedrooms
        </span>
        <span>
          <CornersOut size={16} aria-hidden="true" />
          {home.sqft.toLocaleString("en-IN")} sq ft
        </span>
        <span>{home.furnishing}</span>
      </div>
    </article>
  );
}
