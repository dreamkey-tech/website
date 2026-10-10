"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import { enquiryApi, getEnquiryErrorMessage } from "@/api/enquiry";
import { propertyEnquirySchema } from "@/zod/enquiry";
import Select from "@/components/ui/Select";
import EnquiryField from "./EnquiryField";
import EnquiryContactFields from "./EnquiryContactFields";
import EnquiryPropertyFields from "./EnquiryPropertyFields";
import { normalizeIndianMobile, getEnquiryPurpose } from "./enquiry-values";
import styles from "./Interior.module.css";

export default function PropertyEnquiryForm({
  variant = "contact",
  initialPurpose = "general",
  initialMessage = "",
}: {
  variant?: "sell" | "contact";
  initialPurpose?: string;
  initialMessage?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [responseMessage, setResponseMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const prefix = variant === "sell" ? "seller" : "contact";
  const Heading = variant === "sell" ? "h3" : "h2";
  const id = (name: string) => `${prefix}-${name}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) || "").trim();
    const purpose =
      variant === "sell" ? "sell" : getEnquiryPurpose(value("purpose"));
    const parsed = propertyEnquirySchema.safeParse({
      fullName: value("fullName"),
      mobileNo: normalizeIndianMobile(value("mobileNo")),
      email: value("email"),
      propertyType: value("propertyType"),
      preferredLocation: value("preferredLocation"),
      estimatedBudgetBand: value("estimatedBudgetBand"),
      specificRequirements: `Enquiry: ${purpose}. ${value("specificRequirements")}`,
    });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(fieldErrors);
      setStatus("idle");
      formRef.current
        ?.querySelector<HTMLElement>(
          `[id="${id(Object.keys(fieldErrors)[0])}"]`,
        )
        ?.focus();
      return;
    }
    setErrors({});
    setResponseMessage("");
    setStatus("sending");
    try {
      const result = await enquiryApi.submitPropertyEnquiry(parsed.data);
      setResponseMessage(
        typeof result.message === "string" ? result.message.trim() : "",
      );
      setStatus("success");
    } catch (error) {
      setResponseMessage(getEnquiryErrorMessage(error));
      setStatus("error");
    }
  }

  if (status === "success")
    return (
      <div className={styles.formSuccess} role="status">
        <CheckCircle size={46} weight="light" aria-hidden="true" />
        <Heading>Your enquiry is with us.</Heading>
        <p>
          {responseMessage ||
            "Thank you for reaching out. The Dream Key team will contact you using the details you shared."}
        </p>
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={() => setStatus("idle")}
        >
          Send another enquiry
        </button>
      </div>
    );

  return (
    <form ref={formRef} className={styles.enquiryForm} onSubmit={handleSubmit}>
      <div className={styles.formHeading}>
        <Heading>
          {variant === "sell"
            ? "Tell us about your property"
            : "Start a conversation"}
        </Heading>
        <p>
          {variant === "sell"
            ? "A few details help us understand your home and your plans."
            : "Share what you have in mind. We’ll help you find the next step."}
        </p>
      </div>
      <div className={styles.fields}>
        <EnquiryContactFields prefix={prefix} errors={errors} />
        {variant === "contact" && (
          <EnquiryField id={id("purpose")} label="How can we help?" wide>
            <Select
              id={id("purpose")}
              name="purpose"
              defaultValue={getEnquiryPurpose(initialPurpose)}
              options={[
                { value: "general", label: "A general enquiry" },
                { value: "buy", label: "I’m looking to buy" },
                { value: "rent", label: "I’m looking to rent" },
                { value: "sell", label: "I’d like to sell" },
              ]}
            />
          </EnquiryField>
        )}
        <EnquiryPropertyFields
          prefix={prefix}
          variant={variant}
          errors={errors}
        />
        <EnquiryField
          id={id("specificRequirements")}
          label={
            variant === "sell"
              ? "Anything else we should know?"
              : "Your message"
          }
          wide
        >
          <textarea
            id={id("specificRequirements")}
            name="specificRequirements"
            rows={4}
            maxLength={2000}
            defaultValue={initialMessage}
            placeholder={
              variant === "sell"
                ? "Bedrooms, size, society name, and when you’re hoping to sell…"
                : "Your preferred location, budget, or questions…"
            }
          />
        </EnquiryField>
      </div>
      {status === "error" && (
        <p className={styles.submitError} role="alert">
          {responseMessage} You can also call{" "}
          <a href="tel:+918697559123">+91 86975 59123</a>.
        </p>
      )}
      <button
        className={styles.primaryButton}
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending"
          ? "Sending your enquiry…"
          : variant === "sell"
            ? "Request a property consultation"
            : "Send enquiry"}
        <ArrowUpRight size={19} aria-hidden="true" />
      </button>
      <p className={styles.formNote}>
        Required fields are marked *. By sending this enquiry, you agree to be
        contacted about your request.
      </p>
      <span role="status" className={styles.srOnly}>
        {status === "sending" ? "Sending your enquiry" : ""}
      </span>
    </form>
  );
}
