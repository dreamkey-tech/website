import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://backend.dreamkey-crm.workers.dev";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // CRITICAL — sends HttpOnly cookies on every request
  headers: {
    "Content-Type": "application/json",
  },
});
