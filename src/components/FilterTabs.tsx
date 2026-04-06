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
      class={`flex gap-4 border-b border-slate-200 dark:border-slate-700 ${props.class ?? ""}`}
      role="tablist"
    >
      <For each={props.tabs}>
        {(tab) => (
          <button
            role="tab"
            aria-selected={props.active === tab.value}
            onClick={() => props.onChange(tab.value)}
            class={`inline-flex items-center gap-1 pb-2.5 text-sm transition-colors focus:outline-none focus-visible:outline-none ${
              props.active === tab.value
                ? "border-b-2 border-accent font-medium text-accent"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span class="ml-1 text-xs text-slate-400">{tab.count}</span>
            )}
          </button>
        )}
      </For>
    </div>
  );
}
