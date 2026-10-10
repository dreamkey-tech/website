import Link from "next/link";
import Image from "next/image";
import { Envelope, MapPin } from "@phosphor-icons/react/dist/ssr";
import FooterSocialLinks from "./FooterSocialLinks";
import FooterMap from "./FooterMap";
import FooterPhoneLinks from "./FooterPhoneLinks";
import linkStyles from "./FooterTextLink.module.css";

const FOOTER_LINKS = {
  Explore: [
    { label: "Buy a Property", href: "/buy" },
    { label: "Rent a Property", href: "/rent" },
    { label: "Sell Your Property", href: "/contact" },
    { label: "New Projects", href: "/buy" },
  ],
  Company: [
    { label: "About Dream Key", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-dark-raised border-t border-border-dark"
      aria-label="Footer"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 flex flex-col gap-5">
            <Link
              href="/"
              className="flex items-center gap-3 w-fit"
              aria-label="Dream Key Reality home"
            >
              <div className="relative w-8 h-8">
                <Image
                  src="/logo2.png"
                  alt="Dream Key logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-[16px] font-bold text-white">
                  Dream <span className="text-gold">Key</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-text-dark-secondary font-semibold mt-0.5">
                  Reality
                </span>
              </div>
            </Link>

            <p className="text-text-dark-secondary text-body-dense leading-relaxed max-w-xs">
              Kolkata&#39;s trusted real estate broker since 2012, connecting
              buyers, sellers, and renters with verified properties across the
              city.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2.5 text-[13px]">
              <FooterPhoneLinks legacy />
              <a
                href="mailto:info@dreamkeykol.com"
                className={`${linkStyles.link} ${linkStyles.compact} flex items-center gap-2.5 text-text-dark-secondary`}
              >
                <Envelope
                  size={14}
                  weight="duotone"
                  className="text-gold shrink-0"
                />
                info@dreamkeykol.com
              </a>
              <div className="flex items-start gap-2.5 text-text-dark-secondary">
                <MapPin
                  size={14}
                  weight="duotone"
                  className="text-gold shrink-0 mt-0.5"
                />
                New Town, Kolkata - 700156
              </div>
            </div>

            {/* Social */}
            <FooterSocialLinks legacy />
            <FooterMap legacy />
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <h3 className="text-[11px] uppercase tracking-[0.16em] font-bold text-text-dark-secondary">
                {heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`${linkStyles.link} ${linkStyles.compact} text-[13px] text-text-dark-secondary`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-dark py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-text-dark-muted text-center sm:text-left">
            &copy; {year} Dream Key Reality. All rights reserved.
          </p>
          <p className="text-[12px] text-text-dark-muted">
            Built with care in Kolkata.
          </p>
        </div>
      </div>
    </footer>
  );
}
