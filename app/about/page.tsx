import type { Metadata } from "next";
import Image from "next/image";
import { connection } from "next/server";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import PagePhoto from "@/components/pages/PagePhoto";
import PageCTA from "@/components/pages/PageCTA";
import OfficeGallery from "@/components/about/OfficeGallery";
import photoStyles from "@/components/about/AboutPhotos.module.css";
import styles from "@/components/pages/Interior.module.css";

export const metadata: Metadata = {
  icons: { icon: "/images/pages/favicon.png" },
  title: "About our Kolkata team | Dream Key Reality",
  description:
    "Meet the founders of Dream Key Reality, a client-focused real estate consultancy in Kolkata helping buyers, sellers, tenants, owners, and investors.",
};

const founders = [
  {
    name: "Sayan Dutta",
    role: "Founder",
    image: "/about/sayan-portrait.webp",
    imagePosition: "50% 35%",
    bio: "A passion for Kolkata’s property landscape and helping people find a place that feels right.",
  },
  {
    name: "Mainak Maji",
    role: "Co-Founder",
    image: "/about/mainak.webp",
    imagePosition: "center bottom",
    bio: "Focused on luxury properties and building relationships that continue beyond a single transaction.",
  },
  {
    name: "Siddhant Singh",
    role: "Co-Founder",
    image: "/about/siddhant-portrait.webp",
    imagePosition: "50% 65%",
    bio: "Committed to clear communication and a considered, transparent property journey.",
  },
];

export default async function AboutPage() {
  await connection();
  return (
    <div className={styles.page} id="page-content">
      <div className={styles.container}>
        <section className={styles.hero} aria-labelledby="about-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>The people behind your next move</p>
            <h1 className={styles.title} id="about-title">
              Real estate.
              <br />
              Built around
              <br />
              <em>real people.</em>
            </h1>
            <p className={styles.lead}>
              We’re Dream Key Reality, a Kolkata real estate consultancy. We
              bring personal guidance to one of life’s most important decisions:
              where you go next.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/contact">
                Get to know us
                <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
              <a className={styles.textLink} href="#our-founders">
                Meet the founders
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <PagePhoto
            src="/about/office-meeting-room.webp"
            alt="Dream Key’s Kolkata office meeting area with a shared desk, seating and wood-panelled wall"
            caption="Inside our Kolkata office"
            className={photoStyles.officeHero}
            eager
          />
        </section>
        <section
          className={styles.section + " " + styles.story}
          aria-labelledby="about-story"
        >
          <div>
            <p className={styles.eyebrow}>Our point of view</p>
            <h2 className={styles.sectionTitle} id="about-story">
              The right property
              <br />
              starts with the
              <br />
              <em>right conversation.</em>
            </h2>
          </div>
          <div className={styles.storyCopy}>
            <p>
              A first home, a new rental, a sale, or an investment. Every
              property journey begins with a different story. Our job is to
              listen before we start looking.
            </p>
            <p>
              We work with buyers, sellers, tenants, owners, and investors
              across Kolkata. Local understanding and personal attention help us
              turn a broad search into a clearer set of possibilities.
            </p>
            <p>
              From the first shortlist to the questions along the way, we aim to
              make the process feel understandable, considered, and built around
              your needs.
            </p>
          </div>
        </section>
        <section
          className={styles.section + " " + styles.principles}
          aria-label="How we work"
        >
          {[
            {
              title: "Your priorities come first",
              copy: "We begin with your plans, your budget, and your day-to-day life. The property search follows from there.",
            },
            {
              title: "Clarity at every step",
              copy: "Straightforward conversations, practical information, and space to ask questions help you make decisions with confidence.",
            },
            {
              title: "A relationship, not a handover",
              copy: "A property journey can take time. We stay approachable and keep the conversation going as your needs evolve.",
            },
          ].map((item) => (
            <div className={styles.principleRow} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          ))}
        </section>
        <OfficeGallery />
        <section
          className={styles.section}
          id="our-founders"
          aria-labelledby="founder-title"
        >
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Meet the founders</p>
              <h2 className={styles.sectionTitle} id="founder-title">
                A shared city.
                <br />A personal <em>commitment.</em>
              </h2>
            </div>
            <p className={styles.lead}>
              The team behind Dream Key Reality, bringing people and property
              together with care.
            </p>
          </div>
          <div className={styles.founders}>
            {founders.map((founder) => (
              <article key={founder.name}>
                <div className={styles.founderPhoto}>
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    style={{ objectPosition: founder.imagePosition }}
                    fill
                    sizes="(max-width: 520px) 100vw, (max-width: 1440px) 33vw, 424px"
                  />
                </div>
                <h3>{founder.name}</h3>
                <p className={styles.founderRole}>{founder.role}</p>
                <p className={styles.founderBio}>{founder.bio}</p>
              </article>
            ))}
          </div>
        </section>
        <PageCTA
          title="Let’s start with your story."
          copy="Tell us what you’re looking for, even if you’re still figuring it out."
        />
      </div>
    </div>
  );
}
