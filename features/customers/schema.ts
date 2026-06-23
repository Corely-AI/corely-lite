import { z } from "zod";

export const CreateCustomerInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  company: z.string().optional(),
  notes: z.string().optional(),
});
export type CreateCustomerInput = z.infer<typeof CreateCustomerInputSchema>;

export const UpdateCustomerInputSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  company: z.string().optional(),
  notes: z.string().optional(),
});
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerInputSchema>;
