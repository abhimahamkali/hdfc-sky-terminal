"use client";

import { useEffect, useRef, useState } from "react";
import { useUiShell } from "@/lib/ui-shell";

type Strike = { call: string; call2: string; strike: string; pcr: string; put: string; put2: string };

const STRIKES: Strike[] = Array.from({ length: 5 }, () => ({
  call: "245.00",
  call2: "24.50 (1.34%)",
  strike: "18,250",
  pcr: "18.34",
  put: "245.00",
  put2: "24.50 (1.34%)",
}));

const LONG_BUILDUP_INDEX = 2;
const PRICE_OPTS = ["Price", "OI", "Volume"];
const DATE_OPTS = ["06 Jan 2026", "13 Jan 2026", "20 Jan 2026"];

export function OptionChain() {
  const { showToast } = useUiShell();
  const [priceLabel, setPriceLabel] = useState("Price");
  const [dateLabel, setDateLabel] = useState("06 Jan 2026");
  const [openMenu, setOpenMenu] = useState<"price" | "date" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openMenu) return;
    const onPointer = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, [openMenu]);

  return (
    <div
      className="sky-card"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        gap: 12,
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "var(--accent)",
            borderBottom: "2px solid var(--accent)",
            paddingBottom: 4,
          }}
        >
          Option Chain
        </span>
        <button
          type="button"
          onClick={() => showToast("Option Chain — expanded view")}
          style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--fg-1)" }}
          aria-label="Expand"
        >
          <ExpandGlyph />
        </button>
      </div>

      <div ref={menuRef} style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
        <Dropdown
          label={priceLabel}
          open={openMenu === "price"}
          onToggle={() => setOpenMenu(openMenu === "price" ? null : "price")}
          options={PRICE_OPTS}
          onSelect={(v) => {
            setPriceLabel(v);
            setOpenMenu(null);
            showToast(`Option chain sorted by ${v}`);
          }}
        />
        <Dropdown
          label={dateLabel}
          open={openMenu === "date"}
          onToggle={() => setOpenMenu(openMenu === "date" ? null : "date")}
          options={DATE_OPTS}
          onSelect={(v) => {
            setDateLabel(v);
            setOpenMenu(null);
            showToast(`Expiry: ${v}`);
          }}
        />
        <button
          type="button"
          style={iconBoxBtn}
          aria-label="Filter"
          onClick={() => showToast("Option chain filters")}
        >
          <FilterGlyph />
        </button>
        <button
          type="button"
          style={iconBoxBtn}
          aria-label="Info"
          onClick={() => showToast("PCR = Put-Call Ratio · ITM zones highlighted")}
        >
          <InfoGlyph />
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          fontSize: 11,
          fontWeight: 600,
          color: "var(--fg-2)",
          textAlign: "center",
        }}
      >
        <span>
          <span style={{ marginRight: 4 }}>LTP</span>
          <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: 12 }}>CALL</span>
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <SearchGlyph />
          <span style={{ fontWeight: 700, fontSize: 12, color: "var(--fg-1)" }}>STRIKE</span>
        </span>
        <span>
          <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: 12 }}>PUT</span>
          <span style={{ marginLeft: 4 }}>LTP</span>
        </span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
        {STRIKES.map((s, i) => (
          <div key={i}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
              <Cell side="call" v1={s.call} v2={s.call2} />
              <Cell side="strike" v1={s.strike} v2={`PCR : ${s.pcr}`} />
              <Cell side="put" v1={s.put} v2={s.put2} />
            </div>
            {i === LONG_BUILDUP_INDEX && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "6px 0",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    color: "var(--profit)",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                  }}
                >
                  <InfoCircleGlyph /> LONG BUILDUP
                </span>
                <span className="num" style={{ fontSize: 12 }}>
                  1,274.75
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Cell({ side, v1, v2 }: { side: "call" | "strike" | "put"; v1: string; v2: string }) {
  let bg = "transparent";
  if (side === "call") bg = "var(--oc-call-bg)";
  if (side === "strike") bg = "var(--oc-strike-bg)";
  if (side === "put") bg = "var(--oc-put-bg)";
  return (
    <div
      style={{
        background: bg,
        borderRadius: 4,
        padding: "6px 8px",
        textAlign: "center",
      }}
      className="num"
    >
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-1)" }}>{v1}</div>
      <div style={{ fontSize: 10, color: "var(--fg-2)" }}>{v2}</div>
    </div>
  );
}

function Dropdown({
  label,
  open,
  onToggle,
  options,
  onSelect,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  options: string[];
  onSelect: (v: string) => void;
}) {
  return (
    <div style={{ flex: 1, position: "relative" }}>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        style={{
          width: "100%",
          height: 36,
          padding: "8px 12px",
          borderRadius: 6,
          border: `1px solid ${open ? "var(--accent)" : "var(--border-1)"}`,
          background: open ? "var(--accent-soft)" : "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 12,
          color: "var(--fg-1)",
        }}
      >
        {label} <Chevron />
      </button>
      {open && (
        <ul
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            margin: 0,
            padding: 4,
            listStyle: "none",
            background: "var(--bg-card)",
            border: "1px solid var(--border-1)",
            borderRadius: 8,
            boxShadow: "0 8px 16px rgba(0,27,51,0.1)",
            zIndex: 20,
          }}
        >
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => onSelect(opt)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "none",
                  borderRadius: 4,
                  background: label === opt ? "var(--accent-soft)" : "transparent",
                  color: label === opt ? "var(--accent)" : "var(--fg-1)",
                  fontSize: 12,
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
  );
}

const iconBoxBtn: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 6,
  border: "1px solid var(--border-1)",
  background: "transparent",
  cursor: "pointer",
  color: "var(--fg-1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function ExpandGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6 M9 21H3v-6 M21 3l-7 7 M3 21l7-7" />
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
function FilterGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18 M6 12h12 M10 18h4" />
    </svg>
  );
}
function InfoGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01 M11 12h1v4" />
    </svg>
  );
}
function SearchGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
function InfoCircleGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--profit)" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01 M11 12h1v4" strokeLinecap="round" />
    </svg>
  );
}
