// "use client";
// import { CardFormData } from "@/lib/types/card";
// import Image from "next/image";

// type Props = {
//   formData: CardFormData;
//   selectedTemplate: string | null;
//   isActive: boolean;
// };

// const templatePreviewMap: Record<string, string> = {
//   "template-1": "/card-mockup1.svg",
//   "template-2": "/card-mockup2.svg",
//   "template-3": "/card-mockup3.svg",
// };

// export default function QuickPreview({
//   formData,
//   selectedTemplate,
//   isActive,
// }: Props) {
//   const previewImage = selectedTemplate
//     ? templatePreviewMap[selectedTemplate]
//     : null;

//   return (
//     <div className="space-y-6">
//       {/* Preview Container */}
//       {!isActive ? (
//         <div className="bg-gray-100 min-h-[280px] rounded-xl flex items-center justify-center text-gray-400 border border-gray-200">
//           No preview yet
//         </div>
//       ) : (
//         <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 min-h-[280px] flex items-center justify-center">
//           {previewImage ? (
//             <div className="w-full max-w-[500px]">
//               <Image
//                 src={previewImage}
//                 alt="Card preview"
//                 width={500}
//                 height={300}
//                 className="w-full h-auto rounded-lg"
//                 priority
//               />
//             </div>
//           ) : (
//             <div className="text-gray-600">
//               <p>Full Name: {formData.fullName}</p>
//               <p>Position: {formData.position}</p>
//               <p>Email: {formData.email}</p>
//               <p>Phone: {formData.phone}</p>
//               <p>Template: {selectedTemplate}</p>
//             </div>
//           )}
//         </div>
//       )}

//       <div className="flex justify-center">
//         <button
//           type="button"
//           disabled={!isActive || !selectedTemplate}
//           className={`w-[80%] mx-auto py-3 px-6 rounded-full text-sm font-medium transition-all ${
//             isActive && selectedTemplate
//               ? "bg-[#4B001F] text-white hover:opacity-90 cursor-pointer"
//               : "bg-[#E8E8E8] text-white cursor-not-allowed"
//           }`}
//         >
//           Download
//         </button>
//       </div>
//     </div>
//   );
// }

// /components/QuickPreview.tsx
"use client";

import { cardTemplates, TemplateId } from "@/lib/types/cardTemplate";
import { CardFormData } from "@/lib/types/card";

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
