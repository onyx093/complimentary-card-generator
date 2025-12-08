'use client';

import { signInWithGoogle } from '@/lib/utils';
import { FcGoogle } from 'react-icons/fc';

export default function LoginForm() {
  return (
    <div className="flex flex-col gap-5 bg-white">
      <button
        type="button"
        onClick={signInWithGoogle}
        className="w-full inline-flex items-center justify-center gap-3 rounded-full border border-gray-300 px-4 py-2 bg-white hover:bg-gray-200 transition cursor-pointer">
        <FcGoogle className="w-5 h-5" />
        <span className="text-sm text-[#4B001F] font-medium">
          Continue with Google
        </span>
      </button>
    </div>
  );
}
