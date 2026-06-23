import { AppLayout } from "@/components/layout/AppLayout";
import { TodoList } from "@/features/todos/components/TodoList";
import { getTodos } from "@/features/todos/queries";
import { Badge } from "@/components/ui/badge";

import { Todo } from "@/features/todos/types";

export const dynamic = "force-dynamic";

export default async function TodosPage() {
  let todos: Todo[] = [];
  let dbError = false;

  try {
    todos = await getTodos();
  } catch (error) {
    console.error("Database error loading todos:", error);
    dbError = true;
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-border/60 bg-panel/30 p-6 sm:p-8 shadow-sm backdrop-blur-xl">
          <div className="space-y-3">
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              Flat Feature Pattern
            </Badge>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                Task Management
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                This page queries database records directly using Prisma client and triggers mutations via Server Actions.
              </p>
            </div>
          </div>
        </section>

        {dbError ? (
          <div className="text-center py-12 border border-dashed border-destructive/50 rounded-2xl p-6 bg-destructive/5 text-destructive">
            <p className="font-semibold">Database Connection Error</p>
            <p className="text-xs text-muted-foreground mt-1">
              Please verify your DATABASE_URL in the .env file and ensure migrations have run.
            </p>
          </div>
        ) : (
          <TodoList initialTodos={todos} />
        )}
      </div>
    </AppLayout>
  );
}
