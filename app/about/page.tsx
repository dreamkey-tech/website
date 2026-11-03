import { pageMetadata } from "@/lib/seo";
import { pageSchema } from "@/lib/page-schema";
import JsonLd from "@/components/seo/JsonLd";
import Image from "next/image";
import { connection } from "next/server";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import PagePhoto from "@/components/pages/PagePhoto";
import PageCTA from "@/components/pages/PageCTA";
import OfficeGallery from "@/components/about/OfficeGallery";
import photoStyles from "@/components/about/AboutPhotos.module.css";
import styles from "@/components/pages/Interior.module.css";

export const metadata = pageMetadata("/about");

const founders = [
  {
    name: "Sayan Dutta",
    linkedIn: "https://www.linkedin.com/in/sayan-dutta-1763b8250/",
    role: "Founder",
    image: "/about/sayan-portrait.webp",
    imagePosition: "50% 35%",
    bio: "A passion for Kolkata’s property landscape and helping people find a place that feels right.",
  },
  {
    name: "Mainak Maji",
    linkedIn: "https://www.linkedin.com/in/mainakdreamkey/",
    role: "Co-Founder",
    image: "/about/Mainak.webp",
    imagePosition: "center bottom",
    bio: "Focused on luxury properties and building relationships that continue beyond a single transaction.",
  },
  {
    name: "Siddhant Singh",
    linkedIn: "https://www.linkedin.com/in/siddhant-singh-5600a2308/",
    role: "Co-Founder",
    image: "/about/siddhantPortrait.webp",
    imagePosition: "50% 65%",
    bio: "Committed to clear communication and a considered, transparent property journey.",
  },
];

export default async function AboutPage() {
  await connection();
  return (
    <div className={styles.page} id="page-content">
      <JsonLd id="dreamkey-about-page" data={pageSchema("/about")} />
      <div className={styles.container}>
        <section className={styles.hero} aria-labelledby="about-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>About DreamkeyKol Reality LLP</p>
            <h1 className={styles.title} id="about-title">
              Real estate.
              <br />
              Built around
              <br />
              <em>real people.</em>
            </h1>
            <p className={styles.lead}>
              We’re DreamkeyKol Reality LLP, a Kolkata real estate consultancy.
              We connect your property plans with local knowledge, brokers and
              property consultants.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/contact">
                Get to know us
                <ArrowUpRightIcon size={19} aria-hidden="true" />
              </Link>
              <a className={styles.textLink} href="#our-founders">
                Meet the founders
                <ArrowUpRightIcon size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <PagePhoto
            src="/about/Joyful_Friends_in_Matching_Dream_Key_Polos.webp"
            alt="Three people in matching Dream Key polo shirts standing outdoors"
            caption="Our Team"
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
              We assist buyers, sellers, tenants, owners and investors in
              selected East, South and North Kolkata areas. Your location,
              budget and priorities guide the search.
            </p>
            <p>
              Buying, renting, selling or investing: we help you explore the
              options and relevant documentation steps, with guidance built
              around your requirements.
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
              The people behind DreamkeyKol Reality LLP, connecting customers
              with property opportunities and local expertise.
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
                <a
                  href={founder.linkedIn}
                  className={photoStyles.founderLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${founder.name} on LinkedIn (opens in a new tab)`}
                >
                  <LinkedinLogoIcon
                    size={18}
                    weight="fill"
                    aria-hidden="true"
                  />
                  LinkedIn
                  <ArrowUpRightIcon size={15} aria-hidden="true" />
                </a>
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
