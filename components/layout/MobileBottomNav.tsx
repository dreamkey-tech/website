"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", icon: "home", href: "/", fillOnActive: true },
  { label: "Buy", icon: "apartment", href: "/buy", fillOnActive: false },
  { label: "Explore", icon: "explore", href: "#featured-listings", fillOnActive: false },
  { label: "Saved", icon: "bookmark", href: "#saved", fillOnActive: false },
  { label: "Enquire", icon: "support_agent", href: "#enquiry-section", fillOnActive: false },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="xl:hidden fixed bottom-0 inset-x-0 z-50 bg-charcoal-pure/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-2px_12px_rgba(0,0,0,0.25)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex justify-around items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) && item.href !== "/";

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 w-14 h-14 transition-colors ${
                isActive
                  ? "text-primary font-bold"
                  : "text-surface-dim/70 hover:text-surface-clean"
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={
                  isActive && item.fillOnActive
                    ? { fontVariationSettings: "'FILL' 1" }
                    : {}
                }
              >
                {item.icon}
              </span>
              <span className="text-[10px] tracking-wide leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
