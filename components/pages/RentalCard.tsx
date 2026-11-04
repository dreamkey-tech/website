import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bed, CornersOut } from "@phosphor-icons/react/dist/ssr";
import type { RentalHome } from "./rental-data";
import styles from "./Interior.module.css";

export default function RentalCard({ home }: { home: RentalHome }) {
  const href = `/contact?purpose=rent&property=${encodeURIComponent(`${home.bedrooms} BHK in ${home.location}, ${home.area}`)}`;
  const analytics = {
    "data-property-id": `sample-rent-${home.id}`,
    "data-property-type": "apartment",
    "data-transaction-type": "rent",
    "data-inventory-source": "sample",
    "data-list-name": "rent_catalogue",
    "data-component-name": "property_card",
  };
  return (
    <article
      className={styles.rentalCard}
      {...analytics}
      data-analytics-impression="list"
    >
      <Link
        href={href}
        className={styles.rentalCardPhoto}
        aria-label={`Ask about ${home.bedrooms} BHK rentals in ${home.location}`}
        {...analytics}
        data-analytics-event="property_enquiry_click"
      >
        <Image
          src={home.image}
          alt={home.imageAlt}
          fill
          sizes="(max-width: 520px) 100vw, (max-width: 1479px) 50vw, (max-width: 1919px) 44vw, 845px"
        />
        <span className={styles.cardArrow}>
          <ArrowUpRight size="1.1875rem" aria-hidden="true" />
        </span>
      </Link>
      <p className={styles.cardLocation}>
        {home.location} · {home.area}
      </p>
      <div className={styles.cardTitleRow}>
        <h3>
          <Link
            href={href}
            {...analytics}
            data-analytics-event="property_enquiry_click"
          >
            {home.title}
          </Link>
        </h3>
        <p className={styles.cardPrice}>
          ₹{home.rent.toLocaleString("en-IN")}
          <span> / mo</span>
        </p>
      </div>
      <div className={styles.cardSpecs}>
        <span>
          <Bed size="1rem" aria-hidden="true" />
          {home.bedrooms} bedrooms
        </span>
        <span>
          <CornersOut size="1rem" aria-hidden="true" />
          {home.sqft.toLocaleString("en-IN")} sq ft
        </span>
        <span>{home.furnishing}</span>
      </div>
    </article>
  );
}
