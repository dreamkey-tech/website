import Select from "@/components/ui/Select";
import EnquiryField from "./EnquiryField";

export default function EnquiryPropertyFields({
  prefix,
  variant,
  errors,
}: {
  prefix: string;
  variant: "sell" | "contact";
  errors: Record<string, string>;
}) {
  const id = (name: string) => `${prefix}-${name}`;
  const errorId = (name: string) =>
    errors[name] ? `${id(name)}-error` : undefined;
  return (
    <>
      <EnquiryField
        id={id("propertyType")}
        label="Property type"
        required
        error={errors.propertyType}
      >
        <Select
          id={id("propertyType")}
          name="propertyType"
          required
          ariaDescribedBy={errorId("propertyType")}
          defaultValue=""
          options={[
            { value: "", label: "Select type" },
            { value: "Apartment", label: "Apartment" },
            {
              value: "Independent house / villa",
              label: "Independent house / villa",
            },
            { value: "Land / plot", label: "Land / plot" },
            { value: "Commercial property", label: "Commercial property" },
          ]}
        />
      </EnquiryField>
      <EnquiryField
        id={id("preferredLocation")}
        label={variant === "sell" ? "Property location" : "Preferred location"}
        required
        error={errors.preferredLocation}
      >
        <input
          id={id("preferredLocation")}
          name="preferredLocation"
          placeholder="e.g. New Town, Kolkata"
          required
          maxLength={150}
          aria-invalid={errors.preferredLocation ? true : undefined}
          aria-describedby={errorId("preferredLocation")}
        />
      </EnquiryField>
      <EnquiryField
        id={id("estimatedBudgetBand")}
        label={
          variant === "sell" ? "Expected selling price" : "Estimated budget"
        }
        required
        error={errors.estimatedBudgetBand}
        wide
      >
        <input
          id={id("estimatedBudgetBand")}
          name="estimatedBudgetBand"
          placeholder={
            variant === "sell"
              ? "e.g. ₹1.2 crore, or open to guidance"
              : "e.g. ₹75 lakh – ₹1 crore"
          }
          required
          maxLength={100}
          aria-invalid={errors.estimatedBudgetBand ? true : undefined}
          aria-describedby={errorId("estimatedBudgetBand")}
        />
      </EnquiryField>
    </>
  );
}
