"use client";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const getCallback = () =>
    process.env.NODE_ENV === "production"
      ? "https://your-nextjs-app.vercel.app/api/auth/success"
      : "http://localhost:3000/api/auth/success";

  const handleGoogleLogin = () => {
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL ?? `${window.location.origin}/api/proxy`;
    const googleAuthUrl = `${apiBase.replace(
      /\/$/,
      ""
    )}/auth/google/?redirect_uri=${encodeURIComponent(getCallback())}`;

    window.location.href = googleAuthUrl;
  };

  return (
    <div className="flex flex-col gap-5 bg-white">
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full inline-flex items-center justify-center gap-3 rounded-full border border-gray-300 px-4 py-2 bg-white hover:bg-gray-200 transition"
      >
        <FcGoogle className="w-5 h-5" />
        <span className="text-sm text-[#4B001F] font-medium">
          Continue with Google
        </span>
      </button>
    </div>
  );
}
