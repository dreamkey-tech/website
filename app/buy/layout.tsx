import type { ReactNode } from "react";
import PropertyAccessProvider from "@/components/property/PropertyAccessProvider";

export default function BuyLayout({ children }: { children: ReactNode }) {
  return <PropertyAccessProvider>{children}</PropertyAccessProvider>;
}
