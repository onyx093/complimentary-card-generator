import LoginForm from '@/components/forms/login-form';

export default async function LoginPage() {
  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-2xl font-semibold text-left md:text-center text-[#28171E]">
          Welcome to Cardify — Your World of Digital Cards
        </h1>
        <p className="text-sm md:text-xs font-normal text-[#615A5D] text-left md:text-center mt-4">
          Empowering organizations to design smart, branded employee cards in
          seconds.
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
