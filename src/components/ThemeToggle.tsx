/**
 * Dark/light/system theme toggle.
 *
 * Stores preference in localStorage. Falls back to system preference.
 * Uses [data-theme] on <html> so Tailwind's dark: variants work.
 *
 * To enable Tailwind dark mode via data attribute, ensure your
 * tailwind config uses: darkMode: ["selector", '[data-theme="dark"]']
 * (Tailwind v4 uses dark: variants with prefers-color-scheme by default,
 * which already works without this component.)
 */

import { createSignal, onMount } from "solid-js";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.setAttribute("data-theme", resolved);
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export default function ThemeToggle() {
  const [theme, setTheme] = createSignal<Theme>("system");

  onMount(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    }
  });

  function cycle() {
    const order: Theme[] = ["system", "light", "dark"];
    const next = order[(order.indexOf(theme()) + 1) % order.length];
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  const labels: Record<Theme, string> = {
    system: "System",
    light: "Light",
    dark: "Dark",
  };

  return (
    <button
      onClick={cycle}
      class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {labels[theme()]}
    </button>
  );
}
