import type { CSSProperties } from "react";
import { Quotes } from "@phosphor-icons/react/dist/ssr";
import type { ClientStory } from "./client-stories";
import styles from "./ClientStories.module.css";

export default function TestimonialCard({
  story,
  position,
  onSelect,
}: {
  story: ClientStory;
  position: number;
  onSelect: () => void;
}) {
  const active = position === 0;
  const visible = Math.abs(position) <= 1;

  return (
    <article
      className={styles.card}
      data-current={active}
      data-visible={visible}
      inert={!visible}
      style={
        {
          "--position": position,
          "--depth": Math.abs(position),
        } as CSSProperties
      }
    >
      <div className={styles.cardContent} aria-hidden={!active}>
        <div className={styles.author}>
          <span className={styles.initials} aria-hidden="true">
            {story.name
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </span>
          <div>
            <h3>{story.name}</h3>
            <p>{story.role}</p>
          </div>
        </div>
        <Quotes
          size={24}
          weight="light"
          className={styles.quoteIcon}
          aria-hidden="true"
        />
        <blockquote>“{story.quote}”</blockquote>
        <p className={styles.location}>{story.location}, Kolkata</p>
      </div>
      {!active && visible && (
        <button
          type="button"
          className={styles.selectCard}
          onClick={onSelect}
          aria-label={`Read testimonial from ${story.name}`}
        />
      )}
    </article>
  );
}
