"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  return (
    <div className="flex flex-col gap-5 bg-white">
      <button
        type="button"
        className="w-full inline-flex items-center justify-center gap-3 rounded-full border border-gray-300 px-4 py-2 bg-white hover:bg-gray-50 transition"
      >
        <FcGoogle className="w-5 h-5" />
        <span className="text-sm text-gray-700 font-medium">
          Continue with Google
        </span>
      </button>

      <div className="flex items-center gap-3">
        <hr className="flex-1 border-t border-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <hr className="flex-1 border-t border-gray-200" />
      </div>

      <button className="w-full rounded-full bg-rose-800 text-white px-6 py-2 text-sm font-medium hover:bg-rose-700 transition">
        Sign up with email
      </button>
    </div>
  );
}
