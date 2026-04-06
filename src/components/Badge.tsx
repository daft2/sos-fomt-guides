import { JSX, splitProps } from "solid-js";

interface BadgeProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent";
}

const variantClasses: Record<string, string> = {
  default: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  accent: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
};

export default function Badge(props: BadgeProps) {
  const [local, rest] = splitProps(props, ["variant", "class", "children"]);
  const variant = () => local.variant ?? "default";

  return (
    <span
      class={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${variantClasses[variant()]} ${local.class ?? ""}`}
      {...rest}
    >
      {local.children}
    </span>
  );
}
