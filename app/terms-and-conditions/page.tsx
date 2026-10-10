import { pageMetadata } from "@/lib/seo";
import { connection } from "next/server";
import Link from "next/link";
import LegalDocument from "@/components/pages/LegalDocument";
import styles from "@/components/pages/LegalDocument.module.css";

export const metadata = pageMetadata("/terms-and-conditions");

const sections = [
  {
    id: "section-1",
    title: "1. About DreamKey Reality",
  },
  {
    id: "section-2",
    title: "2. Use of Our Website",
  },
  {
    id: "section-3",
    title: "3. Property Information and Listings",
  },
  {
    id: "section-4",
    title: "4. No Guarantee of Transactions or Returns",
  },
  {
    id: "section-5",
    title: "5. Property Verification and Due Diligence",
  },
  {
    id: "section-6",
    title: "6. Brokerage, Consultancy Fees, and Other Charges",
  },
  {
    id: "section-7",
    title: "7. User Enquiries and Communication",
  },
  {
    id: "section-8",
    title: "8. Third-Party Services and Relationships",
  },
  {
    id: "section-9",
    title: "9. Intellectual Property",
  },
  {
    id: "section-10",
    title: "10. Limitation of Liability",
  },
  {
    id: "section-11",
    title: "11. Indemnity",
  },
  {
    id: "section-12",
    title: "12. Privacy and Data Protection",
  },
  {
    id: "section-13",
    title: "13. External Links",
  },
  {
    id: "section-14",
    title: "14. Changes to These Terms",
  },
  {
    id: "section-15",
    title: "15. Governing Law and Jurisdiction",
  },
  {
    id: "section-16",
    title: "16. Contact Us",
  },
];

