import { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | Dream Key",
  description: "Create your Dream Key account to save properties and access your personalized real estate dashboard.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-margin-mobile md:px-margin">
      <RegisterForm />
    </div>
  );
}
