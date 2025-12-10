// /lib/cardTemplates.ts
import { CardTemplate1 } from "@/components/dashboard/Template1";
import { CardTemplate2 } from "@/components/dashboard/Template2";
import { CardTemplate3 } from "@/components/dashboard/Template3";

export const cardTemplates = {
  "template-1": CardTemplate1,
  "template-2": CardTemplate2,
  "template-3": CardTemplate3,
};

export type TemplateId = keyof typeof cardTemplates;
