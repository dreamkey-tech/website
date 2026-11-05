import type { ReactNode } from "react";
import PropertyAccessProvider from "@/components/property/PropertyAccessProvider";

export default function RentLayout({ children }: { children: ReactNode }) {
  return <PropertyAccessProvider>{children}</PropertyAccessProvider>;
}
