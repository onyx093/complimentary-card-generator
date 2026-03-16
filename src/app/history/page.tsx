import { FileText } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getCardHistory } from "@/app/actions/history";

export default async function CardHistoryPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const groups = session ? await getCardHistory(session.user.id) : [];

  return (
    <div className="px-4 mt-8 mb-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#28171E]">History</h1>
        <p className="text-sm text-[#615A5D] mt-1">
          Your previously generated cards are saved here.
        </p>
      </div>

      {/* History card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl">
        <h2 className="text-base font-semibold text-[#28171E] mb-4">
          Download History
        </h2>

        {groups.length === 0 ? (
          <p className="text-sm text-[#615A5D] py-8 text-center">
            No download history yet.
          </p>
        ) : (
          <div className="space-y-6">
            {groups.map((group) => (
              <div key={group.date}>
                {/* Date label */}
                <p className="text-xs text-[#615A5D] mb-3">{group.date}</p>

                {/* Entries */}
                <div className="space-y-2">
                  {group.entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#FAFAFA] hover:bg-[#FFF5FA] transition"
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
