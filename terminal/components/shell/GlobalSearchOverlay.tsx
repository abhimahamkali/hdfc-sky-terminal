"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SEARCH_SYMBOLS, type SearchSymbol } from "@/lib/search-symbols";
import { useUiShell } from "@/lib/ui-shell";

export function GlobalSearchOverlay() {
  const { showToast } = useUiShell();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_SYMBOLS.slice(0, 8);
    return SEARCH_SYMBOLS.filter(
      (s) =>
        s.symbol.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q),
    );
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const openSearch = useCallback(() => {
    setOpen(true);
    setActiveIndex(0);
  }, []);

  const selectSymbol = useCallback(
    (s: SearchSymbol) => {
      showToast(`Opened ${s.symbol} · ${s.exchange}`);
      close();
    },
    [showToast, close],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "f" || e.key === "F")) {
        e.preventDefault();
        if (open) close();
        else openSearch();
        return;
      }

      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(0, results.length - 1)));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }

      if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        selectSymbol(results[activeIndex]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close, openSearch, results, activeIndex, selectSymbol]);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  return (
    <div className="global-search-layer" data-open={open} aria-hidden={!open}>
      {open && (
        <button
          type="button"
          className="global-search-backdrop"
          aria-label="Close search"
          onClick={close}
          tabIndex={-1}
        />
      )}

      <div className="global-search-panel" role="search">
        <div className="global-search-bar">
          <SearchIcon />
          <input
            ref={inputRef}
            type="search"
            className="global-search-input"
            placeholder="Search symbol, index, or instrument…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Global symbol search"
            aria-expanded={open}
            aria-controls="global-search-results"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="global-search-hint">Esc</span>
        </div>

        {open && (
          <ul id="global-search-results" className="global-search-results" role="listbox">
            {results.length === 0 ? (
              <li className="global-search-empty">No symbols match &ldquo;{query}&rdquo;</li>
            ) : (
              results.map((s, i) => (
                <li key={s.symbol} role="option" aria-selected={i === activeIndex}>
                  <button
                    type="button"
                    className="global-search-result"
                    data-active={i === activeIndex}
                    onClick={() => selectSymbol(s)}
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    <div>
                      <div className="global-search-result-symbol">{s.symbol}</div>
                      <div className="global-search-result-meta">
                        {s.name} · {s.exchange}
                      </div>
                    </div>
                    <span className="global-search-result-ltp">{s.ltp}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--fg-3)" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}
