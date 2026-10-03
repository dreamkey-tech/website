"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="bg-charcoal-pure text-surface py-2 border-b border-secondary/20">
        <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between font-label-ui text-label-ui">
          <div className="flex items-center gap-space-sm shrink">
            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed shrink-0">
              location_on
            </span>
            <span className="tracking-wide truncate max-w-[220px] sm:max-w-none">
              Your trusted real estate partner in Kolkata
            </span>
            <span className="hidden lg:inline text-secondary-fixed-dim shrink-0">
              •
            </span>
            <span className="hidden lg:inline text-secondary-fixed-dim shrink-0">
              WBHIRA & WBRERA Certified
            </span>
          </div>
          <div className="flex items-center gap-space-lg shrink-0">
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
        <div className="h-16 sm:h-20 max-w-[1320px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-md shrink-0">
            <Link className="flex items-center gap-space-sm" href="/">
              <img
                alt="Dream Key Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-border-subtle"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC7wJzTd9NpJQPhlr1XqiwnOU5spuN1intZaq45ekU0mP5Q1jVj25oDAyOBKzoH0iJhkUf7byxvBgBO6RdrGvB82KRYqSH-QrTa58DVSi1h8sh7r-OySZTBn3kqjP3TZs0wFBKS8TKJwr1C5n7HkyrrftSHRp2TMHq8g4p6v5rFe1PtocjdtxQo1_vzUvjFii0nIgewFY7K4TGOPBicd5sbA3rG43oHRNgEY95jQVfUMEu9bU3oqYOkPxfTiJOnCLUgOaRvvHEV0F_gw"
              />
              <div className="flex flex-col">
                <span className="font-title-property text-title-property text-on-surface tracking-tight leading-tight text-[15px] sm:text-[16px]">
                  Dream Key
                </span>
                <span className="font-label-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-tertiary font-semibold">
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
              href="/buy"
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
          <div className="flex items-center gap-2 sm:gap-space-md shrink-0">
            <Link
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-container text-on-primary font-label-ui px-2 py-1.5 sm:px-space-lg sm:py-space-sm rounded-lg transition-all duration-200 shadow-sm tracking-wider uppercase font-semibold hover:-translate-y-[2px] active:scale-[0.97] text-[10px] sm:text-label-ui"
              href="#contact"
            >
              Enquire Now
            </Link>
            <button
              className="xl:hidden p-1 sm:p-2 text-on-surface hover:bg-surface-container rounded-md transition-colors flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-surface-clean flex flex-col xl:hidden overflow-hidden">
          <div className="h-16 sm:h-20 px-margin-mobile md:px-margin flex items-center justify-between border-b border-border-subtle bg-surface-clean">
            <Link className="flex items-center gap-space-sm" href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img
                alt="Dream Key Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-border-subtle"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC7wJzTd9NpJQPhlr1XqiwnOU5spuN1intZaq45ekU0mP5Q1jVj25oDAyOBKzoH0iJhkUf7byxvBgBO6RdrGvB82KRYqSH-QrTa58DVSi1h8sh7r-OySZTBn3kqjP3TZs0wFBKS8TKJwr1C5n7HkyrrftSHRp2TMHq8g4p6v5rFe1PtocjdtxQo1_vzUvjFii0nIgewFY7K4TGOPBicd5sbA3rG43oHRNgEY95jQVfUMEu9bU3oqYOkPxfTiJOnCLUgOaRvvHEV0F_gw"
              />
              <div className="flex flex-col">
                <span className="font-title-property text-title-property text-on-surface tracking-tight leading-tight text-[15px] sm:text-[16px]">
                  Dream Key
                </span>
                <span className="font-label-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-tertiary font-semibold">
                  Unlocking Dreams
                </span>
              </div>
            </Link>
            <button
              className="p-1 sm:p-2 text-on-surface hover:bg-surface-container rounded-md transition-colors flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
          
          <nav className="flex flex-col flex-1 p-margin-mobile gap-space-lg overflow-y-auto font-label-ui text-lg bg-surface-clean">
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors tracking-wide py-2 border-b border-border-subtle/50"
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors tracking-wide py-2 border-b border-border-subtle/50"
              href="/buy"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Buy
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors tracking-wide py-2 border-b border-border-subtle/50"
              href="#sell"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sell
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors tracking-wide py-2 border-b border-border-subtle/50"
              href="#rent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Rent
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors tracking-wide py-2 border-b border-border-subtle/50"
              href="#projects"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors tracking-wide py-2 border-b border-border-subtle/50"
              href="#about-us"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors tracking-wide py-2 border-b border-border-subtle/50"
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="mt-auto pt-6 flex flex-col gap-4 text-base">
              <div className="flex items-center gap-3 text-secondary-fixed-dim">
                <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">
                  call
                </span>
                <a className="text-on-surface hover:text-primary" href="tel:+918697559123">
                  +91 86975 59123
                </a>
              </div>
              <div className="flex items-center gap-3 text-secondary-fixed-dim">
                <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">
                  mail
                </span>
                <a className="text-on-surface hover:text-primary" href="mailto:info@dreamkeykol.com">
                  info@dreamkeykol.com
                </a>
              </div>
              
              <Link
                className="mt-4 flex items-center justify-center bg-primary text-on-primary font-label-ui px-space-lg py-3 rounded-lg shadow-sm tracking-wider uppercase font-semibold text-sm w-full"
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Enquire Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
