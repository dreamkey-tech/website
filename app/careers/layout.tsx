import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/careers");

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children;
}
