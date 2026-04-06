import { Search } from "lucide-solid";

interface SearchBarProps {
  value: string;
  onInput: (value: string) => void;
  placeholder?: string;
  class?: string;
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <div class={`relative ${props.class ?? ""}`}>
      <div class="pointer-events-none absolute inset-y-0 left-3 flex items-center">
        <Search class="h-4 w-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
      </div>
      <input
        type="search"
        value={props.value}
        onInput={(e) => props.onInput(e.currentTarget.value)}
        placeholder={props.placeholder ?? "Search..."}
        class="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-accent"
      />
    </div>
  );
}
