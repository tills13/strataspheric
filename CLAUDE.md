# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Strataspheric is a full-service strata management application built with Next.js 15, deployed on Cloudflare infrastructure (Pages, Workers, D1, R2).

## Common Commands

```bash
# Development
npm run dev              # Start dev server at 0.0.0.0:3000

# Linting & Formatting
npm run lint             # Run ESLint
npm run lint:typescript  # TypeScript type checking (npx tsc --noEmit)
npm run prettier:fix     # Format code with Prettier

# Other
npm run knip             # Find unused code/dependencies
npm run dev:generate-key # Generate auth key (tsx auth/generateKey.ts)
```

## Architecture

### Multi-tenant Routing via Parallel Routes

The app uses Next.js parallel routes to serve different experiences based on subdomain:
- `app/@app/` - Authenticated dashboard for strata members (rendered when subdomain matches a strata)
- `app/@marketing/` - Public marketing site (rendered on the main domain)

The root `app/layout.tsx` determines which slot to render based on whether `getCurrentStrata()` returns a strata for the current subdomain.

### Database Layer (Cloudflare D1 + Kysely)

- `data/index.ts` - Database schema types and `db()` function
- `data/d1.ts` - Custom Kysely dialect for Cloudflare D1
- Data operations are organized by entity: `data/{entity}/` contains query files (e.g., `getUser.ts`, `createUser.ts`, `listUsers.ts`)
- **Important**: `db` and `r2` are functions that must be called: `db().selectFrom(...)`, `r2().put(...)`
- Uses `uuidv7` for ID generation
- Migrations live in `migrations/` as numbered SQL files

### File Storage (Cloudflare R2)

- `data/r2.ts` - `r2()` function for R2 bucket access
- Files are stored with paths and referenced via `files` table

### Styling (Vanilla Extract)

- CSS-in-TypeScript using Vanilla Extract
- `sprinkles.css.ts` - Utility-first CSS sprinkles (spacing, typography, flex)
- `app/theme.css.ts` - Theme variables (colors, sizes, fonts, shadows, transitions)
- `app/globalStyles.css.ts` - Global resets (box-sizing, margins, font inheritance)
- Component styles live alongside components as `*.css.ts` files

#### Theme Token Reference

**Border Radius** (use `vars.borderRadius.*`):
- `sm` (4px) - small elements like checkboxes, slider indicators
- `md` (6px) - default for inputs, buttons, badges
- `lg` (8px) - cards, panels, modals, images
- `xl` (12px) - large containers
- `full` (9999px) - pills, avatars

**Shadows** (use `vars.shadows.*`):
- `sm` - subtle elevation for cards/panels
- `md` - hover states, dropdowns
- `lg` - elevated components like dropdown panels
- `xl` - modals

**Transitions** (use `vars.transitions.*`):
- `fast` (150ms) - hover states, micro-interactions
- `normal` (200ms) - focus states, UI changes
- `slow` (300ms) - layout animations

**Focus Ring**: Use `vars.focusRing` for focus-within states on form fields

**Spacing**: Includes `"6"`, `"10"`, `"12"`, `"20"`, `"24"` in addition to named values

### Authentication

- Custom JWT-based auth in `auth/`
- `auth()` - Get current session (server-side)
- `mustAuth()` - Require authentication or throw
- Session decorated with strata membership scopes
- Cookies scoped to `.strataspheric.app` domain (or `.strataspheric.local` in dev)

### Server Actions

- Server actions use `"use server"` directive
- Typically located in `actions.ts` files alongside page components
- Pattern: validate auth, check permissions with `can(session?.user, "scope")`, perform operation

### Key Directories

- `components/` - Reusable UI components (organized as folders with index + styles)
- `data/` - Database queries and types
- `hooks/` - React hooks (useSession, useCan, etc.)
- `utils/` - Shared utilities
- `cloudflare/` - Cloudflare API integrations (DNS, Pages)

### Environment

- Development uses `strataspheric.local:3000` domain
- Production uses `strataspheric.app` domain
- D1/R2 bindings configured via `wrangler.jsonc`

## Code Conventions

- Prettier with `@trivago/prettier-plugin-sort-imports` (CSS imports first, then third-party, then local)
- ESLint with TypeScript strict mode
- Unused variables must be prefixed with `_`
- Data layer files allow `@typescript-eslint/no-non-null-assertion`
- Project uses both `.ts` and `.tsx` files - ensure searches cover both extensions

## Communication Style

- Be direct and concise. Avoid sycophantic or sugar-coated responses.
- State issues plainly without excessive hedging.
- Avoid "as" in TypeScript -- prefer resolving actual types where possible or using runtime type-guards
- Avoid "any" in TypeScript -- use "unknown" instead