import { createSignal, createMemo, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import FilterTabs from "~/components/FilterTabs";
import DataCard from "~/components/DataCard";
import Badge from "~/components/Badge";
import SearchBar from "~/components/SearchBar";
import { characters } from "~/data/characters";
import type { CharacterCategory } from "~/data/characters/types";

type CategoryFilter = CharacterCategory | "all";

const CATEGORY_COLORS: Record<CharacterCategory, string> = {
  bachelor: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  bachelorette: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  special: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
};

const CATEGORY_LABELS: Record<CharacterCategory, { en: string; id: string }> = {
  bachelor: { en: "Bachelor", id: "Bujangan" },
  bachelorette: { en: "Bachelorette", id: "Gadis" },
  special: { en: "Special", id: "Spesial" },
};

export default function CharactersIndex() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = createSignal<CategoryFilter>("all");
  const [query, setQuery] = createSignal("");

  const bachelors = characters.filter((c) => c.category === "bachelor");
  const bachelorettes = characters.filter((c) => c.category === "bachelorette");
  const special = characters.filter((c) => c.category === "special");

  const filtered = createMemo(() => {
    const f = filter();
    const q = query().toLowerCase().trim();
    const base = f === "all" ? characters : characters.filter((c) => c.category === f);
    if (!q) return base;
    return base.filter((c) => c.name.toLowerCase().includes(q));
  });

  const tabs = [
    { value: "all" as CategoryFilter, label: t("common.all"), count: characters.length },
    {
      value: "bachelor" as CategoryFilter,
      label: lang() === "id" ? "Bujangan" : "Bachelors",
      count: bachelors.length,
    },
    {
      value: "bachelorette" as CategoryFilter,
      label: lang() === "id" ? "Gadis" : "Bachelorettes",
      count: bachelorettes.length,
    },
    {
      value: "special" as CategoryFilter,
      label: lang() === "id" ? "Spesial" : "Special",
      count: special.length,
    },
  ];

  return (
    <Layout
      title={t("characters.title")}
      subtitle={t("characters.subtitle")}
      breadcrumb={
        <A href="/" class="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-white transition-colors">
          ← {t("nav.home")}
        </A>
      }
    >
      <div class="space-y-6">
        <SearchBar value={query()} onInput={setQuery} placeholder={t("common.search")} />
        <FilterTabs tabs={tabs} active={filter()} onChange={setFilter} />

        <Show
          when={filtered().length > 0}
          fallback={
            <p class="py-16 text-center text-slate-400 dark:text-slate-500">
              {t("common.notFound")}
            </p>
          }
        >
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <For each={filtered()}>
              {(char) => (
                <DataCard
                  id={char.id}
                  category="characters"
                  name={char.name}
                  href={`/characters/${char.id}`}
                  subtitle={`${t("characters.birthday")}: ${char.birthday}`}
                  badge={
                    <Badge class={CATEGORY_COLORS[char.category]}>
                      {lang() === "id"
                        ? CATEGORY_LABELS[char.category].id
                        : CATEGORY_LABELS[char.category].en}
                    </Badge>
                  }
                />
              )}
            </For>
          </div>
        </Show>
      </div>
    </Layout>
  );
}
