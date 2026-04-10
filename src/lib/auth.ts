import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { bearer } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import {
  FRONTEND_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SECRET_KEY,
} from "./constants";

export const auth = betterAuth({
  baseURL: FRONTEND_URL,
  secret: SECRET_KEY,
  trustedOrigins: [FRONTEND_URL],
  emailAndPassword: {
    enabled: true,
  },
  user: {},
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
  account: {},
  verification: {},
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: {
      ...schema,
    },
  }),
  experimental: { joins: true },
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [bearer(), nextCookies()],
});
