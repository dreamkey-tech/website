import Image from "next/image";
import styles from "./Interior.module.css";

export default function PagePhoto({
  src,
  alt,
  caption,
  eager = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <figure className={`${styles.photo} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 800px) 100vw, (max-width: 1440px) 55vw, 760px"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
