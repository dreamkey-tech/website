import { pageMetadata } from "@/lib/seo";
import { connection } from "next/server";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthPageShell from "@/components/auth/AuthPageShell";

export const metadata = pageMetadata("/register");

export default async function RegisterPage() {
  await connection();
  return (
    <AuthPageShell>
      <RegisterForm />
    </AuthPageShell>
  );
}
