# Plan: Story of Seasons FoMT Docs Site

## Requirements Summary

Build a bilingual (Indonesian/English) game documentation site for Story of Seasons: Friends of Mineral Town using the solid-template base. The site is an SPA with search, bookmarks (localStorage), mobile-first responsive design, accessible, and lightweight. All game data is extracted from a 344-page PDF into TypeScript data files.

**Stack:** Solid Start (SPA mode) + Kobalte + Tailwind v4 + Plus Jakarta Sans
**Data source:** PDF with 7 chapters covering guides, crops, animals, mining, tools, lists, recipes, characters, festivals, events
**Languages:** Indonesian + English with toggle
**Persistence:** localStorage for bookmarks, language preference, theme

## Acceptance Criteria

1. `pnpm dev` starts with zero errors; `pnpm build` produces a production build with zero errors
2. Site renders as SPA — all navigation is client-side with no full page reloads
3. All 7 data categories are accessible: Guides, Crops/Farming, Characters, Recipes, Lists, Festivals, Events
4. Each data category has an index page with filterable/searchable list
5. Each item (character, crop, recipe, etc.) has a detail page
6. Global search finds content across all categories — results appear within 100ms for typical queries
7. Bookmark toggle on any detail page saves/removes from localStorage
8. Bookmarks page shows all saved items grouped by category
9. Language toggle switches all UI text + game data between Indonesian and English
10. Language preference persists to localStorage across sessions
11. Dark mode toggle works and persists (inherited from template)
12. Mobile-first: all pages usable at 320px viewport width, touch-friendly tap targets (min 44px)
13. Accessible: semantic HTML, ARIA labels on interactive elements, keyboard navigable, color contrast ratio >= 4.5:1
14. Lighthouse performance score >= 90 on mobile
15. Total JS bundle < 200KB gzipped (excluding fonts)

## Data Architecture

### TypeScript Data Files Structure

```
src/data/
├── i18n/
│   ├── id.ts              # Indonesian UI strings
│   └── en.ts              # English UI strings
├── characters/
│   ├── types.ts           # Character, GiftPreference types
│   ├── rick.ts            # Per-character data (both languages)
│   ├── cliff.ts
│   ├── gray.ts
│   ├── doctor.ts
│   ├── kai.ts
│   ├── brandon.ts
│   ├── popuri.ts
│   ├── karen.ts
│   ├── marie.ts
│   ├── elly.ts
│   ├── ran.ts
│   ├── jennifer.ts
│   ├── harvest-goddess.ts
│   ├── kappa.ts
│   ├── bon-vivant.ts
│   ├── huang.ts
│   └── index.ts           # Re-exports all characters
├── crops/
│   ├── types.ts           # Crop, Season, GrowthStage types
│   ├── spring.ts          # Spring crops with prices, growth times
│   ├── summer.ts          # Summer crops
│   ├── autumn.ts          # Autumn crops
│   └── index.ts
├── recipes/
│   ├── types.ts           # Recipe, Ingredient, RecoveryStats types
│   ├── recipes-001-030.ts # Recipes grouped by number ranges
│   ├── recipes-031-060.ts
│   ├── recipes-061-090.ts
│   ├── recipes-091-120.ts
│   └── index.ts
├── festivals/
│   ├── types.ts           # Festival type (date, time, location, requirements)
│   ├── spring.ts
│   ├── summer.ts
│   ├── autumn.ts
│   ├── winter.ts
│   └── index.ts
├── events/
│   ├── types.ts           # Event, EventRequirement types
│   ├── normal.ts          # Normal events with trigger conditions
│   ├── limited.ts         # Limited events
│   ├── secret.ts          # Secret events
│   └── index.ts
├── guides/
│   ├── types.ts           # Guide type
│   ├── tips.ts            # General tips & tricks
│   ├── power-berries.ts   # Power berry locations
│   ├── mining.ts          # Spring & Lake mine guides
│   ├── fishing.ts         # Fishing guide + legendary fish
│   ├── animals.ts         # Pet & livestock guides
│   ├── tools.ts           # Tool upgrades, cursed & blessed tools
│   ├── stamina.ts         # Stamina & fatigue management
│   ├── foraging.ts        # Foraging guide
│   └── index.ts
├── lists/
│   ├── types.ts
│   ├── seeds.ts           # Complete seed list with prices
│   ├── shops.ts           # Shop hours
│   ├── npc-gifts.ts       # All NPC gift preferences (quick-reference)
│   ├── rings.ts           # 7 rings collection
│   ├── locations.ts       # Town map locations
│   ├── outfits.ts         # Costume/outfit list
│   └── index.ts
└── search-index.ts        # Pre-built search index from all data
```

