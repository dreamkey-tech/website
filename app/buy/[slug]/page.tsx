import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";
import { z } from "zod";
import { pageMetadata } from "@/lib/seo";
import { getWebsiteProperty } from "@/lib/website-properties.server";
import { getPropertyDetails } from "@/components/property/property-data";
import LivePropertyDetails from "@/components/property/LivePropertyDetails";
import PropertyLoginRequired from "@/components/property/PropertyLoginRequired";
import PropertyLoadError from "@/components/property/PropertyLoadError";
import PropertySession from "@/components/property/PropertySession";
import interior from "@/components/pages/Interior.module.css";
import styles from "@/components/property/Property.module.css";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata("/buy", {
    title: "Property Details | Dream Key Reality",
    description:
      "Log in to view the full property listing, photographs and specifications with Dream Key.",
    canonical: `/buy/${encodeURIComponent(slug)}`,
    noIndex: true,
  });
}
export default async function PropertyPage({ params }: Props) {
  await connection();
  const { slug } = await params;
  const id = slug.toLowerCase();
  if (!z.uuid().safeParse(id).success) {
    // Retired sample URLs have no real CRM ID. Never present them as live stock.
    if (getPropertyDetails(slug)) redirect("/buy");
    notFound();
  }
  const jar = await cookies();
  const names = new Set([
    "access_token",
    "refresh_token",
    "session",
    "better-auth.session_token",
    "__Secure-better-auth.session_token",
    "__Host-better-auth.session_token",
  ]);
  const cookie = jar
    .getAll()
    .filter((item) => names.has(item.name))
    .map((item) => `${item.name}=${item.value}`)
    .join("; ");
  const result = await getWebsiteProperty(id, cookie);
  if (result.kind === "missing") notFound();
  return (
    <div className={`${interior.page} ${styles.page}`} id="page-content">
      <div className={interior.container}>
        {result.kind === "login" ? (
          <PropertyLoginRequired href={`/buy/${id}`} />
        ) : result.kind === "error" ? (
          <PropertyLoadError />
        ) : (
          <PropertySession
            key={crypto.randomUUID()}
            id={id}
            propertyType={result.property.propertyType}
            transactionType={result.property.pricingType === "RENT" ? "rent" : "buy"}
          >
            <LivePropertyDetails property={result.property} />
          </PropertySession>
        )}
      </div>
    </div>
  );
}
