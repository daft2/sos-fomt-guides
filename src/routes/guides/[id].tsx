import { useParams } from "@solidjs/router";
import { Show, For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import { useBookmarks } from "~/lib/bookmarks";
import Layout from "~/components/Layout";
import Badge from "~/components/Badge";
import Accordion from "~/components/Accordion";
import { getGuideById } from "~/data/guides";
import type { GuideCategory } from "~/data/guides/types";


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
            <A href="/guides" class="text-sm text-accent hover:underline">
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
            <A href="/guides" class="text-sm text-accent hover:underline">
              ← {t("guides.title")}
            </A>
          }
          actions={
            <button
              onClick={() => toggle(g().id, "guides", title())}
              class={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                isBookmarked(g().id)
                  ? "border-accent bg-accent-light/20 text-accent-dark dark:border-accent dark:bg-accent/10 dark:text-accent-light"
                  : "border-slate-200 bg-white text-slate-600 hover:border-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {isBookmarked(g().id) ? t("common.bookmarked") : t("common.bookmark")}
            </button>
          }
        >
          <div class="mx-auto max-w-2xl space-y-6">
            {/* Category badge */}
            <div class="flex flex-wrap gap-2">
              <Badge variant="default">
                {CATEGORY_LABELS[g().category]}
              </Badge>
              <Badge variant="default">{g().sections.length} sections</Badge>
            </div>

            {/* Sections as accordion */}
            <div class="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-900">
              <For each={g().sections}>
                {(section, i) => (
                  <Accordion
                    title={lang() === "id" ? section.heading.id : section.heading.en}
                    defaultOpen={i() === 0}
                  >
                    {lang() === "id" ? section.body.id : section.body.en}
                  </Accordion>
                )}
              </For>
            </div>
          </div>
        </Layout>
      )}
    </Show>
  );
}
