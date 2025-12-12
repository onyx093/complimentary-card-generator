import { DATABASE_URL } from '@/lib/constants';
import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle(DATABASE_URL);
