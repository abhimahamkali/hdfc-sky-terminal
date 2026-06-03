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
    <div className="sky-card option-chain">
      <div className="option-chain__header">
        <span className="option-chain__title">Option Chain</span>
        <button
          type="button"
          className="option-chain__icon-btn"
          onClick={() => showToast("Option Chain — expanded view")}
          aria-label="Expand"
        >
          <ExpandGlyph />
        </button>
      </div>

      <div ref={menuRef} className="option-chain__controls">
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
          className="option-chain__dropdown--date"
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
          className="option-chain__icon-btn"
          aria-label="Filter"
          onClick={() => showToast("Option chain filters")}
        >
          <FilterGlyph />
        </button>
        <button
          type="button"
          className="option-chain__icon-btn"
          aria-label="Info"
          onClick={() => showToast("PCR = Put-Call Ratio · ITM zones highlighted")}
        >
          <InfoGlyph />
        </button>
      </div>

      <div className="option-chain__col-headers">
        <div className="option-chain__col-header option-chain__col-header--call">
          LTP <strong>CALL</strong>
        </div>
        <div className="option-chain__col-header option-chain__col-header--strike">
          <SearchGlyph />
          STRIKE
        </div>
        <div className="option-chain__col-header option-chain__col-header--put">
          <strong>PUT</strong> LTP
        </div>
      </div>

      <div className="option-chain__rows">
        {STRIKES.map((s, i) => (
          <div key={i}>
            <div className="option-chain__row">
              <Cell side="call" v1={s.call} v2={s.call2} />
              <Cell side="strike" v1={s.strike} v2={`PCR ${s.pcr}`} />
              <Cell side="put" v1={s.put} v2={s.put2} />
            </div>
            {i === LONG_BUILDUP_INDEX && (
              <div className="option-chain__buildup">
                <span className="option-chain__buildup-label">
                  <InfoCircleGlyph /> LONG BUILDUP
                </span>
                <span className="option-chain__buildup-value">1,274.75</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Cell({ side, v1, v2 }: { side: "call" | "strike" | "put"; v1: string; v2: string }) {
  return (
    <div className={`oc-cell oc-cell--${side}`}>
      <div className="oc-cell__primary">{v1}</div>
      <div className="oc-cell__secondary">{v2}</div>
    </div>
  );
}

function Dropdown({
  label,
  open,
  onToggle,
  options,
  onSelect,
  className = "",
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  options: string[];
  onSelect: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={`option-chain__dropdown ${className}`.trim()}>
      <button
        type="button"
        className="option-chain__dropdown-btn"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {label}
        </span>
        <Chevron />
      </button>
      {open && (
        <ul className="option-chain__dropdown-menu">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                className={`option-chain__dropdown-item${label === opt ? " option-chain__dropdown-item--active" : ""}`}
                onClick={() => onSelect(opt)}
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
