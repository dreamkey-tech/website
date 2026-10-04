"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isBuyPage = pathname === '/buy';

  useEffect(() => {
    setMounted(true);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`${isBuyPage ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 w-full`}>
      <div className="bg-charcoal-pure text-surface py-2 border-b border-secondary/20" style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top, 0.5rem))' }}>
        <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between font-label-ui text-label-ui">
          <div className="flex items-center gap-space-sm shrink">
            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed shrink-0">
              location_on
            </span>
            <span className="tracking-wide truncate max-w-[220px] sm:max-w-none">
              Your trusted real estate partner in Kolkata
            </span>
            {/* <span className="hidden lg:inline text-secondary-fixed-dim shrink-0">
              •
            </span>
            <span className="hidden lg:inline text-secondary-fixed-dim shrink-0">
              WBHIRA & WBRERA Certified
            </span> */}
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
                className="w-24 sm:w-28 h-auto object-contain"
                src="/logo.webp"
              />
              <div className="flex flex-col">
                <span className="font-title-property text-title-property text-on-surface tracking-tight leading-tight text-[15px] sm:text-[16px]">
                  Dream <span className="text-primary">Key</span>
                </span>
                <span className="font-label-ui text-[9px] sm:text-[10px] tracking-widest uppercase text-tertiary font-semibold">
                  Unlocking Dreams
                </span>
              </div>
            </Link>
          </div>
          <nav className="hidden xl:flex items-center gap-space-xl text-base font-semibold">
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
            {/* Call icon — visible on mobile only */}
            <a
              href="tel:+918697559123"
              aria-label="Call Dream Key"
              className="xl:hidden w-9 h-9 rounded-full bg-surface-container-low text-charcoal-pure flex items-center justify-center hover:bg-surface-container active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">call</span>
            </a>
            {/* User Dropdown Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-surface-container-low border border-border-subtle rounded-full flex items-center justify-center hover:bg-surface-container transition-colors active:scale-95"
                aria-label="User menu"
              >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-primary">
                  person
                </span>
              </button>

              {isUserMenuOpen && mounted && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-surface-clean border border-border-subtle rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-2 flex flex-col z-[100] font-body-default text-body-default">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 border-b border-border-subtle/50 mb-1">
                        <p className="font-semibold text-on-surface truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-secondary truncate mt-0.5">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="px-4 py-2 hover:bg-surface-container text-on-surface transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">dashboard</span>
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-surface-container text-error text-left transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="px-4 py-2 hover:bg-surface-container text-on-surface transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">login</span>
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="px-4 py-2 hover:bg-surface-container text-on-surface transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">person_add</span>
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
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
                className="w-24 sm:w-28 h-auto object-contain"
                src="/logo.webp"
              />
              <div className="flex flex-col">
                <span className="font-title-property text-title-property text-on-surface tracking-tight leading-tight text-[15px] sm:text-[16px]">
                  Dream <span className="text-primary">Key</span>
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
