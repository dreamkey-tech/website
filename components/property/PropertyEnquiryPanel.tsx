import Link from "next/link";
import {
  ArrowUpRight,
  ChatCircleText,
  PhoneCall,
} from "@phosphor-icons/react/dist/ssr";
import { buyEnquiryHref, type BuyHome } from "@/components/buy/buy-data";
import styles from "./Property.module.css";

export default function PropertyEnquiryPanel({
  home,
  enquiryHref,
}: {
  home: Pick<BuyHome, "title" | "location" | "status">;
  enquiryHref?: string;
}) {
  const waitlist = home.status === "waitlist";
  const whatsapp = `https://api.whatsapp.com/send?phone=917980133881&text=${encodeURIComponent(`Hi, I am interested in ${home.title} in ${home.location}.${waitlist ? " Please share waitlist information or alternatives." : " Please share current availability and details."}`)}`;
  return (
    <aside
      className={styles.enquiryPanel}
      aria-labelledby="property-enquiry-title"
    >
      <p className={styles.panelEyebrow}>Your next step</p>
      <h2 id="property-enquiry-title">
        See if this feels
        <br />
        <em>like home.</em>
      </h2>
      <p>
        Speak with our Kolkata team for current prices, unit details and a site
        visit.
      </p>
      <Link
        href={enquiryHref ?? buyEnquiryHref(home)}
        className={styles.primaryButton}
      >
        {waitlist
          ? "Ask about alternatives"
          : enquiryHref
            ? "Enquire about this property"
            : "Enquire about this home"}
        <ArrowUpRight size={19} aria-hidden="true" />
      </Link>
      <a href="tel:+917980133881" className={styles.secondaryButton}>
        <PhoneCall size={18} aria-hidden="true" />
        +91 79801 33881
      </a>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsapp}
      >
        <ChatCircleText size={18} aria-hidden="true" />
        Continue on WhatsApp
        <ArrowUpRight size={16} aria-hidden="true" />
        <span className={styles.srOnly}> (opens in a new tab)</span>
      </a>
      <div className={styles.panelNote}>
        <span>Dream Key Reality</span>
        <p>
          No booking or payment is taken on this page. Availability is confirmed
          by our team.
        </p>
      </div>
    </aside>
  );
}
