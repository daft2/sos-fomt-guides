# UI Overhaul Plan — SoS:FoMT Guide

## Requirements Summary

Comprehensive UI overhaul for the Story of Seasons: Friends of Mineral Town bilingual guide site. The goal is to transform the current "AI-generated template" look into a clean, functional, content-first design with proper icon usage, consolidated character pages, improved long-text formatting, and mobile-first polish.

## Acceptance Criteria

1. All emojis (👥🌱🍳🎉💛📖📋🌾) replaced with Lucide icons via `lucide-solid`
2. Character detail page (`/characters/[id]`) displays: birthday, heart events, gift preferences, location/residence, family, rival, related festivals, related events, and related recipes — full character hub
3. Guide detail pages use collapsible/accordion sections instead of plain text blocks
4. Color scheme shifted to neutral (slate/gray) with green (`--color-sos-green`) as single accent
5. No rounded-2xl cards with gradient backgrounds — flat, clean card style with minimal decoration
6. Consistent spacing system — remove visual noise (excessive shadows, borders, hover effects)
7. Typography hierarchy is clear: page title > section heading > subsection > body
8. Mobile-first: all pages usable and well-spaced on 375px viewport
9. No emoji characters remain anywhere in the rendered UI
10. Dark mode still works with the new neutral palette

## Implementation Steps

### Phase 1: Foundation (Icon Library + Color System)

#### Step 1.1: Install lucide-solid
- `pnpm add lucide-solid`
- Create `/src/components/Icon.tsx` — thin wrapper that re-exports commonly used icons with consistent default size (20px) and stroke-width (1.5)
- Icons needed: `Users`, `Sprout`, `CookingPot`, `PartyPopper`, `Heart`, `BookOpen`, `List`, `Wheat`, `Search`, `Sun`, `Moon`, `Monitor`, `Globe`, `ChevronDown`, `ChevronRight`, `MapPin`, `Calendar`, `Home`, `Gift`, `Star`, `Swords`, `Clock`, `Cloud`, `CloudRain`, `Bookmark`, `ArrowLeft`, `Menu`, `X`

#### Step 1.2: Overhaul color system
- File: `/src/app.css` (lines with `--color-sos-*` variables)
- Remove `--color-sos-brown` and `--color-sos-gold`
- Keep `--color-sos-green: #16a34a` as the sole accent
- Add neutral palette vars:
  - `--color-surface: #ffffff` / dark: `#0f172a` (slate-900)
  - `--color-surface-raised: #f8fafc` / dark: `#1e293b` (slate-800)
  - `--color-border: #e2e8f0` / dark: `#334155` (slate-700)
  - `--color-text-primary: #0f172a` / dark: `#f1f5f9`
  - `--color-text-secondary: #64748b` / dark: `#94a3b8`
  - `--color-text-muted: #94a3b8` / dark: `#64748b`
- Remove gradient backgrounds from hero section in `/src/routes/index.tsx` (lines 45-69)

#### Step 1.3: Typography tightening
- File: `/src/app.css`
- Define clear type scale using Tailwind utilities:
  - Page title: `text-2xl font-semibold tracking-tight` (mobile) / `text-3xl` (desktop)
  - Section heading: `text-lg font-medium`
  - Subsection: `text-base font-medium`
  - Body: `text-sm leading-relaxed text-secondary`
  - Caption/meta: `text-xs text-muted`

### Phase 2: Component Overhaul

#### Step 2.1: Simplify DataCard
- File: `/src/components/DataCard.tsx` (lines 20-54)
- Remove: `rounded-2xl`, `shadow-sm`, `hover:shadow-md`, `hover:border-sky-400`, `transition-all`
- Replace with: `rounded-lg border border-border bg-surface p-4` — flat, minimal
- Remove image aspect-ratio container if unused (verify first)
- Keep bookmark button
- Hover state: just `hover:bg-surface-raised` — subtle background shift, no border/shadow dance

#### Step 2.2: Simplify CategoryCard
- File: `/src/components/CategoryCard.tsx` (lines 14-39)
- Remove emoji `icon` prop, replace with Lucide icon component prop
- Remove colored icon background box — icon sits inline with title
- Flatten card: `rounded-lg border border-border bg-surface p-5`
- Count badge: plain `text-xs text-muted` — no pill/badge styling

