import { pageMetadata } from "@/lib/seo";
import { businessSchema } from "@/lib/business-schema";
import JsonLd from "@/components/seo/JsonLd";
import HeroSection from "@/components/home/HeroSection";
import DesignGallery from "@/components/home/DesignGallery";
import PropertyManagement from "@/components/home/PropertyManagement";
import BestProperties from "@/components/home/BestProperties";
import ClientStories from "@/components/home/ClientStories";
import HomeContactCTA from "@/components/home/HomeContactCTA";
import styles from "@/components/home/Landing.module.css";
import { connection } from "next/server";

export const metadata = pageMetadata("/");

export default async function Home() {
  await connection();
  return (
    <div className={styles.page}>
      <JsonLd id="dreamkey-business" data={businessSchema()} />
      <HeroSection />
      <DesignGallery />
      <div className={styles.content}>
        <PropertyManagement />
        <BestProperties />
        <ClientStories />
        <HomeContactCTA />
      </div>
    </div>
  );
}
