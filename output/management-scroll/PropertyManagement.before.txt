import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import styles from "./Landing.module.css";

export default function PropertyManagement() {
  return (
    <section
      id="property-management"
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
      <div className={styles.managementCopy}>
        <h2 id="management-heading" className={styles.title}>
          Property
          <br />
          <em>management</em>
        </h2>
        <p>
          Your property, thoughtfully looked after. From showcasing your home to
          coordinating enquiries and connecting with tenants, our Kolkata team
          helps you take the next step.
        </p>
        <Link href="/contact" className={styles.photoButton}>
          Discuss your property <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
