import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function getTodos(filters?: { q?: string; status?: "all" | "open" | "done" }) {
  const user = await getSessionUser();

  const where: any = {
    userId: user.id,
  };

  if (filters?.q) {
    where.OR = [
      { title: { contains: filters.q, mode: "insensitive" } },
      { description: { contains: filters.q, mode: "insensitive" } },
    ];
  }

  if (filters?.status === "open") {
    where.completed = false;
  } else if (filters?.status === "done") {
    where.completed = true;
  }

  return prisma.todo.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function getTodoById(id: string) {
  const user = await getSessionUser();
  return prisma.todo.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
}
