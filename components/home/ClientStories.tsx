import TestimonialSlider from "./TestimonialSlider";
import styles from "./Landing.module.css";

export default function ClientStories() {
  return (
    <section
      id="testimonials"
      className={styles.stories}
      aria-labelledby="stories-heading"
    >
      <div className={styles.storiesHeading}>
        <h2 id="stories-heading" className={styles.title}>
          Every move
          <br />
          has a <em>story.</em>
        </h2>
        <p className={styles.sectionIntro}>
          A home is personal. So is the journey to finding it.
        </p>
        <p className={styles.sampleNote}>
          Sample testimonials for design preview. Client confirmation pending.
        </p>
      </div>
      <TestimonialSlider />
    </section>
  );
}
