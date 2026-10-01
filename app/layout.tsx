import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dream Key | Premier Real Estate in Kolkata",
  description: "Find a Place You’ll Love to Call Home. Verified luxury apartments, premium high-rises, and prime residential developments across Kolkata.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} bg-surface font-body-default text-body-default text-on-surface antialiased`}
      >
        <Navbar />
        <main className="w-full pt-[116px] bg-surface min-h-[calc(100vh-116px)]">
          {children}
        </main>
        <Footer />
        
        {/* Quick Enquiry FAB */}
        <aside className="fixed bottom-6 right-6 z-50">
          <a
            className="flex items-center gap-space-sm bg-primary hover:bg-primary-container text-on-primary px-space-md py-space-sm rounded-full shadow-lg border border-outline-variant/30 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 active:scale-95"
            href="https://wa.me/918697559123"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span className="font-label-ui text-label-ui uppercase tracking-wider font-semibold pr-1">
              Quick Enquiry
            </span>
          </a>
        </aside>
      </body>
    </html>
  );
}
