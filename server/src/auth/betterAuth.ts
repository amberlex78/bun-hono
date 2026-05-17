import { betterAuth } from "better-auth";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "dev-secret-change-me",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000"
});
