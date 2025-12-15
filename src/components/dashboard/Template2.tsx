import { CardFormData } from "@/lib/types/card";
import Image from "next/image";

export function CardTemplate2({
  fullName,
  phone,
  company,
  position,
  email,
  address,
}: CardFormData) {
  return (
    <div className="relative w-[520px] h-80 bg-white text-[#19213D] p-8 flex items-end">
      <p className="absolute top-6 right-6 text-xs">
        {company || "Intercom Data Network"}
      </p>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold uppercase">
          {fullName || "Your Name"}
        </h2>
        <p className="text-sm mb-4 text-red-400 pb-4 border-b border-gray-300">
          {position || "Your Position"}
        </p>

        <p className="flex items-center gap-2 text-sm leading-none">
          <span className="w-4 h-4 flex items-center justify-center">
            <Image src="/phone-icon.svg" alt="Phone" width={18} height={18} />
          </span>
          <span className="leading-none">{phone || "+234 000 000 000"}</span>
        </p>

        <p className="flex items-center gap-2 text-sm leading-none">
          <span className="w-4 h-4 flex items-center justify-center">
            <Image src="/mail-icon.svg" alt="Email" width={18} height={18} />
          </span>
          <span className="leading-none">{email || "email@example.com"}</span>
        </p>

        <p className="flex items-center gap-2 text-sm leading-none">
          <span className="w-4 h-4 flex items-center justify-center">
            <Image
              src="/location-icon.svg"
              alt="Location"
              width={18}
              height={18}
            />
          </span>
          <span className="leading-none">
            {address || "19, Olu Awotesu St, Lifecamp, Jabi 900108, Abuja FCT"}
          </span>
        </p>
      </div>
    </div>
  );
}
