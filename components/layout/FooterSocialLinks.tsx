import type { CSSProperties } from "react";
import {
  InstagramLogo,
  YoutubeLogo,
  FacebookLogo,
  LinkedinLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./FooterSocialLinks.module.css";

const socialLinks = [
  {
    label: "Instagram",
    platform: "instagram",
    href: "https://www.instagram.com/dream_key_kolkata/",
    Icon: InstagramLogo,
  },
  {
    label: "YouTube",
    platform: "youtube",
    href: "https://www.youtube.com/@dream_key_kolkata",
    Icon: YoutubeLogo,
  },
  {
    label: "Facebook",
    platform: "facebook",
    href: "https://www.facebook.com/profile.php?id=61594174244288&utm_source=ig&utm_medium=social&utm_content=link_in_bio",
    Icon: FacebookLogo,
  },
  {
    label: "LinkedIn",
    platform: "linkedin",
    href: "https://www.linkedin.com/company/dreamkeykol-reality/home/",
    Icon: LinkedinLogo,
  },
];

const whatsAppLink = {
  label: "WhatsApp",
  platform: "whatsapp",
  href: "https://api.whatsapp.com/send?phone=918697559123",
  Icon: WhatsappLogo,
};

export default function FooterSocialLinks({
  legacy = false,
}: {
  legacy?: boolean;
}) {
  const links = legacy ? [...socialLinks, whatsAppLink] : socialLinks;
  const instagramGradientId = `footer-instagram-gradient-${legacy ? "legacy" : "default"}`;

  return (
    <nav
      aria-label="Dream Key social media"
      className={`${styles.socials} ${legacy ? styles.legacy : ""}`}
      style={
        {
          "--instagram-gradient": `url(#${instagramGradientId})`,
        } as CSSProperties
      }
    >
      <ul className={styles.list}>
        {links.map(({ label, platform, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              title={label}
              className={styles.link}
              data-platform={platform}
            >
              <Icon size={20} weight="regular" aria-hidden="true">
                {platform === "instagram" && (
                  <defs>
                    <linearGradient
                      id={instagramGradientId}
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#feda75" />
                      <stop offset="25%" stopColor="#fa7e1e" />
                      <stop offset="50%" stopColor="#d62976" />
                      <stop offset="75%" stopColor="#962fbf" />
                      <stop offset="100%" stopColor="#4f5bd5" />
                    </linearGradient>
                  </defs>
                )}
              </Icon>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
