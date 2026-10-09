import EnquiryField from "./EnquiryField";

export default function SellerPropertyFields({ prefix }: { prefix: string }) {
  const id = (name: string) => `${prefix}-${name}`;
  return (
    <>
      <EnquiryField id={id("propertyType")} label="Property type">
        <select id={id("propertyType")} name="propertyType" defaultValue="">
          <option value="">Select type</option>
          <option>Apartment</option>
          <option>Independent house / villa</option>
          <option>Land / plot</option>
          <option>Commercial property</option>
        </select>
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
