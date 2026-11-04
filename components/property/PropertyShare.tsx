"use client";
import { useState } from "react";
import { ShareNetwork } from "@phosphor-icons/react";
import styles from "./Property.module.css";

export default function PropertyShare({ title }: { title: string }) {
  const [message, setMessage] = useState("");
  async function share() {
    const url = window.location.origin + window.location.pathname;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        setMessage("Link shared");
      } else {
        await navigator.clipboard.writeText(url);
        setMessage("Link copied");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage("Copy the page address to share this home.");
    }
  }
  return (
    <div className={styles.share}>
      <button type="button" className={styles.quietButton} onClick={share}>
        <ShareNetwork size="1.0625rem" aria-hidden="true" />
        Share
      </button>
      <span role="status">{message}</span>
    </div>
  );
}
