import { createAuthClient } from 'better-auth/react';
import {
  organizationClient,
  lastLoginMethodClient,
} from 'better-auth/client/plugins';
import { FRONTEND_URL } from './constants';

export const authClient = createAuthClient({
  baseURL: FRONTEND_URL,
  plugins: [organizationClient(), lastLoginMethodClient()],
});