### Bilingual Data Pattern

Each data entry contains both languages inline:

```ts
export interface Character {
  id: string;
  name: string; // Same in both languages
  birthday: string;
  location: { id: string; en: string };
  description: { id: string; en: string };
  lovedGifts: string[];    // Item names (English, game canonical)
  likedGifts: string[];
  dislikedGifts: string[];
  heartEvents: HeartEvent[];
}
```

UI strings use a simple i18n module:

```ts
// src/lib/i18n.ts
export type Locale = "id" | "en";
// createStorageSignal for persistence
// context provider for app-wide access
// t() function for UI string lookup
```

## Site Structure & Routing

```
src/routes/
├── index.tsx              # Landing page — search bar + category cards
├── characters/
│   ├── index.tsx          # Character grid with filter
│   └── [id].tsx           # Character detail page
├── crops/
│   ├── index.tsx          # Crop list with season filter tabs
│   └── [id].tsx           # Crop detail page
├── recipes/
│   ├── index.tsx          # Recipe list with search + filter
│   └── [id].tsx           # Recipe detail page
├── festivals/
│   ├── index.tsx          # Festival calendar view by season
│   └── [id].tsx           # Festival detail page
├── events/
│   ├── index.tsx          # Event list with type filter (normal/limited/secret)
│   └── [id].tsx           # Event detail page
├── guides/
│   ├── index.tsx          # Guide list
│   └── [id].tsx           # Guide detail (long-form content)
├── lists/
│   ├── index.tsx          # Quick-reference lists hub
│   ├── seeds.tsx          # Seed comparison table
│   ├── shops.tsx          # Shop hours table
│   ├── npc-gifts.tsx      # NPC gift matrix
│   ├── rings.tsx          # Ring collection checklist
│   ├── locations.tsx      # Town map locations
│   └── outfits.tsx        # Outfit gallery
├── bookmarks.tsx          # Saved items page
├── about.tsx              # About/credits page
└── [...404].tsx           # 404 page
```

## Implementation Steps

### Phase 1: Project Setup & SPA Configuration (Steps 1-4)

#### Step 1: Configure SPA mode
- **File:** `vite.config.ts`
- Configure Solid Start for SPA/client-only rendering (disable SSR) via `ssr: false` in solidStart config
- This eliminates SSR hydration concerns with localStorage and simplifies the build

#### Step 2: Update package.json
- **File:** `package.json`
- Change name to `"sos-fomt"`, update description
- No new dependencies needed — Kobalte + Tailwind already in template

#### Step 3: Create i18n system
- **File:** `src/lib/i18n.ts` (new)
  - Define `Locale` type (`"id" | "en"`)
  - Create `I18nProvider` context using `createStorageSignal` for locale persistence
  - Export `useI18n()` hook returning `{ locale, setLocale, t }`
  - `t()` function takes a key and returns the string for current locale
- **File:** `src/data/i18n/id.ts` (new) — Indonesian UI strings
- **File:** `src/data/i18n/en.ts` (new) — English UI strings
- UI strings include: nav labels, filter labels, search placeholder, bookmark actions, category names, empty states

#### Step 4: Create shared UI components
- **File:** `src/components/Layout.tsx` (new) — mobile-first shell with nav drawer
- **File:** `src/components/Nav.tsx` (edit) — responsive nav with hamburger menu on mobile, language toggle + theme toggle + bookmark link
- **File:** `src/components/SearchBar.tsx` (new) — global search input with Kobalte Combobox, debounced, shows results dropdown
- **File:** `src/components/BookmarkButton.tsx` (new) — toggle button for any item, reads/writes localStorage via bookmark lib
- **File:** `src/components/CategoryCard.tsx` (new) — card for landing page category grid
- **File:** `src/components/FilterTabs.tsx` (new) — Kobalte Tabs for filtering (seasons, event types)
- **File:** `src/components/DataCard.tsx` (new) — reusable card for list items (character, crop, recipe)
- **File:** `src/components/Badge.tsx` (new) — small badge for categories, seasons, star ratings
- **File:** `src/components/LanguageToggle.tsx` (new) — Kobalte Select for id/en switch
- **File:** `src/app.tsx` (edit) — wrap with I18nProvider, update layout
- **File:** `src/app.css` (edit) — add component styles, ensure mobile-first breakpoints

