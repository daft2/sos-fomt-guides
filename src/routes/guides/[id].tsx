import { useParams } from "@solidjs/router";
import { Show, For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import { useBookmarks } from "~/lib/bookmarks";
import Layout from "~/components/Layout";
import Badge from "~/components/Badge";
import { getGuideById } from "~/data/guides";
import type { GuideCategory } from "~/data/guides/types";

const CATEGORY_COLORS: Record<GuideCategory, string> = {
  tips: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  farming: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  animals: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  mining: "bg-stone-100 text-stone-800 dark:bg-stone-900/40 dark:text-stone-300",
  fishing: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  stamina: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
};

const CATEGORY_LABELS: Record<GuideCategory, string> = {
  tips: "Tips & Tricks",
  farming: "Farming",
  animals: "Animals",
  mining: "Mining",
  fishing: "Fishing",
  stamina: "Stamina",
};

export default function GuideDetail() {
  const params = useParams();
  const { t, lang } = useI18n();
  const { toggle, isBookmarked } = useBookmarks();

  const guide = () => getGuideById(params.id);
  const title = () => {
    const g = guide();
    if (!g) return "";
    return lang() === "id" ? g.title.id : g.title.en;
  };

  return (
    <Show
      when={guide()}
      fallback={
        <Layout
          breadcrumb={
            <A href="/guides" class="text-sm text-sky-600 hover:underline dark:text-sky-400">
              ← {t("guides.title")}
            </A>
          }
        >
          <p class="py-12 text-center text-slate-400">{t("common.notFound")}</p>
        </Layout>
      }
    >
      {(g) => (
        <Layout
          title={title()}
          breadcrumb={
            <A href="/guides" class="text-sm text-sky-600 hover:underline dark:text-sky-400">
              ← {t("guides.title")}
            </A>
          }
          actions={
            <button
              onClick={() => toggle(g().id, "guides", title())}
              class={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                isBookmarked(g().id)
                  ? "border-sky-400 bg-sky-50 text-sky-700 dark:border-sky-500 dark:bg-sky-900/30 dark:text-sky-300"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {isBookmarked(g().id) ? `★ ${t("common.bookmarked")}` : `☆ ${t("common.bookmark")}`}
            </button>
          }
        >
          <div class="mx-auto max-w-2xl space-y-6">
            {/* Category badge */}
            <div class="flex flex-wrap gap-2">
              <Badge class={CATEGORY_COLORS[g().category]}>
                {CATEGORY_LABELS[g().category]}
              </Badge>
              <Badge variant="category">{g().sections.length} sections</Badge>
            </div>

            {/* Sections */}
            <div class="space-y-4">
              <For each={g().sections}>
                {(section) => (
                  <div class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                    <h2 class="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                      {lang() === "id" ? section.heading.id : section.heading.en}
                    </h2>
                    <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {lang() === "id" ? section.body.id : section.body.en}
                    </p>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Layout>
      )}
    </Show>
  );
}
