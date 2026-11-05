import BuyCard from "@/components/buy/BuyCard";
import type { WebsitePropertyCard } from "@/lib/website-properties";

export default function RentalCard({
  property,
}: {
  property: WebsitePropertyCard;
}) {
  return <BuyCard property={property} listName="rent_catalogue" />;
}
