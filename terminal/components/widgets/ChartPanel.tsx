"use client";

import { useMemo, useState } from "react";
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

const TIMEFRAMES = ["1D", "5D", "1M", "3M", "6M", "1Y", "5Y"] as const;
type Timeframe = (typeof TIMEFRAMES)[number];

type Candle = { open: number; close: number; high: number; low: number };

const TIMEFRAME_CONFIG: Record<
  Timeframe,
  { bars: number; volatility: number; seed: number; trend: number }
> = {
  "1D": { bars: 78, volatility: 28, seed: 42, trend: -0.02 },
  "5D": { bars: 65, volatility: 45, seed: 142, trend: -0.08 },
  "1M": { bars: 52, volatility: 65, seed: 242, trend: 0.04 },
  "3M": { bars: 48, volatility: 90, seed: 342, trend: -0.12 },
  "6M": { bars: 44, volatility: 110, seed: 442, trend: 0.1 },
  "1Y": { bars: 40, volatility: 140, seed: 542, trend: 0.18 },
  "5Y": { bars: 36, volatility: 200, seed: 642, trend: 0.25 },
};

function mulberry32(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function generateSeries(timeframe: Timeframe): Candle[] {
  const cfg = TIMEFRAME_CONFIG[timeframe];
  const rand = mulberry32(cfg.seed);
  const candles: Candle[] = [];
  let price = 24080;

  for (let i = 0; i < cfg.bars; i++) {
    const drift = (rand() - 0.48 + cfg.trend) * cfg.volatility;
    const open = price;
    const close = Math.max(22800, Math.min(25200, open + drift));
    const wick = rand() * cfg.volatility * 0.45;
    const high = Math.max(open, close) + wick;
    const low = Math.min(open, close) - wick;
    candles.push({ open, close, high, low });
    price = close;
  }

  return candles;
}

function formatPrice(n: number) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function seriesStats(candles: Candle[]) {
  const first = candles[0];
  const last = candles[candles.length - 1];
  const high = Math.max(...candles.map((c) => c.high));
  const low = Math.min(...candles.map((c) => c.low));
  const change = last.close - first.open;
  const pct = (change / first.open) * 100;
  return {
    open: first.open,
    high,
    low,
    close: last.close,
    change,
    pct,
  };
}

export function ChartPanel() {
  const { showToast } = useUiShell();
  const [active, setActive] = useState<Tab>("Charts");
  const [timeframe, setTimeframe] = useState<Timeframe>("1D");

  const candles = useMemo(() => generateSeries(timeframe), [timeframe]);
  const stats = useMemo(() => seriesStats(candles), [candles]);

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
              <span style={{ fontSize: 12, color: "var(--fg-2)" }}>{timeframe}</span>
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
            <Quote label="O" value={formatPrice(stats.open)} />
            <Quote label="H" value={formatPrice(stats.high)} />
            <Quote label="L" value={formatPrice(stats.low)} />
            <Quote label="C" value={formatPrice(stats.close)} />
            <span
              style={{
                color: stats.change >= 0 ? "var(--profit)" : "var(--loss)",
                fontWeight: 600,
                marginLeft: 8,
              }}
            >
              {stats.change >= 0 ? "+" : ""}
              {formatPrice(stats.change)} ({stats.pct >= 0 ? "+" : ""}
              {stats.pct.toFixed(2)}%)
            </span>
          </div>
        </>
      )}

      <div
        style={{
          flex: 1,
          position: "relative",
          minHeight: 0,
          minWidth: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {active === "Charts" && <Candles candles={candles} />}
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
        <div className="chart-timeframes">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              type="button"
              className="chart-timeframes__btn"
              onClick={() => setTimeframe(tf)}
              style={{
                background: timeframe === tf ? "var(--accent-soft)" : "transparent",
                border: timeframe === tf ? "1px solid var(--accent)" : "1px solid transparent",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: timeframe === tf ? 600 : 500,
                color: timeframe === tf ? "var(--accent)" : "var(--fg-2)",
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

function Candles({ candles }: { candles: Candle[] }) {
  const w = 800;
  const h = 320;
  const pad = 24;
  const n = candles.length;

  const priceMin = Math.min(...candles.map((c) => c.low));
  const priceMax = Math.max(...candles.map((c) => c.high));
  const span = priceMax - priceMin || 1;

  const toY = (price: number) =>
    pad + ((priceMax - price) / span) * (h - pad * 2);

  const last = candles[n - 1];
  const lastY = toY(last.close);
  const up = last.close >= candles[0].open;
  const markerColor = up ? "var(--profit)" : "var(--loss)";
  const cw = w / n - 2;

  return (
    <div className="chart-canvas">
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid meet"
      className="chart-canvas__svg"
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
        const bullish = c.close >= c.open;
        const color = bullish ? "var(--profit)" : "var(--loss)";
        const x = i * (w / n) + 1;
        const openY = toY(c.open);
        const closeY = toY(c.close);
        const highY = toY(c.high);
        const lowY = toY(c.low);
        const top = Math.min(openY, closeY);
        const bot = Math.max(openY, closeY);
        return (
          <g key={i}>
            <line
              x1={x + cw / 2}
              x2={x + cw / 2}
              y1={highY}
              y2={lowY}
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
        y1={lastY}
        y2={lastY}
        stroke={markerColor}
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.7"
      />
      <rect
        x={w - 72}
        y={lastY - 10}
        width="72"
        height="20"
        fill={markerColor}
      />
      <text
        x={w - 36}
        y={lastY + 4}
        fill="white"
        fontSize="11"
        textAnchor="middle"
        fontFamily="Inter"
      >
        {formatPrice(last.close)}
      </text>
    </svg>
    </div>
  );
}
