import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import CategoryCard from "~/components/CategoryCard";
import SearchBar from "~/components/SearchBar";

interface Category {
  href: string;
  labelKey: string;
  descKey: string;
  icon: string;
  count: number;
}

const CATEGORIES: Category[] = [
  { href: "/characters", labelKey: "nav.characters", descKey: "characters.subtitle", icon: "👥", count: 16 },
  { href: "/crops",      labelKey: "nav.crops",      descKey: "crops.subtitle",      icon: "🌱", count: 44 },
  { href: "/recipes",    labelKey: "nav.recipes",    descKey: "recipes.subtitle",    icon: "🍳", count: 120 },
  { href: "/festivals",  labelKey: "nav.festivals",  descKey: "festivals.subtitle",  icon: "🎉", count: 8 },
  { href: "/events",     labelKey: "nav.events",     descKey: "events.subtitle",     icon: "💛", count: 64 },
  { href: "/guides",     labelKey: "nav.guides",     descKey: "guides.subtitle",     icon: "📖", count: 8 },
  { href: "/lists",      labelKey: "nav.lists",      descKey: "lists.subtitle",      icon: "📋", count: 6 },
];

const STATS = [
  { icon: "👥", count: 16, labelKey: "nav.characters" },
  { icon: "🌱", count: 44, labelKey: "nav.crops" },
  { icon: "🍳", count: 120, labelKey: "nav.recipes" },
  { icon: "🎉", count: 8, labelKey: "nav.festivals" },
];

export default function Home() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = createSignal("");

  const handleSearch = (e: Event) => {
    e.preventDefault();
    const q = query().trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <main class="min-h-screen">
      {/* Hero */}
      <section class="bg-gradient-to-b from-green-800 to-green-700 dark:from-slate-900 dark:to-slate-800 px-4 pb-12 pt-14 text-center">
        <div class="mx-auto max-w-2xl">
          <div class="mb-3 text-5xl">🌾</div>
          <h1 class="text-3xl font-bold text-white sm:text-4xl">
            Story of Seasons
          </h1>
          <p class="mt-1 text-lg font-medium text-green-200 dark:text-slate-300">
            Friends of Mineral Town
          </p>
          <p class="mt-3 text-base text-green-100/80 dark:text-slate-400">
            {t("landing.subtitle")}
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} class="mt-6 mx-auto max-w-md">
            <SearchBar
              value={query()}
              onInput={setQuery}
              placeholder={t("common.search")}
              class="shadow-lg"
            />
          </form>
        </div>
      </section>

      {/* Quick stats bar */}
      <section class="bg-green-700 dark:bg-slate-800 border-b border-green-600/50 dark:border-slate-700">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul class="flex items-center justify-center gap-6 py-3 sm:gap-10">
            {STATS.map((s) => (
              <li class="flex items-center gap-1.5 text-white">
                <span class="text-base">{s.icon}</span>
                <span class="text-sm font-bold">{s.count}</span>
                <span class="hidden text-xs text-green-200 dark:text-slate-400 sm:inline">
                  {t(s.labelKey)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Category grid */}
      <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              href={cat.href}
              title={t(cat.labelKey)}
              description={t(cat.descKey)}
              icon={<span class="text-2xl">{cat.icon}</span>}
              count={cat.count}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
