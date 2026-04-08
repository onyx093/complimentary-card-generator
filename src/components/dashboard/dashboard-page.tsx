"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/dashboard/header";
import CardForm from "@/components/dashboard/card-form";
import TemplateGallery from "@/components/dashboard/template-gallery";
import QuickPreview from "@/components/dashboard/quick-preview";
import { saveCardForUser, updateCardForUser } from "@/app/actions/cards";
import { formSchema } from "@/lib/schema";
import { Links } from "@/lib/enums/links";

import { CardTemplate } from "@/lib/types/card-templates";
import { CardFormData, SavedCard } from "@/lib/types/card";

type DashboardPageProps = {
  templates: CardTemplate[];
  initialCard?: SavedCard | null;
};

const emptyFormData: CardFormData = {
  fullName: "",
  position: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  website: "",
};

export default function DashboardPage({ templates, initialCard }: DashboardPageProps) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(Boolean(initialCard));
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CardFormData>(
    initialCard
      ? {
          fullName: initialCard.full_name ?? "",
          position: initialCard.position ?? "",
          email: initialCard.email ?? "",
          phone: initialCard.phone_number ?? "",
          company: initialCard.company ?? "",
          address: initialCard.address ?? "",
          website: initialCard.website ?? "",
        }
      : emptyFormData
  );

  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate | null>(
    initialCard
      ? (templates.find(template => template.id === initialCard.template_id) ?? null)
      : null
  );
  const isEditMode = Boolean(initialCard);

  async function handleSaveCard() {
    setSaveError(null);

    if (!selectedTemplate) {
      setSaveError("Select a template before saving your card.");
      return;
    }

    const parsed = formSchema.safeParse(formData);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message;
      setSaveError(firstError ?? "Please complete the form before saving.");
      return;
    }

    setIsSaving(true);

    const payload = {
      templateId: selectedTemplate.id,
      formData: {
        ...formData,
        ...parsed.data,
      },
    };

    const result =
      isEditMode && initialCard
        ? await updateCardForUser(initialCard.id, payload)
        : await saveCardForUser(payload);

    setIsSaving(false);

    if (!result.success) {
      setSaveError(result.error ?? "Unable to save card. Please try again.");
      return;
    }

    router.push(Links.SAVED_CARDS);
  }

  return (
    <>
      <Header />

      <div className="container mx-auto mt-6 px-4">
        <div className="flex min-h-screen flex-col items-stretch gap-6 lg:flex-row">
          {/* LEFT — FORM (40%) */}
          <div className="w-full lg:w-2/5">
            <div className="h-full rounded-xl bg-white p-6 shadow">
              <CardForm
                formData={formData}
                setFormData={setFormData}
                setIsActive={setIsActive}
              />
            </div>
          </div>

          {/* RIGHT — Templates + Preview (60%) */}
          <div className="w-full lg:w-3/5">
            <div className="flex h-full flex-col gap-6 rounded-xl bg-white p-6 shadow">
              {/* Templates */}
              <div>
                <h3 className="mb-4 text-lg font-medium">Templates</h3>
                <TemplateGallery
                  templates={templates}
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                  setIsActive={setIsActive}
                  isActive={isActive}
                />
              </div>

              <div className="border-t border-gray-100" />

              {/* Quick Preview */}
              <div className="flex flex-1 flex-col">
                <h3 className="mb-4 text-lg font-medium">Quick Preview</h3>

                <div className="flex-1">
                  <QuickPreview
                    formData={formData}
                    selectedTemplate={selectedTemplate}
                    onSaveCard={handleSaveCard}
                    isSaving={isSaving}
                    saveError={saveError}
                    actionLabel={isEditMode ? "Update Card" : "Save Card"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
