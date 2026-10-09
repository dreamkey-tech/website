import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | Dream Key",
  description: "Login to your Dream Key account to access your personalized real estate dashboard.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-margin-mobile md:px-margin">
      <LoginForm />
    </div>
  );
}
