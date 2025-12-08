"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function OAuthSuccess() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const error = params.get("error");

  useEffect(() => {
    if (error) {
      router.replace(`/auth/login?error=${error}`);
      return;
    }

    if (!token) {
      router.replace("/auth/login?error=no_token");
      return;
    }

    signIn("fastapi-google", {
      token,
      redirect: false,
    }).then(() => {
      router.replace("/dashboard");
    });
  }, [token, error, router]);

  return (
    <div className="h-screen flex items-center justify-center text-lg">
      Signing you in...
    </div>
  );
}