#### Step 2.3: Clean up Badge component
- File: `/src/components/Badge.tsx`
- Reduce to 2 variants: `default` (gray) and `accent` (green)
- Remove season-specific colors — use text labels instead of colored badges
- Style: `text-xs font-medium px-2 py-0.5 rounded-md bg-surface-raised`

#### Step 2.4: Simplify FilterTabs
- File: `/src/components/FilterTabs.tsx`
- Remove pill styling — use underline-based tabs
- Active: `border-b-2 border-green-600 text-green-600 font-medium`
- Inactive: `text-muted hover:text-primary`
- Remove count badges from tabs (keep counts accessible elsewhere)

#### Step 2.5: Update Nav
- File: `/src/components/Nav.tsx`
- Replace inline SVG heart with `<Heart />` from lucide-solid
- Replace hamburger SVG with `<Menu />` / `<X />` from lucide-solid
- Simplify nav styling — remove excessive shadows/borders
- Mobile menu: clean slide-down with `bg-surface border-b border-border`

#### Step 2.6: Update SearchBar
- File: `/src/components/SearchBar.tsx`
- Replace inline SVG magnifying glass with `<Search />` from lucide-solid
- Simplify input: `border border-border rounded-lg px-3 py-2 bg-surface`

#### Step 2.7: Create Accordion component
- New file: `/src/components/Accordion.tsx`
- Props: `title: string`, `defaultOpen?: boolean`, `children: JSX.Element`
- Uses `<ChevronDown />` icon with rotation animation
- Trigger: full-width button with `flex items-center justify-between`
- Content: collapsible with `overflow-hidden` + height transition
- Use SolidJS `createSignal` for open/close state

#### Step 2.8: Update ThemeToggle
- File: `/src/components/ThemeToggle.tsx`
- Replace any inline SVGs with `<Sun />`, `<Moon />`, `<Monitor />` from lucide-solid

#### Step 2.9: Update Layout component
- File: `/src/components/Layout.tsx`
- Tighten spacing: `max-w-5xl` instead of wider containers
- Breadcrumb: use `text-xs text-muted` with `<ChevronRight />` separator
- Remove decorative elements

### Phase 3: Page Overhaul

#### Step 3.1: Home page (`/src/routes/index.tsx`)
- Lines 15-23: Replace emoji strings with Lucide icon components in CATEGORIES array
- Lines 45-69: Remove gradient hero section — replace with clean text header:
  - Site title: `text-3xl font-semibold tracking-tight`
  - Subtitle: `text-base text-secondary mt-2`
  - Search bar below, full-width on mobile
- Lines 71-86: Stats bar — simplify to inline text, no card wrappers
- Lines 89-101: Category grid uses updated `CategoryCard` with Lucide icons

#### Step 3.2: Character list (`/src/routes/characters/index.tsx`)
- Replace DataCard subtitle with birthday info (e.g., "Spring 15")
- Add small Lucide icons for category indicators instead of text badges
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (no xl:grid-cols-4 — 3 max is more readable)

#### Step 3.3: Character detail — full hub (`/src/routes/characters/[id].tsx`)
- **Header section**: Name, category badge (accent), birthday with `<Calendar />` icon, residence with `<MapPin />` icon, family members
- **Description**: Bilingual text, clean `text-sm leading-relaxed`
- **Gift preferences** (lines 144-172): Replace 💛 emoji with `<Heart />` icon. Clean table/grid layout:
  - Each tier as a row: icon + tier name + comma-separated items
  - Remove colored border per tier — use subtle left-border accent or just spacing
- **Heart events** (lines 174-218): Timeline-style layout with heart color dot, requirement, location, time
- **NEW — Related events section**: Filter `events` data where character is mentioned in requirements or description. Display as compact list with event name, type badge, location
- **NEW — Related festivals section**: Show festivals the character participates in (match by character mentions in festival data). Compact list: name, date, season
- **NEW — Related recipes section**: Cross-reference recipes where character's loved/favorited gifts appear as recipe outputs. Show recipe name + ingredients summary
- Data wiring:
  - Import `events` from `/src/data/events/`
  - Import `festivals` from `/src/data/festivals/`
  - Import `recipes` from `/src/data/recipes/`
  - Filter by character name/id match in description, requirements, or related fields

