/** Home and Careers retain dedicated shells; unknown URLs use the editorial 404. */
export function isRedesignedPage(pathname: string) {
  return pathname !== "/" && pathname !== "/careers";
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
