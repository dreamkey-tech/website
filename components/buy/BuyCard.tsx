import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bed, CornersOut } from "@phosphor-icons/react/dist/ssr";
import { STATUSES, buyEnquiryHref, type BuyHome } from "./buy-data";
import styles from "./Buy.module.css";

export default function BuyCard({ home }: { home: BuyHome }) {
  const href = buyEnquiryHref(home);
  return (
    <article className={styles.card}>
      <Link
        className={styles.cardPhoto}
        href={href}
        aria-label={`Enquire about ${home.title}`}
      >
        <Image
          src={home.image}
          alt={home.imageAlt}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1440px) 37vw, 510px"
        />
        <span className={styles.cardArrow}>
          <ArrowRight size={20} aria-hidden="true" />
        </span>
      </Link>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <p>{home.location}</p>
          <span>{STATUSES.find(([value]) => value === home.status)?.[1]}</span>
        </div>
        <h3>
          <Link href={href}>{home.title}</Link>
        </h3>
        <p className={styles.description}>{home.description}</p>
        <div className={styles.specs}>
          <span>
            <Bed size={17} aria-hidden="true" />
            {home.bhk}
          </span>
          <span>
            <CornersOut size={17} aria-hidden="true" />
            {home.size}
          </span>
        </div>
        <p className={styles.amenityText}>{home.amenitiesText}</p>
        <div className={styles.cardBottom}>
          <p className={styles.price}>
            <span>Indicative price</span>
            {home.price}
            <small> onwards</small>
          </p>
          <Link className={styles.enquire} href={href}>
            {home.status === "waitlist" ? "Ask our team" : "Enquire"}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
