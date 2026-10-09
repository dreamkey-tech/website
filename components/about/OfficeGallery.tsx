import Image from "next/image";
import interior from "@/components/pages/Interior.module.css";
import styles from "./AboutPhotos.module.css";

const officePhotos = [
  {
    src: "/about/office-workspace.webp",
    alt: "Dream Key office workspace with a desk, chairs, window and plants",
    position: "50% 70%",
  },
  {
    src: "/about/office-exterior.webp",
    alt: "Dream Key’s exterior sign with the key logo and the words Rent, Sale and Consultancy",
    position: "50% 75%",
  },
];

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
        {officePhotos.map((photo) => (
          <figure className={styles.photo} key={photo.src}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1440px) 50vw, 650px"
              style={{ objectPosition: photo.position }}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
