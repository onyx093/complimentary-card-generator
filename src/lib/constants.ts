export const BACKEND_URL =
  process.env.BETTER_AUTH_API_URL || 'http://localhost:8000';
export const FRONTEND_URL =
  process.env.BETTER_AUTH_URL || 'http://localhost:3000';
export const SECRET_KEY =
  process.env.BETTER_AUTH_SECRET || 'better_auth_secret_key';
export const DATABASE_URL = process.env.DATABASE_URL!;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
