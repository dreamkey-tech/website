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
          sizes="(max-width: 767px) calc(100vw - 40px), (min-width: 1440px) 1328px, calc(100vw - 112px)"
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
            Your property, thoughtfully looked after. From showcasing your home
            to coordinating enquiries and connecting with tenants, our Kolkata
            team helps you take the next step.
          </p>
          <DirectionalFillLink href="/contact" className={styles.photoButton}>
            Discuss your property <ArrowUpRight size={17} aria-hidden="true" />
          </DirectionalFillLink>
        </div>
      </section>
    </PropertyManagementReveal>
  );
}
