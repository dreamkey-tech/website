import type { Metadata } from "next";
import { connection } from "next/server";
import LoginForm from "@/components/auth/LoginForm";
import AuthPageShell from "@/components/auth/AuthPageShell";

export const metadata: Metadata = {
  title: "Login | Dream Key",
  description:
    "Log in to your Dream Key account and continue your property search in Kolkata.",
  icons: { icon: "/images/pages/favicon.png" },
};

export default async function LoginPage() {
  await connection();
  return (
    <AuthPageShell>
      <LoginForm />
    </AuthPageShell>
  );
}