#### Step 3.4: Guides index (`/src/routes/guides/index.tsx`)
- Update DataCard usage to show section count and category
- Clean grid layout matching other list pages

#### Step 3.5: Guide detail page
- Check if `/src/routes/guides/[id].tsx` exists — if not, create it
- Use new `Accordion` component for each `GuideSection`
- First section open by default, rest collapsed
- Section heading: `text-lg font-medium`
- Section body: `text-sm leading-relaxed` with proper paragraph spacing
- Add "Expand All / Collapse All" toggle at top

#### Step 3.6: Other list pages
- `/src/routes/crops/index.tsx` — remove emoji usage if any, apply clean DataCard
- `/src/routes/recipes/index.tsx` — same treatment
- `/src/routes/festivals/index.tsx` — same treatment
- `/src/routes/events/index.tsx` — same treatment
- `/src/routes/lists/index.tsx` — same treatment
- `/src/routes/bookmarks.tsx` — same treatment
- `/src/routes/about.tsx` — clean up to match new minimal style

#### Step 3.7: 404 page
- File: `/src/routes/[...404].tsx`
- Remove any emoji, apply clean typography

### Phase 4: Mobile Polish

#### Step 4.1: Touch targets
- All interactive elements: minimum 44px touch target
- FilterTabs: `min-h-[44px]` on mobile
- Nav links in mobile menu: `py-3` minimum

#### Step 4.2: Spacing audit
- Page padding: `px-4` on mobile, `px-6` on sm+
- Card gaps: `gap-3` on mobile, `gap-4` on sm+
- Section spacing: `space-y-6` between major sections

#### Step 4.3: Mobile navigation
- Hamburger menu opens full-width dropdown
- Current page indicator: green underline or dot
- Close on route change

#### Step 4.4: Character detail mobile
- Stack all sections vertically
- Gift tiers: horizontal scroll if items overflow, or wrap naturally
- Heart events: compact card layout instead of wide table

### Phase 5: Cleanup & Verification

#### Step 5.1: Emoji audit
- Grep entire `/src/` for emoji characters (unicode ranges U+1F300-U+1F9FF)
- Replace any remaining emojis with appropriate Lucide icons or text

#### Step 5.2: Dark mode verification
- Test all new color variables resolve correctly in dark mode
- Ensure contrast ratios meet WCAG AA (4.5:1 for text, 3:1 for large text)

#### Step 5.3: Build verification
- `pnpm build` succeeds with no TypeScript errors
- No unused imports from old emoji/icon approach

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Character hub cross-referencing may miss matches | Related events/festivals/recipes could show incomplete data | Use broad text matching (character name in any bilingual field), verify with 2-3 sample characters |
| Accordion animation performance on mobile | Janky collapse/expand on low-end devices | Use CSS `max-height` transition or `grid-template-rows: 0fr/1fr` trick instead of JS animation |
| Color variable changes break dark mode | UI becomes unreadable in dark mode | Define both light and dark values for every CSS variable; test both modes each phase |
| Lucide tree-shaking may not work with SolidJS | Bundle size bloat from importing full icon set | Import icons individually: `import { Heart } from 'lucide-solid'` — verify with build output |
| Guide detail page may not exist yet | Need to create new route file | Check existence first; if missing, create `/src/routes/guides/[id].tsx` with proper data loading |
| Related data matching is fuzzy | False positives in character hub | Show "Related" sections only when matches > 0; use exact character name matching first |

## Verification Steps

1. `pnpm build` — zero errors, zero warnings
2. Visual check on 375px viewport (mobile): home, character list, character detail, guide detail
3. Visual check on 1280px viewport (desktop): same pages
4. Dark mode toggle on both viewports
5. Grep for emoji unicode — zero matches in `/src/`
6. All FilterTabs, search, bookmarks still functional
7. Character detail hub shows related events/festivals for at least 2 sample characters
8. Accordion expand/collapse works smoothly on guide detail page
9. Lucide icons render at consistent size across all pages
10. No `rounded-2xl`, `shadow-md`, or gradient classes remain in component files
