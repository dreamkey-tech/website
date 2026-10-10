import { pageMetadata } from "@/lib/seo";
import { connection } from "next/server";
import LoginForm from "@/components/auth/LoginForm";
import AuthPageShell from "@/components/auth/AuthPageShell";

export const metadata = pageMetadata("/login");

export default async function LoginPage() {
  await connection();
  return (
    <AuthPageShell>
      <LoginForm />
    </AuthPageShell>
  );
}
