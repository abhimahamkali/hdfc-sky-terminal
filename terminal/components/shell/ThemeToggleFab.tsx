"use client";

import { useTheme } from "@/lib/theme";

/** Opens theme preferences (Light / Dark / System) */
export function ThemeToggleFab() {
  const { openPreferences } = useTheme();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="theme-fab"
      aria-label="Theme preferences"
      title="Theme preferences"
    >
      <SettingsIcon />
    </button>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42" />
    </svg>
  );
}
