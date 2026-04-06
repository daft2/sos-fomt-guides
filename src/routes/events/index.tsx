import { createSignal, createMemo, For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import FilterTabs from "~/components/FilterTabs";
import DataCard from "~/components/DataCard";
import Badge from "~/components/Badge";
import SearchBar from "~/components/SearchBar";
import { allEvents, eventsByType } from "~/data/events";
import type { EventType } from "~/data/events/types";

type TypeFilter = EventType | "all";

const TYPE_COLORS: Record<EventType, string> = {
  normal: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  limited: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  secret: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
};

const TYPE_LABELS: Record<EventType, string> = {
  normal: "Normal",
  limited: "Limited",
  secret: "Secret",
};

export default function EventsIndex() {
  const { t } = useI18n();
  const [type, setType] = createSignal<TypeFilter>("all");
  const [query, setQuery] = createSignal("");

  const filtered = createMemo(() => {
    const tp = type();
    const q = query().toLowerCase().trim();
    const base = tp === "all" ? allEvents : eventsByType[tp];
    if (!q) return base;
    return base.filter((e) => e.name.toLowerCase().includes(q));
  });

  const tabs = [
    { value: "all" as TypeFilter, label: t("common.all"), count: allEvents.length },
    { value: "normal" as TypeFilter, label: "Normal", count: eventsByType.normal.length },
    { value: "limited" as TypeFilter, label: "Limited", count: eventsByType.limited.length },
    { value: "secret" as TypeFilter, label: "Secret", count: eventsByType.secret.length },
  ];

  return (
    <Layout
      title={t("events.title")}
      subtitle={t("events.subtitle")}
      breadcrumb={
        <A href="/" class="text-sm text-accent hover:underline">
          ← {t("nav.home")}
        </A>
      }
    >
      <div class="space-y-4">
        <SearchBar value={query()} onInput={setQuery} placeholder={t("common.search")} />
        <FilterTabs tabs={tabs} active={type()} onChange={setType} />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <For each={filtered()}>
            {(event) => (
              <DataCard
                id={event.id}
                category="events"
                name={event.name}
                href={`/events/${event.id}`}
                subtitle={`${event.requirements.location}`}
                meta={event.requirements.day}
                badge={
                  <Badge class={TYPE_COLORS[event.type]}>
                    {TYPE_LABELS[event.type]}
                  </Badge>
                }
              />
            )}
          </For>
        </div>
        {filtered().length === 0 && (
          <p class="py-12 text-center text-slate-400 dark:text-slate-500">{t("common.notFound")}</p>
        )}
      </div>
    </Layout>
  );
}
