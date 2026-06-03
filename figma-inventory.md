# Figma Inventory — Terminal_testing

Source: `aBbKoxTExS6gt1ZTMYr42B` · Page "Claude test" · Section "Testing"

6 screen layouts (1440×800), each shipped in Light + Dark theme (12 frames total).

---

## Layout-by-layout breakdown

### Layout 1 — Default trading view  (`46:679`)

```
┌─────────────────── TopBar ───────────────────┐
│ [WatchList]  │      [Charts]      │ [Option] │
│              │                    │ [Chain]  │
│              │                    │          │
├──────────────┴────────────────────┤          │
│         [Positions] (bottom tabs) │          │
└───────────────────────────────────┴──────────┘
```
Widgets present: TopBar, WatchList, Charts, OptionChain, Positions

### Layout 2 — Add Widgets popover, GRID view  (`46:1433`)

Same as Layout 1 with the **Add Widgets** popover anchored to the `+ Widgets` button. Grid view shows 6 widget cards with screenshot previews: **Chart · Option Chain · Scalper · Open Interest · Straddle · Depth**. Has Tickers toggle + Search input + grid/list view toggle.

### Layout 3 — Add Widgets popover, LIST view  (`46:2232`)

Same popover, list view, grouped into 3 categories with icons:

| TRADING | TRACKING | UTILITIES |
|---|---|---|
| Chart | Positions | AI Bot |
| Option Chain | Orders | Pomodoro |
| Scalper | Watchlist | Calculator |
| Open Interest | | Youtube |
| Straddle | | |
| Depth | | |

Right side shows a hover-preview pane (currently showing SCALPER thumbnail).

### Layout 4 — Positions-focused view  (`46:3304`)

```
┌────────────── TopBar ──────────────┐
│ [WatchList] │  [Positions table] │ [Charts] │
│             │  (tall, full data) │ (narrow) │
└─────────────┴────────────────────┴──────────┘
```
Same widgets as Layout 1 — just re-arranged. Charts widget here shows a different symbol (ARROWGREEN-NSE) with volume histogram below price.

### Layout 5 — Analysis view  (`46:5014`)

```
┌──────────────── TopBar ────────────────┐
│                  │ [Straddle Chart]    │
│   [Charts]       │                     │
│   (large, TV-    ├─────────────────────┤
│    style, BUY/   │ [Open Interest]     │
│    SELL chips)   │ (Call/Put bars)     │
└──────────────────┴─────────────────────┘
```
New widgets: **Straddle Chart**, **Open Interest** (with detailed bar-chart treatment)
The Charts widget here is the **full TradingView treatment** — BUY/SELL price overlays, 5y/1y/3m/1m/5d/1d footer, %/log/auto toggles, TV logo.

### Layout 6 — Scanner / Heatmap dashboard  (`46:5187`)

```
┌──────────── TopBar ────────────┐
│ [Movers] │ [Trending] │ [Movers] │ [Heatmap]  │
│          │            │          │            │
├──────────┼────────────┤          │ (full      │
│ [Charts  │ [Live      │          │  height)   │
│ Pattern] │ Scanner]   │          │            │
└──────────┴────────────┴──────────┴────────────┘
```
4 "scanner" widgets (Movers / Trending / Charts Pattern / Live Scanner) — **all share the same column shape** (Scrip Name · Qty · Avg). Strong signal that these are **variants of one generic "Scanner List" widget**, not 4 distinct components.

Heatmap widget on right: 3-col grid of colored cells (symbol · price · ±%) with green/red intensity per change magnitude.

---

## Widget Inventory (proposed)

Combining what's **rendered in layouts** + what's listed in the **Add Widgets catalog**.

