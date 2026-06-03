"use client";

import { useEffect, useRef } from "react";
import { useUiShell } from "@/lib/ui-shell";
import { useIndexTickers } from "@/lib/use-index-tickers";
import type { TickerQuote } from "@/lib/ticker-types";

const TRADE_OPTIONS = ["Trade", "Equity", "F&O", "Commodities", "Currency"];

export function TopBar({
  showTickers = true,
  showCompactTickers = false,
}: {
  showTickers?: boolean;
  showCompactTickers?: boolean;
}) {
  const {
    openWidgets,
    tradeOpen,
    setTradeOpen,
    tradeMode,
    setTradeMode,
    showToast,
    toggleWatchlist,
    watchlistCollapsed,
  } = useUiShell();

  const tradeRef = useRef<HTMLDivElement>(null);
  const displayTickers = showTickers;
  const compactOnly = showCompactTickers && !showTickers;
  const { tickers, source, isRefreshing, updatedAt, flashIds } = useIndexTickers(
    displayTickers || compactOnly,
  );
  const tickersToShow = compactOnly ? tickers.slice(0, 1) : tickers;
  const updatedLabel = updatedAt
    ? new Date(updatedAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      })
    : null;

  useEffect(() => {
    if (!tradeOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (tradeRef.current && !tradeRef.current.contains(e.target as Node)) {
        setTradeOpen(false);
      }
    };
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, [tradeOpen, setTradeOpen]);

  return (
    <div className="sky-card top-bar">
      <div ref={tradeRef} className="top-bar__trade">
        <button
          type="button"
          className="top-bar__trade-btn"
          aria-expanded={tradeOpen}
          aria-haspopup="listbox"
          onClick={() => setTradeOpen(!tradeOpen)}
        >
          {tradeMode} <Chevron />
        </button>
        {tradeOpen && (
          <ul
            role="listbox"
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              minWidth: 200,
              margin: 0,
              padding: 4,
              listStyle: "none",
              background: "var(--bg-card)",
              border: "1px solid var(--border-1)",
              borderRadius: 8,
              boxShadow: "0 8px 24px rgba(0,27,51,0.12)",
              zIndex: 50,
            }}
          >
            {TRADE_OPTIONS.map((opt) => (
              <li key={opt} role="option" aria-selected={tradeMode === opt}>
                <button
                  type="button"
                  onClick={() => {
                    setTradeMode(opt);
                    setTradeOpen(false);
                    if (opt !== "Trade") showToast(`Switched to ${opt}`);
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "none",
                    borderRadius: 6,
                    background: tradeMode === opt ? "var(--accent-soft)" : "transparent",
                    color: tradeMode === opt ? "var(--accent)" : "var(--fg-1)",
                    fontSize: 14,
                    fontWeight: tradeMode === opt ? 600 : 400,
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {(displayTickers || compactOnly) && (
        <div
          className="top-bar__tickers"
          aria-live="polite"
          aria-busy={isRefreshing}
          data-ticker-source={source}
        >
          <span
            className={`top-bar__live-dot${source === "live" ? " top-bar__live-dot--on" : ""}${isRefreshing ? " top-bar__live-dot--pulse" : ""}`}
            title={
              source === "live"
                ? `Live · refreshes every 5s${updatedLabel ? ` · last ${updatedLabel} IST` : ""}`
                : "Using fallback quotes · retrying every 5s"
            }
            aria-hidden
          />
          {updatedLabel && (
            <span className="top-bar__updated" title="Last successful refresh (IST)">
              {updatedLabel}
            </span>
          )}
          <div className="top-bar__ticker-scroll">
            {tickersToShow.map((t, i) => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <button
                  type="button"
                  onClick={() => showToast(`${t.name}: ${t.value} ${t.delta}`)}
                  className={flashIds.has(t.id) ? "top-bar__ticker-hit" : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    padding: "4px 0",
                    minHeight: 44,
                  }}
                >
                  <Ticker {...t} compact={compactOnly} priceFlash={flashIds.has(t.id)} />
                </button>
                {!compactOnly && i < tickersToShow.length - 1 && (
                  <div style={{ width: 1, height: 18, background: "var(--border-1)", flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!displayTickers && !compactOnly && <div style={{ flex: 1, minWidth: 0 }} />}

      <div className="top-bar__actions">
        <span
          className="top-bar__margin-label"
          style={{ fontFamily: "var(--font-data)", fontSize: 12, color: "var(--fg-2)" }}
        >
          Avlb Mar:
        </span>
        <span className="num" style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)" }}>
          ₹1.2L
        </span>
        <button
          type="button"
          onClick={() => showToast("Add Funds — payment flow would open here")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "8px 10px",
            minHeight: 44,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--accent)",
          }}
        >
          + Add Funds
        </button>
        <button type="button" onClick={openWidgets} className="top-bar__widgets-btn">
          <span className="top-bar__widgets-label--long">+ Widgets</span>
          <span aria-hidden className="top-bar__widgets-label--short" style={{ display: "none" }}>
            +
          </span>
        </button>
        <button
          type="button"
          onClick={() => showToast("Layout presets — coming soon")}
          title="Layout"
          aria-label="Layout"
          className="top-bar__icon-btn"
        >
          <LayoutIcon />
        </button>
        <button
          type="button"
          onClick={toggleWatchlist}
          title={watchlistCollapsed ? "Show watchlist" : "Hide watchlist"}
          aria-label={watchlistCollapsed ? "Show watchlist" : "Hide watchlist"}
          aria-pressed={!watchlistCollapsed}
          className={`top-bar__icon-btn${watchlistCollapsed ? "" : " top-bar__icon-btn--active"}`}
        >
          <PanelIcon />
        </button>
        <button
          type="button"
          onClick={() =>
            showToast("Help — shortcuts: Esc closes modals; click tickers for quotes")
          }
          className="top-bar__icon-btn top-bar__icon-btn--plain"
          aria-label="Help"
        >
          <HelpIcon />
        </button>
      </div>
    </div>
  );
}

function Ticker({
  name,
  value,
  delta,
  dir,
  tag,
  compact,
  priceFlash,
}: TickerQuote & { compact?: boolean; priceFlash?: boolean }) {
  const cls = dir === "up" ? "num--profit" : "num--loss";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        whiteSpace: "nowrap",
        fontSize: 12,
        flexWrap: compact ? "wrap" : "nowrap",
      }}
    >
      <span style={{ fontWeight: 500, color: "var(--fg-1)" }}>{name}</span>
      <span
        className={`num top-bar__ticker-price${priceFlash ? " top-bar__ticker-price--flash" : ""}`}
        style={{ fontWeight: 600 }}
      >
        {value}
      </span>
      <Arrow dir={dir} />
      <span className={`num ${cls}`}>{delta}</span>
      {tag && !compact && <span className="tag tag--loss">{tag}</span>}
    </div>
  );
}

function Arrow({ dir }: { dir: "up" | "down" }) {
  const path = dir === "up" ? "M12 19V5 M5 12l7-7 7 7" : "M12 5v14 M19 12l-7 7-7-7";
  const color = dir === "up" ? "var(--profit)" : "var(--loss)";
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}
function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function LayoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18 M9 3v18" />
    </svg>
  );
}
function PanelIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M15 3v18" />
    </svg>
  );
}
function HelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5 M12 17h.01" />
    </svg>
  );
}
