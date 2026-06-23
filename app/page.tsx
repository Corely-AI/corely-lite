import Link from "next/link";
import { ArrowRight, CheckSquare, Users, Database, LayoutDashboard, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4 max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              CorelyLite
            </span>
            <Badge variant="outline" className="rounded-full text-[10px] px-2 py-0">
              Beginner Starter
            </Badge>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Button asChild size="sm" className="rounded-xl shadow-md">
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-12 md:py-20 space-y-16">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold text-accent border border-accent/20 bg-accent/5 animate-pulse-subtle">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Learn SaaS & Vibe Coding
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            The beginner-friendly SaaS template inspired by{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              CorelyNext
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            CorelyLite strips away the enterprise architectural bloat (no shared packages, ports/adapters, or DDD boundaries) so you can build and ship features in minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="rounded-xl shadow-lg shadow-primary/10">
              <Link href="/dashboard">
                Open App Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl">
              <Link href="/todos">
                Try Todos Feature
              </Link>
            </Button>
          </div>
        </section>

        {/* Mental Model Section */}
        <section className="py-8 bg-panel/30 border border-border/50 rounded-3xl p-6 sm:p-10 max-w-5xl mx-auto shadow-sm backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Simple Beginner Mental Model
            </h2>
            <p className="text-sm text-muted-foreground">
              No complex boundaries. Just a direct, linear flow that any beginner or AI agent can follow.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4 text-center">
            {[
              { step: "1. Page", desc: "Server or Client routing in app/ folder", icon: LayoutDashboard },
              { step: "2. Component", desc: "Interactive UI forms & tables in features/", icon: Users },
              { step: "3. Server Action", desc: "Secure mutation functions in actions.ts", icon: Zap },
              { step: "4. Database", desc: "Direct Prisma schema database operations", icon: Database },
            ].map((m, i) => (
              <div key={i} className="relative p-5 rounded-2xl bg-background/50 border border-border/40 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto text-primary font-bold">
                  {i + 1}
                </div>
                <h3 className="font-bold text-foreground pt-1">{m.step}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack & Features */}
        <section className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <Card className="rounded-3xl border border-border/50 bg-panel/40 p-6 space-y-4">
            <h3 className="text-lg font-bold text-foreground">Premium Tech Stack</h3>
            <ul className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Next.js 15 App Router
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                TypeScript Types
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Prisma ORM
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                PostgreSQL Database
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Supabase Helpers
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Tailwind CSS Styling
              </li>
            </ul>
          </Card>

          <Card className="rounded-3xl border border-border/50 bg-panel/40 p-6 space-y-4">
            <h3 className="text-lg font-bold text-foreground">Included Features</h3>
            <div className="grid gap-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckSquare className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Todos Management</h4>
                  <p className="text-xs text-muted-foreground">List, search, filter, and modify tasks with Server Actions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Customer Directory</h4>
                  <p className="text-xs text-muted-foreground">Manage customer cards, company tags, and detailed notes.</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* AI Coding Prompt Card */}
        <section className="max-w-3xl mx-auto">
          <Card className="rounded-3xl border border-border/70 bg-panel/80 p-6 sm:p-8 space-y-6 shadow-lg">
            <div className="space-y-2">
              <Badge className="bg-primary/20 text-primary border border-primary/20 rounded-full">
                AI Coding Friendly
              </Badge>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Built for AI Prompting & Vibe Coding
              </h3>
              <p className="text-sm text-muted-foreground">
                Copy and paste this prompt when launching an AI coder (like Cursor Composer or Copilot) to build a new feature inside CorelyLite.
              </p>
            </div>

            <div className="bg-background border border-border/80 rounded-2xl p-4 font-mono text-xs text-muted-foreground overflow-x-auto leading-relaxed whitespace-pre-wrap select-all cursor-pointer hover:border-border transition-colors">
{`You are working in a CorelyLite app.

First inspect the existing folder structure and coding patterns.

Add a new [FEATURE_NAME] feature using:
- Next.js App Router
- Server Actions
- Prisma
- existing UI components

Use this simple architecture:
Page → Component → Server Action → Database

Keep the change small.
Do not rewrite unrelated files.
Explain every file changed.`}
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-panel/40 py-8 text-center text-xs text-muted-foreground">
        <div className="container max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} CorelyLite. Inspired by Corely Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
