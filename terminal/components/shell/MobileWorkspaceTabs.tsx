"use client";

export type MobilePanel = "chart" | "watchlist" | "optionchain" | "positions";

const TABS: { id: MobilePanel; label: string }[] = [
  { id: "chart", label: "Chart" },
  { id: "watchlist", label: "List" },
  { id: "optionchain", label: "Chain" },
  { id: "positions", label: "Positions" },
];

export function MobileWorkspaceTabs({
  active,
  onChange,
}: {
  active: MobilePanel;
  onChange: (panel: MobilePanel) => void;
}) {
  return (
    <nav className="terminal-mobile-tabs" aria-label="Workspace panels">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          className="terminal-mobile-tabs__btn"
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
