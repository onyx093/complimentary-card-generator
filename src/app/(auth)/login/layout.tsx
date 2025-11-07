import React from "react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[2fr_3fr]">
      {/* Left Section: Artwork */}
      <div className="relative hidden md:block bg-slate-900">
        <Image
          src="/holographic-cube.jpg"
          alt="decorative artwork"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Right Section: Form */}
      <div className="flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-md space-y-6">{children}</div>
      </div>
    </div>
  );
}
