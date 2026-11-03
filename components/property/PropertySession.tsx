"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { isAxiosError } from "axios";
import { propertiesApi } from "@/api/properties";
import PropertyLoginRequired from "./PropertyLoginRequired";
import styles from "./PropertyAccess.module.css";

/** Mounted page views only. Prefetch/SSR never records interest. */
export default function PropertySession({
  id,
  propertyType = "OTHER",
  transactionType = "buy",
  children,
}: {
  id: string;
  propertyType?: string;
  transactionType?: "buy" | "rent";
  children: ReactNode;
}) {
  const sent = useRef(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error" | "login">(
    "idle",
  );
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      if (sent.current) return;
      sent.current = true;
      propertiesApi
        .recordInterest(id)
        .then(() => {
          if (active) setStatus("saved");
        })
        .catch((error) => {
          if (!active) return;
          if (
            isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
          ) {
            setStatus("login");
          } else setStatus("error");
        });
    }, 0);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [id, retry]);
  if (status === "login") return <PropertyLoginRequired href={`/buy/${id}`} />;
  return (
    <div
      data-analytics-impression="detail"
      data-property-id={id}
      data-property-type={
        ["FLAT", "LAND", "WAREHOUSE", "COMMERCIAL", "OTHER"].includes(propertyType)
          ? propertyType
          : "OTHER"
      }
      data-transaction-type={transactionType}
      data-inventory-source="live"
      data-component-name="property_details"
    >
      {status === "error" && (
        <p className={styles.interestError} role="status">
          Your listing is ready, but we couldn’t save your interest.{" "}
          <button
            type="button"
            onClick={() => {
              sent.current = false;
              setStatus("idle");
              setRetry((value) => value + 1);
            }}
          >
            Try again
          </button>
        </p>
      )}
      {children}
    </div>
  );
}
