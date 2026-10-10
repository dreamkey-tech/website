import DesignGalleryCard, { type DesignGalleryItem } from "./DesignGalleryCard";
import styles from "./DesignGallery.module.css";

const homes: DesignGalleryItem[] = [
  {
    image: "/images/design-gallery/villa-charcoal.webp",
    alt: "Illustrative charcoal and stone residence with a glass balcony and sloping roof.",
    title: "Private villas",
    href: "/buy",
  },
  {
    image: "/images/design-gallery/villa-ivory.webp",
    alt: "Illustrative ivory residence with angular walls and recessed windows.",
    title: "Modern residences",
    href: "/buy",
  },
  {
    image: "/images/design-gallery/designer-interior.webp",
    alt: "Illustrative apartment interior with a sculptural black lounge chair and a side table.",
    title: "Designer apartments",
    href: "/buy",
  },
  {
    image: "/images/design-gallery/villa-timber.webp",
    alt: "Illustrative contemporary residence with timber cladding and dark framed windows.",
    title: "Family homes",
    href: "/buy",
  },
];

export default function DesignGallery() {
  return (
    <section id="designer-apartments" className={styles.section} aria-labelledby="design-apartments-heading">
      <h2 id="design-apartments-heading" className="sr-only">Homes by design</h2>
      <ul className={styles.gallery}>
        {homes.map((home) => (
          <li className={styles.item} key={home.image}><DesignGalleryCard {...home} /></li>
        ))}
      </ul>
    </section>
  );
}
