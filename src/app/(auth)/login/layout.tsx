import React from "react";
import RubicCube from "@/components/ui/rubic-cube";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
      {/* Left Section: Artwork */}
      <div className="relative hidden lg:block bg-slate-900">
        <RubicCube className="object-contain w-full h-full" />
      </div>

      {/* Right Section: Form */}
      <div className="flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-md space-y-6">{children}</div>
      </div>
    </div>
  );
}
