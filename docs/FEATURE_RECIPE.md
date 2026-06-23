# Feature Recipe: How to Add a New Feature

This guide walks you through building a new feature in CorelyLite. Let's assume we want to create a new **Projects** feature.

---

## Step-by-Step Recipe

### Step 1: Define User Flow
Outline what the user will do:
- View a list of projects.
- Create a new project.
- Delete a project.

### Step 2: Add Prisma Model
Modify `prisma/schema.prisma` to add your new table:
```prisma
model Project {
  id        String   @id @default(cuid())
  name      String
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```
Run database migration to apply changes:
```bash
pnpm db:migrate
```

### Step 3: Create the Feature Folder
Create a folder named `features/projects/` and add subfolders for components:
```bash
mkdir features/projects
mkdir features/projects/components
```

### Step 4: Add Validation Schema (`schema.ts`)
Create `features/projects/schema.ts` to define validation rules:
```typescript
import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
```

### Step 5: Add Queries (`queries.ts`)
Create `features/projects/queries.ts` to retrieve records:
```typescript
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function getProjects() {
  const user = await getSessionUser();
  return prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}
```

### Step 6: Add Actions (`actions.ts`)
Create `features/projects/actions.ts` with Server Actions for mutations:
```typescript
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { CreateProjectSchema } from "./schema";

export async function createProjectAction(formData: { name: string }) {
  try {
    const user = await getSessionUser();
    const validated = CreateProjectSchema.parse(formData);

    const project = await prisma.project.create({
      data: {
        name: validated.name,
        userId: user.id,
      },
    });

    revalidatePath("/projects");
    revalidatePath("/dashboard");
    return { success: true, data: project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
```

### Step 7: Build UI Components (`components/`)
Create `features/projects/components/ProjectList.tsx` and other child components utilizing variables and forms.

### Step 8: Build the Routing Page (`app/projects/page.tsx`)
Render the list on the server and mount the components:
```typescript
import { AppLayout } from "@/components/layout/AppLayout";
import { getProjects } from "@/features/projects/queries";
import { ProjectList } from "@/features/projects/components/ProjectList";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <AppLayout>
      <h2 className="text-2xl font-bold">Projects</h2>
      <ProjectList initialProjects={projects} />
    </AppLayout>
  );
}
```

### Step 9: Verify & Test
Run a local test by visiting `/projects`. Ensure that:
- Code compiles cleanly: `pnpm typecheck`
- Production builds work: `pnpm build`
