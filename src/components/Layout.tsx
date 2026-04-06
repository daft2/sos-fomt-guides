import { JSX, ParentComponent, Show } from "solid-js";

interface LayoutProps {
  title?: string;
  subtitle?: string;
  breadcrumb?: JSX.Element;
  actions?: JSX.Element;
  class?: string;
}

const Layout: ParentComponent<LayoutProps> = (props) => {
  return (
    <main class={`min-h-screen ${props.class ?? ""}`}>
      <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Show when={props.breadcrumb}>
          <div class="mb-5">{props.breadcrumb}</div>
        </Show>
        <Show when={props.title}>
          <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div class="flex flex-col gap-1">
              <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
                {props.title}
              </h1>
              <Show when={props.subtitle}>
                <p class="text-sm text-slate-500 dark:text-slate-400">{props.subtitle}</p>
              </Show>
            </div>
            <Show when={props.actions}>
              <div class="flex shrink-0 items-center gap-2">{props.actions}</div>
            </Show>
          </div>
        </Show>
        {props.children}
      </div>
    </main>
  );
};

export default Layout;
