import Link from "next/link";
import BrandLogo from "@/components/layout/BrandLogo";
import FooterSocialLinks from "@/components/layout/FooterSocialLinks";
import FooterMap from "@/components/layout/FooterMap";
import FooterPhoneLinks from "@/components/layout/FooterPhoneLinks";
import styles from "./Interior.module.css";
import linkStyles from "@/components/layout/FooterTextLink.module.css";

export default function PageFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div>
            <BrandLogo />
            <p>
              A place to begin.
              <br />A partner for every next step.
            </p>
            <FooterPhoneLinks />
            <FooterSocialLinks />
          </div>
          <nav aria-label="Explore">
            <h2>Explore</h2>
            <Link href="/buy" className={linkStyles.link}>
              Buy a home
            </Link>
            <Link href="/rent" className={linkStyles.link}>
              Find a rental
            </Link>
            <Link href="/sell" className={linkStyles.link}>
              Sell your property
            </Link>
            <Link href="/services" className={linkStyles.link}>
              Our services
            </Link>
          </nav>
          <nav aria-label="Company">
            <h2>Dream Key</h2>
            <Link href="/about" className={linkStyles.link}>
              Our story
            </Link>
            <Link href="/contact" className={linkStyles.link}>
              Get in touch
            </Link>
            <Link href="/privacy" className={linkStyles.link}>
              Privacy policy
            </Link>
            <Link href="/terms-and-conditions" className={linkStyles.link}>
              Terms &amp; conditions
            </Link>
          </nav>
          <div>
            <h2>Find us in Kolkata</h2>
            <p>
              AA 52, st-69, AA block, Newtown
              <br />
              Kolkata, West Bengal 700156
            </p>
            <a
              className={`${styles.footerEmail} ${linkStyles.link}`}
              href="mailto:info@dreamkeykol.com"
            >
              info@dreamkeykol.com
            </a>
            <FooterMap />
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>
            © {new Date().getFullYear()} Dream Key Reality. All rights reserved.
          </p>
          <span>Made for your next move.</span>
        </div>
      </div>
    </footer>
  );
}
