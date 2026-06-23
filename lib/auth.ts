import { prisma } from "@/lib/db";

export interface UserContext {
  id: string;
  email: string;
  name: string;
}

// Simple mock user for beginner template.
// Future versions can replace this with Supabase Auth or NextAuth.
export async function getSessionUser(): Promise<UserContext> {
  const mockEmail = "user@example.com";
  const mockName = "Demo User";
  const mockId = "demo-user-id";

  // Ensure the mock user exists in the database so foreign keys work
  try {
    const user = await prisma.user.upsert({
      where: { email: mockEmail },
      update: {},
      create: {
        id: mockId,
        email: mockEmail,
        name: mockName,
      },
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name || mockName,
    };
  } catch (error) {
    // If DB is not connected yet, return mock object anyway
    return {
      id: mockId,
      email: mockEmail,
      name: mockName,
    };
  }
}
