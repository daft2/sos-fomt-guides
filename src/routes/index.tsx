import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Users, Sprout, CookingPot, PartyPopper, Heart, BookOpen, ClipboardList } from "lucide-solid";
import { useI18n } from "~/lib/i18n";
import CategoryCard from "~/components/CategoryCard";
import SearchBar from "~/components/SearchBar";
import { JSX } from "solid-js";

interface Category {
  href: string;
  labelKey: string;
  descKey: string;
  icon: JSX.Element;
  count: number;
}

const CATEGORIES: Category[] = [
  { href: "/characters", labelKey: "nav.characters", descKey: "characters.subtitle", icon: <Users class="h-5 w-5" />, count: 16 },
  { href: "/crops",      labelKey: "nav.crops",      descKey: "crops.subtitle",      icon: <Sprout class="h-5 w-5" />, count: 44 },
  { href: "/recipes",    labelKey: "nav.recipes",    descKey: "recipes.subtitle",    icon: <CookingPot class="h-5 w-5" />, count: 120 },
  { href: "/festivals",  labelKey: "nav.festivals",  descKey: "festivals.subtitle",  icon: <PartyPopper class="h-5 w-5" />, count: 8 },
  { href: "/events",     labelKey: "nav.events",     descKey: "events.subtitle",     icon: <Heart class="h-5 w-5" />, count: 64 },
  { href: "/guides",     labelKey: "nav.guides",     descKey: "guides.subtitle",     icon: <BookOpen class="h-5 w-5" />, count: 8 },
  { href: "/lists",      labelKey: "nav.lists",      descKey: "lists.subtitle",      icon: <ClipboardList class="h-5 w-5" />, count: 6 },
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

      {/* Header */}
      <section class="px-4 pb-8 pt-12">
        <div class="mx-auto max-w-5xl">
          <h1 class="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            Story of Seasons
          </h1>
          <p class="mt-1 text-lg text-slate-500 dark:text-slate-400">
            Friends of Mineral Town
          </p>
          <p class="mt-2 text-sm text-slate-400 dark:text-slate-500">
            {t("landing.subtitle")}
          </p>
          <form onSubmit={handleSearch} class="mt-5 max-w-md">
            <SearchBar
              value={query()}
              onInput={setQuery}
              placeholder={t("common.search")}
            />
          </form>
        </div>
      </section>

      {/* Category grid */}
      <section class="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              href={cat.href}
              title={t(cat.labelKey)}
              description={t(cat.descKey)}
              icon={cat.icon}
              count={cat.count}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
