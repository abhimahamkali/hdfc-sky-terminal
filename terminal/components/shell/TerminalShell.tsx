"use client";

import { useEffect, useState } from "react";
import { TopBar } from "@/components/shell/TopBar";
import { AddWidgetsModal } from "@/components/shell/AddWidgetsModal";
import { ToastStack } from "@/components/shell/ToastStack";
import { RightFabStack } from "@/components/shell/RightFabStack";
import { PreferencesModal } from "@/components/shell/PreferencesModal";
import { GlobalSearchOverlay } from "@/components/shell/GlobalSearchOverlay";
import {
  MobileWorkspaceTabs,
  type MobilePanel,
} from "@/components/shell/MobileWorkspaceTabs";
import { WatchList } from "@/components/widgets/WatchList";
import { ChartPanel } from "@/components/widgets/ChartPanel";
import { OptionChain } from "@/components/widgets/OptionChain";
import { PositionsTable } from "@/components/widgets/PositionsTable";
import { useMediaQuery } from "@/lib/use-media-query";
import { UiShellProvider, useUiShell } from "@/lib/ui-shell";

function TerminalLayout() {
  const { watchlistCollapsed } = useUiShell();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("chart");

  useEffect(() => {
    if (isMobile && mobilePanel === "watchlist" && watchlistCollapsed) {
      setMobilePanel("chart");
    }
  }, [isMobile, watchlistCollapsed, mobilePanel]);

  const gridClass = [
    "terminal-grid",
    watchlistCollapsed && !isMobile ? "terminal-grid--wl-collapsed" : "",
    isMobile ? "terminal-grid--mobile" : "",
    isMobile ? `terminal-grid--panel-${mobilePanel}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="terminal-root">
      <TopBar showTickers={!isMobile} showCompactTickers={isMobile} />

      {isMobile && (
        <MobileWorkspaceTabs active={mobilePanel} onChange={setMobilePanel} />
      )}

      <div className={gridClass}>
        {(!watchlistCollapsed || isMobile) && (
          <div
            data-panel="watchlist"
            className={`terminal-panel${watchlistCollapsed && !isMobile ? " terminal-panel--hidden" : ""}`}
            style={{ gridArea: "watchlist" }}
          >
            <WatchList />
          </div>
        )}
        <div
          data-panel="chart"
          className="terminal-panel"
          style={{ gridArea: "chart" }}
        >
          <ChartPanel />
        </div>
        <div
          data-panel="optionchain"
          className="terminal-panel"
          style={{ gridArea: "optionchain" }}
        >
          <OptionChain />
        </div>
        <div
          data-panel="positions"
          className="terminal-panel"
          style={{ gridArea: "positions" }}
        >
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
