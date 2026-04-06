import { createMemo, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { useBookmarks, type BookmarkCategory } from "~/lib/bookmarks";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import FilterTabs from "~/components/FilterTabs";
import { createSignal } from "solid-js";
import BookmarkButton from "~/components/BookmarkButton";
import Badge from "~/components/Badge";

const CATEGORY_HREFS: Record<BookmarkCategory, string> = {
  characters: "/characters",
  crops: "/crops",
  recipes: "/recipes",
  festivals: "/festivals",
  events: "/events",
  guides: "/guides",
  lists: "/lists",
};

const ALL_TAB = "all" as const;
type TabValue = BookmarkCategory | typeof ALL_TAB;

export default function BookmarksPage() {
  const { t } = useI18n();
  const { getAll, getByCategory } = useBookmarks();

  const [activeTab, setActiveTab] = createSignal<TabValue>(ALL_TAB);

  const allBookmarks = () => getAll();

  const categoryCounts = createMemo(() => {
    const bms = allBookmarks();
    const counts: Partial<Record<BookmarkCategory, number>> = {};
    for (const bm of bms) {
      counts[bm.category] = (counts[bm.category] ?? 0) + 1;
    }
    return counts;
  });

  const visibleBookmarks = createMemo(() => {
    const tab = activeTab();
    if (tab === ALL_TAB) return allBookmarks();
    return getByCategory(tab);
  });

  const tabs = createMemo(() => {
    const counts = categoryCounts();
    const categories: BookmarkCategory[] = [
      "characters",
      "crops",
      "recipes",
      "festivals",
      "events",
      "guides",
      "lists",
    ];
    return [
      { value: ALL_TAB as TabValue, label: t("common.all"), count: allBookmarks().length },
      ...categories
        .filter((c) => (counts[c] ?? 0) > 0)
        .map((c) => ({
          value: c as TabValue,
          label: t(`nav.${c}`),
          count: counts[c] ?? 0,
        })),
    ];
  });

  return (
    <Layout
      title={t("bookmarks.title")}
      subtitle={t("bookmarks.subtitle")}
    >
      <Show
        when={allBookmarks().length > 0}
        fallback={
          <div class="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              class="h-16 w-16 text-slate-300 dark:text-slate-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            <p class="text-slate-500 dark:text-slate-400">{t("bookmarks.empty")}</p>
            <A
              href="/"
              class="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
            >
              {t("landing.explore")}
            </A>
          </div>
        }
      >
        <div class="flex flex-col gap-6">
          <FilterTabs
            tabs={tabs()}
            active={activeTab()}
            onChange={setActiveTab}
          />

          <Show
            when={visibleBookmarks().length > 0}
            fallback={
              <p class="py-10 text-center text-slate-400 dark:text-slate-500">
                {t("bookmarks.empty")}
              </p>
            }
          >
            <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <For each={visibleBookmarks()}>
                {(bm) => (
                  <li class="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                    <div class="flex flex-col gap-1">
                      <A
                        href={`${CATEGORY_HREFS[bm.category]}/${bm.id}`}
                        class="font-medium text-slate-900 hover:text-accent dark:text-slate-100 dark:hover:text-accent-light"
                      >
                        {bm.name}
                      </A>
                      <Badge variant="default">{t(`nav.${bm.category}`)}</Badge>
                    </div>
                    <BookmarkButton
                      id={bm.id}
                      category={bm.category}
                      name={bm.name}
                    />
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </div>
      </Show>
    </Layout>
  );
}
