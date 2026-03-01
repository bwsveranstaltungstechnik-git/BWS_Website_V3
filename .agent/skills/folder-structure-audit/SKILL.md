---
name: folder-structure-architecture-audit
description: Audits the project's folder structure for consistency, identifies misplaced files, large monolithic files, and suggests reorganizations.
---

# Folder Structure & Architecture Audit

## Purpose
Analyze the `src/` directory structure and report on organization issues, large files, inconsistencies, and suggest improvements.

## Steps

### 1. Map the Current Architecture
Use `list_dir` on the following key directories:
- `src/`
- `src/app/` (Next.js routes)
- `src/components/` (React components)
- `src/lib/` (utilities, services, stores)
- `src/hooks/` (React hooks)
- `src/types/` (TypeScript types)

### 2. Check for Naming Conventions
Verify the following conventions:
- **Components**: PascalCase filenames (e.g., `JobForm.tsx`) or kebab-case (e.g., `job-form.tsx`)
  - All files should follow the SAME convention — report mixed styles
- **Hooks**: `use-*.ts` prefix in `src/hooks/`
- **Stores**: Located in `src/lib/stores/`
- **Config files**: Located in `src/lib/config/`
- **Types**: Check if `src/types/` and `src/lib/types.ts` both exist (should be consolidated)

### 3. Identify Large Monolithic Files
Use `find_by_name` with file extension filters and then check file sizes.
Flag any file over **500 lines** or **20KB** as a candidate for splitting.

Known large files to always check:
- `src/lib/storage.ts` (40KB+ — the entire Supabase data layer)
- `src/app/page.tsx` (Dashboard — often grows large)
- `src/components/settings/settings-form.tsx` (1800+ lines)
- `src/components/main-nav.tsx`

### 4. Check Component Grouping
Each feature area should have its components grouped:

```
src/components/
├── contacts/        ← Contact-related components
├── inventory/       ← Inventory-related components
├── jobs/            ← Job-related components
├── planning/        ← Planning-related components
├── revenue/         ← Revenue/Finance components
│   └── analytics/   ← Analytics sub-components
├── settings/        ← Settings components
├── warehouse/       ← Warehouse 3D components
├── providers/       ← React context providers
└── ui/              ← shadcn/ui base components
```

**Report issues:**
- Components at the root of `src/components/` that belong in a feature subfolder
- Feature folders with too many files (>10 → suggest sub-grouping)
- Components used by only one page that could be colocated with that page

### 5. Check Render Boundaries & Performance (Server vs Client)
Check the `src/app/` directory and components for performance anti-patterns:
- **`"use client"` at page root**: Next.js 14+ pages (`page.tsx`) should ideally be Server Components. If a `page.tsx` starts with `"use client"` and fetches a lot of data, flag it for refactoring. The data fetching should happen on the server, passing data to a thinner client component.
- **Heavy Modals/Hidden UI**: Look for large modals (e.g., Dialogs) or heavy components (e.g., 3D viewers) that are imported normally. Flag them to be lazy-loaded using `next/dynamic`.

### 5. Check for Orphaned or Misplaced Files
Look for:
- Files in `src/lib/` that should be in `src/lib/config/`, `src/lib/services/`, `src/lib/stores/`, etc.
- Duplicate utility files (e.g., `supabase.ts` AND `supabase/client.ts`)
- Empty directories
- Files in `src/types/` vs `src/lib/types.ts` — should be ONE location

### 6. Check Route Organization
Verify `src/app/` matches the expected pattern:
```
src/app/
├── page.tsx              ← Dashboard
├── layout.tsx            ← Root layout
├── globals.css
├── login/page.tsx
├── inventory/page.tsx
├── jobs/page.tsx
├── scanner/page.tsx
├── warehouse/page.tsx
├── planning/
│   ├── page.tsx
│   ├── dmx/page.tsx
│   └── power/page.tsx
├── management/
│   ├── page.tsx
│   ├── revenue/page.tsx
│   ├── analytics/page.tsx
│   ├── purchases/page.tsx
│   └── users/page.tsx
├── settings/page.tsx
├── contacts/page.tsx
└── venues/page.tsx
```

### 7. Clean up Logs and Temporary Files
Actively find and remove unnecessary files from the project root and other directories:
- Leftover log files (e.g., `*.log`, `build*.log`, `eslint*.log`, `dev.log`).
- Temporary JSON data dumps (e.g., `c7-*.json`, `context7-*.json`).
- Old redundant scripts or text files (e.g., `build.txt`, `update-imports.js`).
Use the appropriate commands (like `run_command` with `Remove-Item`) to delete these redundant files.

### 8. Generate Report
Output a structured report with:

```markdown
## 📁 Folder Structure Audit Report

### ✅ Good Practices Found
- [List things that are well-organized]

### ⚠️ Issues Found
| # | Issue | Location | Severity | Suggestion |
|---|-------|----------|----------|------------|
| 1 | ...   | ...      | LOW/MED/HIGH | ... |

### ⚡ Performance & Render Boundary Suggestions
| File | Issue | Suggestion (Server Component, next/dynamic, etc.) |
|------|-------|--------------------------------------------------|
| ...  | ...   | ...                                              |

### 📊 Large File Candidates for Splitting
| File | Lines | Size | Suggestion |
|------|-------|------|------------|
| ...  | ...   | ...  | ...        |

### 🔄 Suggested Reorganizations
- [Concrete file move suggestions]
```

## Expected Conventions (Reference)

| Category | Convention | Location |
|----------|-----------|----------|
| Pages | `page.tsx` | `src/app/<route>/` |
| Components | kebab-case `.tsx` | `src/components/<feature>/` |
| Hooks | `use-*.ts` | `src/hooks/` |
| Stores (Zustand) | `*-store.ts` | `src/lib/stores/` |
| Config | `*.ts` | `src/lib/config/` |
| Services | `*.ts` | `src/lib/services/` |
| Types | `types.ts` | `src/lib/types.ts` |
| Utilities | `*-utils.ts` | `src/lib/` |
| UI primitives | shadcn components | `src/components/ui/` |
