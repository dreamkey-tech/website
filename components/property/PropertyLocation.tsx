"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "@phosphor-icons/react";
import styles from "./Property.module.css";

export default function PropertyLocation({
  neighbourhood,
  location,
  city = "Kolkata",
}: {
  neighbourhood: string;
  location: string;
  city?: string;
}) {
  const [showMap, setShowMap] = useState(false);
  const query = encodeURIComponent(`${neighbourhood}, ${city}`);
  return (
    <section
      id="location"
      className={styles.section}
      aria-labelledby="location-title"
    >
      <h2 id="location-title">
        Get to know <em>the neighbourhood.</em>
      </h2>
      <p className={styles.locationAddress}>
        <MapPin size="1.1875rem" aria-hidden="true" />
        {location}
      </p>
      <div className={styles.mapFrame}>
        {showMap ? (
          <iframe
            title={`Neighbourhood map of ${neighbourhood}, ${city}`}
            src={`https://maps.google.com/maps?q=${query}&z=13&output=embed`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src="/images/pages/contact-kolkata.webp"
              alt="Illustrative Kolkata residential avenue, not the property's exact location"
              fill
              sizes="(max-width: 767px) 100vw, 60vw"
            />
            <button
              type="button"
              className={styles.mapButton}
              onClick={() => setShowMap(true)}
            >
              <MapPin size="1.125rem" aria-hidden="true" />
              Explore the neighbourhood
            </button>
          </>
        )}
      </div>
      <p className={styles.areaNote}>
        Area overview only, not an exact property pin. Ask our team for the site
        address and nearby transport, schools and hospitals.
      </p>
      <a
        className={styles.textLink}
        href={`https://www.google.com/maps/search/?api=1&query=${query}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open neighbourhood in Google Maps
        <ArrowUpRight size="1.0625rem" aria-hidden="true" />
        <span className={styles.srOnly}> (opens in a new tab)</span>
      </a>
    </section>
  );
}
