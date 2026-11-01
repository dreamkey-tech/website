import { connection } from "next/server";
import { pageMetadata } from "@/lib/seo";
import AuthPageShell from "@/components/auth/AuthPageShell";
import PasswordRecovery from "@/components/auth/PasswordRecovery";

export const metadata = pageMetadata("/forgot-password");

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  await connection();
  return (
    <AuthPageShell>
      <PasswordRecovery returnTo={(await searchParams).returnTo} />
    </AuthPageShell>
  );
}
