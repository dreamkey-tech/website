import { OFFICE_MAP_EMBED_URL } from "@/lib/office-location";

export default function OfficeMap({ className }: { className?: string }) {
  return (
    <iframe
      src={OFFICE_MAP_EMBED_URL}
      title="Google map showing DreamKey’s Kolkata office"
      className={className}
      width={600}
      height={450}
      loading="lazy"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
