"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type WidgetId =
  | "chart"
  | "option-chain"
  | "scalper"
  | "open-interest"
  | "straddle"
  | "depth";

export type Toast = { id: number; message: string };

type UiShellContextValue = {
  widgetsOpen: boolean;
  openWidgets: () => void;
  closeWidgets: () => void;
  toggleWidgets: () => void;

  tradeOpen: boolean;
  setTradeOpen: (open: boolean) => void;
  tradeMode: string;
  setTradeMode: (mode: string) => void;

  tickersVisible: boolean;
  setTickersVisible: (v: boolean) => void;

  widgetView: "grid" | "list";
  setWidgetView: (v: "grid" | "list") => void;
  widgetSearch: string;
  setWidgetSearch: (q: string) => void;

  watchlistCollapsed: boolean;
  toggleWatchlist: () => void;

  toasts: Toast[];
  showToast: (message: string) => void;
  dismissToast: (id: number) => void;

  addWidget: (id: WidgetId) => void;
  addedWidgets: WidgetId[];
};

const UiShellCtx = createContext<UiShellContextValue | null>(null);

let toastSeq = 0;

export function UiShellProvider({ children }: { children: React.ReactNode }) {
  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [tradeMode, setTradeMode] = useState("Trade");
  const [tickersVisible, setTickersVisible] = useState(true);
  const [widgetView, setWidgetView] = useState<"grid" | "list">("grid");
  const [widgetSearch, setWidgetSearch] = useState("");
  const [watchlistCollapsed, setWatchlistCollapsed] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [addedWidgets, setAddedWidgets] = useState<WidgetId[]>([]);

  const showToast = useCallback((message: string) => {
    const id = ++toastSeq;
    setToasts((t) => [...t, { id, message }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const openWidgets = useCallback(() => setWidgetsOpen(true), []);
  const closeWidgets = useCallback(() => setWidgetsOpen(false), []);
  const toggleWidgets = useCallback(() => setWidgetsOpen((o) => !o), []);

  const toggleWatchlist = useCallback(
    () => setWatchlistCollapsed((c) => !c),
    [],
  );

  const addWidget = useCallback(
    (id: WidgetId) => {
      setAddedWidgets((prev) => (prev.includes(id) ? prev : [...prev, id]));
      const label = WIDGET_LABELS[id];
      showToast(`${label} widget added to layout`);
      setWidgetsOpen(false);
    },
    [showToast],
  );

  useEffect(() => {
    if (!widgetsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWidgets();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [widgetsOpen, closeWidgets]);

  const value = useMemo(
    () => ({
      widgetsOpen,
      openWidgets,
      closeWidgets,
      toggleWidgets,
      tradeOpen,
      setTradeOpen,
      tradeMode,
      setTradeMode,
      tickersVisible,
      setTickersVisible,
      widgetView,
      setWidgetView,
      widgetSearch,
      setWidgetSearch,
      watchlistCollapsed,
      toggleWatchlist,
      toasts,
      showToast,
      dismissToast,
      addWidget,
      addedWidgets,
    }),
    [
      widgetsOpen,
      openWidgets,
      closeWidgets,
      toggleWidgets,
      tradeOpen,
      tradeMode,
      tickersVisible,
      widgetView,
      widgetSearch,
      watchlistCollapsed,
      toggleWatchlist,
      toasts,
      showToast,
      dismissToast,
      addWidget,
      addedWidgets,
    ],
  );

  return <UiShellCtx.Provider value={value}>{children}</UiShellCtx.Provider>;
}

export function useUiShell() {
  const ctx = useContext(UiShellCtx);
  if (!ctx) throw new Error("useUiShell must be used within UiShellProvider");
  return ctx;
}

export const WIDGET_LABELS: Record<WidgetId, string> = {
  chart: "Chart",
  "option-chain": "Option Chain",
  scalper: "Scalper",
  "open-interest": "Open Interest",
  straddle: "Straddle",
  depth: "Depth",
};
