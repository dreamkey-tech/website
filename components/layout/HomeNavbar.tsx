import Link from "next/link";
import BrandLogo from "./BrandLogo";
import HeaderAccount from "./HeaderAccount";
import MobileMenu from "./MobileMenu";
import PageHeader from "@/components/pages/PageHeader";
import styles from "./HomeNavbar.module.css";
import { NAV_LINKS } from "./navigation";

export default function HomeNavbar() {
  return (
    <>
      <header className={`home-header ${styles.desktop}`}>
        <a href="#home-content" className="home-skip-link">
          Skip to content
        </a>
        <div className="home-header__inner">
          <BrandLogo />
          <div className="home-header__right">
            <nav className="home-header__links" aria-label="Main navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <Link href={href} key={label}>
                  {label}
                </Link>
              ))}
            </nav>
            <HeaderAccount />
            <MobileMenu />
          </div>
        </div>
      </header>
      <PageHeader className={styles.mobile} contentId="home-content" />
    </>
  );
}
