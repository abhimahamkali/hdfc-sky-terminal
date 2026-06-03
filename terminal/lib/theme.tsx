"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "sky-theme-preference";

type Ctx = {
  preference: ThemePreference;
  theme: ResolvedTheme;
  setPreference: (p: ThemePreference) => void;
  toggle: () => void;
  preferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === "system") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return preference;
}

export function applyThemeToDocument(resolved: ResolvedTheme) {
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("light");
  const [theme, setTheme] = useState<ResolvedTheme>("light");
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let saved = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
    if (!saved) {
      const legacy = localStorage.getItem("sky-theme");
      if (legacy === "light" || legacy === "dark") saved = legacy;
    }
    const pref =
      saved === "light" || saved === "dark" || saved === "system"
        ? saved
        : "light";
    const resolved = resolveTheme(pref);
    setPreferenceState(pref);
    setTheme(resolved);
    applyThemeToDocument(resolved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const resolved = resolveTheme(preference);
    setTheme(resolved);
    applyThemeToDocument(resolved);
    localStorage.setItem(STORAGE_KEY, preference);
  }, [preference, hydrated]);

  useEffect(() => {
    if (!hydrated || preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const resolved = resolveTheme("system");
      setTheme(resolved);
      applyThemeToDocument(resolved);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [preference, hydrated]);

  const setPreference = useCallback((p: ThemePreference) => {
    setPreferenceState(p);
  }, []);

  const toggle = useCallback(() => {
    setPreferenceState((prev) => {
      const current = resolveTheme(prev);
      return current === "light" ? "dark" : "light";
    });
  }, []);

  const openPreferences = useCallback(() => setPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setPreferencesOpen(false), []);

  const value = useMemo(
    () => ({
      preference,
      theme,
      setPreference,
      toggle,
      preferencesOpen,
      openPreferences,
      closePreferences,
    }),
    [
      preference,
      theme,
      setPreference,
      toggle,
      preferencesOpen,
      openPreferences,
      closePreferences,
    ],
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme outside ThemeProvider");
  return ctx;
}
