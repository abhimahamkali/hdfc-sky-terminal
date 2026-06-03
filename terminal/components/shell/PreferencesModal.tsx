"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme, type ThemePreference } from "@/lib/theme";

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export function PreferencesModal() {
  const {
    preferencesOpen,
    closePreferences,
    preference,
    setPreference,
    theme,
  } = useTheme();

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preferencesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreferences();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preferencesOpen, closePreferences]);

  useEffect(() => {
    if (!themeMenuOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, [themeMenuOpen]);

  if (!preferencesOpen) return null;

  const themeLabel =
    THEME_OPTIONS.find((o) => o.value === preference)?.label ?? "System";

  return (
    <div
      className="preferences-backdrop"
      role="presentation"
      onClick={closePreferences}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="preferences-title"
        className="preferences-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="preferences-header">
          <h2 id="preferences-title" className="preferences-title">
            Preferences
          </h2>
          <button
            type="button"
            className="preferences-close"
            onClick={closePreferences}
            aria-label="Close preferences"
          >
            ×
          </button>
        </header>

        <div className="preferences-row">
          <div className="preferences-row-text">
            <p className="preferences-row-title">Theme</p>
            <p className="preferences-row-desc">
              Select your theme preference. The entire terminal updates instantly.
            </p>
          </div>
          <div ref={menuRef} className="preferences-control-wrap">
            <button
              type="button"
              className="preferences-select"
              aria-expanded={themeMenuOpen}
              onClick={() => setThemeMenuOpen((o) => !o)}
            >
              <ThemeModeIcon mode={preference} />
              <span>{themeLabel}</span>
              <ChevronDown />
            </button>
            {themeMenuOpen && (
              <ul className="preferences-menu" role="listbox">
                {THEME_OPTIONS.map((opt) => (
                  <li key={opt.value} role="option" aria-selected={preference === opt.value}>
                    <button
                      type="button"
                      className="preferences-menu-item"
                      data-selected={preference === opt.value}
                      onClick={() => {
                        setPreference(opt.value);
                        setThemeMenuOpen(false);
                      }}
                    >
                      <ThemeModeIcon mode={opt.value} />
                      {opt.label}
                      {preference === opt.value && <CheckMark />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="preferences-row preferences-row--muted">
          <div className="preferences-row-text">
            <p className="preferences-row-title">Current appearance</p>
            <p className="preferences-row-desc">
              Resolved to <strong>{theme === "dark" ? "Dark" : "Light"}</strong>
              {preference === "system" ? " (from system)" : ""}. Press{" "}
              <kbd style={{ fontSize: 11, padding: "2px 6px", borderRadius: 4, border: "1px solid var(--border-1)" }}>
                Ctrl+F
              </kbd>{" "}
              for global search.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeModeIcon({ mode }: { mode: ThemePreference }) {
  if (mode === "light") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2" strokeLinecap="round" />
      </svg>
    );
  }
  if (mode === "dark") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" style={{ marginLeft: "auto" }}>
      <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
