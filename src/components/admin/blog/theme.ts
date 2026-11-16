import { useEffect, useState } from "react";

const KEY = "blog-admin-theme";
type Theme = "light" | "dark";
const listeners = new Set<(t: Theme) => void>();
let current: Theme = (typeof localStorage !== "undefined" && (localStorage.getItem(KEY) as Theme)) || "light";

/** Read / change the blog-admin theme (no side effects on <html>). */
export function useBlogAdminTheme() {
  const [theme, setThemeState] = useState<Theme>(current);
  useEffect(() => { listeners.add(setThemeState); return () => { listeners.delete(setThemeState); }; }, []);
  const setTheme = (t: Theme) => { current = t; localStorage.setItem(KEY, t); listeners.forEach((l) => l(t)); };
  return { theme, setTheme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") };
}

/** Mount once per admin page: puts the tokens on <html> so dialogs and menus (portals) are themed too. */
export function useApplyBlogAdminTheme() {
  const { theme } = useBlogAdminTheme();
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark") && !root.classList.contains("blog-admin");
    root.classList.add("blog-admin");
    root.classList.toggle("dark", theme === "dark");
    return () => { root.classList.remove("blog-admin"); if (!hadDark) root.classList.remove("dark"); };
  }, [theme]);
}
