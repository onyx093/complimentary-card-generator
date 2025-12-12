import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { bearer } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/drizzle';
import { schema } from '@/db/schema';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './constants';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema,
  }),
  experimental: { joins: true },
  plugins: [bearer(), nextCookies()],
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },
});
