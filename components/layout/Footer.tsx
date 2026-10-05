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
            {/* Social Icons */}
            <div className="flex items-center gap-5 pt-3">
              <a href="https://www.facebook.com/profile.php?id=61594174244288&utm_source=ig&utm_medium=social&utm_content=link_in_bio" target="_blank" rel="noopener noreferrer" className="text-secondary-fixed-dim hover:text-primary transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="https://www.instagram.com/dream_key_kolkata/" target="_blank" rel="noopener noreferrer" className="text-secondary-fixed-dim hover:text-primary transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/dreamkeykol-reality/posts/" target="_blank" rel="noopener noreferrer" className="text-secondary-fixed-dim hover:text-primary transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://www.youtube.com/@dream_key_kolkata" target="_blank" rel="noopener noreferrer" className="text-secondary-fixed-dim hover:text-primary transition-colors" aria-label="YouTube">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
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
                  href="/services"
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
              <li className="leading-none">
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-clean transition-colors"
                  href="/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="leading-none">
                <Link
                  className="text-secondary-fixed-dim hover:text-surface-clean transition-colors"
                  href="/terms-and-conditions"
                >
                  Terms & Conditions
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
        <div className="border-t border-secondary/30 pt-space-lg flex justify-center font-label-ui text-label-ui text-secondary-fixed-dim">
          <p className="text-center">Copyright © 2026 Dream Key. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
