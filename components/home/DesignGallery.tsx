import DesignGalleryCard from "./DesignGalleryCard";
import DesignGalleryCarousel from "./DesignGalleryCarousel";
import { DESIGN_GALLERY_HOMES } from "./design-gallery-data";
import styles from "./DesignGallery.module.css";

export default function DesignGallery() {
  return (
    <section
      id="designer-apartments"
      className={styles.section}
      aria-labelledby="design-apartments-heading"
    >
      <h2 id="design-apartments-heading" className="sr-only">
        Homes by design
      </h2>
      <DesignGalleryCarousel count={DESIGN_GALLERY_HOMES.length}>
        {DESIGN_GALLERY_HOMES.map((home) => (
          <li className={styles.item} key={home.image}>
            <DesignGalleryCard {...home} />
          </li>
        ))}
      </DesignGalleryCarousel>
    </section>
  );
}
