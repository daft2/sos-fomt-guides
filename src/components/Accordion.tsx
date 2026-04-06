import { createSignal, JSX, Show } from "solid-js";
import { ChevronDown } from "lucide-solid";

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: JSX.Element;
}

export default function Accordion(props: AccordionProps) {
  const [open, setOpen] = createSignal(props.defaultOpen ?? false);

  return (
    <div class="border-b border-slate-200 dark:border-slate-700">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        class="flex w-full items-center justify-between py-4 text-left text-base font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        aria-expanded={open()}
      >
        {props.title}
        <ChevronDown
          class={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open() ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <Show when={open()}>
        <div class="pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {props.children}
        </div>
      </Show>
    </div>
  );
}
