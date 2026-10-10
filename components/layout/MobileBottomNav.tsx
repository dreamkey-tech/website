"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Buildings, MagnifyingGlass, Phone } from "@phosphor-icons/react";
import { isRedesignedPage } from "@/components/pages/page-routes";

const NAV = [
  { label: "Home",     icon: <House      size={22} weight="duotone" />, href: "/" },
  { label: "Buy",      icon: <Buildings  size={22} weight="duotone" />, href: "/buy" },
  { label: "Search",   icon: <MagnifyingGlass size={22} weight="duotone" />, href: "/buy" },
  { label: "Contact",  icon: <Phone      size={22} weight="duotone" />, href: "/contact" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  // The new home header supplies mobile navigation without obscuring the hero.
  if (pathname === "/" || isRedesignedPage(pathname)) return null;

  return (
    <nav
      className="xl:hidden fixed bottom-0 inset-x-0 z-50 bg-dark-base/95 backdrop-blur-xl border-t border-border-dark"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Mobile bottom navigation"
    >
      <div className="flex justify-around items-center h-16 px-2">
        {NAV.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) && item.href !== "/";
          return (
            <Link
              key={item.label + item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-1 w-14 h-14 transition-colors ${
                isActive ? "text-gold" : "text-text-dark-secondary hover:text-white"
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-semibold tracking-wide leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
