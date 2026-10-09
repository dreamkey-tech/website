import { ChatCircle, Buildings, Users } from "@phosphor-icons/react/dist/ssr";
import { serviceApproach } from "./services-content";
import interior from "@/components/pages/Interior.module.css";
import styles from "./Services.module.css";

const approachIcons = [ChatCircle, Buildings, Users];

export default function ServicesApproach() {
  return (
    <section className={styles.section} aria-labelledby="approach-title">
      <div className={styles.sectionIntro}>
        <h2 className={interior.sectionTitle} id="approach-title">
          Start with what matters <em>to you.</em>
        </h2>
        <p>
          Our approach brings your priorities, available property information
          and relevant people into one conversation.
        </p>
      </div>
      <div className={styles.approach}>
        {serviceApproach.map((item, index) => {
          const Icon = approachIcons[index];
          return (
            <div className={styles.approachItem} key={item.title}>
              <Icon size={28} weight="light" aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
