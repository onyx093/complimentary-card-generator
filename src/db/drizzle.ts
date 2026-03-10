import { DATABASE_URL } from '@/lib/constants';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

export const db = drizzle(DATABASE_URL, { schema });
