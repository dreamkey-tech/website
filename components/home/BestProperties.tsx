import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { BUY_HOMES } from "@/components/buy/buy-data";
import HomePropertyCard from "./HomePropertyCard";
import styles from "./Landing.module.css";

const featuredIds = [2, 8, 1];

export default function BestProperties() {
  return (
    <section
      id="properties"
      className={styles.properties}
      aria-labelledby="best-properties-heading"
    >
      <h2 id="best-properties-heading" className={styles.title}>
        Best <em>properties</em>
      </h2>
      <p className={styles.sectionIntro}>
        A few places to begin. Explore our illustrative collection of Kolkata
        homes.
      </p>
      <div className={styles.propertiesGrid}>
        {featuredIds.map((id) => {
          const home = BUY_HOMES.find((item) => item.id === id)!;
          return <HomePropertyCard key={id} home={home} />;
        })}
      </div>
      <Link href="/buy" className={styles.collectionLink}>
        View all properties <ArrowRight size={18} aria-hidden="true" />
      </Link>
      <p className={styles.inventoryNote}>
        Images and listings are illustrative. Please confirm current pricing and
        availability with our team.
      </p>
    </section>
  );
}
