import LoginForm from "@/components/forms/Login-form";

export default function LoginPage() {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome to <span className="text-rose-800">Cardify</span> — Your World
          of Digital Cards
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Empowering organizations to design smart, branded employee cards in
          seconds.
        </p>
      </div>

      <LoginForm />

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-rose-800 hover:underline font-medium"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
