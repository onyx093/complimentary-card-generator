'use client';

import { useState } from 'react';
import Header from '@/components/dashboard/header';
import CardForm from '@/components/dashboard/card-form';
import TemplateGallery from '@/components/dashboard/template-gallery';
import QuickPreview from '@/components/dashboard/quick-preview';

import { CardTemplate } from '@/lib/types/card-templates';
import { CardFormData } from '@/lib/types/card';

type DashboardPageProps = {
  templates: CardTemplate[];
};

export default function DashboardPage({ templates }: DashboardPageProps) {
  const [isActive, setIsActive] = useState(false);

  const [formData, setFormData] = useState<CardFormData>({
    fullName: '',
    position: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    website: '',
  });

  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate | null>(
    null,
  );

  return (
    <>
      <Header />

      <div className="container mx-auto px-4 mt-6">
        <div className="flex flex-col lg:flex-row gap-6 min-h-screen items-stretch">
          {/* LEFT — FORM (40%) */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white p-6 rounded-xl shadow h-full">
              <CardForm
                formData={formData}
                setFormData={setFormData}
                setIsActive={setIsActive}
              />
            </div>
          </div>

          {/* RIGHT — Templates + Preview (60%) */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white p-6 rounded-xl shadow flex flex-col h-full gap-6">
              {/* Templates */}
              <div>
                <h3 className="text-lg font-medium mb-4">Templates</h3>
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
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-medium mb-4">Quick Preview</h3>

                <div className="flex-1">
                  <QuickPreview
                    formData={formData}
                    selectedTemplate={selectedTemplate}
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
