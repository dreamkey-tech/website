/** The landing page and routes awaiting a redesign keep their existing shell. */
export function isRedesignedPage(pathname: string) {
  return (
    pathname.startsWith("/buy/") ||
    [
      "/buy",
      "/sell",
      "/services",
      "/rent",
      "/about",
      "/contact",
      "/privacy",
      "/terms-and-conditions",
      "/login",
      "/register",
      "/forgot-password",
    ].includes(pathname)
  );
}

export function isAuthPage(pathname: string) {
  return (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password"
  );
}

export const PAGE_LINKS = [
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
