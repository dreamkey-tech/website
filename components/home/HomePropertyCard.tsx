import {
  ArrowRight,
  Bed,
  Bathtub,
  ArrowsOut,
} from "@phosphor-icons/react/dist/ssr";
import {
  PROPERTY_LABELS,
  propertyName,
  propertyAddress,
  propertyPrice,
  propertyArea,
  propertyHref,
  type WebsitePropertyCard,
} from "@/lib/website-properties";
import PropertyLink from "@/components/property/PropertyLink";
import ListingImage from "@/components/property/ListingImage";
import styles from "./Landing.module.css";

export default function HomePropertyCard({
  property,
  imageSizes,
}: {
  property: WebsitePropertyCard;
  imageSizes: string;
}) {
  const href = propertyHref(property);
  const title = propertyName(property);
  const address = propertyAddress(property);
  const area = property.carpetAreaSqFt ?? property.superBuiltUpAreaSqFt;
  const rental = property.pricingType === "RENT";
  const image = property.coverImage ?? property.previewImages[0] ?? null;
  const analytics = {
    "data-property-id": property.id,
    "data-property-type": [
      "FLAT",
      "LAND",
      "WAREHOUSE",
      "COMMERCIAL",
      "OTHER",
    ].includes(property.propertyType)
      ? property.propertyType
      : "OTHER",
    "data-transaction-type": rental ? "rent" : "buy",
    "data-inventory-source": "live",
    "data-list-name": "home_featured",
    "data-component-name": "property_card",
  };
  return (
    <article
      className={styles.propertyCard}
      {...analytics}
      data-analytics-impression="list"
    >
      <PropertyLink
        href={href}
        className={styles.propertyPhoto}
        aria-label={`View ${title} property details`}
        {...analytics}
        data-analytics-event="select_item"
      >
        <ListingImage
          key={image}
          src={image}
          alt={`${title}, ${address}`}
          sizes={imageSizes}
        />
        <span className={styles.propertyArrow} aria-hidden="true">
          <ArrowRight size="1.3125rem" />
        </span>
      </PropertyLink>
      <div className={styles.propertyInfo}>
        <p className={styles.propertyLocation}>{address}</p>
        <div className={styles.propertyTitleRow}>
          <h3>
            <PropertyLink
              href={href}
              {...analytics}
              data-analytics-event="select_item"
            >
              {title}
            </PropertyLink>
          </h3>
          <p className={styles.propertyPrice}>
            {propertyPrice(property)}
            {!!property.askingPrice && (
              <span>{rental ? "rent" : "asking price"}</span>
            )}
          </p>
        </div>
        <p className={styles.propertyDescription}>
          {PROPERTY_LABELS[property.propertyType] || "Property"} for{" "}
          {rental ? "rent" : "sale"}
        </p>
        <div className={styles.propertySpecs}>
          {property.bedrooms !== null && (
            <span>
              <Bed size="0.9375rem" aria-hidden="true" />
              {property.bedrooms} BHK
            </span>
          )}
          {property.bathrooms !== null && (
            <span>
              <Bathtub size="0.9375rem" aria-hidden="true" />
              {property.bathrooms} baths
            </span>
          )}
          <span>
            <ArrowsOut size="0.9375rem" aria-hidden="true" />
            {area === null
              ? propertyArea(null)
              : `${propertyArea(area)} ${property.carpetAreaSqFt !== null ? "carpet" : "super built-up"}`}
          </span>
        </div>
      </div>
    </article>
  );
}
