import ServiceCard from "./ServiceCard";
import { propertyServices } from "./services-content";
import interior from "@/components/pages/Interior.module.css";
import styles from "./Services.module.css";

export default function ServicesCollection() {
  return (
    <section
      className={styles.section}
      id="property-services"
      aria-labelledby="property-services-title"
    >
      <div className={styles.sectionIntro}>
        <h2 className={interior.sectionTitle} id="property-services-title">
          Different plans.
          <br />
          The same <em>personal attention.</em>
        </h2>
        <p>
          Explore buying, rental and selling assistance, real estate and
          investment consulting, and support with property documentation.
        </p>
      </div>
      <div className={styles.serviceGrid}>
        {propertyServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
