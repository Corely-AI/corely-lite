"use client";

import { useRouter } from "next/navigation";
import { TodoForm } from "@/features/todos/components/TodoForm";
import { Todo } from "@/features/todos/types";

export function EditTodoForm({ todo }: { todo: Todo }) {
  const router = useRouter();
  return (
    <TodoForm
      todo={todo}
      onSuccess={() => router.push("/todos")}
    />
  );
}
