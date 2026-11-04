import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import DirectionalFillLink from "@/components/ui/DirectionalFillLink";
import PropertyManagementReveal from "./PropertyManagementReveal";
import styles from "./Landing.module.css";

export default function PropertyManagement() {
  return (
    <PropertyManagementReveal>
      <section
        id="property-management"
        data-management-panel
        className={styles.management}
        aria-labelledby="management-heading"
      >
        <Image
          src="/images/pages/about-studio.webp"
          alt="Illustrative Kolkata property studio with a timber desk and Howrah Bridge views"
          fill
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 72px), (min-width: 1920px) 1727px, (min-width: 1480px) 89.9167vw, (min-width: 1440px) 1328px, calc(100vw - 112px)"
          className={styles.managementImage}
        />
        <div className={styles.managementScrim} aria-hidden="true" />
        <div className={styles.managementCopy} data-management-copy>
          <h2 id="management-heading" className={styles.title}>
            Property
            <br />
            <em>management</em>
          </h2>
          <p>
            From sharing property details to coordinating enquiries, our Kolkata
            team connects owners with potential buyers, tenants and local
            consultants, with documentation assistance along the way.
          </p>
          <DirectionalFillLink
            href="/contact"
            className={styles.photoButton}
            data-analytics-event="cta_click"
            data-cta-name="discuss_property"
            data-component-name="property_management"
          >
            Discuss your property{" "}
            <ArrowUpRight size="1.0625rem" aria-hidden="true" />
          </DirectionalFillLink>
        </div>
      </section>
    </PropertyManagementReveal>
  );
}
