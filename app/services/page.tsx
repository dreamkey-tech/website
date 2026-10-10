import { servicesSchema } from "@/lib/business-schema";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { connection } from "next/server";
import PageCTA from "@/components/pages/PageCTA";
import PageFAQ from "@/components/pages/PageFAQ";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesCollection from "@/components/services/ServicesCollection";
import ServicesNetwork from "@/components/services/ServicesNetwork";
import ServicesApproach from "@/components/services/ServicesApproach";
import { serviceQuestions } from "@/components/services/services-content";
import interior from "@/components/pages/Interior.module.css";
import styles from "@/components/services/Services.module.css";

export const metadata = pageMetadata("/services");

export default async function ServicesPage() {
  await connection();
  return (
    <div className={interior.page} id="page-content">
      <div className={interior.container}>
        <JsonLd id="dreamkey-services" data={servicesSchema()} />
        <ServicesHero />
        <ServicesCollection />
        <ServicesNetwork />
        <ServicesApproach />
        <section className={styles.faq} aria-labelledby="services-faq-title">
          <h2 className={interior.sectionTitle} id="services-faq-title">
            A little more <em>clarity.</em>
          </h2>
          <PageFAQ items={serviceQuestions} />
        </section>
        <PageCTA
          title="Your plans are a good place to start."
          copy="A new home, a property to sell, or a question about your options. Tell us what you have in mind."
          label="Tell us your requirements"
        />
      </div>
    </div>
  );
}
