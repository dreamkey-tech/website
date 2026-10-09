import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { PropertyService } from "./services-content";
import styles from "./Services.module.css";

export default function ServiceCard({ service }: { service: PropertyService }) {
  return (
    <article className={styles.service} aria-labelledby={`${service.id}-title`}>
      <div className={styles.servicePhoto}>
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1440px) 50vw, 640px"
        />
      </div>
      <p className={styles.serviceCategory}>{service.category}</p>
      <h3 id={`${service.id}-title`}>{service.title}</h3>
      <p>{service.description}</p>
      <Link className={styles.serviceLink} href={service.href}>
        <span>{service.linkLabel}</span>
        <ArrowRight size={20} aria-hidden="true" />
      </Link>
    </article>
  );
}
