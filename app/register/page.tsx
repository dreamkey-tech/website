import { pageMetadata } from "@/lib/seo";
import { connection } from "next/server";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthPageShell from "@/components/auth/AuthPageShell";

export const metadata = pageMetadata("/register");

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  await connection();
  return (
    <AuthPageShell>
      <RegisterForm returnTo={(await searchParams).returnTo} />
    </AuthPageShell>
  );
}
