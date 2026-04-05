import { Select } from "@kobalte/core/select";
import { useTheme } from "~/lib/theme";

type Theme = "light" | "dark" | "system";

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Select
      value={theme()}
      onChange={(val) => val && setTheme(val as Theme)}
      options={THEME_OPTIONS.map((o) => o.value)}
      itemComponent={(props) => (
        <Select.Item
          item={props.item}
          class="px-3 py-1.5 text-sm cursor-pointer rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 outline-none data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-700"
        >
          <Select.ItemLabel>
            {THEME_OPTIONS.find((o) => o.value === props.item.rawValue)?.label}
          </Select.ItemLabel>
        </Select.Item>
      )}
    >
      <Select.Trigger
        class="flex items-center gap-1 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        <Select.Value<Theme>>
          {(state) =>
            THEME_OPTIONS.find((o) => o.value === state.selectedOption())?.label ?? "Theme"
          }
        </Select.Value>
        <span class="text-xs opacity-60">▾</span>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class="z-50 min-w-[8rem] rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-1">
          <Select.Listbox />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}
