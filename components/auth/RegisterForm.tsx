import AuthForm from "./AuthForm";

export default function RegisterForm({ returnTo }: { returnTo?: string }) {
  return <AuthForm mode="register" returnTo={returnTo} />;
}
