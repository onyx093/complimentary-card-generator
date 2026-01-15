import { cardTemplates, TemplateId } from "@/lib/types/card-templates";
import { CardFormData } from "@/lib/types/card";
import MockUp1 from "@/components/ui/card-mockup1";
import MockUp2 from "@/components/ui/card-mockup2";
import MockUp3 from "@/components/ui/card-mockup3";

type Props = {
  formData: CardFormData;
  selectedTemplate: TemplateId | null;
  previewTemplate: TemplateId | null;
};

type Template = {
  id: TemplateId;
  title: string;
  Component: React.FC<{ className?: string }>;
};

const templates: Template[] = [
  { id: "template-1", title: "Template 1", Component: MockUp1 },
  { id: "template-2", title: "Template 2", Component: MockUp2 },
  { id: "template-3", title: "Template 3", Component: MockUp3 },
];

export default function QuickPreview({
  formData,
  selectedTemplate,
  previewTemplate,
}: Props) {
  if (selectedTemplate) {
    const SelectedTemplate = cardTemplates[selectedTemplate];
    return (
      <div className="bg-gray-50 border rounded-xl p-6 flex justify-center">
        <SelectedTemplate {...formData} />
      </div>
    );
  }

  if (previewTemplate) {
    const template = templates.find((t) => t.id === previewTemplate);
    if (template) {
      const PreviewComponent = template.Component;

      return (
        <div className="bg-gray-50 border rounded-xl p-6 flex justify-center">
          <PreviewComponent className="w-full h-auto" />;
        </div>
      );
    }
  }

  return (
    <div className="bg-gray-100 min-h-80 rounded-xl flex items-center justify-center text-gray-400 border">
      Select a template to preview
    </div>
  );
}
