import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "onthi360-workspace-theme";

export default function useWorkspaceTheme(isOpen) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.classList.remove("theme-dark");
      document.documentElement.dataset.theme = "light";
      return undefined;
    }

    try {
      setTheme(window.localStorage.getItem(THEME_STORAGE_KEY) || "dark");
    } catch {
      setTheme("dark");
    }
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    document.documentElement.classList.toggle("theme-dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Vẫn cho phép đổi theme trong phiên nếu trình duyệt chặn localStorage.
    }

    return () => {
      document.documentElement.classList.remove("theme-dark");
      document.documentElement.dataset.theme = "light";
    };
  }, [isOpen, theme]);

  return [theme, () => setTheme((current) => current === "dark" ? "light" : "dark")];
}
