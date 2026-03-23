import { FileText } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getSavedCardsByUser } from "@/app/actions/cards";

export default async function SavedCardsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const groups = session ? await getSavedCardsByUser(session.user.id) : [];

  return (
    <div className="mt-8 mb-12 px-4">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#28171E]">Saved Cards</h1>
        <p className="mt-1 text-sm text-[#615A5D]">
          Your previously generated cards are saved here. You can view, edit, or download
          them at any time.
        </p>
      </div>

      {/* History card */}
      <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-[#28171E]">
          Saved Cards History
        </h2>

        {groups.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#615A5D]">
            No download history yet.
          </p>
        ) : (
          <div className="space-y-6">
            {groups.map(group => (
              <div key={group.date}>
                {/* Date label */}
                <p className="mb-3 text-xs text-[#615A5D]">{group.date}</p>

                {/* Entries */}
                <div className="space-y-2">
                  {group.entries.map(entry => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between rounded-xl bg-[#FAFAFA] px-4 py-3 transition hover:bg-[#FFF5FA]"
                    >
                      <div className="flex items-center gap-3">
                        {/* Icon */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4B001F]">
                          <FileText className="h-4 w-4 text-white" />
                        </div>

                        {/* Template name */}
                        <span className="text-sm font-medium text-[#28171E]">
                          {entry.templateName}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-6">
                        <Link
                          href={`/dashboard?edit=${entry.id}`}
                          className="text-sm font-medium text-[#4B001F] hover:underline"
                        >
                          Edit
                        </Link>

                        <a
                          href={entry.downloadUrl}
                          download
                          className="text-sm font-medium text-[#4B001F] hover:underline"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
