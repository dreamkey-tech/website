import type { Metadata } from "next";
// import Image from "next/image"; // Restore with the intro section below.
import { connection } from "next/server";
import RentalBrowser from "@/components/pages/RentalBrowser";
import PageCTA from "@/components/pages/PageCTA";
import styles from "@/components/pages/Interior.module.css";

export const metadata: Metadata = {
  icons: { icon: "/images/pages/favicon.png" },
  title: "Find a rental in Kolkata | Dream Key Reality",
  description:
    "Explore your next rental home in Kolkata with Dream Key Reality. Share your neighbourhood, budget, and lifestyle preferences with our team.",
};

export default async function RentPage() {
  await connection();
  return (
    <div className={styles.page} id="page-content">
      <div className={styles.container}>
        <h1 className={styles.srOnly} id="rent-title">
          Rental homes in Kolkata
        </h1>
        {/* Temporarily hidden intro. To restore: remove the hidden h1 above, uncomment this section and restore the Image import.
        <section aria-labelledby="rent-title">
          <div className={styles.rentIntro}>
            <div>
              <p className={styles.eyebrow}>Rent in Kolkata</p>
              <h1 className={styles.title} id="rent-title">
                A home for the way
                <br />
                you <em>live.</em>
              </h1>
            </div>
            <p className={styles.lead}>
              Closer to work. Room for the family. A neighbourhood that feels
              like you. Let’s find a place that fits your everyday.
            </p>
          </div>
          <div className={styles.rentPhoto}>
            <Image
              src="/images/pages/rent-living.webp"
              alt="Illustrative sunlit apartment with a comfortable living room and Kolkata-inspired skyline"
              fill
              sizes="(max-width: 1400px) 100vw, 1328px"
              loading="eager"
              fetchPriority="high"
            />
            <span className={styles.rentPhotoCaption}>
              Settle into your kind of Kolkata
            </span>
          </div>
        </section>
        */}
        <RentalBrowser />
        <PageCTA
          title="Still finding your neighbourhood?"
          copy="Tell us about your routine, your budget, and the things that make a home feel right."
          label="Help me find a home"
          href="/contact?purpose=rent"
        />
      </div>
    </div>
  );
}
