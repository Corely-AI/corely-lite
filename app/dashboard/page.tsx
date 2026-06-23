import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Users, Database, Plus, Sparkles, FileText, CheckCircle2, Circle } from "lucide-react";

export default async function DashboardPage() {
  const user = await getSessionUser();

  let todoCount = 0;
  let customerCount = 0;
  let dbConnected = false;

  try {
    todoCount = await prisma.todo.count({
      where: { userId: user.id },
    });
    customerCount = await prisma.customer.count({
      where: { userId: user.id },
    });
    dbConnected = true;
  } catch (error) {
    console.warn("Database connection could not be established in dashboard yet:", error);
  }

  const checklist = [
    { text: "Configure .env file", done: dbConnected },
    { text: "Run Prisma migrations (pnpm db:migrate)", done: dbConnected && (todoCount > 0 || customerCount > 0) },
    { text: "Start development server (pnpm dev)", done: true },
    { text: "Create your first todo", done: todoCount > 0 },
    { text: "Add your first customer", done: customerCount > 0 },
    { text: "Deploy to Vercel", done: false },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-6 sm:p-8 rounded-[2rem] border border-border/60 bg-panel/30 shadow-sm backdrop-blur-xl">
          <div className="space-y-1.5">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              Welcome back, {user.name}!
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Get an overview of your application stats, check your startup checklist, or jump straight into the code.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline" className="rounded-xl">
              <Link href="/todos">
                <CheckSquare className="mr-1.5 h-4 w-4" />
                Todos
              </Link>
            </Button>
            <Button asChild size="sm" className="rounded-xl">
              <Link href="/customers">
                <Plus className="mr-1.5 h-4 w-4" />
                Add Customer
              </Link>
            </Button>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-2xl border border-border/50 bg-panel/40">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Tasks
              </CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-extrabold text-foreground">{todoCount}</p>
              <CardDescription className="text-[11px] mt-1">
                Filter and manage inside the task board
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border/50 bg-panel/40">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-extrabold text-foreground">{customerCount}</p>
              <CardDescription className="text-[11px] mt-1">
                View all custom contact records
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border/50 bg-panel/40 sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Database Status
              </CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge variant={dbConnected ? "success" : "destructive"} className="rounded-full px-2.5 py-0.5">
                {dbConnected ? "Connected" : "Disconnected"}
              </Badge>
              <CardDescription className="text-[11px] mt-2">
                {dbConnected ? "Postgres client loaded successfully" : "Configure DATABASE_URL to connect"}
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        {/* Checklist & Recipe */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Checklist */}
          <Card className="rounded-3xl border border-border/60 bg-panel/30 shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Getting Started Checklist
            </h3>
            <div className="space-y-3">
              {checklist.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-foreground/90">
                  {item.done ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  <span className={item.done ? "line-through text-muted-foreground" : ""}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Build Feature */}
          <Card className="rounded-3xl border border-border/60 bg-panel/30 shadow-sm p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                Build Your First Feature
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                CorelyLite features are located in the <code>features/</code> directory. Ready to graduate or write something custom? Use our feature recipes inside the docs to add widgets, email triggers, or full analytics pages.
              </p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button asChild variant="outline" className="rounded-xl flex-1 text-xs">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  Corely Academy
                </a>
              </Button>
              <Button asChild className="rounded-xl flex-1 text-xs">
                <Link href="/settings">
                  Connection Settings
                </Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}
