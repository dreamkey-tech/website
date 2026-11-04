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
        A few places to begin. Explore featured properties in Kolkata.
      </p>
      <Suspense fallback={<FeaturedPropertiesLoading />}>
        <FeaturedProperties />
      </Suspense>
      <Link href="/buy" className={styles.collectionLink}>
        View all properties <ArrowRight size="1.125rem" aria-hidden="true" />
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
        {result.properties.map((property, index) => (
          <HomePropertyCard
            key={property.id}
            property={property}
            imageSizes={featuredImageSizes(index, result.properties.length)}
          />
        ))}
      </div>
    </PropertyAccessProvider>
  );
}

function featuredImageSizes(index: number, count: number) {
  const fraction =
    count === 1
      ? 1
      : count === 2
        ? (index === 0 ? 1.55 : 1) / 2.55
        : (index === 0 ? 1.55 : 1) / 3.55;
  const desktopWidth =
    count === 1 ? 600 : (1328 - (count === 2 ? 22 : 44)) * fraction;
  const tabletFraction = count === 2 ? fraction : (index === 0 ? 1.3 : 1) / 3.3;
  const tabletGap = count === 2 ? 90 : 108;
  const mediumWidth =
    count === 1
      ? "min(600px, calc(100vw - 72px))"
      : index === 0 || count === 2
        ? "calc(100vw - 72px)"
        : "calc((100vw - 94px) * 0.5)";
  const desktopGap = count === 2 ? 134 : 156;

  return [
    `(max-width: 767px) ${count === 1 ? "min(600px, calc(100vw - 40px))" : "calc(100vw - 40px)"}`,
    `(max-width: 900px) ${mediumWidth}`,
    `(max-width: 1100px) ${count === 1 ? "min(600px, calc(100vw - 72px))" : `calc((100vw - ${tabletGap}px) * ${tabletFraction.toFixed(6)})`}`,
    `(min-width: 1920px) ${Math.ceil(desktopWidth * 1.3)}px`,
    `(min-width: 1480px) ${((desktopWidth * 1.083333) / 16).toFixed(4)}vw`,
    `(min-width: 1440px) ${Math.ceil(desktopWidth)}px`,
    count === 1
      ? "600px"
      : `calc((100vw - ${desktopGap}px) * ${fraction.toFixed(6)})`,
  ].join(", ");
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
