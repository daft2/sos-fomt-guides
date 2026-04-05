import { JSX, splitProps } from "solid-js";

interface BadgeProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "season" | "category" | "rarity";
  color?: string;
}

const variantClasses: Record<string, string> = {
  default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  season: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  category: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  rarity: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
};

export default function Badge(props: BadgeProps) {
  const [local, rest] = splitProps(props, ["variant", "color", "class", "children"]);
  const variant = () => local.variant ?? "default";

  return (
    <span
      class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant()]} ${local.class ?? ""}`}
      {...rest}
    >
      {local.children}
    </span>
  );
}
