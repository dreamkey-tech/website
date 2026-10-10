"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import { isAuthPage, isRedesignedPage } from "@/components/pages/page-routes";

/** Keep the existing header on pages awaiting their own redesign. */
export default function SiteHeader({
  homeHeader,
  interiorHeader,
}: {
  homeHeader: ReactNode;
  interiorHeader: ReactNode;
}) {
  const pathname = usePathname();
  if (isAuthPage(pathname)) return null;
  if (pathname === "/") return homeHeader;
  return isRedesignedPage(pathname) ? interiorHeader : <Navbar />;
}
