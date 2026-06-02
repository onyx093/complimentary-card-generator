import LoginForm from "@/components/forms/login-form";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <div className="w-full">
      <div className="mb-10 text-center">
        <h1 className="text-left text-4xl font-semibold text-[#28171E] md:text-center md:text-2xl">
          Welcome to Cardify — Your World of Digital Cards
        </h1>
        <p className="mt-4 text-left text-sm font-normal text-[#615A5D] md:text-center md:text-xs">
          Empowering organizations to design smart, branded employee cards in seconds.
        </p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
