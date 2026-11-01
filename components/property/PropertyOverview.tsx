import {
  Bathtub,
  Bed,
  Buildings,
  CornersOut,
} from "@phosphor-icons/react/dist/ssr";
import type { PropertyDetails } from "./property-data";
import styles from "./Property.module.css";

export default function PropertyOverview({
  property,
}: {
  property: PropertyDetails;
}) {
  const { home } = property;
  const facts = [
    { Icon: Bed, value: home.bhk.replace(" BHK", ""), label: "Bedrooms" },
    {
      Icon: Bathtub,
      value: property.bathrooms ?? "On request",
      label: "Bathrooms",
    },
    { Icon: CornersOut, value: home.size, label: "Listed area range*" },
    { Icon: Buildings, value: property.type, label: "Property type" },
  ];
  return (
    <section
      id="overview"
      className={styles.section}
      aria-labelledby="overview-title"
    >
      <div className={styles.quickFacts}>
        {facts.map(({ Icon, value, label }) => (
          <div key={label}>
            <Icon size={25} weight="light" aria-hidden="true" />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className={styles.areaNote}>
        *Area basis and unit-specific measurements are to be confirmed.
      </p>
      <h2 id="overview-title">
        A closer look <em>at home.</em>
      </h2>
      <p className={styles.description}>{property.description}</p>
      <p className={styles.muted}>
        This is an illustrative listing. Ask us for the available unit, actual
        photographs and specifications before planning your visit.
      </p>
    </section>
  );
}
