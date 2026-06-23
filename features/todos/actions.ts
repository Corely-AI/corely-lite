"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { CreateTodoInputSchema, UpdateTodoInputSchema } from "./schema";

export async function createTodoAction(formData: {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string | null;
}) {
  try {
    const user = await getSessionUser();
    const validated = CreateTodoInputSchema.parse(formData);

    const todo = await prisma.todo.create({
      data: {
        title: validated.title,
        description: validated.description || null,
        priority: validated.priority,
        dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
        userId: user.id,
      },
    });

    revalidatePath("/todos");
    revalidatePath("/dashboard");
    return { success: true, data: todo };
  } catch (error: any) {
    console.error("Failed to create todo:", error);
    return { success: false, error: error.message || "Failed to create task" };
  }
}

export async function toggleTodoAction(id: string) {
  try {
    const user = await getSessionUser();

    // Check ownership
    const existing = await prisma.todo.findFirst({
      where: { id, userId: user.id },
    });

    if (!existing) {
      throw new Error("Task not found");
    }

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        completed: !existing.completed,
      },
    });

    revalidatePath("/todos");
    revalidatePath("/dashboard");
    return { success: true, data: todo };
  } catch (error: any) {
    console.error("Failed to toggle todo:", error);
    return { success: false, error: error.message || "Failed to toggle task" };
  }
}

export async function deleteTodoAction(id: string) {
  try {
    const user = await getSessionUser();

    // Check ownership
    const existing = await prisma.todo.findFirst({
      where: { id, userId: user.id },
    });

    if (!existing) {
      throw new Error("Task not found");
    }

    await prisma.todo.delete({
      where: { id },
    });

    revalidatePath("/todos");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete todo:", error);
    return { success: false, error: error.message || "Failed to delete task" };
  }
}

export async function updateTodoAction(
  id: string,
  formData: {
    title?: string;
    description?: string | null;
    completed?: boolean;
    priority?: "low" | "medium" | "high";
    dueDate?: string | null;
  }
) {
  try {
    const user = await getSessionUser();
    const validated = UpdateTodoInputSchema.parse(formData);

    // Check ownership
    const existing = await prisma.todo.findFirst({
      where: { id, userId: user.id },
    });

    if (!existing) {
      throw new Error("Task not found");
    }

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        title: validated.title ?? existing.title,
        description: validated.description === undefined ? existing.description : validated.description,
        completed: validated.completed ?? existing.completed,
        priority: validated.priority ?? existing.priority,
        dueDate: validated.dueDate === undefined ? existing.dueDate : (validated.dueDate ? new Date(validated.dueDate) : null),
      },
    });

    revalidatePath("/todos");
    revalidatePath(`/todos/${id}`);
    revalidatePath("/dashboard");
    return { success: true, data: todo };
  } catch (error: any) {
    console.error("Failed to update todo:", error);
    return { success: false, error: error.message || "Failed to update task" };
  }
}
