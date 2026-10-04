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
                className="w-32 sm:w-40 h-auto object-contain"
                src="/logo.webp"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-surface-clean tracking-tight">
                  Dream <span className="text-primary">Key</span>
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
            {/* <div className="flex items-center gap-space-sm pt-space-xs font-label-ui text-label-ui text-tertiary-fixed border border-secondary/40 w-fit px-space-md py-space-xs rounded">
              <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
                verified
              </span>
              <span className="">WBRERA/AGT/2023/KOL/00482</span>
            </div> */}
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
              <div className="mt-2 w-full h-40 md:h-48 rounded-lg overflow-hidden border border-secondary/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d29471.98044196126!2d88.44438196017714!3d22.57919476141823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sAA%2052%20%2C%20st-69%2C%20AA%20block%2C%20Newtown%20%2Ckolkata%20-700156%2C%20Kolkata%2C%20West%20Bengal%20700156!5e0!3m2!1sen!2sin!4v1791114510980!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
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
