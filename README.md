# CorelyLite

CorelyLite is a beginner-friendly, solo-founder SaaS starter template built with Next.js, Supabase, Prisma, and Vercel. 

CorelyLite is the beginner-friendly version of **CorelyNext**. It helps you build small SaaS apps and MVPs with a simple, direct mental model:

```
Page ──> Component ──> Server Action ──> Database
```

When your app grows and requires advanced structures (like Modular Monolith separation, shared contract packages, or ports/adapters), you can graduate to CorelyNext.

---

## Tech Stack

- **Core Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database Client**: Prisma ORM
- **Database Engine**: PostgreSQL
- **Component Styling**: Tailwind CSS & shadcn/ui-style components
- **Client Helpers**: Supabase (via `@supabase/supabase-js`)
- **Deployment**: Vercel-ready

---

## Folder Structure

```txt
corely-lite/
  ├── app/                  # Routing pages (dashboard, settings, features)
  ├── components/           # Base UI & Layout modules
  │     ├── ui/             # Radix components
  │     └── layout/         # AppLayout Sidebar shell
  ├── features/             # Business features (self-contained logic)
  │     ├── todos/          # Todos state, actions, queries
  │     └── customers/      # Customers state, actions, queries
  ├── lib/                  # Shared libraries (database client, auth mock, env)
  ├── prisma/               # Database schema models
  ├── docs/                 # Local educational guides
  ├── package.json          # Dependency mappings
  └── tailwind.config.ts    # Extended HSL colors & theme preset
```

---

## CorelyLite vs CorelyNext

| Feature | CorelyLite | CorelyNext |
|---|---|---|
| **Audience** | Solo hackers, beginners, vibe coders | Teams, enterprise products, SaaS scale |
| **Complexity** | Extremely low | Medium-High |
| **Architecture** | Flat Feature Folder | Modular Monolith / Clean Architecture |
| **Data Fetching** | Direct Prisma / Server Actions | Use Cases / Repository Adapters |
| **Validation** | Zod in Page/Actions | Bounded Contracts Layer |
| **Auth Setup** | Mock User Session | Multi-Tenant Workspace context |

---

## Getting Started

### 1. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your connection strings:
```bash
cp .env.example .env
```

### 2. Install Dependencies
Install packages:
```bash
pnpm install
```

### 3. Run Database Migrations
Create your PostgreSQL database tables using Prisma:
```bash
pnpm db:migrate
```

### 4. Run Locally
Launch the Next.js local development server:
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## How to Add a New Feature

Adding a feature is simple:
1. **Define database models** in `prisma/schema.prisma` and run `pnpm db:migrate`.
2. **Create a feature folder** in `features/my-feature/`.
3. **Define schemas and types** in `schema.ts` and `types.ts`.
4. **Implement database reads** in `queries.ts`.
5. **Implement mutations** via Next.js Server Actions in `actions.ts`.
6. **Create components** in `components/`.
7. **Mount your feature** on pages in the `app/` folder.

For a detailed recipe, see [FEATURE_RECIPE.md](file:///D:/Working/corely-lite/docs/FEATURE_RECIPE.md).

---

## AI Prompting Example

Copy and paste this prompt when instructing an AI Coding Agent (like Cursor, GitHub Copilot, or Gemini) to implement features:

```txt
You are working in a CorelyLite app.

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
Explain every file changed.
```
