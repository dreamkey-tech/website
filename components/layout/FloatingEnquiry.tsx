"use client";

import { usePathname } from "next/navigation";
import { WhatsappLogo } from "@phosphor-icons/react";
import { isAuthPage, isRedesignedPage } from "@/components/pages/page-routes";
import styles from "./FloatingEnquiry.module.css";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

const WHATSAPP_ENQUIRY =
  "https://api.whatsapp.com/send?phone=918697559123&text=Hi%2C%20I%20am%20interested%20in%20a%20property.";

export default function FloatingEnquiry() {
  const pathname = usePathname();
  if (isAuthPage(pathname)) return null;
  const hasMobileNavigation = pathname !== "/" && !isRedesignedPage(pathname);

  return (
    <a
      className={`${styles.link} ${hasMobileNavigation ? styles.aboveNavigation : ""}`}
      href={WHATSAPP_ENQUIRY}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire now on WhatsApp (opens in a new tab)"
    >
      <span>Enquire now</span>
      <ArrowUpRightIcon size={16} weight="regular" aria-hidden="true" />
    </a>
  );
}
