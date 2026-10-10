import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import OfficeMap from "@/components/maps/OfficeMap";
import { OFFICE_MAP_URL } from "@/lib/office-location";
import styles from "./FooterMap.module.css";
import linkStyles from "./FooterTextLink.module.css";

export default function FooterMap({ legacy = false }: { legacy?: boolean }) {
  return (
    <div className={`${styles.location} ${legacy ? styles.legacy : ""}`}>
      <div className={styles.frame}>
        <OfficeMap className={styles.map} />
      </div>
      <a
        href={OFFICE_MAP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.directions} ${linkStyles.link}`}
        aria-label="View on Google Maps (DreamKey, opens in a new tab)"
      >
        View on Google Maps
        <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </div>
  );
}
