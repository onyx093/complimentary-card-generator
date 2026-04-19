"use server";

import { auth } from "@/lib/auth";
import { BACKEND_URL, FRONTEND_URL } from "@/lib/constants";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export async function loginWithGoogle(): Promise<void> {
  const redirectAfterLogin = `${FRONTEND_URL}/dashboard`;
  const googleAuthURL = `${BACKEND_URL}/auth/google?redirect_uri=${encodeURIComponent(
    redirectAfterLogin
  )}`;

  redirect(googleAuthURL);
}

export const checkAuthSession = cache(async () => {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });
  if (sessionData === null) {
    return { isAuthenticated: false, sessionData: null };
  }
  return { isAuthenticated: true, sessionData };
});

export const getAuthSession = async () => {
  const { isAuthenticated, sessionData } = await checkAuthSession();

  if (!isAuthenticated) {
    return null;
  }

  return sessionData;
};
