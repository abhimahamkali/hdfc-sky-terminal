"use client";

import { useState } from "react";

const TABS = ["Positions", "Orders", "GTT", "Alerts", "Holiday Calendar", "Economic Calendar"] as const;
type Tab = typeof TABS[number];

type Row = {
  name: string; qty: string; avg: string; ltp: string;
  cur: string; inv: string; pl: string; pct: string; profit: boolean;
};

const ROWS: Row[] = [
  { name: "TCS",       qty: "1,00,000", avg: "5000", ltp: "5000", cur: "10,000,00", inv: "10,000,00", pl: "14,34,535.75",  pct: "15.54%", profit: true  },
  { name: "MAHABANK",  qty: "6",        avg: "5000", ltp: "5000", cur: "12,980.32", inv: "2,315.32",  pl: "-14,34,535.75", pct: "15.54%", profit: false },
  { name: "TATAPOWER", qty: "6",        avg: "5000", ltp: "5000", cur: "12,980.32", inv: "2,315.32",  pl: "14,34,535.75",  pct: "15.54%", profit: true  },
];

const COLS = ["Scrip Name", "Qty", "Avg", "LTP", "Current", "Invested", "Total P/L", "P&L%"];

export function PositionsTable() {
  const [active, setActive] = useState<Tab>("Positions");

  return (
    <div className="sky-card" style={{
      display: "flex", flexDirection: "column",
      padding: 16, gap: 12, height: "100%", overflow: "hidden",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 32,
        borderBottom: "1px solid var(--border-1)",
      }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setActive(t)}
            style={{
              padding: "6px 0", background: "transparent", border: "none",
              cursor: "pointer", whiteSpace: "nowrap",
              fontSize: 14,
              fontWeight: active === t ? 600 : 500,
              color: active === t ? "var(--accent)" : "var(--fg-2)",
              borderBottom: active === t ? "2px solid var(--accent)" : "2px solid transparent",
              marginBottom: -1,
              transition: "color 120ms ease",
            }}
          >{t}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflow: "auto" }}>
        {active !== "Positions" ? (
          <p style={{ padding: 24, fontSize: 14, color: "var(--fg-2)", textAlign: "center" }}>
            {active} — content loads here
          </p>
        ) : (
        <table style={{ width: "100%", fontSize: 13 }}>
          <thead>
            <tr>
              {COLS.map(c => (
                <th key={c} style={{
                  textAlign: "left", padding: "10px 12px",
                  background: "var(--bg-select)",
                  borderTop: "1px solid var(--border-1)",
                  borderBottom: "1px solid var(--border-1)",
                  color: "var(--fg-2)", fontWeight: 500, fontSize: 12,
                  whiteSpace: "nowrap",
                }}>
                  {c} <SortGlyph />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--border-2)" }}>
                <td style={cellNameSty}>{r.name}</td>
                <td style={cellSty}>{r.qty}</td>
                <td style={cellSty}>{r.avg}</td>
                <td style={cellSty}>{r.ltp}</td>
                <td style={cellSty}>{r.cur}</td>
                <td style={cellSty}>{r.inv}</td>
                <td style={{ ...cellSty, color: r.profit ? "var(--profit)" : "var(--loss)", fontWeight: 600 }}>{r.pl}</td>
                <td style={{ ...cellSty, color: r.profit ? "var(--profit)" : "var(--loss)", fontWeight: 600 }}>{r.pct}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    </div>
  );
}

const cellSty: React.CSSProperties = {
  padding: "12px",
  color: "var(--fg-2)",
  fontWeight: 400,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
};
const cellNameSty: React.CSSProperties = {
  padding: "12px",
  color: "var(--fg-1)",
  fontWeight: 600,
  whiteSpace: "nowrap",
};

function SortGlyph() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" style={{ marginLeft: 4 }}>
      <path d="M3 5l3-3 3 3 M3 7l3 3 3-3" fill="none" stroke="var(--fg-3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
