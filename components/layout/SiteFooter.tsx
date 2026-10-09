"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isAuthPage, isRedesignedPage } from "@/components/pages/page-routes";

export default function SiteFooter({
  homeFooter,
  legacyFooter,
  interiorFooter,
}: {
  homeFooter: ReactNode;
  legacyFooter: ReactNode;
  interiorFooter: ReactNode;
}) {
  const pathname = usePathname();
  if (isAuthPage(pathname)) return null;
  if (pathname === "/") return homeFooter;
  return isRedesignedPage(pathname) ? interiorFooter : legacyFooter;
}
