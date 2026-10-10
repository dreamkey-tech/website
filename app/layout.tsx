import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, SEO_PAGES } from "@/lib/seo";
import localFont from "next/font/local";
import "./globals.css";
import "./hero.css";
import HomeNavbar from "@/components/layout/HomeNavbar";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import HomeFooter from "@/components/layout/HomeFooter";
import SiteFooter from "@/components/layout/SiteFooter";
import PageHeader from "@/components/pages/PageHeader";
import PageFooter from "@/components/pages/PageFooter";
import { Toaster } from "sonner";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import FloatingEnquiry from "@/components/layout/FloatingEnquiry";
import { AuthProvider } from "@/components/providers/AuthProvider";

const plusJakartaSans = localFont({
  src: "../public/fonts/plus-jakarta-sans-variable.woff2",
  variable: "--font-plus-jakarta",
  weight: "400 800",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "../public/fonts/space-grotesk-variable.woff2",
  variable: "--font-space-grotesk",
  weight: "400 700",
  display: "swap",
});

// The italic face echoes the architectural reference; body type stays Jakarta.
const heroEditorial = localFont({
  src: "../public/fonts/playfair-display-italic.woff2",
  variable: "--font-hero-editorial",
  weight: "400",
  style: "italic",
  display: "swap",
});

// Route pages supply their own canonical; unknown/404 routes must not inherit Home's URL.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SEO_PAGES["/"].description,
  icons: { icon: "/logo2.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${heroEditorial.variable} bg-dark-base font-body text-text-dark-primary antialiased`}
      >
        <AuthProvider>
          <SiteHeader
            homeHeader={<HomeNavbar />}
            interiorHeader={<PageHeader />}
          />
          <main className="w-full bg-dark-base pb-16 xl:pb-0">{children}</main>
          <MobileBottomNav />
          <SiteFooter
            homeFooter={<HomeFooter />}
            legacyFooter={<Footer />}
            interiorFooter={<PageFooter />}
          />
          <FloatingEnquiry />
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              style: {
                background: "#242424",
                border: "1px solid #333333",
                color: "#ffffff",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
