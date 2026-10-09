import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import BrandLogo from "@/components/layout/BrandLogo";
import styles from "./Interior.module.css";

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
            <a className={styles.textLink} href="tel:+918697559123">
              +91 86975 59123 <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <nav aria-label="Explore">
            <h2>Explore</h2>
            <Link href="/buy">Buy a home</Link>
            <Link href="/rent">Find a rental</Link>
            <Link href="/sell">Sell your property</Link>
            <Link href="/services">Our services</Link>
          </nav>
          <nav aria-label="Company">
            <h2>Dream Key</h2>
            <Link href="/about">Our story</Link>
            <Link href="/contact">Get in touch</Link>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms-and-conditions">Terms &amp; conditions</Link>
          </nav>
          <div>
            <h2>Find us in Kolkata</h2>
            <p>
              AA 52, st-69, AA block, Newtown
              <br />
              Kolkata, West Bengal 700156
            </p>
            <a
              className={styles.footerEmail}
              href="mailto:info@dreamkeykol.com"
            >
              info@dreamkeykol.com
            </a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>
            © {new Date().getFullYear()} Dream Key Reality. All rights reserved.
            WBHIRA &amp; WBRERA compliant.
          </p>
          <span>Made for your next move.</span>
        </div>
      </div>
    </footer>
  );
}
