"use client";

import { useRef } from "react";
import Link from "next/link";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { NAV_LINKS } from "./navigation";

export default function MobileMenu() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => { if (menuRef.current) menuRef.current.open = false; };
  return (
    <details ref={menuRef} className="home-mobile-menu" onKeyDown={(event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuRef.current?.querySelector("summary")?.focus();
      }
    }}>
      <summary role="button" aria-label="Navigation menu">
        <List className="home-mobile-menu__open" size={22} aria-hidden="true" />
        <X className="home-mobile-menu__close" size={22} aria-hidden="true" />
      </summary>
      <nav aria-label="Mobile navigation" className="home-mobile-menu__panel">
        {NAV_LINKS.map(({ label, href }) => (
          <Link href={href} key={label} onClick={closeMenu}>{label}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        ))}
      </nav>
    </details>
  );
}
