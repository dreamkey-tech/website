import Image from "next/image";
import interior from "@/components/pages/Interior.module.css";
import styles from "./AboutPhotos.module.css";
import { OFFICE_GALLERY_PHOTOS } from "./office-gallery-photos";

export default function OfficeGallery() {
  return (
    <section
      className={interior.section}
      aria-labelledby="office-gallery-title"
    >
      <div className={styles.intro}>
        <h2 className={interior.sectionTitle} id="office-gallery-title">
          A place for <em>real conversations.</em>
        </h2>
        <p>
          A look inside our Kolkata office, and the Dream Key sign that welcomes
          you outside.
        </p>
      </div>
      <div className={styles.gallery}>
        {OFFICE_GALLERY_PHOTOS.map((photo) => (
          <figure
            className={`${styles.photo} ${photo.layout === "wide" ? styles.photoWide : styles.photoCompact}`}
            key={photo.src}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={
                photo.layout === "wide"
                  ? "(max-width: 640px) calc(100vw - 40px), (max-width: 900px) 50vw, (max-width: 1440px) 58vw, 800px"
                  : "(max-width: 640px) calc(100vw - 40px), (max-width: 900px) 50vw, (max-width: 1440px) 42vw, 570px"
              }
              style={{ objectPosition: photo.position }}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
