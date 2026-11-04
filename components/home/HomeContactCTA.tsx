import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import styles from "./Landing.module.css";

export default function HomeContactCTA() {
  return (
    <section
      id="contact"
      className={styles.contactCTA}
      aria-labelledby="home-contact-heading"
    >
      <div>
        <h2 id="home-contact-heading" className={styles.title}>
          Let’s find your
          <br />
          <em>kind of home.</em>
        </h2>
        <p>
          Buying, renting or selling in Kolkata? Talk to our property
          consultants.
        </p>
      </div>
      <div className={styles.contactActions} id="contact-form">
        <Link
          href="/contact"
          className={styles.primaryButton}
          data-analytics-event="cta_click"
          data-cta-name="home_start_conversation"
          data-component-name="home_contact"
        >
          Start an enquiry <ArrowUpRight size="1.25rem" aria-hidden="true" />
        </Link>
        <a href="tel:+917980133881">Or call +91 79801 33881</a>
      </div>
    </section>
  );
}
