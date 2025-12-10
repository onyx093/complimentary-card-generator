import { CardFormData } from "@/lib/types/card";
import Image from "next/image";

export function CardTemplate3({
  fullName,
  position,
  email,
  phone,
  company,
  address,
}: CardFormData) {
  return (
    <div className="w-[520px] h-80 overflow-hidden flex flex-col shadow-lg">
      {/*Top half*/}
      <div className="h-1/2 bg-white text-[#1e293b] flex flex-col justify-start items-end p-6">
        <h2 className="text-2xl font-bold text-right capitalize">
          {fullName || "Your Name"}
        </h2>
        <p className="text-sm opacity-80 text-right text-blue-500">
          {position || "Your Position"}
        </p>
      </div>

      {/* bottom half */}
      <div className="relative h-1/2 bg-[#1e293b] text-white flex flex-col justify-end items-start p-6 space-y-2 text-sm">
        <p className="flex items-center gap-2 text-sm leading-none">
          <span className="w-4 h-4 flex items-center justify-center">
            <Image
              src="/phone-icon-white.svg"
              alt="Phone"
              width={18}
              height={18}
            />
          </span>
          <span className="leading-none">{phone || "+234 000 000 000"}</span>
        </p>

        <p className="flex items-center gap-2 text-sm leading-none">
          <span className="w-4 h-4 flex items-center justify-center">
            <Image
              src="/mail-icon-white.svg"
              alt="Email"
              width={18}
              height={18}
            />
          </span>
          <span className="leading-none">{email || "email@example.com"}</span>
        </p>

        <p className="flex items-center gap-2 text-sm leading-none mb-6">
          <span className="w-4 h-4 flex items-center justify-center">
            <Image
              src="/location-icon-white.svg"
              alt="Location"
              width={18}
              height={18}
            />
          </span>
          <span className="leading-none">
            {address || "19, Olu Awotesu St, Lifecamp, Jabi 900108, Abuja FCT"}
          </span>
        </p>
        {/* <p>
          <Image src="/phone-icon.svg" alt="Phone" width={16} height={16} />
          {phone || "+234 000 000 000"}
        </p>
        <p>
          <Image src="/mail-icon.svg" alt="Email" width={16} height={16} />
          {email || "email@example.com"}
        </p>
        <p className="font-semibold mb-6">
          <Image
            src="/location-icon.svg"
            alt="Location"
            width={16}
            height={16}
          />
          {address || "19, Olu Awotesu St, Lifecamp, Jabi 900108, Abuja FCT"}
        </p> */}

        <p className="absolute bottom-3 right-6 text-xs text-right">
          {company || "Intercom Data Network"}
        </p>
      </div>
    </div>
  );
}
