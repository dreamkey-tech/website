import BrandLogo from "@/components/layout/BrandLogo";
import HeaderAccount from "@/components/layout/HeaderAccount";
import PageNavigation from "./PageNavigation";
import styles from "./Interior.module.css";

export default function PageHeader({
  className = "",
  contentId = "page-content",
}: {
  className?: string;
  contentId?: string;
}) {
  return (
    <header className={`${styles.header} ${className}`}>
      <a className={styles.skipLink} href={`#${contentId}`}>
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
