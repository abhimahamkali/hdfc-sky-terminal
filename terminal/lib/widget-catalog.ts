import type { WidgetId } from "@/lib/ui-shell";

export type CatalogWidgetId =
  | WidgetId
  | "positions"
  | "orders"
  | "watchlist"
  | "ai-bot"
  | "pomodoro"
  | "calculator"
  | "youtube";

export type WidgetCategory = "trading" | "tracking" | "utilities";

export type PreviewKind =
  | "chart"
  | "chain"
  | "scalper"
  | "oi"
  | "straddle"
  | "depth"
  | "positions"
  | "orders"
  | "watchlist"
  | "ai-bot"
  | "pomodoro"
  | "calculator"
  | "youtube";

export type CatalogItem = {
  id: CatalogWidgetId;
  label: string;
  category: WidgetCategory;
  preview: PreviewKind;
  addable: boolean;
};

export const WIDGET_CATALOG: CatalogItem[] = [
  { id: "chart", label: "Chart", category: "trading", preview: "chart", addable: true },
  { id: "option-chain", label: "Option Chain", category: "trading", preview: "chain", addable: true },
  { id: "scalper", label: "Scalper", category: "trading", preview: "scalper", addable: true },
  { id: "open-interest", label: "Open Interest", category: "trading", preview: "oi", addable: true },
  { id: "straddle", label: "Straddle", category: "trading", preview: "straddle", addable: true },
  { id: "depth", label: "Depth", category: "trading", preview: "depth", addable: true },
  { id: "positions", label: "Positions", category: "tracking", preview: "positions", addable: false },
  { id: "orders", label: "Orders", category: "tracking", preview: "orders", addable: false },
  { id: "watchlist", label: "Watchlist", category: "tracking", preview: "watchlist", addable: false },
  { id: "ai-bot", label: "AI Bot", category: "utilities", preview: "ai-bot", addable: false },
  { id: "pomodoro", label: "Pomodoro", category: "utilities", preview: "pomodoro", addable: false },
  { id: "calculator", label: "Calculator", category: "utilities", preview: "calculator", addable: false },
  { id: "youtube", label: "Youtube", category: "utilities", preview: "youtube", addable: false },
];

export const GRID_WIDGET_IDS: CatalogWidgetId[] = [
  "chart",
  "option-chain",
  "scalper",
  "open-interest",
  "straddle",
  "depth",
];

export const CATEGORY_LABELS: Record<WidgetCategory, string> = {
  trading: "TRADING",
  tracking: "TRACKING",
  utilities: "UTILITIES",
};

export function isWidgetId(id: CatalogWidgetId): id is WidgetId {
  return [
    "chart",
    "option-chain",
    "scalper",
    "open-interest",
    "straddle",
    "depth",
  ].includes(id);
}
