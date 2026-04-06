import { Select } from "@kobalte/core/select";
import { ChevronDown, Sun, Moon, Monitor } from "lucide-solid";
import { JSX } from "solid-js";
import { useTheme } from "~/lib/theme";

type Theme = "light" | "dark" | "system";

const THEME_OPTIONS: { value: Theme; label: string; icon: () => JSX.Element }[] = [
  { value: "light", label: "Light", icon: () => <Sun class="h-4 w-4" /> },
  { value: "dark", label: "Dark", icon: () => <Moon class="h-4 w-4" /> },
  { value: "system", label: "System", icon: () => <Monitor class="h-4 w-4" /> },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const currentOption = () => THEME_OPTIONS.find((o) => o.value === theme());

  return (
    <Select
      value={theme()}
      onChange={(val) => val && setTheme(val as Theme)}
      options={THEME_OPTIONS.map((o) => o.value)}
      itemComponent={(props) => {
        const opt = THEME_OPTIONS.find((o) => o.value === props.item.rawValue);
        return (
          <Select.Item
            item={props.item}
            class="flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 outline-none data-[highlighted]:bg-slate-100 dark:data-[highlighted]:bg-slate-700"
          >
            {opt?.icon()}
            <Select.ItemLabel>{opt?.label}</Select.ItemLabel>
          </Select.Item>
        );
      }}
    >
      <Select.Trigger
        class="flex items-center gap-1.5 px-2 py-1 text-sm rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        aria-label="Toggle theme"
      >
        <Select.Value<Theme>>
          {(state) => {
            const opt = THEME_OPTIONS.find((o) => o.value === state.selectedOption());
            return opt ? opt.icon() : <Sun class="h-4 w-4" />;
          }}
        </Select.Value>
        <ChevronDown class="h-3.5 w-3.5 opacity-60" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class="z-50 min-w-[8rem] rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-1">
          <Select.Listbox />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}
