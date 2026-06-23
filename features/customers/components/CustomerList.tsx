"use client";

import React, { useState } from "react";
import { Customer } from "../types";
import { CustomerCard } from "./CustomerCard";
import { CustomerForm } from "./CustomerForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function CustomerList({ initialCustomers }: { initialCustomers: Customer[] }) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Sync state if initialCustomers change (e.g. from server action revalidation)
  React.useEffect(() => {
    setCustomers(initialCustomers);
  }, [initialCustomers]);

  const filteredCustomers = customers.filter((cust) => {
    const term = search.toLowerCase();
    return (
      cust.name.toLowerCase().includes(term) ||
      (cust.email || "").toLowerCase().includes(term) ||
      (cust.company || "").toLowerCase().includes(term) ||
      (cust.notes || "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {showAddForm && (
        <CustomerForm onClose={() => setShowAddForm(false)} />
      )}

      {/* Header Search & Actions Bar */}
      <Card className="rounded-2xl border border-border/50 bg-panel/30 shadow-sm p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="pl-9 bg-background/50 border-border/60"
            />
          </div>

          <Button
            className="rounded-xl shadow-md shadow-primary/10 flex-shrink-0"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </Card>

      {/* Customer Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12 border border-dashed border-border/70 rounded-2xl p-6 bg-panel/10">
          <p className="text-sm text-muted-foreground">
            No customers found. Add your first customer record!
          </p>
        </div>
      )}
    </div>
  );
}
