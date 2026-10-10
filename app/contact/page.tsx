import type { Metadata } from "next";
import { connection } from "next/server";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import PagePhoto from "@/components/pages/PagePhoto";
import ContactMap from "@/components/pages/ContactMap";
import PropertyEnquiryForm from "@/components/pages/PropertyEnquiryForm";
import { getEnquiryPurpose } from "@/components/pages/enquiry-values";
import { OFFICE_MAP_URL } from "@/lib/office-location";
import styles from "@/components/pages/Interior.module.css";

export const metadata: Metadata = {
  icons: { icon: "/images/pages/favicon.png" },
  title: "Contact our Kolkata team | Dream Key Reality",
  description:
    "Get in touch with Dream Key Reality in New Town, Kolkata. Call +91 86975 59123 or send an enquiry about buying, renting, or selling a property.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{
    purpose?: string | string[];
    property?: string | string[];
  }>;
}) {
  await connection();
  const query = await searchParams;
  const purpose = getEnquiryPurpose(query.purpose);
  const property =
    typeof query.property === "string" ? query.property.slice(0, 200) : "";
  return (
    <div className={styles.page} id="page-content">
      <div className={styles.container}>
        <div className={styles.contactIntro}>
          <p className={styles.eyebrow}>A conversation is a good beginning</p>
          <h1 className={styles.title}>
            Let’s talk about
            <br />
            your <em>next move.</em>
          </h1>
          <p className={styles.lead}>
            A question, a plan, or just a possibility. We’re here to listen and
            help you take the next step in Kolkata.
          </p>
        </div>
        <div className={styles.contactGrid}>
          <div>
            <PagePhoto
              src="/images/Dream_Key_Office_Call_2.webp"
              alt="Illustrative New Town-inspired avenue with contemporary Kolkata residential towers"
              className={styles.contactPhoto}
              eager
            />
            <div className={styles.contactInfo}>
              <div>
                <h2>Give us a call</h2>
                <a href="tel:+918697559123">+91 86975 59123</a>
              </div>
              <div>
                <h2>Write to us</h2>
                <a href="mailto:info@dreamkeykol.com">info@dreamkeykol.com</a>
              </div>
              <div className={styles.contactAddress}>
                <h2>Come by for a conversation</h2>
                <p>
                  AA 52, st-69, AA block, Newtown
                  <br />
                  Kolkata, West Bengal 700156
                </p>
                <a
                  className={styles.textLink}
                  href={OFFICE_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          <PropertyEnquiryForm
            initialPurpose={purpose}
            initialMessage={
              property
                ? "I’m looking for " +
                  property +
                  ". Please share current options and availability."
                : ""
            }
            key={purpose + "-" + property}
          />
        </div>
        <section className={styles.mapSection} aria-labelledby="contact-map">
          <div className={styles.mapHeading}>
            <h2 id="contact-map">Find us in New Town.</h2>
            <a
              className={styles.textLink}
              href={OFFICE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <ContactMap />
        </section>
      </div>
    </div>
  );
}
