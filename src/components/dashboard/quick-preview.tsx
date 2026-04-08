import { CardTemplate } from "@/lib/types/card-templates";
import { CardFormData } from "@/lib/types/card";
import TemplateFactory from "../templates/template-factory";
import { Button } from "../ui/button";

type Props = {
  formData: CardFormData;
  selectedTemplate: CardTemplate | null;
  onSaveCard: () => Promise<void>;
  isSaving: boolean;
  saveError: string | null;
  actionLabel: string;
};

export default function QuickPreview({
  formData,
  selectedTemplate,
  onSaveCard,
  isSaving,
  saveError,
  actionLabel,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex min-h-80 items-center justify-center rounded-xl border bg-gray-50 p-6">
        {selectedTemplate ? (
          <TemplateFactory template={selectedTemplate} formData={formData} />
        ) : (
          <p className="text-gray-400">Select a template to preview</p>
        )}
      </div>

      <Button
        type="button"
        className="w-full rounded-full py-6 text-lg text-white enabled:bg-[#4b001f] enabled:hover:bg-[#4b001f]/90"
        onClick={onSaveCard}
        disabled={!selectedTemplate || isSaving}
      >
        {isSaving ? "Saving..." : actionLabel}
      </Button>

      {saveError && <p className="text-sm text-red-600">{saveError}</p>}
    </div>
  );
}
