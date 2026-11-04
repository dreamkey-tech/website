import Link from "next/link";
import { ArrowUpRight, Check, FileText } from "@phosphor-icons/react/dist/ssr";
import { buyEnquiryHref } from "@/components/buy/buy-data";
import type { PropertyDetails } from "./property-data";
import styles from "./Property.module.css";

export default function PropertySpecifications({
  property,
}: {
  property: PropertyDetails;
}) {
  const { home } = property;
  const facts: [string, string | number | null][] = [
    ["Configuration", home.bhk],
    ["Possession status", property.status],
    ["Listed area", home.size],
    ["Area basis", property.areaBasis],
    [
      "Carpet area",
      property.carpetSqft
        ? `${property.carpetSqft.toLocaleString("en-IN")} sq.ft`
        : null,
    ],
    ["Bathrooms", property.bathrooms],
    ["Balconies", property.balconies],
    ["Floor / total floors", property.floor],
    ["Furnishing", property.furnishing],
    ["Facing", property.facing],
    ["Parking", property.parking],
    ["Ownership", property.ownership],
    ["Possession date", property.possessionDate],
    ["Property reference", `DK-${String(home.id).padStart(3, "0")}`],
  ];
  return (
    <>
      <section
        id="details"
        className={styles.section}
        aria-labelledby="details-title"
      >
        <h2 id="details-title">The details that matter.</h2>
        <p className={styles.muted}>
          A useful starting point. Unit-specific details are confirmed on
          enquiry.
        </p>
        <dl className={styles.detailGrid}>
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd data-unconfirmed={value === null || undefined}>
                {value ?? "Confirm with our team"}
              </dd>
            </div>
          ))}
        </dl>
        <div className={styles.documentCallout}>
          <FileText size="1.8125rem" weight="light" aria-hidden="true" />
          <div>
            <h3>Find your fit, room by room.</h3>
            <p>
              Ask for the available unit’s floor plan, carpet area and price
              breakdown.
            </p>
            <Link href={buyEnquiryHref(home)}>
              Request floor plan
              <ArrowUpRight size="1rem" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section
        id="amenities"
        className={styles.section}
        aria-labelledby="amenities-title"
      >
        <h2 id="amenities-title">
          A little more to <em>come home to.</em>
        </h2>
        <p className={styles.muted}>
          Features shown in this illustrative collection. Confirm inclusions for
          the unit you choose.
        </p>
        <ul className={styles.amenities}>
          {property.highlights.map((item) => (
            <li key={item}>
              <Check size="1.125rem" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section} aria-labelledby="costs-title">
        <h2 id="costs-title">Know what’s included.</h2>
        <p className={styles.description}>
          The listed {home.price} onwards is an indicative starting price. The
          final amount depends on the unit and inclusions.
        </p>
        <p className={styles.muted}>
          Ask for a written breakdown of parking, maintenance, floor-rise or
          club charges, brokerage, and applicable taxes and registration costs.
          These amounts are not provided in this collection.
        </p>
      </section>
    </>
  );
}
