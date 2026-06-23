"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { CreateCustomerInputSchema, UpdateCustomerInputSchema } from "./schema";

export async function createCustomerAction(formData: {
  name: string;
  email?: string;
  company?: string;
  notes?: string;
}) {
  try {
    const user = await getSessionUser();
    const validated = CreateCustomerInputSchema.parse(formData);

    const customer = await prisma.customer.create({
      data: {
        name: validated.name,
        email: validated.email || null,
        company: validated.company || null,
        notes: validated.notes || null,
        userId: user.id,
      },
    });

    revalidatePath("/customers");
    revalidatePath("/dashboard");
    return { success: true, data: customer };
  } catch (error: any) {
    console.error("Failed to create customer:", error);
    return { success: false, error: error.message || "Failed to create customer" };
  }
}

export async function deleteCustomerAction(id: string) {
  try {
    const user = await getSessionUser();

    // Check ownership
    const existing = await prisma.customer.findFirst({
      where: { id, userId: user.id },
    });

    if (!existing) {
      throw new Error("Customer not found");
    }

    await prisma.customer.delete({
      where: { id },
    });

    revalidatePath("/customers");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete customer:", error);
    return { success: false, error: error.message || "Failed to delete customer" };
  }
}

export async function updateCustomerAction(
  id: string,
  formData: {
    name?: string;
    email?: string;
    company?: string;
    notes?: string;
  }
) {
  try {
    const user = await getSessionUser();
    const validated = UpdateCustomerInputSchema.parse(formData);

    // Check ownership
    const existing = await prisma.customer.findFirst({
      where: { id, userId: user.id },
    });

    if (!existing) {
      throw new Error("Customer not found");
    }

    const customer = await prisma.customer.update({
      where: { id },
      data: {
        name: validated.name ?? existing.name,
        email: validated.email === undefined ? existing.email : (validated.email || null),
        company: validated.company === undefined ? existing.company : (validated.company || null),
        notes: validated.notes === undefined ? existing.notes : (validated.notes || null),
      },
    });

    revalidatePath("/customers");
    revalidatePath("/dashboard");
    return { success: true, data: customer };
  } catch (error: any) {
    console.error("Failed to update customer:", error);
    return { success: false, error: error.message || "Failed to update customer" };
  }
}
