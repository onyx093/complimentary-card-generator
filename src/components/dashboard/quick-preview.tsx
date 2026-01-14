import Image from "next/image";
import { cardTemplates, TemplateId } from "@/lib/types/card-templates";
import { CardFormData } from "@/lib/types/card";

type Props = {
  formData: CardFormData;
  selectedTemplate: TemplateId | null;
  previewTemplate: TemplateId | null;
};

const templates = [
  { id: "template-1", title: "Template 1", file: "/card-mockup1.svg" },
  { id: "template-2", title: "Template 2", file: "/card-mockup2.svg" },
  { id: "template-3", title: "Template 3", file: "/card-mockup3.svg" },
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
      return (
        <div className="bg-gray-50 border rounded-xl p-6 flex justify-center">
          <Image
            src={template.file}
            alt={template.title}
            width={450}
            height={288}
            className="object-contain w-auto h-auto"
            loading="eager"
          />
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
