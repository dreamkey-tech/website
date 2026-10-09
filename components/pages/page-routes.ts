/** The landing page and routes awaiting a redesign keep their existing shell. */
export function isRedesignedPage(pathname: string) {
  return [
    "/buy",
    "/sell",
    "/rent",
    "/about",
    "/contact",
    "/privacy",
    "/terms-and-conditions",
    "/login",
    "/register",
  ].includes(pathname);
}

export function isAuthPage(pathname: string) {
  return pathname === "/login" || pathname === "/register";
}

export const PAGE_LINKS = [
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
