import { useParams } from "@solidjs/router";
import { Show, For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import { useBookmarks } from "~/lib/bookmarks";
import Layout from "~/components/Layout";
import Badge from "~/components/Badge";
import { recipes } from "~/data/recipes";

export default function RecipeDetail() {
  const params = useParams();
  const { t, lang } = useI18n();
  const { toggle, isBookmarked } = useBookmarks();

  const recipe = () => recipes.find((r) => String(r.id) === params.id);
  const bookmarkId = () => `recipe-${params.id}`;

  return (
    <Show
      when={recipe()}
      fallback={
        <Layout
          breadcrumb={
            <A href="/recipes" class="text-sm text-accent hover:underline">
              ← {t("recipes.title")}
            </A>
          }
        >
          <p class="py-12 text-center text-slate-400">{t("common.notFound")}</p>
        </Layout>
      }
    >
      {(r) => (
        <Layout
          title={r().name}
          breadcrumb={
            <A href="/recipes" class="text-sm text-accent hover:underline">
              ← {t("recipes.title")}
            </A>
          }
          actions={
            <button
              onClick={() => toggle(bookmarkId(), "recipes", r().name)}
              class={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                isBookmarked(bookmarkId())
                  ? "border-accent bg-accent-light/20 text-accent-dark dark:border-accent dark:bg-accent/10 dark:text-accent-light"
                  : "border-slate-200 bg-white text-slate-600 hover:border-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {isBookmarked(bookmarkId()) ? t("common.bookmarked") : t("common.bookmark")}
            </button>
          }
        >
          <div class="mx-auto max-w-2xl space-y-6">
            {/* Recipe number badge */}
            <div class="flex flex-wrap gap-2">
              <Badge variant="default">
                #{String(r().id).padStart(3, "0")}
              </Badge>
            </div>

            {/* Stats grid */}
            <div class="grid grid-cols-2 gap-4">
              {r().stamina != null && (
                <div class="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-900/10">
                  <p class="text-xs text-slate-400 dark:text-slate-500">
                    {lang() === "id" ? "Stamina" : "Stamina"}
                  </p>
                  <p class="mt-1 text-xl font-bold text-green-700 dark:text-green-400">
                    +{r().stamina}
                  </p>
                </div>
              )}
              {r().fatigue != null && (
                <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/10">
                  <p class="text-xs text-slate-400 dark:text-slate-500">
                    {lang() === "id" ? "Kelelahan" : "Fatigue"}
                  </p>
                  <p class="mt-1 text-xl font-bold text-blue-700 dark:text-blue-400">
                    {r().fatigue}
                  </p>
                </div>
              )}
              {r().stamina == null && r().fatigue == null && (
                <div class="col-span-2 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                  <p class="text-sm text-slate-500 dark:text-slate-400">
                    {lang() === "id" ? "Tidak bisa dimakan" : "Cannot be eaten"}
                  </p>
                </div>
              )}
              <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs text-slate-400 dark:text-slate-500">
                  {lang() === "id" ? "Harga Jual" : "Sell Price"}
                </p>
                <p class="mt-1 font-semibold text-slate-900 dark:text-slate-100">
                  {r().sellPrice}
                </p>
              </div>
            </div>

            {/* Utensils */}
            {r().utensils.length > 0 && (
              <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {lang() === "id" ? "Peralatan Masak" : "Cooking Utensils"}
                </p>
                <div class="flex flex-wrap gap-1.5">
                  <For each={r().utensils}>
                    {(utensil) => (
                      <span class="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/40 dark:text-orange-300">
                        {utensil}
                      </span>
                    )}
                  </For>
                </div>
              </div>
            )}

            {/* Ingredients */}
            <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {t("recipes.ingredients")}
              </p>
              <div class="flex flex-wrap gap-1.5">
                <For each={r().ingredients}>
                  {(ingredient) => (
                    <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {ingredient}
                    </span>
                  )}
                </For>
              </div>
            </div>

            {/* How to obtain */}
            <div class="rounded-lg border border-accent-light bg-accent-light/20 p-4 dark:border-accent/30 dark:bg-accent/10">
              <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {t("recipes.howToLearn")}
              </p>
              <p class="text-sm text-slate-700 dark:text-slate-300">{r().howToObtain}</p>
            </div>
          </div>
        </Layout>
      )}
    </Show>
  );
}