export default async function TermsAndConditionsPage() {
  await connection();
  return (
    <LegalDocument
      kind="terms"
      title={
        <>
          Terms &amp; <em>Conditions</em>
        </>
      }
      updated="October 4, 2026"
      sections={sections}
    >
      <div>
        <p>
          Welcome to DreamKey Reality. These Terms & Conditions (“Terms”) govern
          your access to and use of our website and the real-estate-related
          information and services provided by DreamKey Reality (“DreamKey,”
          “we,” “us,” or “our”).
        </p>
        <p>
          By accessing or using our website, you agree to these Terms. If you do
          not agree with these Terms, please discontinue using the website.
        </p>
      </div>

      <section id="section-1">
        <h2>1. About DreamKey Reality</h2>
        <p>
          DreamKey Reality provides real-estate consultancy and related
          services, which may include property discovery, buying and selling
          assistance, rental and leasing assistance, property marketing, and
          coordination between prospective clients, property owners, brokers,
          and other relevant parties.
        </p>
        <p>
          The specific services available may vary depending on the property,
          location, and individual arrangement.
        </p>
      </section>

      <section id="section-2">
        <h2>2. Use of Our Website</h2>
        <p>
          You agree to use our website only for lawful purposes. You must not:
        </p>
        <ul>
          <li>Submit false, misleading, or fraudulent information.</li>
          <li>Use the website for any unlawful activity.</li>
          <li>
            Attempt to gain unauthorized access to our systems or information.
          </li>
          <li>
            Copy, distribute, or misuse website content without permission.
          </li>
          <li>
            Interfere with the operation, security, or functionality of the
            website.
          </li>
          <li>
            Use our contact details or enquiry facilities to send spam or harass
            others.
          </li>
        </ul>
        <p>
          We reserve the right to restrict access to our website where
          reasonably necessary to protect our business, users, or systems.
        </p>
      </section>

      <section id="section-3">
        <h2>3. Property Information and Listings</h2>
        <p>
          Property details displayed on our website, including photographs,
          descriptions, prices, locations, sizes, availability, amenities, and
          other specifications, are provided for general informational purposes.
        </p>
        <p>
          Property information may be supplied by owners, developers, brokers,
          or other third parties. Although we aim to provide accurate and
          up-to-date information, we do not guarantee that every listing is
          complete, current, or error-free.
        </p>
        <p>
          Property availability, pricing, specifications, and other details may
          change without notice. Users should independently verify all relevant
          information before making a property-related decision.
        </p>
      </section>

      <section id="section-4">
        <h2>4. No Guarantee of Transactions or Returns</h2>
        <p>
          Our website and services are intended to assist users in exploring
          real-estate opportunities. We do not guarantee that:
        </p>
        <ul>
          <li>A particular property will remain available.</li>
          <li>A transaction will be completed successfully.</li>
          <li>
            A property will increase in value or generate a particular return.
          </li>
          <li>
            Financing, approvals, possession, or other transaction requirements
            will be secured.
          </li>
        </ul>
        <p>
          Any investment decision should be based on your own assessment and
          appropriate professional advice.
        </p>
      </section>

      <section id="section-5">
        <h2>5. Property Verification and Due Diligence</h2>
        <p>
          Before purchasing, renting, leasing, or investing in a property, users
          should independently verify relevant information, including:
        </p>
        <ul>
          <li>Ownership and title documents.</li>
          <li>Applicable land-use permissions and building approvals.</li>
          <li>Encumbrances, disputes, and other legal restrictions.</li>
          <li>Applicable registrations and regulatory requirements.</li>
          <li>
            Taxes, maintenance charges, fees, and other financial obligations.
          </li>
          <li>
            The property&apos;s physical condition, measurements, and actual
            availability.
          </li>
        </ul>
        <p>
          Where appropriate, consult a qualified property lawyer, financial
          adviser, surveyor, or other professional.
        </p>
        <p>
          Unless expressly agreed in a separate written agreement, DreamKey
          Reality does not replace independent legal, financial, technical, or
          title verification.
        </p>
      </section>

      <section id="section-6">
        <h2>6. Brokerage, Consultancy Fees, and Other Charges</h2>
        <p>
          Any brokerage, consultancy fee, commission, service charge, or other
          payment applicable to a transaction will be communicated separately,
          where applicable, and should be agreed upon by the relevant parties
          before the service or transaction proceeds.
        </p>
        <p>
          Users should request clarification of applicable fees, payment terms,
          taxes, and refund conditions before making any payment.
        </p>
        <p>
          No fee or commission should be assumed solely from the information
          published on our website.
        </p>
      </section>

      <section id="section-7">
        <h2>7. User Enquiries and Communication</h2>
        <p>
          When you submit an enquiry, contact form, or property requirement, you
          agree to provide information that is accurate to the best of your
          knowledge.
        </p>
        <p>
          You authorize DreamKey Reality to use the contact information you
          provide to respond to your enquiry and communicate with you about
          relevant services or properties, subject to applicable law and our
          Privacy Policy.
        </p>
        <p>
          Submitting an enquiry does not create a brokerage agreement, agency
          relationship, or obligation to complete a transaction unless
          separately agreed.
        </p>
      </section>

      <section id="section-8">
        <h2>8. Third-Party Services and Relationships</h2>
        <p>
          Our services may involve communication or coordination with property
          owners, developers, brokers, banks, legal professionals, or other
          third parties.
        </p>
        <p>
          Such third parties may operate independently and may have their own
          terms, policies, and obligations. Unless expressly agreed otherwise in
          writing, DreamKey Reality is not responsible for their independent
          conduct, representations, services, or decisions.
        </p>
        <p>
          Any transaction-specific obligations should be documented in the
          relevant agreement between the parties.
        </p>
      </section>

      <section id="section-9">
        <h2>9. Intellectual Property</h2>
        <p>
          Unless otherwise stated, website content, branding, logos, text,
          graphics, design elements, and other materials belonging to DreamKey
          Reality are protected by applicable intellectual property laws.
        </p>
        <p>
          You may view and use this content for personal, non-commercial
          informational purposes. You must not reproduce, modify, distribute,
          publish, or commercially exploit our content without prior written
          permission, except where permitted by law.
        </p>
        <p>
          Property photographs, logos, and materials belonging to third parties
          remain subject to their respective rights.
        </p>
      </section>

      <section id="section-10">
        <h2>10. Limitation of Liability</h2>
        <p>
          To the extent permitted by applicable law, DreamKey Reality shall not
          be liable for losses arising from reliance on incomplete or outdated
          listing information, independent third-party conduct, temporary
          website unavailability, or decisions made without appropriate
          verification.
        </p>
        <p>
          Nothing in these Terms excludes or limits liability where such
          exclusion or limitation is prohibited by applicable law, including
          liability that cannot legally be waived.
        </p>
        <p>
          Any liability arising from a specific consultancy, brokerage, or
          property transaction will also be governed by the applicable written
          agreement and relevant law.
        </p>
      </section>

      <section id="section-11">
        <h2>11. Indemnity</h2>
        <p>
          To the extent permitted by applicable law, you agree to be responsible
          for losses or claims arising directly from your unlawful use of the
          website, fraudulent information, or infringement of another person&apos;s
          rights.
        </p>
        <p>
          This provision does not require you to indemnify DreamKey Reality for
          losses caused by our own unlawful conduct or where such an obligation
          is prohibited by law.
        </p>
      </section>

      <section id="section-12">
        <h2>12. Privacy and Data Protection</h2>
        <p>
          Your use of the website is also subject to our Privacy Policy, which
          explains how we collect, use, store, and disclose personal
          information.
        </p>
        <p>
          By using the website, you acknowledge that you have had the
          opportunity to review the Privacy Policy. Any consent required by
          applicable data protection law will be obtained separately where
          necessary.
        </p>
      </section>

      <section id="section-13">
        <h2>13. External Links</h2>
        <p>
          Our website may contain links to external websites or third-party
          platforms for convenience or informational purposes.
        </p>
        <p>
          We do not control all external websites and are not responsible for
          their content, availability, security, or privacy practices. Accessing
          such websites is at your own discretion.
        </p>
      </section>

      <section id="section-14">
        <h2>14. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time to reflect changes in our
          services, website, business practices, or applicable laws.
        </p>
        <p>
          Updated Terms will be published on this page with a revised “Last
          Updated” date. Your continued use of the website after updated Terms
          are published constitutes acceptance where recognized by applicable
          law.
        </p>
      </section>

      <section id="section-15">
        <h2>15. Governing Law and Jurisdiction</h2>
        <p>These Terms shall be governed by the laws of India.</p>
        <p>
          Subject to applicable law and the jurisdiction of any competent
          statutory or regulatory authority, disputes relating to these Terms
          shall be subject to the jurisdiction of the competent courts in{" "}
          <strong>Kolkata, West Bengal, India</strong>, where legally
          applicable.
        </p>
      </section>

      <section id="section-16">
        <h2>16. Contact Us</h2>
        <p>For questions about these Terms & Conditions, please contact us:</p>

        <div className={styles.contact}>
          <h3>DreamKey Reality</h3>
          <ul>
            <li>
              <div>
                <span>Email:</span>
                <a href="mailto:info@dreamkeykol.com">info@dreamkeykol.com</a>
              </div>
            </li>
            <li>
              <div>
                <span>Phone:</span>
                <a href="tel:+918697559123">+91 86975 59123</a>
              </div>
            </li>
            <li>
              <div>
                <span>Website:</span>
                <Link href="/">www.dreamkeykol.com</Link>
              </div>
            </li>
            <li>
              <div>
                <span>Business Address:</span>
                <span>
                  AA 52 , st-69, AA block, Newtown ,kolkata -700156, Kolkata,
                  West Bengal 700156
                </span>
              </div>
            </li>
          </ul>
        </div>

        <p>
          By continuing to use our website, you acknowledge that you have read
          and understood these Terms & Conditions.
        </p>
      </section>
    </LegalDocument>
  );
}
