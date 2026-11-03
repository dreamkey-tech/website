import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getBestProperties } from "@/lib/website-properties.server";
import PropertyAccessProvider from "@/components/property/PropertyAccessProvider";
import HomePropertyCard from "./HomePropertyCard";
import styles from "./Landing.module.css";

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
        A few places to begin. Explore our featured properties.
      </p>
      <Suspense fallback={<FeaturedPropertiesLoading />}>
        <FeaturedProperties />
      </Suspense>
      <Link href="/buy" className={styles.collectionLink}>
        View all properties <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}

async function FeaturedProperties() {
  const result = await getBestProperties();
  if (result.kind === "error") {
    return (
      <p className={styles.inventoryNote} role="status">
        Featured properties are temporarily unavailable. Browse all properties
        or check back shortly.
      </p>
    );
  }
  if (!result.properties.length) {
    return (
      <p className={styles.inventoryNote}>
        We’re updating our featured selection. Explore all properties below.
      </p>
    );
  }
  return (
    <PropertyAccessProvider>
      <div
        className={styles.propertiesGrid}
        data-count={result.properties.length}
      >
        {result.properties.map((property) => (
          <HomePropertyCard key={property.id} property={property} />
        ))}
      </div>
    </PropertyAccessProvider>
  );
}

function FeaturedPropertiesLoading() {
  return (
    <div aria-busy="true">
      <p className={styles.inventoryNote} role="status">
        Loading featured properties…
      </p>
      <div className={styles.propertiesGrid} aria-hidden="true">
        {[0, 1, 2].map((index) => (
          <div key={index} className={styles.propertyCard}>
            <div className={styles.propertyPhoto} />
            <div className={styles.propertySkeletonLine} />
            <div className={styles.propertySkeletonLine} />
            <div className={styles.propertySkeletonLine} />
          </div>
        ))}
      </div>
    </div>
  );
}
