'use server';

import { BACKEND_URL, FRONTEND_URL } from '@/lib/constants';
import { redirect } from 'next/navigation';

export async function loginWithGoogle() {
  const redirectAfterLogin = `${FRONTEND_URL}/dashboard`;
  const googleAuthURL = `${BACKEND_URL}/auth/google?redirect_uri=${encodeURIComponent(
    redirectAfterLogin
  )}`;

  redirect(googleAuthURL);
}
