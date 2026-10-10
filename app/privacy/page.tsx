import { pageMetadata } from "@/lib/seo";
import { connection } from "next/server";
import LegalDocument from "@/components/pages/LegalDocument";
import styles from "@/components/pages/LegalDocument.module.css";

export const metadata = pageMetadata("/privacy");

const sections = [
  {
    id: "section-1",
    title: "1. Information We Collect",
  },
  {
    id: "section-2",
    title: "2. How We Use Your Information",
  },
  {
    id: "section-3",
    title: "3. Sharing of Information",
  },
  {
    id: "section-4",
    title: "4. Cookies and Analytics",
  },
  {
    id: "section-5",
    title: "5. Data Security",
  },
  {
    id: "section-6",
    title: "6. Data Retention",
  },
  {
    id: "section-7",
    title: "7. Third-Party Links",
  },
  {
    id: "section-8",
    title: "8. Your Rights",
  },
  {
    id: "section-9",
    title: "9. Children's Privacy",
  },
  {
    id: "section-10",
    title: "10. Changes to This Privacy Policy",
  },
  {
    id: "section-11",
    title: "11. Contact Us",
  },
];

export default async function PrivacyPolicyPage() {
  await connection();
  return (
    <LegalDocument
      kind="privacy"
      title={
        <>
          Privacy <em>Policy</em>
        </>
      }
      updated="October 1, 2026"
      sections={sections}
    >
      <div>
        <p>
          DreamKey Reality (“DreamKey Reality,” “we,” “us,” or “our”) respects
          your privacy and is committed to protecting the personal information
          you share with us.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, store, and protect
          information when you visit or use our website and related services.
        </p>
      </div>

      <section id="section-1">
        <h2>1. Information We Collect</h2>
        <p>
          We may collect information that you voluntarily provide to us,
          including:
        </p>
        <ul>
          <li>Name</li>
          <li>Phone number</li>
          <li>Email address</li>
          <li>Property requirements and preferences</li>
          <li>Information submitted through contact or enquiry forms</li>
          <li>Property-related information submitted by owners or partners</li>
          <li>
            Any other information you choose to provide when communicating with
            us
          </li>
        </ul>
        <p>
          We may also automatically collect basic technical information such as
          your IP address, browser type, device information, pages visited, and
          general website usage information.
        </p>
      </section>

      <section id="section-2">
        <h2>2. How We Use Your Information</h2>
        <p>We may use the information we collect to:</p>
        <ul>
          <li>Respond to your enquiries and requests</li>
          <li>Help you find or evaluate properties</li>
          <li>Provide real-estate consulting and related services</li>
          <li>Contact you regarding properties, services, or enquiries</li>
          <li>
            Communicate with property owners, brokers, or relevant partners
            where necessary to provide requested services
          </li>
          <li>Improve our website, services, and customer experience</li>
          <li>Maintain website security and prevent misuse</li>
          <li>Comply with applicable legal and regulatory requirements</li>
        </ul>
      </section>

      <section id="section-3">
        <h2>3. Sharing of Information</h2>
        <p>DreamKey Reality does not sell or rent your personal information.</p>
        <p>
          We may share relevant information with trusted service providers,
          property owners, brokers, developers, professional advisors, or other
          parties when reasonably necessary to provide a service you have
          requested or to operate our business.
        </p>
        <p>
          We may also disclose information when required by applicable law,
          regulation, legal process, or a lawful government request.
        </p>
      </section>

      <section id="section-4">
        <h2>4. Cookies and Analytics</h2>
        <p>
          Our website may use cookies and similar technologies to improve
          website functionality, understand website usage, and enhance your
          experience.
        </p>
        <p>
          We may also use third-party analytics or website services that collect
          information about how visitors interact with our website.
        </p>
        <p>
          You can control or disable cookies through your browser settings,
          although some website features may not function properly as a result.
        </p>
      </section>

      <section id="section-5">
        <h2>5. Data Security</h2>
        <p>
          We take reasonable technical and organizational measures to protect
          your personal information from unauthorized access, misuse,
          alteration, disclosure, or destruction.
        </p>
        <p>
          However, no method of transmitting or storing information online can
          be guaranteed to be completely secure.
        </p>
      </section>

      <section id="section-6">
        <h2>6. Data Retention</h2>
        <p>
          We retain personal information only for as long as reasonably
          necessary for the purposes described in this Privacy Policy, to
          provide our services, maintain business records, resolve disputes, or
          comply with applicable legal requirements.
        </p>
      </section>

      <section id="section-7">
        <h2>7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites or services.
        </p>
        <p>
          DreamKey Reality is not responsible for the privacy practices,
          security, or content of third-party websites. We recommend reviewing
          their privacy policies before providing them with personal
          information.
        </p>
      </section>

      <section id="section-8">
        <h2>8. Your Rights</h2>
        <p>
          Depending on applicable law, you may have rights relating to your
          personal information, including the right to request access,
          correction, updating, or deletion of certain information.
        </p>
        <p>
          To make a privacy-related request, please contact us using the details
          below.
        </p>
      </section>

      <section id="section-9">
        <h2>9. Children&apos;s Privacy</h2>
        <p>
          Our website is not intentionally designed to collect personal
          information from children. If you believe that a child has provided us
          with personal information without appropriate consent, please contact
          us so that we can take appropriate action.
        </p>
      </section>

      <section id="section-10">
        <h2>10. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our business, services, technology, or applicable legal
          requirements.
        </p>
        <p>
          Any updated version will be published on this page with a revised
          “Last Updated” date.
        </p>
      </section>

      <section id="section-11">
        <h2>11. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or how DreamKey
          Reality handles personal information, please contact us:
        </p>

        <div className={styles.contact}>
          <h3>DreamKey Reality</h3>
          <ul>
            <li>
              <span>Email:</span>
              <a href="mailto:contact@dreamkeykol.com">
                contact@dreamkeykol.com
              </a>
            </li>
            <li>
              <span>Phone:</span>
              <a href="tel:+918697559123">+91 86975 59123</a>
            </li>
            <li>
              <span>Website:</span>
              <a
                href="https://dreamkeykol.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://dreamkeykol.com
              </a>
            </li>
            <li>
              <span>Address:</span>
              <span>
                AA 52 , st-69, AA block, Newtown ,kolkata -700156, Kolkata, West
                Bengal 700156
              </span>
            </li>
          </ul>
        </div>
      </section>
    </LegalDocument>
  );
}
