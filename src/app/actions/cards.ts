"use server";

  import { SavedCardGroup } from "@/lib/types/card";
  import {getCardHistory, saveCardForUser} from "@/app/actions/history";

export type HistoryGroup = SavedCardGroup;

export async function getSavedCardsByUser(
  userId: string,
): Promise<HistoryGroup[]> {
  return getCardHistory(userId);
}

export { saveCardForUser };
