import { JSX } from "solid-js";
import { A } from "@solidjs/router";

interface CategoryCardProps {
  href: string;
  title: string;
  description?: string;
  icon?: JSX.Element;
  count?: number;
  class?: string;
}

export default function CategoryCard(props: CategoryCardProps) {
  return (
    <A
      href={props.href}
      class={`group flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800/50 ${props.class ?? ""}`}
    >
      <div class="flex items-center gap-3">
        {props.icon && (
          <span class="text-accent">{props.icon}</span>
        )}
        <h3 class="font-semibold text-slate-900 group-hover:text-accent-dark dark:text-slate-100 dark:group-hover:text-green-400">
          {props.title}
        </h3>
      </div>
      {props.description && (
        <p class="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{props.description}</p>
      )}
      {props.count !== undefined && (
        <span class="text-xs text-slate-400 dark:text-slate-500">
          {props.count} items
        </span>
      )}
    </A>
  );
}
