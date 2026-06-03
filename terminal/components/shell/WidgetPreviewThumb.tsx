import type { PreviewKind } from "@/lib/widget-catalog";

/** Thumbnail previews matching Figma widget cards */
export function WidgetPreviewThumb({
  kind,
  className,
}: {
  kind: PreviewKind;
  className?: string;
}) {
  return (
    <div className={`widget-preview-thumb ${className ?? ""}`} data-kind={kind}>
      <PreviewSvg kind={kind} />
    </div>
  );
}

function PreviewSvg({ kind }: { kind: PreviewKind }) {
  const w = "100%";
  const h = "100%";

  if (kind === "chart") {
    return (
      <svg viewBox="0 0 160 100" width={w} height={h} preserveAspectRatio="xMidYMid slice">
        <rect width="160" height="100" fill="#FAFAFA" />
        {[22, 38, 30, 45, 35, 50, 42, 28, 40, 32].map((y, i) => (
          <g key={i}>
            <line x1={12 + i * 14} x2={12 + i * 14} y1={y - 8} y2={y + 12} stroke={i % 2 ? "#039855" : "#F04438"} strokeWidth="1" />
            <rect x={8 + i * 14} y={Math.min(y, y + 6)} width={8} height={Math.abs(12)} fill={i % 2 ? "#039855" : "#F04438"} />
          </g>
        ))}
      </svg>
    );
  }

  if (kind === "chain") {
    return (
      <svg viewBox="0 0 160 100" width={w} height={h}>
        <rect width="160" height="100" fill="#FAFAFA" />
        {[0, 1, 2, 3, 4].map((r) => (
          <g key={r}>
            <rect x={4} y={10 + r * 17} width={50} height={14} fill={r % 2 ? "#FFFAEB" : "#fff"} stroke="#E0E6EB" strokeWidth="0.5" />
            <rect x={56} y={10 + r * 17} width={48} height={14} fill="#F3F4FC" stroke="#E0E6EB" strokeWidth="0.5" />
            <rect x={106} y={10 + r * 17} width={50} height={14} fill={r % 2 ? "#ECFDF3" : "#fff"} stroke="#E0E6EB" strokeWidth="0.5" />
          </g>
        ))}
      </svg>
    );
  }

  if (kind === "scalper") {
    return (
      <svg viewBox="0 0 160 100" width={w} height={h}>
        <rect width="160" height="100" fill="#FAFAFA" />
        <rect x={4} y={8} width="74" height="84" fill="#fff" stroke="#E0E6EB" rx="2" />
        <rect x={82} y={8} width="74" height="84" fill="#fff" stroke="#E0E6EB" rx="2" />
        <path d="M10 70 L30 40 L50 55 L70 30" fill="none" stroke="#039855" strokeWidth="1.5" />
        <path d="M88 65 L108 45 L128 60 L148 35" fill="none" stroke="#F04438" strokeWidth="1.5" />
        <rect x={12} y={12} width={28} height={10} fill="#F04438" rx="1" />
        <rect x={44} y={12} width={28} height={10} fill="#039855" rx="1" />
        <rect x={90} y={12} width={28} height={10} fill="#F04438" rx="1" />
        <rect x={122} y={12} width={28} height={10} fill="#039855" rx="1" />
      </svg>
    );
  }

  if (kind === "oi") {
    return (
      <svg viewBox="0 0 160 100" width={w} height={h}>
        <rect width="160" height="100" fill="#FAFAFA" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <g key={i}>
            <rect x={14 + i * 20} y={25} width={8} height={55} fill="#F04438" opacity="0.85" />
            <rect x={22 + i * 20} y={35} width={8} height={45} fill="#039855" opacity="0.85" />
          </g>
        ))}
      </svg>
    );
  }

  if (kind === "straddle") {
    return (
      <svg viewBox="0 0 160 100" width={w} height={h}>
        <rect width="160" height="100" fill="#FAFAFA" />
        <path d="M8 70 Q80 15 152 65" fill="none" stroke="#2850E7" strokeWidth="2" />
        <path d="M8 55 Q80 85 152 40" fill="none" stroke="#039855" strokeWidth="1.5" opacity="0.7" />
      </svg>
    );
  }

  if (kind === "depth") {
    return (
      <svg viewBox="0 0 160 100" width={w} height={h}>
        <rect width="160" height="100" fill="#FAFAFA" />
        <rect x={8} y={12} width={68} height="76" fill="#FFFAEB" stroke="#E0E6EB" />
        <rect x={84} y={12} width={68} height="76" fill="#ECFDF3" stroke="#E0E6EB" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={12} y={18 + i * 14} width={40} height={8} fill="#F04438" opacity="0.3" />
            <rect x={88} y={18 + i * 14} width={40} height={8} fill="#039855" opacity="0.3" />
          </g>
        ))}
      </svg>
    );
  }

  if (kind === "positions" || kind === "orders") {
    return (
      <svg viewBox="0 0 160 100" width={w} height={h}>
        <rect width="160" height="100" fill="#FAFAFA" />
        <rect x={8} y={16} width="144" height="12" fill="#F3F4FC" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={8} y={32 + i * 16} width={144} height={12} fill="#fff" stroke="#E0E6EB" strokeWidth="0.5" />
        ))}
      </svg>
    );
  }

  if (kind === "watchlist") {
    return (
      <svg viewBox="0 0 160 100" width={w} height={h}>
        <rect width="160" height="100" fill="#FAFAFA" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <text x={12} y={22 + i * 16} fontSize="8" fill="#001B33">SYMBOL</text>
            <text x={120} y={22 + i * 16} fontSize="8" fill="#039855" textAnchor="end">+0.0%</text>
          </g>
        ))}
      </svg>
    );
  }

  if (kind === "ai-bot") {
    return (
      <svg viewBox="0 0 160 100" width={w} height={h}>
        <rect width="160" height="100" fill="#FAFAFA" />
        <circle cx="80" cy="50" r="28" fill="url(#ai-thumb)" />
        <defs>
          <radialGradient id="ai-thumb">
            <stop offset="0%" stopColor="#06C7FC" />
            <stop offset="100%" stopColor="#617BED" />
          </radialGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 100" width={w} height={h}>
      <rect width="160" height="100" fill="#FAFAFA" />
      <rect x={40} y={30} width={80} height={40} fill="#F3F4FC" rx="4" stroke="#DDE0F1" />
    </svg>
  );
}
