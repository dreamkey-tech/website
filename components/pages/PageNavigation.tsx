"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { PAGE_LINKS } from "./page-routes";
import styles from "./Interior.module.css";

export default function PageNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div
      className={styles.navigation}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          event.currentTarget.querySelector("button")?.focus();
        }
      }}
    >
      <button
        className={styles.menuButton}
        type="button"
        aria-expanded={open}
        aria-controls="page-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <List size={22} aria-hidden="true" />
        )}
      </button>
      <nav
        id="page-navigation"
        className={`${styles.navLinks} ${open ? styles.navOpen : ""}`}
        aria-label="Main navigation"
      >
        {PAGE_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
