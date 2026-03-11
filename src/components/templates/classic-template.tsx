import { CardFormData } from '@/lib/types/card';

export function ClassicTemplate({
  fullName,
  position,
  email,
  phone,
  company,
  address,
}: CardFormData) {
  return (
    <div className="w-130 h-80 bg-[#19213D] text-white shadow-lg overflow-hidden">
      <div className="flex h-full">
        {/* LEFT: logo / accent panel */}
        <div className="w-[40%] flex items-center justify-center p-4">
          <div>
            <h3 className="text-3xl font-bold leading-tight capitalize">
              {fullName || 'Your Name'}
            </h3>
            <p className="text-sm text-white mt-1">{position || 'Position'}</p>
          </div>
        </div>

        {/* RIGHT: content */}
        <div className="w-[60%] p-6 flex flex-col justify-between items-end">
          <div className="text-xs text-white">
            <div>{company || 'Intercom Data Network'}</div>
          </div>
          <div className="text-sm text-white space-y-0.5">
            <div>{phone || '+234 000 000 000'}</div>
            <div>{email || 'email@example.com'}</div>
            <div className="text-xs font-semibold text-white mt-1">
              {address ||
                '19, Olu Awotesu St, Lifecamp, Jabi 900108, Abuja FCT'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
