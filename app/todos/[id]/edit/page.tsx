import { notFound } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { EditTodoForm } from "./edit-form";
import { getTodoById } from "@/features/todos/queries";

export const dynamic = "force-dynamic";

interface EditTodoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { id } = await params;
  let todo = null;

  try {
    todo = await getTodoById(id);
  } catch (error) {
    console.error("Database error fetching todo:", error);
  }

  if (!todo) {
    notFound();
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          Edit Task
        </h2>
        <EditTodoForm todo={todo} />
      </div>
    </AppLayout>
  );
}
