import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import interior from "@/components/pages/Interior.module.css";
import styles from "./Services.module.css";

export default function ServicesNetwork() {
  return (
    <section className={styles.network} aria-labelledby="network-title">
      <div className={styles.networkIntro}>
        <h2 className={interior.sectionTitle} id="network-title">
          Local connections.
          <br />
          More <em>possibilities.</em>
        </h2>
        <p>
          Property information and the people behind it belong in the same
          conversation. That’s why we work alongside brokers and property
          consultants across Kolkata.
        </p>
        <p>
          Our focus spans selected areas in East, South and North Kolkata. Your
          preferred location gives us a starting point for exploring suitable
          options through our network.
        </p>
      </div>
      <div className={styles.networkDetails}>
        <div>
          <h3>A connected approach</h3>
          <p>
            We share property information and coordinate with local
            professionals, bringing different sources together around your
            requirements.
          </p>
        </div>
        <div>
          <h3>Room to make your own decision</h3>
          <p>
            Our aim is to make the search clearer and less stressful. A suitable
            property matters more than rushing a transaction.
          </p>
        </div>
        <div className={styles.partner}>
          <h3>For brokers and property consultants</h3>
          <p>
            Share property opportunities, discuss customer requirements and
            explore collaboration with our team.
          </p>
          <Link className={styles.serviceLink} href="/contact">
            <span>Talk about working together</span>
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
