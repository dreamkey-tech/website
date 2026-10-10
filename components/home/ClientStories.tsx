import TestimonialSlider from "./TestimonialSlider";
import styles from "./ClientStories.module.css";

export default function ClientStories() {
  return (
    <section
      id="testimonials"
      data-nosnippet
      className={styles.section}
      aria-labelledby="stories-heading"
    >
      <div className={styles.heading}>
        <h2 id="stories-heading">
          Every move has a <em>story.</em>
        </h2>
        <p>A home is personal. So is the journey to finding it.</p>
      </div>
      <TestimonialSlider />
      <p className={styles.sampleNote}>
        Sample testimonials for design preview. Client confirmation pending.
      </p>
    </section>
  );
}
