import EnquiryField from "./EnquiryField";

export default function EnquiryContactFields({
  prefix,
  errors,
}: {
  prefix: string;
  errors: Record<string, string>;
}) {
  const id = (name: string) => `${prefix}-${name}`;
  const errorProps = (name: string) => ({
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${id(name)}-error` : undefined,
  });
  return (
    <>
      <EnquiryField
        id={id("fullName")}
        label="Full name"
        required
        error={errors.fullName}
        wide
      >
        <input
          id={id("fullName")}
          name="fullName"
          autoComplete="name"
          placeholder="Your full name"
          required
          minLength={2}
          maxLength={100}
          {...errorProps("fullName")}
        />
      </EnquiryField>
      <EnquiryField
        id={id("mobileNo")}
        label="Mobile number"
        required
        error={errors.mobileNo}
      >
        <input
          id={id("mobileNo")}
          name="mobileNo"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91 98765 43210"
          required
          maxLength={20}
          {...errorProps("mobileNo")}
        />
      </EnquiryField>
      <EnquiryField id={id("email")} label="Email address" error={errors.email}>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={200}
          {...errorProps("email")}
        />
      </EnquiryField>
    </>
  );
}
