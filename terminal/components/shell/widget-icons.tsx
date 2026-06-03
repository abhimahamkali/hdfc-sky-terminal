import type { PreviewKind } from "@/lib/widget-catalog";

export function WidgetIcon({ kind, size = 20 }: { kind: PreviewKind; size?: number }) {
  const s = size;
  switch (kind) {
    case "chart":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 6v14 M12 4v16 M16 8v12" strokeLinecap="round" />
        </svg>
      );
    case "chain":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" />
        </svg>
      );
    case "scalper":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v3M5 7h14M7 7l-2 14h14l-2-14" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 11h6M10 15h4" strokeLinecap="round" />
        </svg>
      );
    case "oi":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 18V8M10 18V4M14 18v-6M18 18V10" strokeLinecap="round" />
        </svg>
      );
    case "straddle":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 16c4-8 12-8 16 0" strokeLinecap="round" />
          <path d="M4 12c4-4 12-4 16 0" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    case "depth":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 18V6M9 18v-4M13 18V8M17 18v-8M21 18V4" strokeLinecap="round" />
        </svg>
      );
    case "positions":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 6h15l-1.5 9h-12z" strokeLinejoin="round" />
          <path d="M6 6L5 3H2" strokeLinecap="round" />
        </svg>
      );
    case "orders":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
        </svg>
      );
    case "watchlist":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 4v17l6-4 6 4V4a2 2 0 00-2-2H8a2 2 0 00-2 2z" strokeLinejoin="round" />
        </svg>
      );
    case "ai-bot":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <defs>
            <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06C7FC" />
              <stop offset="50%" stopColor="#617BED" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="9" fill="url(#ai-grad)" />
        </svg>
      );
    case "pomodoro":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9V13l3 2" strokeLinecap="round" />
          <path d="M9 3h6" strokeLinecap="round" />
        </svg>
      );
    case "calculator":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15h0" strokeLinecap="round" />
        </svg>
      );
    case "youtube":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="6" width="18" height="12" rx="3" />
          <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}
