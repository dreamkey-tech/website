"use client";

import Image from "next/image";
import ListingImage from "./ListingImage";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, SquaresFour, X } from "@phosphor-icons/react";
import type { PropertyPhoto } from "./property-data";
import styles from "./Property.module.css";

export default function PropertyGallery({
  photos,
  title,
  illustrative = true,
}: {
  photos: PropertyPhoto[];
  title: string;
  illustrative?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function show(index: number) {
    setActive(index);
    setOpen(true);
    dialog.current?.showModal();
  }
  function move(direction: number) {
    setActive((index) => (index + direction + photos.length) % photos.length);
  }

  if (!photos.length)
    return (
      <div className={`${styles.gallery} ${styles.noPhotos}`}>
        <ListingImage src={null} alt="" sizes="100vw" />
      </div>
    );

  return (
    <section
      className={styles.gallerySection}
      aria-label={`${title} ${illustrative ? "illustrative " : ""}photos`}
    >
      <div className={styles.gallery} data-count={Math.min(photos.length, 5)}>
        {photos.slice(0, 5).map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className={styles.photo}
            onClick={() => show(index)}
            aria-label={`Open ${photo.label.toLowerCase()} photo of ${title}`}
          >
            <ListingImage
              src={photo.src}
              alt={photo.alt}
              sizes={
                photos.length === 1
                  ? "(max-width: 1479px) 100vw, (max-width: 1920px) 90vw, 1728px"
                  : photos.length === 2 || (index === 0 && photos.length >= 5)
                    ? "(max-width: 767px) 100vw, (max-width: 1479px) 50vw, (max-width: 1920px) 45vw, 864px"
                    : index === 0
                      ? "(max-width: 767px) 100vw, (max-width: 1479px) 67vw, (max-width: 1920px) 60vw, 1152px"
                      : photos.length < 5
                        ? "(max-width: 1479px) 33vw, (max-width: 1920px) 30vw, 576px"
                        : "(max-width: 1479px) 25vw, (max-width: 1920px) 23vw, 432px"
              }
              eager={index === 0}
            />
            <span className={styles.photoLabel}>{photo.label}</span>
          </button>
        ))}
        <button
          className={styles.allPhotos}
          type="button"
          onClick={() => show(0)}
        >
          <SquaresFour size="1.0625rem" aria-hidden="true" />
          View all {photos.length} photos
        </button>
      </div>
      <p className={styles.photoNote}>
        {illustrative
          ? "Illustrative images, not photographs of a specific available unit."
          : "Images supplied with the listing. Confirm the property’s current condition with our team."}
      </p>
      <dialog
        ref={dialog}
        className={styles.lightbox}
        aria-labelledby="gallery-title"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div className={styles.lightboxHeader}>
          <div>
            <h2 id="gallery-title">{title}</h2>
            <p>{illustrative ? "Illustrative gallery" : "Property gallery"}</p>
          </div>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close photo gallery"
          >
            <X size="1.5rem" />
          </button>
        </div>
        <div className={styles.lightboxImage}>
          <ListingImage
            key={photos[active].src}
            src={photos[active].src}
            alt={photos[active].alt}
            sizes="95vw"
          />
        </div>
        <div className={styles.lightboxControls}>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous photo"
          >
            <ArrowLeft size="1.375rem" />
          </button>
          <p aria-live="polite">
            {photos[active].label}
            <span>
              Photo {active + 1} of {photos.length}
            </span>
          </p>
          <button type="button" onClick={() => move(1)} aria-label="Next photo">
            <ArrowRight size="1.375rem" />
          </button>
        </div>
        <div className={styles.thumbnails} aria-label="Choose a photo">
          {photos.map((photo, index) => (
            <button
              type="button"
              key={photo.src}
              aria-label={`Show ${photo.label.toLowerCase()}`}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(min-width: 1480px) 96px, 80px"
              />
            </button>
          ))}
        </div>
      </dialog>
    </section>
  );
}
