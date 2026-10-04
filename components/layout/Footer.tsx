import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-charcoal-pure text-surface-container border-t border-secondary/30 pt-space-2xl pb-20 xl:pb-space-lg">
      <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl mb-space-2xl">
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <img
                alt="Dream Key Footer Logo"
                className="w-11 h-11 rounded-full object-cover border border-secondary/40"
                src="/logo.jpg"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-surface-clean tracking-tight">
                  Dream Key
                </span>
                <span className="font-label-ui text-[11px] uppercase tracking-widest text-gold-light">
                  Unlocking Dreams
                </span>
              </div>
            </div>
            <p className="font-body-default text-body-default text-secondary-fixed-dim max-w-sm">
              Premier residential and commercial advisory rooted in Kolkata's
              heritage and emerging skylines. From Ballygunge colonial estates to
              high-rise sky villas across EM Bypass and New Town.
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs font-label-ui text-label-ui text-tertiary-fixed border border-secondary/40 w-fit px-space-md py-space-xs rounded">
              <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
                verified
              </span>
              <span className="">WBRERA/AGT/2023/KOL/00482</span>
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <h4 className="font-title-property text-title-property text-surface-clean border-b border-secondary/40 pb-space-xs">
              Company
            </h4>
            <ul className="flex flex-col gap-space-sm font-body-default text-body-default">
              <li className="leading-none">
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-clean transition-colors"
                  href="#about-us"
                >
                  About Us
                </Link>
              </li>
              <li className="leading-none">
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-clean transition-colors"
                  href="#services"
                >
                  Our Services
                </Link>
              </li>
              <li className="leading-none">
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-clean transition-colors"
                  href="#contact"
                >
                  Contact
                </Link>
              </li>
              <li className="leading-none">
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-clean transition-colors"
                  href="#careers"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-space-md">
            <h4 className="font-title-property text-title-property text-surface-clean border-b border-secondary/40 pb-space-xs">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-space-sm font-body-default text-body-default">
              <li className="leading-none">
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-clean transition-colors"
                  href="#buy"
                >
                  Buy Property
                </Link>
              </li>
              <li className="leading-none">
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-clean transition-colors"
                  href="#sell"
                >
                  Sell Property
                </Link>
              </li>
              <li className="leading-none">
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-clean transition-colors"
                  href="#rent"
                >
                  Rent Property
                </Link>
              </li>
              <li className="leading-none">
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-clean transition-colors"
                  href="#projects"
                >
                  New Projects
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-space-md">
            <h4 className="font-title-property text-title-property text-surface-clean border-b border-secondary/40 pb-space-xs">
              Contact Kolkata
            </h4>
            <div className="flex flex-col gap-space-md font-body-dense text-body-dense text-secondary-fixed-dim">
              <div className="flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed mt-1">
                  apartment
                </span>
                <div>
                  <p className="font-semibold text-surface-clean">
                    Office Address:
                  </p>
                  <p className="">AA 52 , st-69, AA block, Newtown ,kolkata -700156, Kolkata, West Bengal 700156</p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
                  call
                </span>
                <p className="">+91 86975 59123</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-secondary/30 pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-label-ui text-label-ui text-secondary-fixed-dim">
          <p className="">Copyright © 2025 Dream Key. All rights reserved.</p>
          <div className="flex items-center gap-space-md">
            <Link
              className="hover:text-surface-clean transition-colors"
              href="#privacy-policy"
            >
              Privacy Policy
            </Link>
            <span className="text-secondary">|</span>
            <Link
              className="hover:text-surface-clean transition-colors"
              href="#terms-conditions"
            >
              Terms & Conditions
            </Link>
            <span className="text-secondary">|</span>
            <Link
              className="hover:text-surface-clean transition-colors"
              href="#disclaimer"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
