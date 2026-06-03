"use client";

import { TopBar } from "@/components/shell/TopBar";
import { AddWidgetsModal } from "@/components/shell/AddWidgetsModal";
import { ToastStack } from "@/components/shell/ToastStack";
import { RightFabStack } from "@/components/shell/RightFabStack";
import { PreferencesModal } from "@/components/shell/PreferencesModal";
import { GlobalSearchOverlay } from "@/components/shell/GlobalSearchOverlay";
import { WatchList } from "@/components/widgets/WatchList";
import { ChartPanel } from "@/components/widgets/ChartPanel";
import { OptionChain } from "@/components/widgets/OptionChain";
import { PositionsTable } from "@/components/widgets/PositionsTable";
import { UiShellProvider, useUiShell } from "@/lib/ui-shell";

function TerminalLayout() {
  const { watchlistCollapsed, tickersVisible } = useUiShell();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: "var(--bg-app)",
      }}
    >
      <TopBar showTickers={tickersVisible} />

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: watchlistCollapsed
            ? "1fr minmax(280px, 340px)"
            : "minmax(280px, 320px) 1fr minmax(280px, 340px)",
          gridTemplateRows: "1fr 360px",
          gridTemplateAreas: watchlistCollapsed
            ? `
              "chart       optionchain"
              "positions   optionchain"
            `
            : `
              "watchlist chart       optionchain"
              "positions positions   optionchain"
            `,
          gap: 8,
          minHeight: 0,
        }}
      >
        {!watchlistCollapsed && (
          <div style={{ gridArea: "watchlist", minHeight: 0 }}>
            <WatchList />
          </div>
        )}
        <div style={{ gridArea: "chart", minHeight: 0 }}>
          <ChartPanel />
        </div>
        <div style={{ gridArea: "optionchain", minHeight: 0 }}>
          <OptionChain />
        </div>
        <div style={{ gridArea: "positions", minHeight: 0 }}>
          <PositionsTable />
        </div>
      </div>

      <GlobalSearchOverlay />
      <AddWidgetsModal />
      <PreferencesModal />
      <ToastStack />
    </div>
  );
}

export function TerminalShell() {
  return (
    <UiShellProvider>
      <TerminalLayout />
      <RightFabStack />
    </UiShellProvider>
  );
}
