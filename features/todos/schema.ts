import { z } from "zod";

export const TodoPrioritySchema = z.enum(["low", "medium", "high"]);
export type TodoPriority = z.infer<typeof TodoPrioritySchema>;

export const CreateTodoInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: TodoPrioritySchema.default("medium"),
  dueDate: z.string().optional().nullable(),
});
export type CreateTodoInput = z.infer<typeof CreateTodoInputSchema>;

export const UpdateTodoInputSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional().nullable(),
  completed: z.boolean().optional(),
  priority: TodoPrioritySchema.optional(),
  dueDate: z.string().optional().nullable(),
});
export type UpdateTodoInput = z.infer<typeof UpdateTodoInputSchema>;