### Phase 2: Data Layer (Steps 5-7)

#### Step 5: Create bookmark system
- **File:** `src/lib/bookmarks.ts` (new)
  - Uses `createStorageSignal` with key `"bookmarks"`
  - Stores array of `{ id: string, category: string, name: string, timestamp: number }`
  - Export `BookmarkProvider`, `useBookmarks()` with `toggle()`, `isBookmarked()`, `getAll()`, `getByCategory()`

#### Step 6: Create search system
- **File:** `src/lib/search.ts` (new)
  - Simple client-side search using `Array.filter` + string matching
  - Searches across all data categories
  - Returns results with category, id, name, and snippet
  - Debounced (150ms) for performance
  - Supports both languages (searches current locale's text)

#### Step 7: Extract PDF data into TypeScript files
- Extract ALL content from the 344-page PDF into the `src/data/` structure defined above
- Each data file exports typed arrays with bilingual content
- **Characters** (16): name, birthday, location, gifts (loved/liked/disliked), heart events with trigger conditions
- **Crops** (3 seasons): name, buy price, growth stages with days, sell prices by star rating, regrow info
- **Recipes** (120): name, ingredients, utensil, stamina/fatigue recovery, sell price, how to obtain
- **Festivals** (4 seasons): name, date, time, location, description, tips
- **Events** (normal/limited/secret): name, requirements (day, time, weather, season, friendship), description, choices & outcomes
- **Guides**: structured content from tips, power berries, mining, fishing, animals, tools, stamina, foraging
- **Lists**: seeds, shop hours, NPC gifts matrix, rings, locations, outfits
- Build `src/data/search-index.ts` that aggregates all items for the search system

### Phase 3: Pages & Routes (Steps 8-14)

#### Step 8: Landing page
- **File:** `src/routes/index.tsx` (rewrite)
- Hero section with game title + search bar
- Category cards grid (Characters, Crops, Recipes, Festivals, Events, Guides, Lists)
- Quick stats (16 characters, 120 recipes, etc.)
- Mobile: single column stack, search prominent at top

#### Step 9: Characters section
- **File:** `src/routes/characters/index.tsx` (new) — responsive grid of character cards with name + portrait placeholder
- **File:** `src/routes/characters/[id].tsx` (new) — detail page: bio, gift preferences (color-coded loved/liked/disliked), heart events timeline
- Filter: search by name

#### Step 10: Crops section
- **File:** `src/routes/crops/index.tsx` (new) — crop list with season filter tabs (Spring/Summer/Autumn)
- **File:** `src/routes/crops/[id].tsx` (new) — detail: growth timeline visual, price table by star rating, regrow info
- Filter: by season (Kobalte Tabs)

#### Step 11: Recipes section
- **File:** `src/routes/recipes/index.tsx` (new) — searchable recipe list with ingredient filter
- **File:** `src/routes/recipes/[id].tsx` (new) — detail: ingredients, utensil, stamina/fatigue bars, how to obtain
- Filter: search + utensil type

#### Step 12: Festivals & Events sections
- **File:** `src/routes/festivals/index.tsx` (new) — calendar-style view grouped by season
- **File:** `src/routes/festivals/[id].tsx` (new) — detail: date, time, location, description, tips
- **File:** `src/routes/events/index.tsx` (new) — event list with type tabs (Normal/Limited/Secret)
- **File:** `src/routes/events/[id].tsx` (new) — detail: trigger requirements checklist, description, choices & outcomes

#### Step 13: Guides & Lists sections
- **File:** `src/routes/guides/index.tsx` (new) — guide cards
- **File:** `src/routes/guides/[id].tsx` (new) — long-form guide content
- **File:** `src/routes/lists/index.tsx` (new) — hub linking to all quick-reference lists
- **File:** `src/routes/lists/seeds.tsx` (new) — sortable seed comparison table
- **File:** `src/routes/lists/shops.tsx` (new) — shop hours table
- **File:** `src/routes/lists/npc-gifts.tsx` (new) — NPC gift matrix (NPC x items)
- **File:** `src/routes/lists/rings.tsx` (new) — ring checklist
- **File:** `src/routes/lists/locations.tsx` (new) — town map location list
- **File:** `src/routes/lists/outfits.tsx` (new) — outfit gallery

#### Step 14: Bookmarks page
- **File:** `src/routes/bookmarks.tsx` (new)
- Shows all saved items grouped by category
- Each item links to its detail page
- Remove button on each bookmark
- Empty state with call-to-action

### Phase 4: Polish & Verification (Steps 15-17)

#### Step 15: Accessibility pass
- Verify all interactive elements have ARIA labels
- Verify keyboard navigation works on all pages (Tab, Enter, Escape)
- Verify color contrast >= 4.5:1 in both light and dark modes
- Add skip-to-content link
- Ensure focus indicators are visible

#### Step 16: Performance optimization
- Lazy-load route components with `lazy()` from Solid
- Ensure search is debounced and doesn't block UI
- Verify bundle size < 200KB gzipped
- Test on slow 3G throttle in DevTools

#### Step 17: Final verification
- `pnpm build` — zero errors
- Test all routes render correctly
- Test search across all categories
- Test bookmark add/remove/persist across reload
- Test language toggle switches all content
- Test dark mode toggle persists
- Test on mobile viewport (320px, 375px, 414px)
- Test keyboard navigation through the entire site

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| PDF text extraction errors | Incorrect game data | Cross-reference extracted data with PDF visually for key sections; structure data with types so TypeScript catches shape errors |
| 120 recipes + 16 characters + crops + events = large data bundle | Slow initial load, bundle > 200KB | Use dynamic imports to code-split data by category; only load what the current route needs |
| Bilingual content doubles data size | Bundle bloat | Both languages live in same file (no duplication of structure); only render current locale |
| Client-side search on large dataset may be slow | Search latency > 100ms | Pre-build a flat search index array; use simple string includes (no heavy library); benchmark and add web worker if needed |
| SPA mode means no SEO | Lower discoverability | Acceptable for a game docs site — primary audience shares direct links; add meta tags for social sharing |
| Kobalte component accessibility edge cases | WCAG violations | Test with screen reader (VoiceOver); Kobalte is built for accessibility but verify integration |

## Verification Steps

1. `pnpm build` completes with zero errors
2. `pnpm dev` → navigate to every route → no console errors
3. Search "Turnip" → shows crop result + recipe results containing turnip
4. Click bookmark on Rick's character page → reload → bookmarks page shows Rick
5. Toggle language id→en → all UI text + data descriptions switch to English
6. Toggle dark mode → all pages render correctly
7. Resize to 320px width → all content accessible, no horizontal scroll
8. Tab through landing page → all interactive elements focusable in order
9. Lighthouse mobile audit → Performance >= 90, Accessibility >= 90
10. Check bundle: `pnpm build` output → JS assets < 200KB gzipped total

## File Change Summary

| Action | Count | Files |
|--------|-------|-------|
| Edit | 4 | `package.json`, `vite.config.ts`, `src/app.tsx`, `src/app.css` |
| Rewrite | 2 | `src/routes/index.tsx`, `src/components/Nav.tsx` |
| Create (lib) | 3 | `i18n.ts`, `bookmarks.ts`, `search.ts` |
| Create (components) | 8 | `Layout.tsx`, `SearchBar.tsx`, `BookmarkButton.tsx`, `CategoryCard.tsx`, `FilterTabs.tsx`, `DataCard.tsx`, `Badge.tsx`, `LanguageToggle.tsx` |
| Create (data) | ~40 | All `src/data/**/*.ts` files (types, data, indices) |
| Create (routes) | ~20 | All new route files for each section |
| Delete | 1 | `src/data/items.ts` (template sample data) |
| **Total** | ~78 | |

## Estimated Complexity

This is a large project (~78 files). The bulk of the work is Phase 2 Step 7 (PDF data extraction into ~40 TypeScript files). Recommended execution: parallel team with 4-5 workers split by phase/section.
