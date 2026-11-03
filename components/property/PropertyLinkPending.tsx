"use client";

import { useLinkStatus } from "next/link";
import { createPortal } from "react-dom";
import PageLoading from "@/components/navigation/PageLoading";

/** Link owns cancellation/completion; no click timers or extra property requests. */
export default function PropertyLinkPending() {
  const { pending } = useLinkStatus();
  if (!pending || typeof document === "undefined") return null;
  // Keep the fixed overlay outside card clipping, transforms and heading markup.
  return createPortal(<PageLoading label="Opening property…" />, document.body);
}
