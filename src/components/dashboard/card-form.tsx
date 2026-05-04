"use client";

import { useEffect } from "react";
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

import { CardFormData } from "@/lib/types/card";

type Props = {
  formData: CardFormData;
  setFormData: React.Dispatch<React.SetStateAction<CardFormData>>;
  setIsActive: (v: boolean) => void;
};

export default function CardForm({ formData, setFormData, setIsActive }: Props) {
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

  useEffect(() => {
    form.reset({
      fullName: formData.fullName ?? "",
      position: formData.position ?? "",
      email: formData.email ?? "",
      phone: formData.phone ?? "",
    });
  }, [form, formData]);

  const syncToParent = (name: keyof FormValues, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setIsActive(true);
  };

  return (
    <section className="bg-white">
      <h3 className="mb-6 text-2xl font-semibold text-[#2b2b2b]">Personal Details</h3>

      <Form {...form}>
        <form onSubmit={e => e.preventDefault()} className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 text-sm text-[#4b001f]">Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="fullName"
                    placeholder="e.g., Leonard Adams"
                    className="rounded-lg px-6 py-4 hover:bg-[#FFF5FA]"
                    aria-label="Full name"
                    onChange={e => {
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
                <div className="mb-2 flex items-center gap-3">
                  <FormLabel className="text-sm text-[#4b001f]">Position</FormLabel>
                  <span className="rounded-full border border-gray-300 px-2 py-1 text-xs text-gray-400">
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
                    onChange={e => {
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
                    onChange={e => {
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
                <div className="mb-2 flex items-center gap-3">
                  <FormLabel className="text-sm text-[#4b001f]">Phone Number</FormLabel>
                  <span className="rounded-full border border-gray-300 px-2 py-1 text-xs text-gray-400">
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
                    onChange={e => {
                      field.onChange(e);
                      syncToParent("phone", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  );
}
