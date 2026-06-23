# CorelyLite Architecture

CorelyLite uses a flat, developer-friendly architecture designed to optimize for speed, simplicity, and AI vibe-coding.

## The Mental Model

```
Page ──> Component ──> Server Action ──> Database
```

Instead of using multiple layers of repositories, ports, interfaces, and shared workspace packages, CorelyLite uses a simple vertical slice architecture:

1. **Page (`app/`)**: Renders the view. Fetches data directly on the server (using server-side Prisma queries) and passes it down.
2. **Component (`features/` or `components/`)**: Client-side layout. Renders tables, lists, and forms. Submits form inputs directly into Server Actions.
3. **Server Action (`features/[name]/actions.ts`)**: Server-side functions annotated with `"use server"`. They validate inputs using Zod, perform database mutations using Prisma, and call `revalidatePath()` to refresh page data.
4. **Database (`prisma/`)**: The physical schema layer representing your Postgres tables. Managed by Prisma ORM.

---

## Directory Walkthrough

### 1. `app/` (Routing Pages)
Houses your Next.js App Router routing. Pages are Server Components by default. They:
- Load user sessions from `lib/auth.ts`
- Call queries from `features/[name]/queries.ts`
- Render feature layout wrappers (e.g. `<TodoList initialTodos={todos} />`)

### 2. `features/` (Vertical Feature Slices)
Instead of dividing code by technical layer (e.g., separating all actions or queries in global directories), CorelyLite groups code by **domain feature**. Each feature folder is self-contained:
- `schema.ts`: Zod validation schemas
- `types.ts`: TypeScript type declarations
- `queries.ts`: Safe database read operations
- `actions.ts`: Secure database write operations (Server Actions)
- `components/`: UI components belonging to this feature

### 3. `components/` (Shared Layout & Widgets)
Houses global layout blocks and base styling atoms.
- `ui/`: Custom styled primitives (Buttons, Cards, Inputs) exported from a central index.
- `layout/`: Global Shell layouts (Sidebars, responsive Headers).

### 4. `lib/` (Core Libraries)
Infrastructure instantiators:
- `db.ts`: Direct global database connection client singleton.
- `auth.ts`: Session profile mocker.
- `supabase/`: Raw Supabase client access.
- `env.ts`: Zod schema environment validation.

### 5. `prisma/` (Data Store)
A single `schema.prisma` file declaring models and relations without complex multi-file schema setups.
