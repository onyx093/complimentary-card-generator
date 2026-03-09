import { CardFormData } from '@/lib/types/card';
import { CardTemplate } from '@/lib/types/card-templates';
import { ClassicTemplate } from './classic-template';
import { MinimalistTemplate } from './minimalist-template';
import { ModernTemplate } from './modern-template';

export default function TemplateFactory({
  template,
  formData,
}: {
  template: CardTemplate;
  formData: CardFormData;
}) {
  if (template.name === 'classic') {
    return <ClassicTemplate {...formData} />;
  } else if (template.name === 'minimalist') {
    return <MinimalistTemplate {...formData} />;
  } else if (template.name === 'modern') {
    return <ModernTemplate {...formData} />;
  }
}