### Trading
| Widget | Seen in | Notes |
|---|---|---|
| `chart` | L1, L2, L3, L4, L5 | Two density modes: compact (mini, in 4-col layouts) and full-tradingview (L5 — BUY/SELL price chips, footer toolbar, TV logo). Treat as ONE widget with a `mode` config |
| `option-chain` | L1, L2, L3 | LTP·CALL · STRIKE · PUT·LTP layout; PCR per row; "LONG BUILDUP" indicator row |
| `scalper` | catalog only | Preview shows red/green dual-pane chart (likely DOM/scalper ladder) — need a separate Figma frame to build accurately |
| `open-interest` | L5 | Call/Put bar chart by strike, OI Increase/Decrease checkboxes, hover tooltip |
| `straddle-chart` | L5 | ATM STRADDLE dropdown, line chart, Straddle/Spot/Synthetic Fut/VWAP overlay toggles |
| `depth` | catalog only | Market depth (5-level bid/ask ladder) — need detail frame |

### Tracking
| Widget | Seen in | Notes |
|---|---|---|
| `positions` | L1 (bottom tabs), L4 (main panel) | Sortable columns: Scrip · Qty · Avg · LTP · Current · Invested · Total P/L · P&L%. Has tab strip: Positions / Orders / GTT / Alerts / Holiday Calendar / Economic Calendar — **NB: these tabs live inside the Positions widget, suggesting it's actually a "Tracker" multi-tab widget rather than 6 separate widgets** |
| `orders` | catalog (also as a tab inside Positions) | May or may not be separate from Positions |
| `watchlist` | L1, L2, L3, L4 | Tabs (Explore · 1-5 · +), search, filter, ⋮ menu, rows with symbol · exchange/volume · LTP · change · change% · trend arrow |

### Utilities
| Widget | Seen in | Notes |
|---|---|---|
| `ai-bot` | catalog only | Need Figma frame |
| `pomodoro` | catalog only | Need Figma frame |
| `calculator` | catalog only | Need Figma frame |
| `youtube` | catalog only | Need Figma frame |

### Discovery / Scanners (Layout 6)
| Widget | Notes |
|---|---|
| `scanner` (generic) | One widget; presets = Movers / Trending / Charts Pattern / Live Scanner. Variant chosen via `config.preset` |
| `heatmap` | 3-col responsive grid; cells = symbol + price + %; green/red intensity background |

### Shell (not widgets, framework chrome)
- `TopBar` — Trade dropdown · indices (Nifty 50, SENSEX, Nifty Bank, …) · "EXPIRY TODAY" badge · Available Margin + Add Funds · `+ Widgets` button · Layout toggle · Sidebar toggle · Help (?)
- `AddWidgetsPopover` — Grid/List views, categories, search, Tickers toggle, hover-preview pane

---

## Open questions for you to confirm

1. **Scanner consolidation** — Confirm Movers/Trending/Charts Pattern/Live Scanner collapse into one `scanner` widget with presets? (Saves 3 widgets of implementation work)
2. **Positions/Orders/GTT/Alerts tabs** — Is this one multi-tab "Tracker" widget, or 6 separate widgets that happen to share a tab strip when stacked?
3. **Chart modes** — Confirm the mini Chart (L1, L4) and the full TradingView Chart (L5) are the same widget with different sizes/modes, vs. two separate widgets?
4. **Catalog-only widgets** (Scalper, Depth, AI Bot, Pomodoro, Calculator, Youtube) — Do you have detailed Figma frames for these somewhere else, or do they need to be designed before we build?
5. **Top bar indices** — Fixed (Nifty 50, SENSEX, Nifty Bank) or user-configurable?

---

## Distinct icons & affordances spotted (for design-system audit)

- Drag handle (⋮⋮) on widget headers
- "+" affordance next to widget title (for adding nested items, e.g. multiple watchlists or chart symbols)
- Expand-to-fullscreen arrow (top-right of each widget)
- Settings sliders icon (per widget)
- "EXPIRY TODAY" red pill badge
- BUY (green) / SELL (red) chips
- Sort indicator (↑↓) on table headers
- Search input with magnifier
- Info (ℹ) icon
- View mode toggles (grid / list)
- Tickers toggle (custom switch)

---

## Next step

Once you confirm or adjust the inventory + the 5 open questions, I'll:
- Add the resolved widget list into `widget-spec.md`
- Add a `screens/_registry.ts` shape into `terminal-bootstrap.md` capturing the 6 layouts
- Hand off to Cursor
