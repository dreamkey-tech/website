import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import BrandLogo from "./BrandLogo";
import FooterSocialLinks from "./FooterSocialLinks";
import FooterMap from "./FooterMap";
import styles from "./HomeFooter.module.css";
import linkStyles from "./FooterTextLink.module.css";

export default function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <BrandLogo />
            <p>
              Rooted in Kolkata.
              <br />
              Ready for your next chapter.
            </p>
            <a
              href="mailto:info@dreamkeykol.com"
              className={`${styles.contactLink} ${linkStyles.link}`}
            >
              info@dreamkeykol.com <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <FooterSocialLinks />
          </div>
          <nav aria-label="Explore properties">
            <h2>Find your place</h2>
            <Link href="/buy" className={linkStyles.link}>
              Buy a home
            </Link>
            <Link href="/rent" className={linkStyles.link}>
              Find a rental
            </Link>
            <Link href="/sell" className={linkStyles.link}>
              Sell your property
            </Link>
            <Link href="/#property-management" className={linkStyles.link}>
              Property management
            </Link>
          </nav>
          <nav aria-label="About Dream Key">
            <h2>Dream Key</h2>
            <Link href="/about" className={linkStyles.link}>
              Our story
            </Link>
            <Link href="/services" className={linkStyles.link}>
              Our services
            </Link>
            <Link href="/contact" className={linkStyles.link}>
              Get in touch
            </Link>
          </nav>
          <div className={styles.address}>
            <h2>Come say hello</h2>
            <address>
              AA 52, st-69, AA block, Newtown
              <br />
              Kolkata, West Bengal 700156
            </address>
            <a href="tel:+918697559123" className={linkStyles.link}>
              +91 86975 59123 <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <FooterMap />
          </div>
        </div>
        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} Dream Key Reality. All rights
            reserved. WBHIRA &amp; WBRERA compliant.
          </p>
          <nav aria-label="Legal">
            <Link href="/privacy" className={linkStyles.link}>
              Privacy policy
            </Link>
            <Link href="/terms-and-conditions" className={linkStyles.link}>
              Terms &amp; conditions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
