import { AppLayout } from "@/components/layout/AppLayout";
import { CustomerList } from "@/features/customers/components/CustomerList";
import { getCustomers } from "@/features/customers/queries";
import { Badge } from "@/components/ui/badge";

import { Customer } from "@/features/customers/types";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  let customers: Customer[] = [];
  let dbError = false;

  try {
    customers = await getCustomers();
  } catch (error) {
    console.error("Database error loading customers:", error);
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
                Customer Directory
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                Manage your customer profiles. All data is queried from Prisma and mutated directly via Server Actions.
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
          <CustomerList initialCustomers={customers} />
        )}
      </div>
    </AppLayout>
  );
}
