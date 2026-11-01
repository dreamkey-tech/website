import AuthForm from "./AuthForm";

export default function LoginForm({ returnTo }: { returnTo?: string }) {
  return <AuthForm mode="login" returnTo={returnTo} />;
}
