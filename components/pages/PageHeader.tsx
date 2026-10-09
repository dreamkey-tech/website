import BrandLogo from "@/components/layout/BrandLogo";
import HeaderAccount from "@/components/layout/HeaderAccount";
import PageNavigation from "./PageNavigation";
import styles from "./Interior.module.css";

export default function PageHeader() {
  return (
    <header className={styles.header}>
      <a className={styles.skipLink} href="#page-content">
        Skip to content
      </a>
      <div className={styles.headerInner}>
        <BrandLogo />
        <PageNavigation />
        <div className={styles.headerAccount}>
          <HeaderAccount />
        </div>
      </div>
    </header>
  );
}
