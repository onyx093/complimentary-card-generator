"use client";

import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormValues } from "@/lib/schema";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CardFormData } from "@/lib/types/card";
import { CardTemplate } from "@/lib/types/card-templates";
import { saveCardForUser } from "@/app/actions/history";

type Props = {
  formData: CardFormData;
  setFormData: React.Dispatch<React.SetStateAction<CardFormData>>;
  setIsActive: (v: boolean) => void;
  selectedTemplate: CardTemplate | null;
};

export default function CardForm({
  formData,
  setFormData,
  setIsActive,
  selectedTemplate,
}: Props) {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as unknown as Resolver<FormValues>,
    mode: "onChange",
    defaultValues: {
      fullName: formData.fullName ?? "",
      position: formData.position ?? "",
      email: formData.email ?? "",
      phone: formData.phone ?? "",
    },
  });

  async function onSubmit(values: FormValues) {
    setFormData(values);
    setIsActive(true);

    if (!selectedTemplate) {
      form.setError("root", {
        message: "Select a template before saving your card.",
      });
      return;
    }

    const result = await saveCardForUser({
      templateId: selectedTemplate.id,
      formData: {
        ...formData,
        ...values,
      },
    });

    if (!result.success) {
      form.setError("root", {
        message: result.error ?? "Unable to save card. Please try again.",
      });
      return;
    }

    router.push("/saved-cards");
  }

  const syncToParent = (name: keyof FormValues, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsActive(true);
  };

  return (
    <section className="bg-white">
      <h3 className="text-2xl font-semibold text-[#2b2b2b] mb-6">
        Personal Details
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 text-sm text-[#4b001f]">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="fullName"
                    placeholder="e.g., Leonard Adams"
                    className="rounded-lg px-6 py-4 hover:bg-[#FFF5FA]"
                    aria-label="Full name"
                    onChange={(e) => {
                      field.onChange(e);
                      syncToParent("fullName", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3 mb-2">
                  <FormLabel className="text-sm text-[#4b001f]">
                    Position
                  </FormLabel>
                  <span className="text-xs text-gray-400 rounded-full border border-gray-300 px-2 py-1">
                    ?
                  </span>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    id="position"
                    placeholder="e.g., UI/UX Designer"
                    className="rounded-lg px-6 py-4 hover:bg-[#FFF5FA]"
                    aria-label="Position"
                    onChange={(e) => {
                      field.onChange(e);
                      syncToParent("position", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 text-sm text-[#4b001f]">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    placeholder="e.g., leonard@idnng.com"
                    type="email"
                    className="rounded-lg px-6 py-4 hover:bg-[#FFF5FA]"
                    aria-label="Email address"
                    onChange={(e) => {
                      field.onChange(e);
                      syncToParent("email", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3 mb-2">
                  <FormLabel className="text-sm text-[#4b001f]">
                    Phone Number
                  </FormLabel>
                  <span className="text-xs text-gray-400 rounded-full border border-gray-300 px-2 py-1">
                    ?
                  </span>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    id="phone"
                    placeholder="e.g., +234 7874 8994 98"
                    type="tel"
                    className="rounded-lg px-6 py-4 hover:bg-[#FFF5FA]"
                    aria-label="Phone number"
                    onChange={(e) => {
                      field.onChange(e);
                      syncToParent("phone", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6 flex justify-end">
            <Button type="submit" className="rounded-full px-8 py-3 " disabled={!form.formState.isValid}>
              Save Card
            </Button>
          </div>

          {form.formState.errors.root?.message && (
            <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>
          )}
        </form>
      </Form>
    </section>
  );
}
