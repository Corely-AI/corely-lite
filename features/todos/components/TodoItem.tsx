"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Trash2, Edit2, Calendar } from "lucide-react";
import { Todo } from "../types";
import { toggleTodoAction, deleteTodoAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const priorityStyles = {
  low: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  medium: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  high: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800",
} as const;

export function TodoItem({ todo }: { todo: Todo }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const res = await toggleTodoAction(todo.id);
      if (res.success) {
        toast({
          title: todo.completed ? "Task reopened" : "Task completed",
          description: `"${todo.title}" has been updated.`,
        });
      } else {
        toast({
          title: "Failed to update task",
          description: res.error,
          variant: "destructive",
        });
      }
    });
  };

  const handleDelete = () => {
    if (!window.confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      return;
    }
    startTransition(async () => {
      const res = await deleteTodoAction(todo.id);
      if (res.success) {
        toast({
          title: "Task deleted",
          description: `"${todo.title}" was removed.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to delete task",
          description: res.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 p-4 rounded-2xl border border-border/50 bg-panel/50 hover:bg-panel transition-all duration-200",
        todo.completed && "opacity-75"
      )}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <button
          onClick={handleToggle}
          disabled={isPending}
          className="mt-1 flex-shrink-0 text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
          aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
        >
          {todo.completed ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>

        <div className="space-y-1 flex-1 min-w-0">
          <h4
            className={cn(
              "font-medium text-foreground leading-snug truncate",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.title}
          </h4>
          {todo.description && (
            <p className={cn("text-xs text-muted-foreground line-clamp-2 leading-relaxed")}>
              {todo.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2 items-center pt-1.5">
            <Badge variant="outline" className={cn("text-[10px] uppercase font-semibold px-2 py-0", priorityStyles[todo.priority as "low" | "medium" | "high"])}>
              {todo.priority}
            </Badge>
            {todo.dueDate && (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 flex-shrink-0">
        <Button asChild size="icon-sm" variant="ghost">
          <Link href={`/todos/${todo.id}/edit`} aria-label="Edit todo">
            <Edit2 className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
          </Link>
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={handleDelete}
          disabled={isPending}
          aria-label="Delete todo"
        >
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
