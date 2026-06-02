"use client";

import { authClient } from "@/lib/auth-client";
import { Links } from "@/lib/enums/links";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  async function handleSocialSignIn(provider: "google" | "github") {
    setError(null);
    setLoading(true);

    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: redirect ?? Links.DASHBOARD,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Something went wrong");
    }
  }

  return (
    <div className="flex flex-col gap-5 bg-white">
      <Button
        type="button"
        onClick={() => handleSocialSignIn("google")}
        disabled={loading}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 transition hover:bg-gray-200"
      >
        <FcGoogle className="h-5 w-5" />
        <span className="text-sm font-medium text-[#4B001F]">Continue with Google</span>
      </Button>
    </div>
  );
}
