import { createContext, useContext, createEffect, ParentComponent } from "solid-js";
import { isServer } from "solid-js/web";
import { createStorageSignal } from "./createStorageSignal";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: () => Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: () => "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue>();

export const ThemeProvider: ParentComponent = (props) => {
  const [theme, setTheme] = createStorageSignal<Theme>("theme", "system");

  const resolvedTheme = (): "light" | "dark" => {
    const t = theme();
    if (t === "system") {
      if (isServer) return "light";
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return t;
  };

  createEffect(() => {
    if (isServer) return;
    const resolved = resolvedTheme();
    const root = document.documentElement;
    if (resolved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
