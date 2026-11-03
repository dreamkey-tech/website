import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bed, ArrowsOut } from "@phosphor-icons/react/dist/ssr";
import { buyEnquiryHref, type BuyHome } from "@/components/buy/buy-data";
import styles from "./Landing.module.css";

export default function HomePropertyCard({ home }: { home: BuyHome }) {
  const href = buyEnquiryHref(home);
  const analytics = {
    "data-property-id": `sample-buy-${home.id}`,
    "data-property-type": ["apartment", "villa", "penthouse", "studio"].includes(
      home.type,
    )
      ? home.type
      : "OTHER",
    "data-transaction-type": "buy",
    "data-inventory-source": "sample",
    "data-list-name": "home_featured",
    "data-component-name": "property_card",
  };
  return (
    <article
      className={styles.propertyCard}
      {...analytics}
      data-analytics-impression="list"
    >
      <Link
        href={href}
        className={styles.propertyPhoto}
        aria-label={`Enquire about ${home.title}`}
        {...analytics}
        data-analytics-event="property_enquiry_click"
      >
        <Image
          src={home.image}
          alt={home.imageAlt}
          fill
          sizes="(max-width: 767px) calc(100vw - 40px), (min-width: 1440px) 590px, 44vw"
        />
        <span className={styles.propertyArrow} aria-hidden="true">
          <ArrowRight size={21} />
        </span>
      </Link>
      <div className={styles.propertyInfo}>
        <p className={styles.propertyLocation}>{home.location}</p>
        <div className={styles.propertyTitleRow}>
          <h3>
            <Link
              href={href}
              {...analytics}
              data-analytics-event="property_enquiry_click"
            >
              {home.title}
            </Link>
          </h3>
          <p className={styles.propertyPrice}>
            {home.price}
            <span>onwards</span>
          </p>
        </div>
        <p className={styles.propertyDescription}>{home.description}</p>
        <div className={styles.propertySpecs}>
          <span>
            <Bed size={15} aria-hidden="true" />
            {home.bhk}
          </span>
          <span>
            <ArrowsOut size={15} aria-hidden="true" />
            {home.size}
          </span>
        </div>
      </div>
    </article>
  );
}
