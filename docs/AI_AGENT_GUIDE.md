# AI Agent Coding Guide for CorelyLite

CorelyLite is intentionally structured to be **AI-agent-friendly**. Modern LLMs and coding assistants (like Cursor, GitHub Copilot, Gemini, and Claude) perform exceptionally well when working inside this codebase due to its flat architecture and simple data flow.

Follow these rules to get the best results when coding with AI.

---

## 6 Golden Rules of AI Vibe Coding

### 1. Always Ask the AI to Inspect First
Before letting the AI write any code, ask it to look at existing features (e.g. `features/todos`) so it matches the current syntax and naming conventions:
> *"Inspect the features/todos folder first to understand how we set up actions, queries, and components."*

### 2. Request Small, Incremental Changes
Do not ask the AI to build a massive system in one go. Break your features into small requests (e.g., first write the database model, then the server action, then the component layout):
> *"First, add a 'Project' model to the prisma schema and write the migration command. Stop there and let me check it."*

### 3. Keep Changes Contained
Keep all new feature code inside its dedicated `features/[name]` folder. Do not let the AI scatter helper files across multiple random folders.

### 4. Never Let the AI Rewrite the Whole App
If an error occurs, the AI might try to rewrite unrelated files (like next.config.ts or config globals). Remind it to keep changes isolated:
> *"Only update the code in features/customers/actions.ts. Do not touch any other files."*

### 5. Always Ask the AI to Run Typechecks
Before accepting code changes, request that the AI runs type checking to catch compilation errors:
> *"Run pnpm typecheck and ensure everything compiles cleanly before finishing."*

### 6. Ask for a Change Walkthrough
Make sure the AI lists exactly what files it changed and the reasoning behind it:
> *"Provide a short walkthrough of the changes you made."*

---

## AI Coder Prompt Template

Copy and paste this template when starting work on a new feature:

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
Run typecheck/build if available.
```
