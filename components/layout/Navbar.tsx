"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { usePathname } from "next/navigation";
import {
  List,
  X,
  PhoneCall,
  Envelope,
  User,
  SignOut,
  MagnifyingGlass,
  CaretDown,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NAV_LINKS = [
  { label: "Buy",      href: "/buy"      },
  { label: "Rent",     href: "/rent"     },
  { label: "Sell",     href: "/contact"  },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen]   = useState(false);
  const [isUserMenuOpen,   setIsUserMenuOpen]     = useState(false);
  const [scrolled,         setScrolled]           = useState(false);
  const { user, isAuthenticated, logout }         = useAuthStore();
  const [mounted,          setMounted]            = useState(false);
  const menuRef  = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLHeadingElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setIsUserMenuOpen(false);
    };

    window.addEventListener("scroll",     handleScroll,      { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll",     handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    });
  }, []);

  useGSAP(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.2 }
      );
      gsap.fromTo(".mobile-nav-item",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.06, duration: 0.3, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [isMobileMenuOpen]);

  useGSAP(() => {
    if (isUserMenuOpen && userMenuRef.current) {
      gsap.fromTo(userMenuRef.current,
        { opacity: 0, y: -8, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: "power2.out" }
      );
    }
  }, [isUserMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-dark-base/90 backdrop-blur-xl border-b border-border-dark shadow-[0_1px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="h-[72px] max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center gap-3 shrink-0" href="/" aria-label="Dream Key Reality - Home">
            <div className="relative w-8 h-8">
              <Image
                src="/logo2.png"
                alt="Dream Key logo mark"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-[15px] font-bold text-white tracking-tight">
                Dream <span className="text-gold">Key</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-text-dark-secondary font-semibold">
                Reality
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className={`relative text-[14px] font-medium tracking-wide transition-colors duration-200 group ${
                    isActive
                      ? "text-gold"
                      : "text-text-dark-secondary hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* CTA button */}
            <Link
              href="/buy"
              className="hidden md:inline-flex items-center gap-2 h-9 px-5 bg-gold hover:bg-gold-light text-dark-base text-[13px] font-bold rounded-full transition-all duration-200 active:scale-[0.97]"
            >
              <MagnifyingGlass size={14} weight="bold" />
              Find Property
            </Link>

            {/* Auth */}
            {mounted ? (
              isAuthenticated ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 h-9 px-3 bg-dark-raised border border-border-dark rounded-full text-[13px] text-text-dark-secondary hover:text-white hover:border-gold/40 transition-all duration-200 active:scale-95"
                    aria-label="User menu"
                    aria-expanded={isUserMenuOpen}
                  >
                    <User size={16} weight="regular" />
                    <span className="hidden sm:inline max-w-[80px] truncate">
                      {user?.name?.split(" ")[0] || "Account"}
                    </span>
                    <CaretDown size={12} weight="bold" className={`transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isUserMenuOpen && (
                    <div
                      ref={userMenuRef}
                      className="absolute right-0 top-[calc(100%+10px)] w-56 bg-[var(--home-surface)] text-[var(--home-text)] border border-[var(--home-border)] rounded-2xl shadow-[var(--home-panel-shadow)] overflow-hidden z-[100]"
                    >
                      <div className="px-4 pt-3.5 pb-3 border-b border-[var(--home-border)]">
                        <p className="text-[14px] font-semibold text-[var(--home-text)] truncate">{user?.name || "User"}</p>
                        <p className="text-[11px] text-[var(--home-text-muted)] truncate mt-0.5">{user?.email}</p>
                      </div>
                      <div className="p-1.5">
                        <Link
                          href="/buy"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 min-h-11 rounded-[10px] px-3 py-2.5 text-[12px] text-[var(--home-text-muted)] hover:text-[var(--home-text)] hover:bg-[var(--home-surface-muted)] transition-colors group"
                        >
                          <MagnifyingGlass size={16} className="group-hover:text-gold transition-colors" />
                          Browse Properties
                        </Link>
                        <div className="border-t border-[var(--home-border)] mx-3 my-1" />
                        <button
                          onClick={() => { logout(); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 min-h-11 rounded-[10px] px-3 py-2.5 text-[12px] text-[var(--home-text)] hover:bg-[var(--home-surface-muted)] transition-colors"
                        >
                          <SignOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 bg-dark-raised border border-border-dark text-[13px] text-text-dark-secondary hover:text-white hover:border-gold/40 rounded-full transition-all duration-200"
                >
                  <User size={14} />
                  Login
                </Link>
              )
            ) : (
              <div className="w-20 h-9 bg-dark-raised rounded-full animate-pulse" />
            )}

            {/* Mobile hamburger */}
            <button
              className="xl:hidden flex items-center justify-center w-10 h-10 bg-dark-raised border border-border-dark rounded-xl text-text-dark-secondary hover:text-white hover:border-gold/40 transition-all duration-200 active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <List size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[60] bg-dark-base/95 backdrop-blur-xl xl:hidden flex flex-col"
        >
          {/* Mobile menu header */}
          <div className="h-[72px] px-5 flex items-center justify-between border-b border-border-dark">
            <Link className="flex items-center gap-3" href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="relative w-7 h-7">
                <Image src="/logo2.png" alt="Dream Key" fill className="object-contain" />
              </div>
              <span className="font-display text-[15px] font-bold text-white">
                Dream <span className="text-gold">Key</span>
              </span>
            </Link>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-dark-raised border border-border-dark text-text-dark-secondary hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile nav links */}
          <nav className="flex flex-col flex-1 px-5 pt-6 gap-1 overflow-y-auto" aria-label="Mobile navigation">
            {NAV_LINKS.map((link, i) => (
              <div key={link.href + link.label} className="mobile-nav-item">
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3.5 border-b border-border-dark/50 text-[16px] font-medium transition-colors ${
                    pathname === link.href ? "text-gold" : "text-text-dark-secondary hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}

            {/* Bottom contact info */}
            <div className="mt-auto pt-8 pb-8 flex flex-col gap-4">
              <a href="tel:+918697559123" className="flex items-center gap-3 text-text-dark-secondary hover:text-gold transition-colors text-[15px]">
                <PhoneCall size={18} weight="duotone" className="text-gold" />
                +91 86975 59123
              </a>
              <a href="mailto:info@dreamkeykol.com" className="flex items-center gap-3 text-text-dark-secondary hover:text-gold transition-colors text-[15px]">
                <Envelope size={18} weight="duotone" className="text-gold" />
                info@dreamkeykol.com
              </a>
              <Link
                href="/buy"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 flex items-center justify-center h-12 bg-gold text-dark-base font-bold rounded-xl tracking-wide text-[15px] active:scale-[0.97] transition-transform"
              >
                Find Your Property
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
