"use client";

/**
 * IndexQuoteCard — a small, self-contained demo element.
 * Built purely from HDFC SKY design-system tokens + utility classes
 * (no raw hex), so it imports into Figma on-brand via html.to.design.
 */
export function IndexQuoteCard() {
  return (
    <div
      className="sky-card"
      style={{
        width: 240,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* Header row: index name + exchange tag */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="label" style={{ fontWeight: 600, color: "var(--fg-1)" }}>
          NIFTY 50
        </span>
        <span className="tag tag--info">NSE</span>
      </div>

      {/* Last price */}
      <span className="num" style={{ fontSize: 24, fontWeight: 700, lineHeight: "28px" }}>
        23,065.95
      </span>

      {/* Change (absolute + percent), profit green */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span className="num num--profit" style={{ fontSize: 13, fontWeight: 600 }}>
          +124.30
        </span>
        <span className="num num--profit" style={{ fontSize: 13, fontWeight: 600 }}>
          (+0.54%)
        </span>
      </div>
    </div>
  );
}
