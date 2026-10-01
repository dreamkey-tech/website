import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="bg-charcoal-pure text-surface py-2 border-b border-secondary/20">
        <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between font-label-ui text-label-ui">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
              location_on
            </span>
            <span className="tracking-wide">
              Your trusted real estate partner in Kolkata
            </span>
            <span className="hidden lg:inline text-secondary-fixed-dim">
              •
            </span>
            <span className="hidden lg:inline text-secondary-fixed-dim">
              WBHIRA & WBRERA Certified
            </span>
          </div>
          <div className="flex items-center gap-space-lg">
            <div className="hidden sm:flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[15px] text-secondary-fixed-dim">
                call
              </span>
              <a
                className="text-surface hover:text-tertiary-fixed transition-colors"
                href="tel:+918697559123"
              >
                +91 86975 59123
              </a>
            </div>
            <div className="hidden md:flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[15px] text-secondary-fixed-dim">
                mail
              </span>
              <a
                className="text-surface hover:text-tertiary-fixed transition-colors"
                href="mailto:info@dreamkeykol.com"
              >
                info@dreamkeykol.com
              </a>
            </div>
            <div className="flex items-center gap-space-xs text-secondary-fixed-dim">
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
                schedule
              </span>
              <span className="hidden sm:inline">Mon-Sat: 10AM-7PM</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-surface-clean/95 backdrop-blur-md border-b border-border-subtle shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-[1320px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <Link className="flex items-center gap-space-sm" href="/">
              <img
                alt="Dream Key Logo"
                className="w-10 h-10 rounded-full object-cover border border-border-subtle"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC7wJzTd9NpJQPhlr1XqiwnOU5spuN1intZaq45ekU0mP5Q1jVj25oDAyOBKzoH0iJhkUf7byxvBgBO6RdrGvB82KRYqSH-QrTa58DVSi1h8sh7r-OySZTBn3kqjP3TZs0wFBKS8TKJwr1C5n7HkyrrftSHRp2TMHq8g4p6v5rFe1PtocjdtxQo1_vzUvjFii0nIgewFY7K4TGOPBicd5sbA3rG43oHRNgEY95jQVfUMEu9bU3oqYOkPxfTiJOnCLUgOaRvvHEV0F_gw"
              />
              <div className="flex flex-col">
                <span className="font-title-property text-title-property text-on-surface tracking-tight leading-tight">
                  Dream Key
                </span>
                <span className="font-label-ui text-[10px] tracking-widest uppercase text-tertiary font-semibold">
                  Unlocking Dreams
                </span>
              </div>
            </Link>
          </div>
          <nav className="hidden xl:flex items-center gap-space-xl font-label-ui text-label-ui">
            <Link
              aria-current="page"
              className="transition-colors tracking-wide text-primary font-semibold"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors tracking-wide"
              href="#buy"
            >
              Buy
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors tracking-wide"
              href="#sell"
            >
              Sell
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors tracking-wide"
              href="#rent"
            >
              Rent
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors tracking-wide"
              href="#projects"
            >
              Projects
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors tracking-wide"
              href="#about-us"
            >
              About Us
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors tracking-wide"
              href="#contact"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-space-md">
            <Link
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-container text-on-primary font-label-ui text-label-ui px-space-lg py-space-sm rounded-lg transition-all duration-200 shadow-sm tracking-wider uppercase font-semibold hover:-translate-y-[2px] active:scale-[0.97]"
              href="#contact"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
