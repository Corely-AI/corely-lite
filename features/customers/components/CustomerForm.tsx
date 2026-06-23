"use client";

import React, { useState, useTransition } from "react";
import { X, Loader2 } from "lucide-react";
import { createCustomerAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CustomerFormProps {
  onClose: () => void;
}

export function CustomerForm({ onClose }: CustomerFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    startTransition(async () => {
      const res = await createCustomerAction({
        name,
        email: email || undefined,
        company: company || undefined,
        notes: notes || undefined,
      });

      if (res.success) {
        toast({
          title: "Customer created",
          description: `"${name}" has been successfully added.`,
        });
        onClose();
      } else {
        toast({
          title: "Failed to add customer",
          description: res.error,
          variant: "destructive",
        });
      }
    });
  };

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
          <CardTitle className="text-xl">Add Customer</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="rounded-xl bg-background/50"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="rounded-xl bg-background/50"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Corp"
                className="rounded-xl bg-background/50"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Details about customer requirements, meetings..."
                rows={4}
                className="rounded-xl bg-background/50 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || !name.trim()} className="rounded-xl px-6">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Customer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
