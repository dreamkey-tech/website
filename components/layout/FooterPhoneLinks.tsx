import { ArrowUpRight, PhoneCall } from "@phosphor-icons/react/dist/ssr";
import styles from "./FooterPhoneLinks.module.css";
import linkStyles from "./FooterTextLink.module.css";

const PHONE_NUMBERS = [
  { label: "+91 79801 33881", href: "tel:+917980133881" },
] as const;

export default function FooterPhoneLinks({
  legacy = false,
}: {
  legacy?: boolean;
}) {
  return (
    <ul
      className={`${styles.list} ${legacy ? styles.legacy : ""}`}
      aria-label="Contact phone numbers"
    >
      {PHONE_NUMBERS.map(({ label, href }) => (
        <li key={href}>
          <a href={href} className={`${styles.link} ${linkStyles.link}`}>
            {legacy && (
              <PhoneCall size={14} weight="duotone" aria-hidden="true" />
            )}
            {label}
            {!legacy && <ArrowUpRight size={17} aria-hidden="true" />}
          </a>
        </li>
      ))}
    </ul>
  );
}
