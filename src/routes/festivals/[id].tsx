import { useParams } from "@solidjs/router";
import { Show, For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import { useBookmarks } from "~/lib/bookmarks";
import Layout from "~/components/Layout";
import Badge from "~/components/Badge";
import { getFestivalById } from "~/data/festivals";
import type { FestivalSeason } from "~/data/festivals/types";

const SEASON_COLORS: Record<FestivalSeason, string> = {
  spring: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  summer: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  autumn: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  winter: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
};

export default function FestivalDetail() {
  const params = useParams();
  const { t, lang } = useI18n();
  const { toggle, isBookmarked } = useBookmarks();

  const festival = () => getFestivalById(params.id);

  return (
    <Show
      when={festival()}
      fallback={
        <Layout
          breadcrumb={
            <A href="/festivals" class="text-sm text-accent hover:underline">
              ← {t("festivals.title")}
            </A>
          }
        >
          <p class="py-12 text-center text-slate-400">{t("common.notFound")}</p>
        </Layout>
      }
    >
      {(f) => (
        <Layout
          title={f().name}
          breadcrumb={
            <A href="/festivals" class="text-sm text-accent hover:underline">
              ← {t("festivals.title")}
            </A>
          }
          actions={
            <button
              onClick={() => toggle(f().id, "festivals", f().name)}
              class={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                isBookmarked(f().id)
                  ? "border-accent bg-accent-light/20 text-accent-dark dark:border-accent dark:bg-accent/10 dark:text-accent-light"
                  : "border-slate-200 bg-white text-slate-600 hover:border-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {isBookmarked(f().id) ? t("common.bookmarked") : t("common.bookmark")}
            </button>
          }
        >
          <div class="mx-auto max-w-2xl space-y-6">
            {/* Season + contest badges */}
            <div class="flex flex-wrap gap-2">
              <Badge class={SEASON_COLORS[f().season]}>
                {t(`common.season.${f().season === "autumn" ? "fall" : f().season}`)}
              </Badge>
              {f().isContest && (
                <Badge variant="default">Contest</Badge>
              )}
            </div>

            {/* Description */}
            <p class="text-slate-600 dark:text-slate-400">
              {lang() === "id" ? f().description.id : f().description.en}
            </p>

            {/* Info grid */}
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs text-slate-400 dark:text-slate-500">{t("festivals.date")}</p>
                <p class="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {f().date} {t(`common.season.${f().season === "autumn" ? "fall" : f().season}`)}
                </p>
              </div>
              <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs text-slate-400 dark:text-slate-500">Time</p>
                <p class="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{f().time}</p>
              </div>
              <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs text-slate-400 dark:text-slate-500">{t("festivals.location")}</p>
                <p class="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">{f().location}</p>
              </div>
            </div>

            {/* Tips */}
            <Show when={f().tips}>
              <div class="rounded-lg border border-accent-light bg-accent-light/20 p-4 dark:border-accent/30 dark:bg-accent/10">
                <p class="text-xs font-medium text-accent-dark dark:text-accent-light">Tips</p>
                <p class="mt-1 text-sm text-slate-700 dark:text-slate-300">
                  {lang() === "id" ? f().tips!.id : f().tips!.en}
                </p>
              </div>
            </Show>

            {/* Rewards */}
            <Show when={f().rewards.length > 0}>
              <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <h2 class="mb-3 font-semibold text-slate-900 dark:text-slate-100">{t("festivals.reward")}</h2>
                <ul class="space-y-1">
                  <For each={f().rewards}>
                    {(reward) => (
                      <li class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <span class="mt-0.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0"></span>
                        {reward}
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            </Show>
          </div>
        </Layout>
      )}
    </Show>
  );
}
