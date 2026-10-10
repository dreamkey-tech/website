import Select from "@/components/ui/Select";
import EnquiryField from "./EnquiryField";

export default function SellerPropertyFields({ prefix }: { prefix: string }) {
  const id = (name: string) => `${prefix}-${name}`;
  return (
    <>
      <EnquiryField id={id("propertyType")} label="Property type">
        <Select
          id={id("propertyType")}
          name="propertyType"
          defaultValue={""}
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
      <EnquiryField id={id("preferredLocation")} label="Property location">
        <input
          id={id("preferredLocation")}
          name="preferredLocation"
          placeholder="e.g. New Town, Kolkata"
          maxLength={150}
        />
      </EnquiryField>
      <EnquiryField
        id={id("estimatedBudgetBand")}
        label="Expected selling price"
        wide
      >
        <input
          id={id("estimatedBudgetBand")}
          name="estimatedBudgetBand"
          placeholder="e.g. ₹1.2 crore, or open to guidance"
          maxLength={100}
        />
      </EnquiryField>
    </>
  );
}
