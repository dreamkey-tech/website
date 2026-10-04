"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { authApi } from "@/api/auth";
import { loginSchema } from "@/zod/auth";
import { z } from "zod";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { GoogleSignInButton } from "./GoogleSignInButton";

export default function LoginForm() {
  const router = useRouter();
  const { refreshUser } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);
    setIsLoading(true);

    try {
      // Validate input using Zod
      const validatedData = loginSchema.parse({ email, password });

      // Call API
      await authApi.login(validatedData);
      
      // Update Zustand store
      await refreshUser();

      toast.success("Successfully logged in!");

      // Redirect to home/dashboard
      router.push("/dashboard");
      router.refresh(); // Refresh to trigger middleware/layout state changes
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const fieldErrors: any = {};
        (error as any).errors.forEach((err: any) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Please fix the validation errors.");
      } else {
        // Handle API errors
        const errorData = error.response?.data;
        if (errorData?.code === "USE_GOOGLE_LOGIN") {
          setApiError(
            'This account was created with Google. Please click "Continue with Google" below.'
          );
        } else {
          const errorMessage = errorData?.message || "Invalid email or password";
          toast.error(errorMessage);
          setApiError(errorMessage);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-md bg-surface-clean rounded-xl p-space-xl shadow-lg border border-surface-container-highest"
    >
      <div className="text-center mb-space-xl">
        <span className="font-label-ui text-label-ui text-primary uppercase tracking-widest font-semibold">
          Welcome Back
        </span>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mt-2">
          Login to Dream <span className="text-primary">Key</span>
        </h1>
        <p className="font-body-default text-body-default text-secondary mt-2">
          Enter your details to access your account.
        </p>
      </div>

      {apiError && (
        <div className="mb-4 p-3 bg-error-container/20 border border-error-container text-error rounded-lg text-sm font-medium">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-space-lg">
        <div className="flex flex-col gap-2">
          <label className="font-label-ui text-label-ui text-on-surface font-medium">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-surface-container-highest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-default transition-all"
          />
          {errors.email && (
            <span className="text-error font-label-ui text-xs">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="font-label-ui text-label-ui text-on-surface font-medium">
              Password
            </label>
            <a href="#" className="font-label-ui text-xs text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-surface-container-highest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-default transition-all"
          />
          {errors.password && (
            <span className="text-error font-label-ui text-xs">{errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-2 rounded-lg bg-primary text-white font-title-property font-semibold hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center font-body-default text-sm text-secondary mt-2">
          Don't have an account?{" "}
          <a href="/register" className="text-primary hover:underline font-medium">
            Sign up
          </a>
        </p>
      </form>

      <div className="relative flex py-6 items-center">
        <div className="flex-grow border-t border-surface-container-highest"></div>
        <span className="flex-shrink mx-4 text-secondary font-label-ui text-xs tracking-widest uppercase">
          OR
        </span>
        <div className="flex-grow border-t border-surface-container-highest"></div>
      </div>

      <GoogleSignInButton />
    </motion.div>
  );
}
