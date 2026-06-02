import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { authClient } from "./auth-client";
import { Links } from "./enums/links";
import { CardTemplate } from "./types/card-templates";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const signInWithGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: Links.DASHBOARD.toString(),
  });
};

export const templateMap = (templates: { id: string; name: string }[]) => {
  return new Map<string, string>(
    templates.map((template: { id: string; name: string }) => [
      template.id,
      template.name,
    ]) as [string, string][]
  );
};

export const getTemplateLabel = (
  templates: CardTemplate[],
  templateId?: string
): string => {
  if (!templateId) {
    return "Template";
  }

  return templateMap(templates).get(templateId) || templateId;
};
