"use client";

import React, { useState } from "react";
import { Todo } from "../types";
import { TodoItem } from "./TodoItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TodoForm } from "./TodoForm";

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "open" | "done">("all");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Sync state if initialTodos change (e.g., from server action revalidation)
  React.useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(search.toLowerCase()) ||
      (todo.description || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "all" ||
      (status === "open" && !todo.completed) ||
      (status === "done" && todo.completed);

    return matchesSearch && matchesStatus;
  });

  const openCount = todos.filter((todo) => !todo.completed).length;
  const doneCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="space-y-6">
      {/* Create Todo Dialog */}
      {showCreateForm && (
        <TodoForm onClose={() => setShowCreateForm(false)} />
      )}

      {/* Stats Widgets */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="rounded-2xl border border-border/50 bg-panel/40">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Open Tasks
            </p>
            <p className="mt-2 text-4xl font-extrabold text-foreground">{openCount}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-border/50 bg-panel/40">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Completed Tasks
            </p>
            <p className="mt-2 text-4xl font-extrabold text-emerald-500">{doneCount}</p>
          </CardContent>
        </Card>
      </section>

      {/* Search & Actions Bar */}
      <Card className="rounded-2xl border border-border/50 bg-panel/30 shadow-sm p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="pl-9 bg-background/50 border-border/60"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-muted p-1 rounded-xl">
              {(["all", "open", "done"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setStatus(opt)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all duration-200 ${
                    status === opt
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <Button
              className="rounded-xl shadow-md shadow-primary/10"
              onClick={() => setShowCreateForm(true)}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>
      </Card>

      {/* Todo List Items */}
      <div className="grid gap-3">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}

        {filteredTodos.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border/70 rounded-2xl p-6 bg-panel/10">
            <p className="text-sm text-muted-foreground">
              No tasks found. Create a new one to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
