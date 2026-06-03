"use client";

import { useState } from "react";
import { useUiShell } from "@/lib/ui-shell";
import { ResearchPanel } from "@/components/widgets/ResearchPanel";

const TABS = [
  "Charts",
  "Notes",
  "Margin",
  "Analyst Rating",
  "Fundamental Ratios",
] as const;

type Tab = (typeof TABS)[number];

const TIMEFRAMES = ["1D", "5D", "1M", "3M", "6M", "1Y", "5Y"];

export function ChartPanel() {
  const { showToast } = useUiShell();
  const [active, setActive] = useState<Tab>("Charts");
  const [timeframe, setTimeframe] = useState("1D");

  const showChartChrome = active === "Charts";
  const showResearch =
    active === "Analyst Rating" || active === "Fundamental Ratios";

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          borderBottom: "1px solid var(--border-1)",
          overflowX: "auto",
          flexShrink: 0,
        }}
      >
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            style={{
              padding: "6px 0",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: active === t ? 600 : 500,
              color: active === t ? "var(--accent)" : "var(--fg-2)",
              borderBottom:
                active === t ? "2px solid var(--accent)" : "2px solid transparent",
              marginBottom: -1,
              transition: "color 120ms ease",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {showChartChrome && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--fg-1)",
                letterSpacing: 0.2,
              }}
            >
              NIFTY 50 · INDICES
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 12, color: "var(--fg-2)" }}>1D</span>
              <span className="num" style={{ fontSize: 12 }}>
                ƒ×
              </span>
              <button
                type="button"
                onClick={() => showToast("Advanced chart — settings panel")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid var(--border-1)",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--fg-1)",
                }}
              >
                <Arrow dir="up" /> Advanced
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, fontSize: 12 }} className="num">
            <Quote label="O" value="23,880.35" />
            <Quote label="H" value="23,976.40" />
            <Quote label="L" value="23,868.50" />
            <Quote label="C" value="23,965.95" />
            <span
              style={{ color: "var(--profit)", fontWeight: 600, marginLeft: 8 }}
            >
              +52.25 (+0.22%)
            </span>
          </div>
        </>
      )}

      <div style={{ flex: 1, position: "relative", minHeight: 0, overflow: "auto" }}>
        {active === "Charts" && <Candles />}
        {active === "Notes" && (
          <TabPlaceholder
            title="Notes"
            description="Add your trading notes and observations for this symbol."
          />
        )}
        {active === "Margin" && (
          <TabPlaceholder
            title="Margin"
            description="View margin requirements and available leverage for this instrument."
          />
        )}
        {showResearch && (
          <ResearchPanel
            focusSection={
              active === "Analyst Rating" ? "analyst" : "fundamental"
            }
          />
        )}
      </div>

      {showChartChrome && (
        <div style={{ display: "flex", justifyContent: "center", gap: 20, flexShrink: 0 }}>
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              style={{
                background: timeframe === tf ? "var(--accent-soft)" : "transparent",
                border: timeframe === tf ? "1px solid var(--accent)" : "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: timeframe === tf ? 600 : 500,
                color: timeframe === tf ? "var(--accent)" : "var(--fg-2)",
                padding: "4px 8px",
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TabPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: 24,
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "var(--fg-1)" }}>
        {title}
      </p>
      <p style={{ margin: 0, fontSize: 13, color: "var(--fg-2)", maxWidth: 320 }}>
        {description}
      </p>
    </div>
  );
}

function Quote({ label, value }: { label: string; value: string }) {
  return (
    <span>
      <span style={{ color: "var(--fg-2)" }}>{label} </span>
      <span style={{ color: "var(--fg-1)", fontWeight: 500 }}>{value}</span>
    </span>
  );
}

function Arrow({ dir }: { dir: "up" | "down" }) {
  const path =
    dir === "up"
      ? "M12 19V5 M5 12l7-7 7 7"
      : "M12 5v14 M19 12l-7 7-7-7";
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--profit)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

function Candles() {
  const w = 800,
    h = 320,
    n = 80;
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  type Candle = { open: number; close: number; high: number; low: number };
  const candles: Candle[] = [];
  let prev = h * 0.45;
  for (let i = 0; i < n; i++) {
    const drift = (rand() - 0.5) * 18;
    const open = prev;
    const close = Math.max(60, Math.min(h - 60, prev + drift));
    const high = Math.min(open, close) - rand() * 12 - 2;
    const low = Math.max(open, close) + rand() * 12 + 2;
    candles.push({ open, close, high, low });
    prev = close;
  }
  const cw = w / n - 2;
  const last = candles[candles.length - 1];

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", display: "block", minHeight: 280 }}
    >
      {[0.2, 0.4, 0.6, 0.8].map((y) => (
        <line
          key={y}
          x1={0}
          x2={w}
          y1={h * y}
          y2={h * y}
          stroke="var(--border-2)"
          strokeWidth="1"
        />
      ))}
      {candles.map((c, i) => {
        const up = c.close <= c.open;
        const color = up ? "var(--profit)" : "var(--loss)";
        const x = i * (w / n) + 1;
        const top = Math.min(c.open, c.close);
        const bot = Math.max(c.open, c.close);
        return (
          <g key={i}>
            <line
              x1={x + cw / 2}
              x2={x + cw / 2}
              y1={c.high}
              y2={c.low}
              stroke={color}
              strokeWidth="1"
            />
            <rect
              x={x}
              y={top}
              width={cw}
              height={Math.max(1, bot - top)}
              fill={color}
            />
          </g>
        );
      })}
      <line
        x1={0}
        x2={w}
        y1={last.close}
        y2={last.close}
        stroke="var(--profit)"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.7"
      />
      <rect x={w - 60} y={last.close - 10} width="60" height="20" fill="var(--profit)" />
      <text
        x={w - 30}
        y={last.close + 4}
        fill="white"
        fontSize="11"
        textAnchor="middle"
        fontFamily="Inter"
      >
        23965.95
      </text>
    </svg>
  );
}
