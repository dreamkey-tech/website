import { pageMetadata } from "@/lib/seo";
import { pageSchema } from "@/lib/page-schema";
import JsonLd from "@/components/seo/JsonLd";
import { connection } from "next/server";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import PagePhoto from "@/components/pages/PagePhoto";
import PageFAQ from "@/components/pages/PageFAQ";
import PropertyEnquiryForm from "@/components/pages/PropertyEnquiryForm";
import styles from "@/components/pages/Interior.module.css";

export const metadata = pageMetadata("/sell");

const steps = [
  {
    title: "Understand your home",
    copy: "We start with your property’s location, size, condition, expected price and the timeline you have in mind.",
  },
  {
    title: "Make the right introduction",
    copy: "We share property information with relevant buyers, local brokers and consultants, then discuss suitable viewings with you.",
  },
  {
    title: "Stay supported",
    copy: "Get guidance on enquiries, offers and documentation as you consider the next steps. A buyer or completed sale cannot be guaranteed.",
  },
];

export default async function SellPage() {
  await connection();
  return (
    <div className={styles.page} id="page-content">
      <JsonLd id="dreamkey-sell-page" data={pageSchema("/sell")} />
      <div className={styles.container}>
        <section className={styles.hero} aria-labelledby="sell-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Sell property in Kolkata</p>
            <h1 className={styles.title} id="sell-title">
              Your next chapter
              <br />
              starts with a<br />
              <em>thoughtful sale.</em>
            </h1>
            <p className={styles.lead}>
              Planning to sell property in Kolkata? We share your property
              details through our broker and consultant network to help reach
              potential buyers.
            </p>
            <div className={styles.heroActions}>
              <a
                className={styles.primaryButton}
                href="#property-consultation"
                data-analytics-event="cta_click"
                data-cta-name="sell_primary"
                data-component-name="sell_primary"
              >
                Let’s discuss your property
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
              <Link className={styles.textLink} href="/about">
                Meet your team
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <PagePhoto
            src="/images/pages/sell-residence.webp"
            alt="Illustrative elegant Kolkata-inspired apartment with large windows and a spacious lounge"
            caption="A considered approach to every home"
            eager
          />
        </section>
        <section className={styles.section} aria-labelledby="sell-process">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>A clear path forward</p>
              <h2 className={styles.sectionTitle} id="sell-process">
                From your first conversation
                <br />
                to your <em>next chapter.</em>
              </h2>
            </div>
            <p className={styles.lead}>
              Local connections, clear property information, and practical
              selling support around your priorities.
            </p>
          </div>
          <div className={styles.process}>
            {steps.map((step, index) => (
              <div key={step.title}>
                <span className={styles.processNumber}>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            ))}
          </div>
        </section>
        <section
          className={styles.section + " " + styles.consultation}
          id="property-consultation"
          aria-labelledby="sell-consultation"
        >
          <div className={styles.consultationCopy}>
            <p className={styles.eyebrow}>Begin with a conversation</p>
            <h2 className={styles.sectionTitle} id="sell-consultation">
              Let’s find the right
              <br />
              way <em>forward.</em>
            </h2>
            <p className={styles.lead}>
              Whether you’re ready to list or just exploring your options, tell
              us a little about your property. We’ll help you work through the
              possibilities.
            </p>
            <a className={styles.textLink} href="tel:+917980133881">
              Prefer a call? +91 79801 33881
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <PropertyEnquiryForm variant="sell" />
        </section>
        <section
          className={styles.section + " " + styles.faqLayout}
          aria-labelledby="sell-questions"
        >
          <div>
            <p className={styles.eyebrow}>Good questions, clear answers</p>
            <h2 className={styles.sectionTitle} id="sell-questions">
              Before you
              <br />
              <em>begin.</em>
            </h2>
          </div>
          <PageFAQ
            items={[
              {
                question: "Can I talk to you before deciding to sell?",
                answer:
                  "Absolutely. Start with a conversation about your plans, your property, and the questions you’d like answered. You don’t need to have a listing ready.",
              },
              {
                question: "What details should I share first?",
                answer:
                  "The location, property type, size, bedroom count, and society name are a helpful start. You can also share your expected price and preferred timeline.",
              },
              {
                question: "How will viewings be arranged?",
                answer:
                  "We’ll discuss suitable viewing times with you and coordinate visits around your schedule. Tell us about any access requirements at the outset.",
              },
              {
                question: "Do you help owners who live outside Kolkata?",
                answer:
                  "If you live elsewhere, start by sharing your property details remotely. We can then discuss access, documentation and communication around your circumstances.",
              },
            ]}
          />
        </section>
      </div>
    </div>
  );
}
