"use client";

import { useEffect, useMemo, useState } from "react";
import { useUiShell } from "@/lib/ui-shell";
import {
  WIDGET_CATALOG,
  GRID_WIDGET_IDS,
  CATEGORY_LABELS,
  isWidgetId,
  type CatalogItem,
  type CatalogWidgetId,
  type WidgetCategory,
} from "@/lib/widget-catalog";
import { WidgetIcon } from "@/components/shell/widget-icons";
import { WidgetPreviewThumb } from "@/components/shell/WidgetPreviewThumb";
import "@/app/add-widgets.css";

export function AddWidgetsModal() {
  const {
    widgetsOpen,
    closeWidgets,
    tickersVisible,
    setTickersVisible,
    widgetView,
    setWidgetView,
    widgetSearch,
    setWidgetSearch,
    addWidget,
    showToast,
  } = useUiShell();

  const [selectedId, setSelectedId] = useState<CatalogWidgetId>("scalper");

  useEffect(() => {
    if (widgetsOpen) setSelectedId("scalper");
  }, [widgetsOpen]);

  const gridItems = useMemo(() => {
    const q = widgetSearch.trim().toLowerCase();
    return GRID_WIDGET_IDS.map((id) => WIDGET_CATALOG.find((w) => w.id === id)!)
      .filter(Boolean)
      .filter((w) => !q || w.label.toLowerCase().includes(q));
  }, [widgetSearch]);

  const listItems = useMemo(() => {
    const q = widgetSearch.trim().toLowerCase();
    return WIDGET_CATALOG.filter(
      (w) => !q || w.label.toLowerCase().includes(q),
    );
  }, [widgetSearch]);

  const selectedItem = useMemo(
    () => WIDGET_CATALOG.find((w) => w.id === selectedId) ?? WIDGET_CATALOG[2],
    [selectedId],
  );

  const handleSelect = (item: CatalogItem) => {
    setSelectedId(item.id);
    if (widgetView === "grid") {
      handleAdd(item);
    }
  };

  const handleAdd = (item: CatalogItem) => {
    if (item.addable && isWidgetId(item.id)) {
      addWidget(item.id);
      return;
    }
    showToast(`${item.label} — available in a future release`);
  };

  const handleListDoubleAction = (item: CatalogItem) => {
    handleAdd(item);
  };

  if (!widgetsOpen) return null;

  const byCategory = (cat: WidgetCategory) =>
    listItems.filter((w) => w.category === cat);

  return (
    <div
      className="add-widgets-backdrop"
      role="presentation"
      onClick={closeWidgets}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-widgets-title"
        className={`add-widgets-dialog ${widgetView === "list" ? "add-widgets-dialog--list" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="add-widgets-header">
          <h2 id="add-widgets-title" className="add-widgets-title">
            Add Widgets
          </h2>

          <div className="add-widgets-tickers">
            Tickers
            <button
              type="button"
              className="add-widgets-tickers-switch"
              role="switch"
              aria-checked={tickersVisible}
              data-on={tickersVisible}
              onClick={() => setTickersVisible(!tickersVisible)}
            >
              <span className="add-widgets-tickers-knob" />
            </button>
          </div>

          <div className="add-widgets-search-wrap">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search widgets"
              value={widgetSearch}
              onChange={(e) => setWidgetSearch(e.target.value)}
              aria-label="Search widgets"
            />
          </div>

          <button
            type="button"
            className="add-widgets-view-toggle"
            data-active={widgetView === "grid"}
            aria-label="Grid view"
            aria-pressed={widgetView === "grid"}
            onClick={() => setWidgetView("grid")}
          >
            <GridIcon />
          </button>
          <button
            type="button"
            className="add-widgets-view-toggle"
            data-active={widgetView === "list"}
            aria-label="List view"
            aria-pressed={widgetView === "list"}
            onClick={() => setWidgetView("list")}
          >
            <ListIcon />
          </button>
        </header>

        <div className="add-widgets-body">
          {widgetView === "grid" ? (
            gridItems.length === 0 ? (
              <p className="add-widgets-empty">
                No widgets match &ldquo;{widgetSearch}&rdquo;
              </p>
            ) : (
              <div className="add-widgets-grid">
                {gridItems.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    className="add-widgets-grid-card"
                    onClick={() => handleSelect(w)}
                  >
                    <WidgetPreviewThumb kind={w.preview} />
                    <span className="add-widgets-grid-label">
                      {w.label.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            )
          ) : listItems.length === 0 ? (
            <p className="add-widgets-empty">
              No widgets match &ldquo;{widgetSearch}&rdquo;
            </p>
          ) : (
            <div className="add-widgets-list-layout">
              <div className="add-widgets-columns">
                {(["trading", "tracking", "utilities"] as WidgetCategory[]).map(
                  (cat) => (
                    <div key={cat}>
                      <p className="add-widgets-category-title">
                        {CATEGORY_LABELS[cat]}
                      </p>
                      <ul className="add-widgets-list-items">
                        {byCategory(cat).map((w) => (
                          <li key={w.id}>
                            <button
                              type="button"
                              className="add-widgets-list-item"
                              data-selected={selectedId === w.id}
                              onClick={() => setSelectedId(w.id)}
                              onDoubleClick={() => handleListDoubleAction(w)}
                            >
                              <span className="add-widgets-list-icon">
                                <WidgetIcon kind={w.preview} size={20} />
                              </span>
                              {w.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
                )}
              </div>

              <aside className="add-widgets-preview-panel" aria-label="Widget preview">
                <WidgetPreviewThumb kind={selectedItem.preview} />
                <div className="add-widgets-preview-footer">
                  <span className="add-widgets-list-icon">
                    <WidgetIcon kind={selectedItem.preview} size={18} />
                  </span>
                  <span className="add-widgets-preview-name">
                    {selectedItem.label.toUpperCase()}
                  </span>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-3)" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="6" r="1.5" />
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="5" cy="18" r="1.5" />
      <rect x="9" y="5" width="12" height="2" rx="1" />
      <rect x="9" y="11" width="12" height="2" rx="1" />
      <rect x="9" y="17" width="12" height="2" rx="1" />
    </svg>
  );
}
