"use server";

import { BACKEND_URL } from "@/lib/constants";

export type HistoryEntry = {
  id: string;
  templateName: string;
  downloadedAt: string;
  downloadUrl: string;
};

export type HistoryGroup = {
  date: string;
  entries: HistoryEntry[];
};

export async function getCardHistory(userId: string): Promise<HistoryGroup[]> {
  const response = await fetch(
    `${BACKEND_URL}/cards/history?userId=${userId}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return [];
  }

  const data: HistoryEntry[] = await response.json();

  const groups: Record<string, HistoryEntry[]> = {};
  for (const entry of data) {
    const label = new Date(entry.downloadedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    if (!groups[label]) groups[label] = [];
    groups[label].push(entry);
  }

  return Object.entries(groups).map(([date, entries]) => ({ date, entries }));
}
