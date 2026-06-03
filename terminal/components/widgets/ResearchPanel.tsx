"use client";

import { useEffect, useState } from "react";

const RATIO_TABS = ["Valuation Ratio", "Growth", "Financial", "Dividend"] as const;
type RatioTab = (typeof RATIO_TABS)[number];

const RATIO_DATA: Record<
  RatioTab,
  { label: string; value: string }[]
> = {
  "Valuation Ratio": [
    { label: "PE Ratio", value: "-6.39" },
    { label: "Price to Book Value", value: "-4.30" },
    { label: "PEG Ratio", value: "-" },
    { label: "ROE (Latest)", value: "Negative BV" },
  ],
  Growth: [
    { label: "Revenue Growth", value: "12.4%" },
    { label: "EPS Growth", value: "-8.2%" },
    { label: "EBITDA Growth", value: "5.1%" },
    { label: "Net Profit Growth", value: "-3.6%" },
  ],
  Financial: [
    { label: "Debt to Equity", value: "0.42" },
    { label: "Current Ratio", value: "1.18" },
    { label: "Interest Coverage", value: "4.2" },
    { label: "Quick Ratio", value: "0.96" },
  ],
  Dividend: [
    { label: "Dividend Yield", value: "1.24%" },
    { label: "Payout Ratio", value: "32%" },
    { label: "DPS", value: "12.50" },
    { label: "Ex-Dividend Date", value: "15 Jun" },
  ],
};

type FocusSection = "analyst" | "fundamental" | "both";

export function ResearchPanel({ focusSection = "both" }: { focusSection?: FocusSection }) {
  const [ratioTab, setRatioTab] = useState<RatioTab>("Valuation Ratio");

  useEffect(() => {
    if (focusSection === "fundamental") setRatioTab("Valuation Ratio");
  }, [focusSection]);

  const metrics = RATIO_DATA[ratioTab];

  return (
    <div
      className="research-panel"
      data-focus={focusSection}
      style={{
        flex: 1,
        minHeight: 0,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: 0,
        alignItems: "stretch",
      }}
    >
      <section
        className="research-section research-section--analyst"
        style={{ paddingRight: 20, minWidth: 0 }}
      >
        <h3 style={sectionTitle}>Analyst Ratings</h3>
        <p style={sectionSubtitle}>
          *Based on the review of 3 analyst(s) in the last 1 year(s)
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            marginTop: 16,
            marginBottom: 20,
          }}
        >
          <div>
            <div className="num" style={{ fontSize: 22, fontWeight: 600, color: "var(--fg-1)" }}>
              8.67
            </div>
            <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 4 }}>Target Price</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="num num--loss" style={{ fontSize: 22, fontWeight: 600 }}>
              -38.86%
            </div>
            <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 4 }}>Expected Profit</div>
          </div>
        </div>

        <RatingBar label="BUY" pct={0} color="#93B4F5" trackColor="var(--accent-soft)" />
        <RatingBar label="HOLD" pct={66} color="#F79009" trackColor="#FFFAEB" />
        <RatingBar label="SELL" pct={33} color="#F04438" trackColor="#FEF3F2" />

        <p
          style={{
            marginTop: 16,
            marginBottom: 0,
            textAlign: "right",
            fontSize: 11,
            color: "var(--fg-3)",
          }}
        >
          powered by <span style={{ fontWeight: 600, color: "var(--fg-2)" }}>Trendlyn</span>
        </p>
      </section>

      <div
        aria-hidden
        style={{
          width: 1,
          alignSelf: "stretch",
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--border-1) 0, var(--border-1) 4px, transparent 4px, transparent 8px)",
        }}
      />

      <section
        className="research-section research-section--fundamental"
        style={{ paddingLeft: 20, minWidth: 0 }}
      >
        <h3 style={sectionTitle}>Fundamental Ratios</h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 12,
            marginBottom: 12,
          }}
        >
          {RATIO_TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setRatioTab(t)}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                border: `1px solid ${ratioTab === t ? "var(--accent)" : "var(--border-1)"}`,
                background: ratioTab === t ? "var(--accent-soft)" : "transparent",
                color: ratioTab === t ? "var(--accent)" : "var(--fg-2)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div
          style={{
            border: "1px solid var(--border-1)",
            borderRadius: 8,
            padding: 16,
            background: "var(--bg-select)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px 24px",
          }}
        >
          {metrics.map((m) => (
            <div key={m.label}>
              <div style={{ fontSize: 12, color: "var(--fg-2)", marginBottom: 4 }}>{m.label}</div>
              <div className="num" style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-1)" }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function RatingBar({
  label,
  pct,
  color,
  trackColor,
}: {
  label: string;
  pct: number;
  color: string;
  trackColor: string;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--fg-1)",
          marginBottom: 6,
        }}
      >
        <span>{label}</span>
        <span className="num">{pct}%</span>
      </div>
      <div
        style={{
          height: 8,
          borderRadius: 4,
          background: trackColor,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 4,
            background: color,
            transition: "width 300ms ease",
          }}
        />
      </div>
    </div>
  );
}

const sectionTitle: React.CSSProperties = {
  margin: 0,
  fontSize: 15,
  fontWeight: 600,
  color: "var(--fg-1)",
};

const sectionSubtitle: React.CSSProperties = {
  margin: "4px 0 0",
  fontSize: 11,
  color: "var(--fg-3)",
  fontStyle: "italic",
};
