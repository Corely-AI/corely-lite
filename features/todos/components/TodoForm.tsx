"use client";

import React, { useState, useTransition } from "react";
import { X, Loader2 } from "lucide-react";
import { createTodoAction, updateTodoAction } from "../actions";
import { Todo } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TodoFormProps {
  todo?: Todo;
  onClose?: () => void;
  onSuccess?: () => void;
}

export function TodoForm({ todo, onClose, onSuccess }: TodoFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const isEdit = !!todo;

  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    (todo?.priority as "low" | "medium" | "high") || "medium"
  );
  const [dueDate, setDueDate] = useState(
    todo?.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : ""
  );
  const [completed, setCompleted] = useState(todo?.completed || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    startTransition(async () => {
      let res;
      if (isEdit && todo) {
        res = await updateTodoAction(todo.id, {
          title,
          description: description || null,
          priority,
          dueDate: dueDate || null,
          completed,
        });
      } else {
        res = await createTodoAction({
          title,
          description,
          priority,
          dueDate: dueDate || null,
        });
      }

      if (res.success) {
        toast({
          title: isEdit ? "Task updated" : "Task created",
          description: `"${title}" has been successfully saved.`,
        });
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      } else {
        toast({
          title: "Failed to save task",
          description: res.error,
          variant: "destructive",
        });
      }
    });
  };

  const formFields = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          required
          className="rounded-xl bg-background/50"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details, links, or sub-tasks..."
          rows={4}
          className="rounded-xl bg-background/50 resize-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={priority}
            onValueChange={(val: "low" | "medium" | "high") => setPriority(val)}
          >
            <SelectTrigger id="priority" className="rounded-xl bg-background/50">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded-xl bg-background/50"
          />
        </div>
      </div>

      {isEdit && (
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="completed" className="text-sm font-medium">
            Mark task as completed
          </Label>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        {onClose && (
          <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isPending || !title.trim()} className="rounded-xl px-6">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </form>
  );

  if (onClose) {
    // Overlay/Modal Mode
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
        <Card className="relative z-10 w-full max-w-lg rounded-3xl border border-border/70 bg-panel/95 shadow-2xl p-6 animate-in scale-in duration-200">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-xl">
              {isEdit ? "Edit Task" : "Create New Task"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">{formFields}</CardContent>
        </Card>
      </div>
    );
  }

  // Inline Card Mode
  return (
    <Card className="rounded-3xl border border-border/70 bg-panel/50 p-6">
      <CardContent className="p-0">{formFields}</CardContent>
    </Card>
  );
}
