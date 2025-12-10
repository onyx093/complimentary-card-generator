"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  selectedTemplate: string | null;
  setSelectedTemplate: (v: string) => void;
  setIsActive: (v: boolean) => void;
  isActive?: boolean;
};

const THUMB_W = 225;
const THUMB_H = 144;

const templates = [
  { id: "template-1", title: "Template 1", file: "/card-mockup1.svg" },
  { id: "template-2", title: "Template 2", file: "/card-mockup2.svg" },
  { id: "template-3", title: "Template 3", file: "/card-mockup3.svg" },
];

export default function TemplateGallery({
  selectedTemplate,
  setSelectedTemplate,
  setIsActive,
  isActive,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const galleryActive = isActive === true;

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4">
          {templates.map((t) => {
            const isSelected = selectedTemplate === t.id;

            return (
              <article
                key={t.id}
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
                    <Image
                      src={t.file}
                      alt={t.title}
                      width={THUMB_W}
                      height={THUMB_H}
                      className="object-cover w-full h-auto"
                      draggable={false}
                      priority={false}
                    />
                  </div>
                </div>

                <div className="px-3 pb-4 lg:px-2 flex flex-col md:flex-row items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreview(t.file)}
                    className={`w-full sm:flex-1 sm:max-w-28 px-3 py-2 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#4B001F] transition ${
                      galleryActive
                        ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        : "border border-gray-300 bg-white text-gray-400 cursor-not-allowed"
                    }`}
                    aria-label={`Preview ${t.title}`}
                    disabled={!galleryActive}
                  >
                    Preview
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!galleryActive) return;
                      setSelectedTemplate(t.id);
                      setIsActive(true);
                    }}
                    className={`w-full sm:flex-1 sm:max-w-28 px-3 py-2 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#4B001F] transition ${
                      isSelected
                        ? "bg-[#4B001F] text-white cursor-default"
                        : galleryActive
                        ? "bg-[#4B001F] text-white hover:opacity-90"
                        : "bg-[#E8E8E8] text-white cursor-not-allowed"
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`Select ${t.title}`}
                    disabled={!galleryActive || isSelected}
                  >
                    {isSelected ? "Select" : "Select"}
                  </button>
                </div>

                {isSelected && (
                  <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 bg-[#4B001F] text-white text-xs font-medium px-3 py-1 rounded-full">
                    Selected
                  </span>
                )}

                {/* Red border for selected state - always show when selected */}
                {isSelected && (
                  <div className="absolute inset-0 border-2 border-[#8B0000] rounded-xl pointer-events-none"></div>
                )}

                {/* Remove the inactive overlay - we only want buttons to be affected */}
              </article>
            );
          })}
        </div>
      </div>

      {/* Preview modal */}
      {preview && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-3">
              <button
                onClick={() => setPreview(null)}
                aria-label="Close preview"
                className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>

            <div className="w-full flex justify-center p-4">
              <Image
                src={preview}
                alt="Template preview"
                width={800}
                height={500}
                className="w-full h-auto max-w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
