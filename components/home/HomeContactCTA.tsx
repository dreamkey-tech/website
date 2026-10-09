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
        <p>Buying, renting, or making a new plan? Start with a conversation.</p>
      </div>
      <div className={styles.contactActions} id="contact-form">
        <Link href="/contact" className={styles.primaryButton}>
          Start an enquiry <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
        <a href="tel:+918697559123">Or call +91 86975 59123</a>
      </div>
    </section>
  );
}
