import MockUp1 from "@/components/ui/card-mockup1";
import MockUp2 from "@/components/ui/card-mockup2";
import MockUp3 from "@/components/ui/card-mockup3";

type Props = {
  selectedTemplate: string | null;
  setSelectedTemplate: (v: string) => void;
  setIsActive: (v: boolean) => void;
  isActive?: boolean;
  previewTemplate: string | null;
  setPreviewTemplate: (v: string | null) => void;
};

type Template = {
  id: string;
  title: string;
  Component: React.FC<{ className?: string }>;
};

const templates: Template[] = [
  { id: "template-1", title: "Template 1", Component: MockUp1 },
  { id: "template-2", title: "Template 2", Component: MockUp2 },
  { id: "template-3", title: "Template 3", Component: MockUp3 },
];

export default function TemplateGallery({
  selectedTemplate,
  setSelectedTemplate,
  setIsActive,
  isActive,
  setPreviewTemplate,
}: Props) {
  const galleryActive = isActive === true;

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4">
          {templates.map(({ id, title, Component }) => {
            const isSelected = selectedTemplate === id;

            return (
              <article
                key={id}
                className={`relative rounded-xl overflow-hidden bg-white transition-shadow duration-150
                  ${
                    isSelected
                      ? "ring-[#4B001F] shadow-md"
                      : "border border-gray-100 hover:shadow-lg"
                  }`}
              >
                <div className="py-6 md:py-4 flex justify-center px-4">
                  <div
                    className={`rounded-lg overflow-hidden w-full max-w-[225px] transition-opacity ${
                      galleryActive ? "opacity-100" : "opacity-80"
                    }`}
                  >
                    <Component className="w-full h-auto" />
                  </div>
                </div>

                <div className="px-3 pb-4 lg:px-2 flex flex-col md:flex-row items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => galleryActive && setPreviewTemplate(id)}
                    className={`w-full sm:flex-1 sm:max-w-28 px-3 py-2 rounded-lg text-xs font-medium transition ${
                      galleryActive
                        ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        : "border border-gray-300 bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!galleryActive}
                  >
                    Preview
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!galleryActive) return;
                      setSelectedTemplate(id);
                      setIsActive(true);
                    }}
                    className={`w-full sm:flex-1 sm:max-w-28 px-3 py-2 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#4B001F] transition ${
                      isSelected
                        ? "bg-[#4B001F] text-white cursor-default"
                        : galleryActive
                        ? "bg-[#4B001F] text-white hover:opacity-90"
                        : "bg-gray-300 text-gray-400 cursor-not-allowed"
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`Select ${title}`}
                    disabled={!galleryActive || isSelected}
                  >
                    Select
                  </button>
                </div>

                {isSelected && (
                  <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 bg-[#4B001F] text-white text-xs font-medium px-3 py-1 rounded-full">
                    Selected
                  </span>
                )}

                {isSelected && (
                  <div className="absolute inset-0 border-2 border-[#8B0000] rounded-xl pointer-events-none"></div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
