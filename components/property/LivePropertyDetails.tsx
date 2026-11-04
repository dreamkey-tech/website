import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Bed,
  Bathtub,
  CornersOut,
  Buildings,
  Check,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import {
  PROPERTY_LABELS,
  AVAILABILITY_LABELS,
  propertyName,
  propertyAddress,
  propertyPrice,
  propertyArea,
  propertyEnquiryHref,
  type WebsiteProperty,
} from "@/lib/website-properties";
import PropertyGallery from "./PropertyGallery";
import PropertyShare from "./PropertyShare";
import PropertyLocation from "./PropertyLocation";
import PropertyEnquiryPanel from "./PropertyEnquiryPanel";
import type { PropertyPhoto } from "./property-data";
import styles from "./Property.module.css";

function displayDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      });
}
export default function LivePropertyDetails({
  property,
}: {
  property: WebsiteProperty;
}) {
  const title = propertyName(property);
  const address = propertyAddress(property);
  const type = PROPERTY_LABELS[property.propertyType] || "Property";
  const enquiry = propertyEnquiryHref(property);
  const area = property.carpetAreaSqFt ?? property.superBuiltUpAreaSqFt;
  const media = [...property.media].sort(
    (a, b) => Number(b.isCover) - Number(a.isCover) || a.order - b.order,
  );
  const floorPlans = media.filter((item) => item.category === "FLOOR_PLAN");
  const photos: PropertyPhoto[] = [
    ...new Set(
      [
        property.coverImage,
        ...media
          .filter((item) => item.category === "PHOTOGRAPH")
          .map((item) => item.url),
        ...property.previewImages,
      ].filter((src): src is string => Boolean(src)),
    ),
  ].map((src, index) => ({
    src,
    alt: `${title}, property photograph ${index + 1}`,
    label: index === 0 ? "Property" : `Photo ${index + 1}`,
  }));
  const groups: { title: string; facts: [string, string | number | null][] }[] =
    [
      {
        title: "Space and layout",
        facts: [
          ["Property type", type],
          ["Bedrooms", property.bedrooms],
          ["Bathrooms", property.bathrooms],
          ["Balconies", property.balconies],
          [
            "Carpet area",
            property.carpetAreaSqFt === null
              ? null
              : propertyArea(property.carpetAreaSqFt),
          ],
          [
            "Super built-up area",
            property.superBuiltUpAreaSqFt === null
              ? null
              : propertyArea(property.superBuiltUpAreaSqFt),
          ],
        ],
      },
      {
        title: "Building and availability",
        facts: [
          [
            "Availability",
            property.availabilityStatus
              ? AVAILABILITY_LABELS[property.availabilityStatus] ||
                "Confirm with our team"
              : null,
          ],
          ["Available from", displayDate(property.availabilityDate)],
          [
            "Floor",
            property.floorNumber === null
              ? null
              : property.floorNumber === 0
                ? "Ground floor"
                : property.floorNumber,
          ],
          ["Total floors", property.totalFloors],
          ["Builder", property.builderName],
          ["Year of construction", property.yearOfConstruction],
          ["Total units", property.totalUnits],
          ["Pincode", property.pincode],
          ["Listing reference", property.id],
        ],
      },
    ];
  return (
    <>
      <div className={styles.topbar}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/buy">
            <ArrowLeft size="1rem" aria-hidden="true" />
            All properties
          </Link>
          <span aria-current="page">{title}</span>
        </nav>
        <PropertyShare title={title} />
      </div>
      <PropertyGallery
        key={property.id}
        photos={photos}
        title={title}
        illustrative={false}
      />
      <div className={styles.contentLayout}>
        <div className={styles.content}>
          <header className={styles.propertyHeader}>
            <div className={styles.propertyStatus}>
              <span>{type}</span>
              <span>
                {property.pricingType === "SALE" ? "For sale" : "For rent"}
              </span>
            </div>
            <h1>{title}</h1>
            <p className={styles.locationAddress}>
              <MapPin size="1.125rem" aria-hidden="true" />
              {address}
            </p>
            <p className={styles.summaryPrice}>{propertyPrice(property)}</p>
            <p className={styles.priceNote}>
              Asking price. Confirm charges and inclusions with our team.
            </p>
            <Link
              className={`${styles.primaryButton} ${styles.mobileEnquiry}`}
              href={enquiry}
              data-analytics-event="property_enquiry_click"
            >
              Enquire about this property
              <ArrowUpRight size="1.125rem" aria-hidden="true" />
            </Link>
          </header>
          <nav className={styles.sectionNav} aria-label="Property sections">
            <a href="#overview">Overview</a>
            <a href="#details">Property details</a>
            <a href="#amenities">Amenities</a>
            <a href="#location">Location</a>
          </nav>
          <section
            id="overview"
            className={styles.section}
            aria-label="Property overview"
          >
            <div className={styles.quickFacts}>
              {[
                { Icon: Bed, value: property.bedrooms, label: "Bedrooms" },
                {
                  Icon: Bathtub,
                  value: property.bathrooms,
                  label: "Bathrooms",
                },
                {
                  Icon: CornersOut,
                  value: propertyArea(area),
                  label:
                    property.carpetAreaSqFt !== null
                      ? "Carpet area"
                      : "Super built-up area",
                },
                { Icon: Buildings, value: type, label: "Property type" },
              ].map(({ Icon, value, label }) => (
                <div key={label}>
                  <Icon size="1.5625rem" weight="light" aria-hidden="true" />
                  <strong>{value ?? "On request"}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </section>
          <section
            id="details"
            className={styles.section}
            aria-labelledby="details-title"
          >
            <h2 id="details-title">The details that matter.</h2>
            {groups.map((group) => (
              <div key={group.title} className={styles.specGroup}>
                <h3>{group.title}</h3>
                <dl className={styles.detailGrid}>
                  {group.facts.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd data-unconfirmed={value === null}>
                        {value ?? "Confirm with our team"}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
            <div className={styles.documentCallout}>
              <div>
                <h3>Plan your next step.</h3>
                <p>
                  Ask for the floor plan, a site visit and a written breakdown
                  of the final price.
                </p>
                {floorPlans.map((plan, index) => (
                  <a
                    key={plan.url}
                    href={plan.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {plan.title ||
                      `View floor plan${floorPlans.length > 1 ? ` ${index + 1}` : ""}`}{" "}
                    <ArrowUpRight size="1rem" aria-hidden="true" />
                    <span className={styles.srOnly}> (opens in a new tab)</span>
                  </a>
                ))}
                {!floorPlans.length && (
                  <Link href={enquiry} data-analytics-event="property_enquiry_click">
                    Request floor plan{" "}
                    <ArrowUpRight size="1rem" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </section>
          <section
            id="amenities"
            className={styles.section}
            aria-labelledby="amenities-title"
          >
            <h2 id="amenities-title">Around the property.</h2>
            {property.amenities.length ? (
              <ul className={styles.amenities}>
                {property.amenities.map((item, index) => (
                  <li key={`${item}-${index}`}>
                    <Check size="1.125rem" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.muted}>
                Ask our team about the facilities and inclusions for this
                property.
              </p>
            )}
          </section>
          <PropertyLocation
            neighbourhood={property.locationArea || property.city || "Kolkata"}
            location={address}
            city={property.city || "Kolkata"}
          />
        </div>
        <PropertyEnquiryPanel
          home={{
            title,
            location: address,
            status: property.availabilityStatus || "",
          }}
          enquiryHref={enquiry}
        />
      </div>
    </>
  );
}
