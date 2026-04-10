import { FileText, Trash2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getCardTemplates } from "@/app/actions/templates";
import { getTemplateLabel } from "@/lib/utils";
import { deleteSavedCardForUser, getSavedCardsByUser } from "../../actions/cards";

export default async function SavedCardsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const [savedCards, templates] = session
    ? await Promise.all([getSavedCardsByUser(session.user.id), getCardTemplates()])
    : [[], []];

  const escapeXml = (value?: string): string => {
    const safeValue = value ?? "";
    return safeValue
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const toDataUri = (svg: string): string => {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  const buildCardSvg = (entry: {
    template_id?: string;
    full_name: string;
    position: string;
    phone_number: string;
    email: string;
    company?: string;
    address?: string;
  }): string => {
    const templateName = getTemplateLabel(templates, entry.template_id).toLowerCase();

    const fullName = escapeXml(entry.full_name || "Your Name");
    const position = escapeXml(entry.position || "Your Position");
    const phone = escapeXml(entry.phone_number || "+234 000 000 000");
    const email = escapeXml(entry.email || "email@example.com");
    const company = escapeXml(entry.company || "Intercom Data Network");
    const address = escapeXml(
      entry.address || "19, Olu Awotesu St, Lifecamp, Jabi 900108, Abuja FCT"
    );

    if (templateName.includes("modern")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="1050" height="600" viewBox="0 0 1050 600">
        <rect width="1050" height="300" fill="#FFFFFF" />
        <rect y="300" width="1050" height="300" fill="#1e293b" />
        <text x="990" y="140" text-anchor="end" font-size="54" font-family="Arial, sans-serif" fill="#1e293b" font-weight="700">${fullName}</text>
        <text x="990" y="190" text-anchor="end" font-size="30" font-family="Arial, sans-serif" fill="#3b82f6">${position}</text>

        <text x="60" y="390" font-size="26" font-family="Arial, sans-serif" fill="#FFFFFF">📞 ${phone}</text>
        <text x="60" y="440" font-size="26" font-family="Arial, sans-serif" fill="#FFFFFF">✉ ${email}</text>
        <text x="60" y="490" font-size="22" font-family="Arial, sans-serif" fill="#FFFFFF">📍 ${address}</text>
        <text x="990" y="560" text-anchor="end" font-size="24" font-family="Arial, sans-serif" fill="#FFFFFF">${company}</text>
      </svg>`;
    }

    if (templateName.includes("minimalist")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="1050" height="600" viewBox="0 0 1050 600">
        <rect width="1050" height="600" fill="#FFFFFF" />
        <text x="980" y="70" text-anchor="end" font-size="24" font-family="Arial, sans-serif" fill="#19213D">${company}</text>

        <text x="70" y="430" font-size="52" font-family="Arial, sans-serif" fill="#19213D" font-weight="700">${fullName}</text>
        <text x="70" y="470" font-size="28" font-family="Arial, sans-serif" fill="#f87171">${position}</text>
        <line x1="70" y1="490" x2="520" y2="490" stroke="#D1D5DB" stroke-width="2" />

        <text x="70" y="530" font-size="24" font-family="Arial, sans-serif" fill="#19213D">📞 ${phone}</text>
        <text x="70" y="565" font-size="24" font-family="Arial, sans-serif" fill="#19213D">✉ ${email}</text>
        <text x="70" y="595" font-size="20" font-family="Arial, sans-serif" fill="#19213D">📍 ${address}</text>
      </svg>`;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="1050" height="600" viewBox="0 0 1050 600">
      <rect width="1050" height="600" fill="#19213D" />
      <rect x="420" y="0" width="630" height="600" fill="#1f2a4d" />

      <text x="70" y="280" font-size="56" font-family="Arial, sans-serif" fill="#FFFFFF" font-weight="700">${fullName}</text>
      <text x="70" y="330" font-size="30" font-family="Arial, sans-serif" fill="#FFFFFF">${position}</text>

      <text x="980" y="160" text-anchor="end" font-size="24" font-family="Arial, sans-serif" fill="#FFFFFF">${company}</text>
      <text x="980" y="430" text-anchor="end" font-size="26" font-family="Arial, sans-serif" fill="#FFFFFF">${phone}</text>
      <text x="980" y="470" text-anchor="end" font-size="24" font-family="Arial, sans-serif" fill="#FFFFFF">${email}</text>
      <text x="980" y="515" text-anchor="end" font-size="20" font-family="Arial, sans-serif" fill="#FFFFFF">${address}</text>
    </svg>`;
  };

  return (
    <div className="mt-8 mb-12 px-4">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#28171E]">Saved Cards</h1>
        <p className="mt-1 text-sm text-[#615A5D]">
          Your previously generated cards are saved here. You can view, edit, or download
          them at some time.
        </p>
      </div>

      {/* History card */}
      <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-[#28171E]">
          Saved Cards History
        </h2>

        {savedCards.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#615A5D]">
            No download history yet.
          </p>
        ) : (
          <div className="space-y-6">
            {savedCards.map(savedCard => (
              <div key={savedCard.date}>
                {/* Date label */}
                <p className="mb-3 text-xs text-[#615A5D]">{savedCard.date}</p>

                {/* Entries */}
                <div className="space-y-2">
                  {savedCard.entries.map(entry => {
                    const deleteCardAction = deleteSavedCardForUser.bind(
                      null,
                      String(entry.id)
                    );

                    return (
                      <div key={entry.id} className="flex items-center gap-4">
                        <div className="flex flex-1 items-center justify-between rounded-xl bg-[#FAFAFA] px-4 py-3 transition hover:bg-[#FFF5FA]">
                          <div className="flex items-center gap-3">
                            {/* Icon */}
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4B001F]">
                              <FileText className="h-4 w-4 text-white" />
                            </div>

                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-[#28171E]">
                                {getTemplateLabel(templates, entry.template_id)}
                              </span>
                              <span className="text-xs text-[#615A5D]">
                                {entry.full_name}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-4">
                            <Link
                              href={`/dashboard?edit=${entry.id}`}
                              className="text-sm font-medium text-[#4B001F] hover:underline"
                            >
                              Edit
                            </Link>
                            <a
                              href={toDataUri(buildCardSvg(entry))}
                              download={`${entry.full_name.replace(/\s+/g, "-").toLowerCase()}-card.svg`}
                              className="text-sm font-medium text-[#4B001F] hover:underline"
                            >
                              Download
                            </a>
                          </div>
                        </div>

                        <form action={deleteCardAction} className="shrink-0">
                          <button
                            type="submit"
                            aria-label={`Delete ${entry.full_name} card`}
                            className="flex h-12 w-14 items-center justify-center rounded-xl border border-[#F1EAED] bg-white text-[#4B001F] transition hover:bg-[#4B001F] hover:text-white focus-visible:bg-[#4B001F] focus-visible:text-white focus-visible:outline-none active:bg-[#4B001F] active:text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
