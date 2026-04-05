import { createSignal, createMemo, For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import FilterTabs from "~/components/FilterTabs";
import DataCard from "~/components/DataCard";
import Badge from "~/components/Badge";
import SearchBar from "~/components/SearchBar";
import { recipes } from "~/data/recipes";

type UtensilFilter = "all" | "pot" | "frying-pan" | "oven" | "mixer" | "knife" | "none";

const UTENSIL_LABELS: Record<UtensilFilter, { en: string; id: string }> = {
  all: { en: "All", id: "Semua" },
  pot: { en: "Pot", id: "Panci" },
  "frying-pan": { en: "Frying Pan", id: "Wajan" },
  oven: { en: "Oven", id: "Oven" },
  mixer: { en: "Mixer", id: "Mixer" },
  knife: { en: "Knife", id: "Pisau" },
  none: { en: "No Utensil", id: "Tanpa Alat" },
};

const UTENSIL_COLORS: Record<Exclude<UtensilFilter, "all">, string> = {
  pot: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  "frying-pan": "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  oven: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  mixer: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  knife: "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300",
  none: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
};

function getUtensilFilter(utensils: string[]): Exclude<UtensilFilter, "all"> {
  if (utensils.length === 0) return "none";
  const u = utensils[0].toLowerCase();
  if (u.includes("pot")) return "pot";
  if (u.includes("frying") || u.includes("pan")) return "frying-pan";
  if (u.includes("oven")) return "oven";
  if (u.includes("mixer")) return "mixer";
  if (u.includes("knife")) return "knife";
  return "none";
}

export default function RecipesIndex() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = createSignal<UtensilFilter>("all");
  const [query, setQuery] = createSignal("");

  const filtered = createMemo(() => {
    const f = filter();
    const q = query().toLowerCase().trim();
    let base = recipes;
    if (f === "none") {
      base = recipes.filter((r) => r.utensils.length === 0);
    } else if (f !== "all") {
      base = recipes.filter((r) =>
        r.utensils.some((u) => u.toLowerCase().includes(f === "frying-pan" ? "frying" : f))
      );
    }
    if (!q) return base;
    return base.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.toLowerCase().includes(q))
    );
  });

  const tabs = [
    { value: "all" as UtensilFilter, label: lang() === "id" ? "Semua" : "All", count: recipes.length },
    { value: "pot" as UtensilFilter, label: lang() === "id" ? "Panci" : "Pot" },
    { value: "frying-pan" as UtensilFilter, label: lang() === "id" ? "Wajan" : "Frying Pan" },
    { value: "oven" as UtensilFilter, label: "Oven" },
    { value: "mixer" as UtensilFilter, label: "Mixer" },
    { value: "knife" as UtensilFilter, label: lang() === "id" ? "Pisau" : "Knife" },
    { value: "none" as UtensilFilter, label: lang() === "id" ? "Tanpa Alat" : "No Utensil" },
  ];

  return (
    <Layout
      title={t("recipes.title")}
      subtitle={t("recipes.subtitle")}
      breadcrumb={
        <A href="/" class="text-sm text-sky-600 hover:underline dark:text-sky-400">
          ← {t("nav.home")}
        </A>
      }
    >
      <div class="space-y-4">
        <SearchBar value={query()} onInput={setQuery} placeholder={t("common.search")} />
        <FilterTabs tabs={tabs} active={filter()} onChange={setFilter} />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <For each={filtered()}>
            {(recipe) => {
              const uFilter = getUtensilFilter(recipe.utensils);
              const staminaText = recipe.stamina != null ? `+${recipe.stamina} STA` : "";
              const fatigueText = recipe.fatigue != null ? ` ${recipe.fatigue} FAT` : "";
              return (
                <DataCard
                  id={String(recipe.id)}
                  category="recipes"
                  name={`#${String(recipe.id).padStart(3, "0")} ${recipe.name}`}
                  href={`/recipes/${recipe.id}`}
                  subtitle={`${t("recipes.effect")}: ${staminaText}${fatigueText || (recipe.stamina == null ? lang() === "id" ? "Tidak bisa dimakan" : "Cannot be eaten" : "")}`}
                  meta={recipe.sellPrice}
                  badge={
                    recipe.utensils.length > 0 ? (
                      <Badge class={UTENSIL_COLORS[uFilter]}>
                        {recipe.utensils[0]}
                      </Badge>
                    ) : (
                      <Badge class={UTENSIL_COLORS["none"]}>
                        {lang() === "id" ? "Tanpa Alat" : "No Utensil"}
                      </Badge>
                    )
                  }
                />
              );
            }}
          </For>
        </div>
        {filtered().length === 0 && (
          <p class="py-12 text-center text-slate-400 dark:text-slate-500">{t("common.notFound")}</p>
        )}
      </div>
    </Layout>
  );
}
