"use server";

import { BACKEND_URL } from "@/lib/constants";
import { SaveCardPayload, SavedCardGroup, SavedCards } from "@/lib/types/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getCardHistory(userId: string): Promise<SavedCardGroup[]> {
  const response = await fetch(`${BACKEND_URL}/cards/users/${userId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const json = await response.json();
  const data: SavedCards[] = Array.isArray(json) ? json : (json?.data ?? []);

  const groups: Record<string, SavedCards[]> = {};
  for (const entry of data) {
    const label = new Date(entry.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    if (!groups[label]) groups[label] = [];
    groups[label].push(entry);
  }

  return Object.entries(groups).map(([date, entries]) => ({ date, entries }));
}

export async function saveCardForUser(payload: SaveCardPayload) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return { success: false, error: "You must be signed in to save cards." };
  }

  const response = await fetch(`${BACKEND_URL}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: session.user.id,
      template_id: payload.templateId,
      full_name: payload.formData.fullName,
      position: payload.formData.position,
      phone_number: payload.formData.phone,
      email: payload.formData.email,
      company: payload.formData.company,
      address: payload.formData.address,
      website: payload.formData.website,
    }),
  });

  if (!response.ok) {
    return { success: false, error: "Failed to save card." };
  }

  revalidatePath("/saved-cards");
  return { success: true };
}
