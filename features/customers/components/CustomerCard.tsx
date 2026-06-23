"use client";

import React, { useTransition } from "react";
import { Trash2, Building, Mail, FileText } from "lucide-react";
import { Customer } from "../types";
import { deleteCustomerAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export function CustomerCard({ customer }: { customer: Customer }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
      return;
    }
    startTransition(async () => {
      const res = await deleteCustomerAction(customer.id);
      if (res.success) {
        toast({
          title: "Customer deleted",
          description: `"${customer.name}" has been removed.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to delete customer",
          description: res.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card className="group relative rounded-2xl border border-border/50 bg-panel/50 hover:bg-panel transition-all duration-200">
      <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
            {customer.name}
          </CardTitle>
          {customer.company && (
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Building className="h-3.5 w-3.5" />
              {customer.company}
            </p>
          )}
        </div>

        <Button
          size="icon-sm"
          variant="ghost"
          onClick={handleDelete}
          disabled={isPending}
          className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4"
          aria-label={`Delete ${customer.name}`}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {customer.email && (
          <p className="flex items-center gap-2 text-sm text-foreground/80">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${customer.email}`} className="hover:underline">
              {customer.email}
            </a>
          </p>
        )}
        {customer.notes && (
          <div className="pt-2 border-t border-border/40">
            <p className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
              <FileText className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              <span className="line-clamp-3">{customer.notes}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
