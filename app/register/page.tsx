import type { Metadata } from "next";
import { connection } from "next/server";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthPageShell from "@/components/auth/AuthPageShell";

export const metadata: Metadata = {
  title: "Create Account | Dream Key",
  description:
    "Create your Dream Key account to begin your property search in Kolkata.",
  icons: { icon: "/images/pages/favicon.png" },
};

export default async function RegisterPage() {
  await connection();
  return (
    <AuthPageShell>
      <RegisterForm />
    </AuthPageShell>
  );
}
