# Plan: Solid Start Template Repository

## Requirements Summary

Create a clean, reusable Solid Start template for docs-style sites (first target: game wikis). The template should demonstrate the full stack working together with practical examples, while staying generic enough to clone and customize for any project.

**Stack:** Solid Start 2.0 + Kobalte + Tailwind v4 + Plus Jakarta Sans
**Data:** TypeScript files + localStorage persistence
**Package manager:** pnpm

## Acceptance Criteria

1. `pnpm dev` starts the dev server with zero errors
2. `pnpm build` produces a production build with zero errors
3. Package name is `solid-template` (not `example-with-tailwindcss`)
4. Dark mode toggle works: clicking it switches between light/dark themes
5. Dark mode preference persists across page reloads via localStorage
6. A sample TypeScript data file exists in `src/data/` demonstrating the pattern
7. The sample data renders on the home page
8. Kobalte Select component is functional (theme selector or similar)
9. Plus Jakarta Sans font renders correctly on all text
10. Unused `Counter.tsx` component is removed
11. Navigation works between Home, About, and 404 pages
12. All Tailwind classes render correctly in both light and dark modes

## Implementation Steps

### Step 1: Clean up package identity
- **File:** `package.json:1`
- Change `"name"` from `"example-with-tailwindcss"` to `"solid-template"`
- Add `"description": "Reusable Solid Start template with Kobalte, Tailwind v4, and Plus Jakarta Sans"`

### Step 2: Remove unused Counter component
- **File:** `src/components/Counter.tsx` — delete entirely
- Verify no imports reference it (currently unused)

### Step 3: Create sample TypeScript data file
- **File:** `src/data/items.ts` (new)
- Define a typed array of sample items (e.g., `{ id, name, category, description }`)
- Export the array and the TypeScript type
- This demonstrates the "TypeScript files as data" pattern for the template
- Keep it generic (not game-specific) — e.g., a small catalog of sample entries

### Step 4: Build dark mode infrastructure
- **File:** `src/lib/createStorageSignal.ts` — already exists, no changes needed
- **File:** `src/lib/theme.ts` (new)
  - Create a `createTheme()` function that:
    - Uses `createStorageSignal<"light" | "dark" | "system">("theme", "system")`
    - Derives the resolved theme (light/dark) based on system preference when "system" is selected
    - Applies/removes `dark` class on `document.documentElement`
  - Export a theme context provider for app-wide access

### Step 5: Create dark mode toggle component
- **File:** `src/components/ThemeToggle.tsx` (new)
- Use Kobalte's `Select` or `ToggleGroup` to switch between Light / Dark / System
- Reads/writes via the theme context from Step 4
- Style with Tailwind classes that work in both modes

### Step 6: Update app.css for dark mode support
- **File:** `src/app.css:7-26`
- Update CSS custom properties to use Tailwind v4's dark mode (`@variant dark`)
- Ensure background and foreground colors flip correctly
- Add `dark` variant support using Tailwind's class strategy

### Step 7: Integrate into App layout
- **File:** `src/app.tsx`
- Wrap the Router in the theme context provider from Step 4
- Add the ThemeToggle to the Nav or layout

### Step 8: Update Nav component
- **File:** `src/components/Nav.tsx`
- Add ThemeToggle to the nav bar
- Update styling to work with dark mode (dark: variants on colors)

### Step 9: Update home page
- **File:** `src/routes/index.tsx`
- Remove the old inline counter + Kobalte Select demo (theme select moves to Nav)
- Import and render the sample data from `src/data/items.ts`
- Display items in a clean card/list layout demonstrating Tailwind + dark mode
- Keep it as a showcase of what the template provides

### Step 10: Update About and 404 pages for dark mode
- **File:** `src/routes/about.tsx` — add dark: variants to Tailwind classes
- **File:** `src/routes/[...404].tsx` — add dark: variants to Tailwind classes

### Step 11: Verify and test
- Run `pnpm dev` — confirm no errors, pages render
- Run `pnpm build` — confirm production build succeeds
- Test dark mode toggle persistence (toggle → reload → verify)
- Test all routes (/, /about, /nonexistent)

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Solid Start alpha API changes | Build breaks on update | Pin `@solidjs/start` to `2.0.0-alpha.2` in package.json |
| Kobalte dark mode class conflict with Tailwind | Styling breaks | Use Tailwind's `selector` dark mode strategy (`darkMode: "selector"`) so `.dark` class on `<html>` controls both |
| SSR + localStorage mismatch | Hydration errors | Guard localStorage access with `isServer` check; initialize with fallback values during SSR |
| Plus Jakarta Sans font weights missing | Inconsistent rendering | Already importing 400/500/600/700 weights — covers all common use cases |

## Verification Steps

1. `pnpm dev` starts without errors
2. `pnpm build` completes without errors
3. Open browser → Home page shows sample data cards
4. Click dark mode toggle → theme switches immediately
5. Reload page → theme preference persisted
6. Navigate to /about → page renders with correct theme
7. Navigate to /invalid → 404 page renders with correct theme
8. Check devtools → no hydration mismatch warnings
9. Check devtools → Plus Jakarta Sans applied to body text

## File Change Summary

| Action | File |
|--------|------|
| Edit | `package.json` |
| Delete | `src/components/Counter.tsx` |
| Create | `src/data/items.ts` |
| Create | `src/lib/theme.ts` |
| Create | `src/components/ThemeToggle.tsx` |
| Edit | `src/app.css` |
| Edit | `src/app.tsx` |
| Edit | `src/components/Nav.tsx` |
| Edit | `src/routes/index.tsx` |
| Edit | `src/routes/about.tsx` |
| Edit | `src/routes/[...404].tsx` |
