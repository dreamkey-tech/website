import { create } from "zustand";
import { authApi } from "@/api/auth";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  
  logout: async () => {
    try {
      await authApi.logout();
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false });
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  },

  refreshUser: async () => {
    try {
      set({ isLoading: true });
      
      // 1. Try Better Auth / OAuth session endpoint first
      try {
        const oauthRes = await authApi.getSession();
        if (oauthRes?.user) {
          set({ user: oauthRes.user, isAuthenticated: true, isLoading: false });
          return;
        }
      } catch (e) {}

      // 2. Fallback to standard email/password session endpoint
      const meRes = await authApi.me();
      if (meRes?.user) {
        set({ user: meRes.user, isAuthenticated: true, isLoading: false });
        return;
      }

      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (err) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  loginWithGoogle: async () => {
    try {
      const url = await authApi.googleSignIn();
      if (url && typeof window !== "undefined") {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Failed to initiate Google login:", error);
    }
  },
}));
