import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";
import { pageSchema } from "@/lib/page-schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = pageMetadata("/careers");

export default function CareersLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd id="dreamkey-careers-page" data={pageSchema("/careers")} />
      {children}
    </>
  );
}
