"use client";

import { useState } from "react";

type Scrip = { name: string; exch: string; vol: string; ltp: string; pnl: string; dir: "up" | "down" };

const SAMPLE: Scrip[] = [
  { name: "MRF",          exch: "NSE", vol: "28.9L", ltp: "1,44,000.00", pnl: "24,000.00 (20.00%)",  dir: "up"   },
  { name: "ICICIBANK",    exch: "NSE", vol: "28.9L", ltp: "1,20,000",    pnl: "-24,000.00 (-20.00%)", dir: "down" },
  { name: "VODAFONE IDEA",exch: "NSE", vol: "28.9L", ltp: "14.00",       pnl: "1.00 (5.50%)",         dir: "up"   },
  { name: "ICICIBANK",    exch: "NSE", vol: "28.9L", ltp: "1,20,000",    pnl: "-24,000.00 (-20.00%)", dir: "down" },
  { name: "ICICIBANK",    exch: "NSE", vol: "28.9L", ltp: "1,20,000",    pnl: "-24,000.00 (-20.00%)", dir: "down" },
];

export function WatchList() {
  const [active, setActive] = useState(1);
  const [explore, setExplore] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = SAMPLE.filter((s) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return s.name.toLowerCase().includes(q);
  });

  return (
    <div className="sky-card" style={{
      display: "flex", flexDirection: "column",
      padding: 16, gap: 12, height: "100%", overflow: "hidden",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <DragDots />
          <span style={tabActiveStyle}>WatchList</span>
          <button style={iconBtn} aria-label="Add list"><PlusGlyph /></button>
        </div>
        <button style={iconBtn} aria-label="Expand"><ExpandGlyph /></button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setExplore(true)}
          style={{
            background: explore ? "var(--accent-soft)" : "transparent",
            border: explore ? "1px solid var(--accent)" : "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 500,
            color: explore ? "var(--accent)" : "var(--fg-1)",
            padding: "4px 8px",
          }}
        >
          Explore
        </button>
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            onClick={() => {
              setExplore(false);
              setActive(n);
            }}
            style={{
              width: 28, height: 28, borderRadius: 6,
              border: active === n ? "1.5px solid var(--accent)" : "1px solid var(--border-1)",
              background: active === n ? "var(--accent-soft)" : "transparent",
              fontSize: 12, fontWeight: 600,
              color: active === n ? "var(--accent)" : "var(--fg-1)",
              cursor: "pointer",
            }}
          >{n}</button>
        ))}
        <button style={smallBtn} aria-label="Add tab"><PlusGlyph /></button>
        <button style={{ ...smallBtn, marginLeft: "auto" }} aria-label="Code"><CodeGlyph /></button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          flex: 1, display: "flex", alignItems: "center", gap: 8,
          padding: "8px 12px", borderRadius: 6,
          background: "var(--bg-card)",
          border: "1px solid var(--border-1)",
        }}>
          <SearchGlyph />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search symbol"
            style={{
              border: "none", outline: "none", background: "transparent",
              fontSize: 13, color: "var(--fg-1)", flex: 1,
            }}
          />
        </div>
        <button style={{ ...smallBtn, width: 36, height: 36 }} aria-label="More"><MoreGlyph /></button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {filtered.length === 0 ? (
          <p style={{ padding: 16, fontSize: 13, color: "var(--fg-2)", textAlign: "center" }}>
            No symbols match &ldquo;{query}&rdquo;
          </p>
        ) : (
          filtered.map((s, i) => <ScripRow key={`${s.name}-${i}`} {...s} />)
        )}
      </div>
    </div>
  );
}

function ScripRow({ name, exch, vol, ltp, pnl, dir }: Scrip) {
  const colorClass = dir === "up" ? "num--profit" : "num--loss";
  return (
    <div style={{
      padding: "12px 4px",
      borderBottom: "1px solid var(--border-2)",
      display: "flex", flexDirection: "column", gap: 4,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-1)" }}>{name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span className="num" style={{ fontSize: 13, fontWeight: 600 }}>{ltp}</span>
          <Arrow dir={dir} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "var(--fg-2)" }}>{exch} | VOL {vol}</span>
        <span className={`num ${colorClass}`} style={{ fontSize: 11 }}>{pnl}</span>
      </div>
    </div>
  );
}

const tabActiveStyle: React.CSSProperties = {
  fontSize: 14, fontWeight: 500, lineHeight: "20px",
  color: "var(--accent)",
  borderBottom: "2px solid var(--accent)",
  paddingBottom: 4,
};

const iconBtn: React.CSSProperties = {
  width: 24, height: 24, padding: 0, background: "transparent",
  border: "none", borderRadius: 4, cursor: "pointer",
  color: "var(--fg-1)",
  display: "flex", alignItems: "center", justifyContent: "center",
};

const smallBtn: React.CSSProperties = {
  width: 28, height: 28, borderRadius: 6,
  border: "1px solid var(--border-1)",
  background: "transparent", cursor: "pointer",
  color: "var(--fg-1)",
  display: "flex", alignItems: "center", justifyContent: "center",
};

function DragDots() {
  return (
    <svg width="10" height="14" viewBox="0 0 10 14">
      {[2, 7, 12].map(y => (
        <g key={y}>
          <circle cx="2" cy={y} r="1" fill="var(--fg-3)" />
          <circle cx="8" cy={y} r="1" fill="var(--fg-3)" />
        </g>
      ))}
    </svg>
  );
}
function PlusGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 5v14 M5 12h14"/></svg>;
}
function ExpandGlyph() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6 M9 21H3v-6 M21 3l-7 7 M3 21l7-7"/></svg>;
}
function SearchGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
}
function CodeGlyph() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6 M8 6l-6 6 6 6"/></svg>;
}
function MoreGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>;
}
function Arrow({ dir }: { dir: "up" | "down" }) {
  const path = dir === "up" ? "M12 19V5 M5 12l7-7 7 7" : "M12 5v14 M19 12l-7 7-7-7";
  const stroke = dir === "up" ? "var(--profit)" : "var(--loss)";
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}
