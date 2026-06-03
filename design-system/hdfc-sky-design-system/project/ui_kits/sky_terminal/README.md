# SKY Terminal — UI Kit

High-fidelity React/JSX recreation of the HDFC SKY desktop trading
terminal. Built from `Terminal_testing.fig` (page *Claude-test* →
*Light theme* / *Dark theme*) and the `sky-ds-poc` codebase.

## What's in the box

| File | Component |
| --- | --- |
| `tokens.js` | Window-scoped `SKY` object: colors, spacing, radius, font + card/tab helpers |
| `TopBar.jsx` | Trade dropdown · 5 market tickers (Nifty 50, SENSEX, Nifty Bank, Fin Nifty, Nifty Midcap) · Avlb Margin · + AddFunds · + Widgets · layout-switcher (also toggles theme in this demo) · panel · help |
| `WatchList.jsx` | Drag-handle · WatchList tab · numbered preset tabs 1–5 + plus + code · search · scrip rows with name/exch/vol/LTP/P&L and up/down arrow |
| `ChartPanel.jsx` | Tabs Charts/Notes/Margin · NIFTY 50 ticker headline · OHLC quote · Advanced button · synthetic candlestick chart · timeframe row (1D, 5D, 1M, 3M, 6M, 1Y, 5Y) |
| `OptionChain.jsx` | Price + expiry dropdowns · filter + info chips · CALL / STRIKE / PUT 3-column ladder · PCR per strike · LONG BUILDUP callout |
| `PositionsTable.jsx` | Tabs Positions / Orders / GTT / Alerts / Holiday Calender / Economic Calender · sortable columns · green/red P&L cells |
| `AddWidgetsModal.jsx` | Two variants: grid (chart preview tiles) and list (icon + label, grouped TRADING / TRACKING / UTILITIES) · Tickers toggle · widget search · view-mode segmented control |
| `index.html` | Live click-through demo — light/dark theme switcher (top-bar layout button), interactive watchlist tabs, chart/positions tab switching, +Widgets modal with view toggle |

## Open the demo

Open `index.html` in this folder. The top-right "+ Widgets (demo)"
button toggles the modal — switch between the grid and list variants
with the segmented control inside the modal header. The layout-switch
icon in the top utility bar toggles **light ↔ dark** (theme persists
via `localStorage`).

## Notes on fidelity

- **Pixel-accurate where the Figma is the source of truth** —
  card padding, border colors, tab indicator, ticker chip styling,
  CALL/STRIKE/PUT 3-column option chain, scrip row layout, modal
  spacing.
- **Visually-faithful approximations** for parts the Figma sketches
  but doesn't fully resolve — the candlestick chart is a procedurally
  generated SVG (deterministic seed), the Avlb Margin / Add Funds
  totals are sample numbers from the Figma.
- **Cosmetic shortcuts** — no real data feed, no real chart engine,
  no real order routing. This is a UI kit.

## Reusing pieces

All components register themselves onto `window` (Babel-in-browser
shares state via the global object) so you can drop any subset into
another page that loads the same dependencies. To use the kit in a
plain React build, copy the `.jsx` files and replace the
`window.SKY` references with an ES import of `tokens.js`.
