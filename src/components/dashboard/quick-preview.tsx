import { cardTemplates, TemplateId } from '@/lib/types/card-templates';
import { CardFormData } from '@/lib/types/card';

type Props = {
  formData: CardFormData;
  selectedTemplate: TemplateId | null;
};

export default function QuickPreview({ formData, selectedTemplate }: Props) {
  if (!selectedTemplate) {
    return (
      <div className="bg-gray-100 min-h-80 rounded-xl flex items-center justify-center text-gray-400 border">
        Select a template to preview
      </div>
    );
  }

  const SelectedTemplate = cardTemplates[selectedTemplate];

  return (
    <div className="bg-gray-50 border rounded-xl p-6 flex justify-center">
      <SelectedTemplate {...formData} />
    </div>
  );
}
