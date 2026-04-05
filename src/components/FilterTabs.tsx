import { For } from "solid-js";

interface FilterTab<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface FilterTabsProps<T extends string> {
  tabs: FilterTab<T>[];
  active: T;
  onChange: (value: T) => void;
  class?: string;
}

export default function FilterTabs<T extends string>(props: FilterTabsProps<T>) {
  return (
    <div
      class={`flex flex-wrap gap-2 ${props.class ?? ""}`}
      role="tablist"
    >
      <For each={props.tabs}>
        {(tab) => (
          <button
            role="tab"
            aria-selected={props.active === tab.value}
            onClick={() => props.onChange(tab.value)}
            class={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
              props.active === tab.value
                ? "bg-sky-600 text-white dark:bg-sky-500"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                class={`rounded-full px-1.5 py-0.5 text-xs ${
                  props.active === tab.value
                    ? "bg-sky-500 text-white dark:bg-sky-400"
                    : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        )}
      </For>
    </div>
  );
}
