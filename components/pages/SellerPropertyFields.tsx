import EnquiryPropertyFields from "./EnquiryPropertyFields";

/** Retained seller-specific entry point; both active forms share the same fields. */
export default function SellerPropertyFields({ prefix }: { prefix: string }) {
  return <EnquiryPropertyFields prefix={prefix} variant="sell" errors={{}} />;
}
