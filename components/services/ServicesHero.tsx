import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import PagePhoto from "@/components/pages/PagePhoto";
import interior from "@/components/pages/Interior.module.css";
import styles from "./Services.module.css";

export default function ServicesHero() {
  return (
    <section className={styles.hero} aria-labelledby="services-title">
      <div className={styles.heroCopy}>
        <p className={interior.eyebrow}>Our services</p>
        <h1 className={styles.title} id="services-title">
          Your next move.
          <br />
          <em>Our shared focus.</em>
        </h1>
        <p className={styles.lead}>
          Buying, renting, selling or investing. We connect your requirements
          with property options and people across Kolkata.
        </p>
        <a className={interior.primaryButton} href="#property-services">
          Find the right service
          <ArrowDown size={18} aria-hidden="true" />
        </a>
      </div>
      <PagePhoto
        src="/images/pages/services-consultation-v1.webp"
        alt="Illustrative property consultation with an agent and client reviewing documents beside a house model"
        className={styles.heroPhoto}
        eager
      />
    </section>
  );
}
