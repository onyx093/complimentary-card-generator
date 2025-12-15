import { z } from "zod";

export const formSchema = z.object({
  fullName: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : val),
    z
      .string()
      .refine(
        (v) => v.length >= 2 && v.split(/\s+/).filter(Boolean).length >= 2,
        { message: "Please enter a first and last name." }
      )
  ),
  position: z
    .string()
    .min(2, { message: "Position must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .min(7, { message: "Please enter a valid phone number." })
    .max(30, { message: "Phone number is too long." }),
});

export type FormValues = z.infer<typeof formSchema>;
