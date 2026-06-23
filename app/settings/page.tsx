import { AppLayout } from "@/components/layout/AppLayout";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Shield, Globe, Terminal, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await getSessionUser();
  let dbConnected = false;

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbConnected = true;
  } catch (e) {}

  const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasSupabaseKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl">
        <section className="rounded-[2rem] border border-border/60 bg-panel/30 p-6 sm:p-8 shadow-sm backdrop-blur-xl">
          <div className="space-y-1.5">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              Configuration & Settings
            </h2>
            <p className="text-sm text-muted-foreground">
              Verify your local environment connections, database status, and configuration details.
            </p>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Mock User Profile */}
          <Card className="rounded-3xl border border-border/50 bg-panel/40 p-6 space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              Mock Session Profile
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border/40">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-mono text-xs">{user.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/40">
                <span className="text-muted-foreground">Name</span>
                <span className="font-semibold">{user.name}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Email</span>
                <span className="font-semibold">{user.email}</span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground pt-2">
              Authentication is currently mocked inside <code>lib/auth.ts</code> for instant local setup.
            </p>
          </Card>

          {/* Environment Status */}
          <Card className="rounded-3xl border border-border/50 bg-panel/40 p-6 space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Database className="h-5 w-5 text-accent" />
              Environment Variables
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Database className="h-4 w-4" /> Database (Prisma)
                </span>
                <Badge variant={dbConnected ? "success" : "destructive"}>
                  {dbConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Terminal className="h-4 w-4" /> Supabase Client
                </span>
                <Badge variant={hasSupabaseUrl && hasSupabaseKey ? "success" : "warning"}>
                  {hasSupabaseUrl && hasSupabaseKey ? "Configured" : "Placeholder"}
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Globe className="h-4 w-4" /> App URL
                </span>
                <span className="font-mono text-xs">
                  {process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* CorelyLite vs CorelyNext Comparison Card */}
        <Card className="rounded-3xl border border-border/60 bg-panel/30 p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Comparison: CorelyLite vs CorelyNext
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            CorelyLite is your entry-level playground. When you require enterprise features, audit logs, event brokers, billing subscriptions, and robust domain boundaries, you can graduate your feature logic to <strong>CorelyNext</strong>.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 pt-2 text-xs">
            <div className="p-3 bg-background/50 border border-border/40 rounded-xl space-y-1">
              <h4 className="font-bold text-foreground">CorelyLite</h4>
              <p className="text-muted-foreground">Flat structure, single Next.js project, Server Actions, mock auth, single schema.</p>
            </div>
            <div className="p-3 bg-background/50 border border-border/40 rounded-xl space-y-1">
              <h4 className="font-bold text-foreground">CorelyNext</h4>
              <p className="text-accent">Modular Monolith, workspace packages, Shared contracts, DDD boundaries, strict ports/adapters.</p>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
