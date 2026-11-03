import Link from "next/link";
import {
  ArrowRight,
  Bed,
  Bathtub,
  CornersOut,
} from "@phosphor-icons/react/dist/ssr";
import {
  AVAILABILITY_LABELS,
  PROPERTY_LABELS,
  propertyName,
  propertyAddress,
  propertyPrice,
  propertyArea,
  propertyHref,
  propertyEnquiryHref,
  type WebsitePropertyCard,
} from "@/lib/website-properties";
import PropertyLink from "@/components/property/PropertyLink";
import ListingImage from "@/components/property/ListingImage";
import styles from "./Buy.module.css";

export default function BuyCard({
  property,
}: {
  property: WebsitePropertyCard;
}) {
  const title = propertyName(property);
  const href = propertyHref(property);
  const area = property.carpetAreaSqFt ?? property.superBuiltUpAreaSqFt;
  const analytics = {
    "data-property-id": property.id,
    "data-property-type": ["FLAT", "LAND", "WAREHOUSE", "COMMERCIAL", "OTHER"].includes(
      property.propertyType,
    )
      ? property.propertyType
      : "OTHER",
    "data-transaction-type": property.pricingType === "RENT" ? "rent" : "buy",
    "data-inventory-source": "live",
    "data-list-name": "buy_catalogue",
    "data-component-name": "property_card",
  };
  return (
    <article
      className={styles.card}
      {...analytics}
      data-analytics-impression="list"
    >
      <PropertyLink
        className={styles.cardPhoto}
        href={href}
        aria-label={`View ${title} property details`}
        {...analytics}
        data-analytics-event="select_item"
      >
        <ListingImage
          key={property.coverImage}
          src={property.coverImage}
          alt={`${title}, ${propertyAddress(property)}`}
          sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, (max-width:1440px) 37vw, 510px"
        />
        <span className={styles.cardArrow}>
          <ArrowRight size={20} aria-hidden="true" />
        </span>
      </PropertyLink>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <p>{propertyAddress(property)}</p>
          <span>
            {property.availabilityStatus
              ? AVAILABILITY_LABELS[property.availabilityStatus] ||
                "Confirm availability"
              : "Confirm availability"}
          </span>
        </div>
        <h3>
          <PropertyLink href={href} {...analytics} data-analytics-event="select_item">
            {title}
          </PropertyLink>
        </h3>
        <p className={styles.description}>
          {PROPERTY_LABELS[property.propertyType] || "Property"} for sale
        </p>
        <div className={styles.specs}>
          {property.bedrooms !== null && (
            <span>
              <Bed size={17} aria-hidden="true" />
              {property.bedrooms} BHK
            </span>
          )}
          {property.bathrooms !== null && (
            <span>
              <Bathtub size={17} aria-hidden="true" />
              {property.bathrooms} baths
            </span>
          )}
          <span>
            <CornersOut size={17} aria-hidden="true" />
            {propertyArea(area)}
          </span>
        </div>
        <p className={styles.amenityText}>
          {area !== null
            ? property.carpetAreaSqFt !== null
              ? "Carpet area"
              : "Super built-up area"
            : "Measurements on request"}
        </p>
        {property.amenities.length > 0 && (
          <p className={styles.amenityText}>
            {property.amenities.slice(0, 2).join(" • ")}
          </p>
        )}
        <div className={styles.cardBottom}>
          <p className={styles.price}>
            <span>Asking price</span>
            {propertyPrice(property)}
          </p>
          <Link
            className={styles.enquire}
            href={propertyEnquiryHref(property)}
            {...analytics}
            data-analytics-event="property_enquiry_click"
          >
            Enquire <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
