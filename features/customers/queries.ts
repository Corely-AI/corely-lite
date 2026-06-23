import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function getCustomers(filters?: { q?: string }) {
  const user = await getSessionUser();

  const where: any = {
    userId: user.id,
  };

  if (filters?.q) {
    where.OR = [
      { name: { contains: filters.q, mode: "insensitive" } },
      { email: { contains: filters.q, mode: "insensitive" } },
      { company: { contains: filters.q, mode: "insensitive" } },
      { notes: { contains: filters.q, mode: "insensitive" } },
    ];
  }

  return prisma.customer.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function getCustomerById(id: string) {
  const user = await getSessionUser();
  return prisma.customer.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
}
