---
name: cursor-handoff
description: One-stop doc for Cursor to continue building the HDFC SKY terminal. State of the world + what to do next.
trigger: Opening this project in Cursor for the first time, or when picking up work after a break
---

# Cursor Handoff — HDFC SKY Terminal

## Where we are

- ✅ **Repo scaffolded** at `terminal/` — Next.js 16 (Turbopack) + TypeScript + Tailwind v4 + React 19
- ✅ **Design system wired** — HDFC SKY DS lifted from `design-system/hdfc-sky-design-system/`. Tokens, fonts, icons all in `terminal/public/` + `terminal/app/globals.css`
- ✅ **Theme** — light + dark working via `data-theme` attribute. Provider in `lib/theme.tsx`. Toggle wired in TopBar.
- ✅ **Layout 1 built** — TopBar + WatchList + ChartPanel + OptionChain + PositionsTable. Live at `app/page.tsx`.
- ⏳ **Layouts 2–6 NOT built yet** — figma-inventory.md has the spec.

## Repo map

```
terminal/
├── app/
│   ├── globals.css         ← DS tokens (CSS vars) + @font-face + utility classes
│   ├── layout.tsx          ← Root layout + ThemeProvider
│   └── page.tsx            ← Layout 1 (default screen)
├── components/
│   ├── shell/
│   │   └── TopBar.tsx
│   └── widgets/
│       ├── WatchList.tsx
│       ├── ChartPanel.tsx
│       ├── OptionChain.tsx
│       └── PositionsTable.tsx
├── lib/
│   └── theme.tsx           ← ThemeProvider, useTheme()
└── public/
    ├── fonts/              ← Inter 18pt / 24pt / 28pt subset
    └── icons/              ← chart, scales, option-chain, depth, open-interest, straddle, clock, youtube, calculator, filter
```

## How to run

```bash
cd terminal
npm run dev
# http://localhost:3000
```

## House rules (read before you touch anything)

1. **Use CSS variables, never raw colors.** `var(--accent)`, `var(--profit)`, `var(--loss)`, `var(--fg-1)` etc. — see `globals.css` for the full list.
2. **Inline-style is fine for widget innards.** The existing widgets use inline styles to match the Figma JSX exactly. Don't convert them to Tailwind classes unless you have a reason.
3. **All numerics → `className="num"`.** Tabular figures matter in a trading app.
4. **Theme-aware via CSS vars.** Don't branch on `useTheme()` unless you genuinely need theme-conditional logic (e.g. the option-chain cell tints). For most things, CSS vars flip automatically when `data-theme="dark"`.
5. **Don't add Tailwind classes for colors / fonts.** Tailwind is here for layout utilities only.
6. **Voice & content:** Title Case for buttons/tabs, ALL CAPS for status chips, Indian number formatting (`1,44,000.00` not `144,000`). See `design-system/hdfc-sky-design-system/project/README.md` for the full content fundamentals.

## What to build next (priority order)

### 1. Add Widgets Popover (Layouts 2 + 3)

The `+ Widgets` button in TopBar should open a popover anchored to itself. Two views toggleable via `Tickers` switch + grid/list buttons:
- **Grid view (Layout 2)** — 6 cards with image previews: Chart · Option Chain · Scalper · Open Interest · Straddle · Depth
- **List view (Layout 3)** — 3 columns categorized:
  - TRADING: Chart, Option Chain, Scalper, Open Interest, Straddle, Depth
  - TRACKING: Positions, Orders, Watchlist
  - UTILITIES: AI Bot, Pomodoro, Calculator, Youtube
  - Right-side hover preview pane

Create `components/shell/AddWidgetsPopover.tsx`. Use the icons in `public/icons/` for the trading row. Image previews can be placeholder rectangles for now.

### 2. Screens registry

Right now `app/page.tsx` IS Layout 1 hardcoded. To support multiple layouts, refactor to:

```
app/
  page.tsx                  → redirect/default to /screens/default
  screens/
    [id]/page.tsx           → dynamic screen renderer
screens/
  _registry.ts              → ScreenId → { name, layout: [{ i, widgetId, x, y, w, h }] }
  default.ts                → Layout 1 config
  positions-focus.ts        → Layout 4
  analysis.ts               → Layout 5
  scanners.ts               → Layout 6
components/shell/
  GridHost.tsx              → reads layout config, resolves widgetId → component, renders react-grid-layout
widgets/_registry.ts        → WidgetId → component (see widget-spec.md)
```

Add `npm i react-grid-layout @types/react-grid-layout` when you do this.

### 3. Remaining widgets

Build these in order. Each follows the same pattern: read the Figma node via the Figma MCP, port to TSX, register, drop into a screen.

| Widget | Figma node | Priority |
|---|---|---|
| `straddle-chart` | Layout 5 (`46:5014`) — top right | High |
| `open-interest` | Layout 5 (`46:5014`) — bottom right | High |
| `chart-full` (TradingView mode) | Layout 5 — large left | High (or: pass `mode` prop to existing `ChartPanel`) |
| `scanner` | Layout 6 (`46:5187`) — 4 panels share shape | High |
| `heatmap` | Layout 6 — right column | Medium |
| `scalper` | Catalog only — needs Figma frame | Low (designs missing) |
| `depth` | Catalog only — needs Figma frame | Low (designs missing) |
| `ai-bot` / `pomodoro` / `calculator` / `youtube` | Catalog only — need frames | Low (designs missing) |

Use `figma-to-widget.md` step-by-step for each.

## Known limitations / debt

- **TopBar tickers** truncate at narrow viewports — no overflow scroll yet. Acceptable for desktop-first, but at <1100px width SENSEX/Nifty Bank/Fin Nifty/Midcap disappear.
- **Candlestick chart is synthetic SVG**, not real TradingView. When real data arrives, swap `Candles()` in `ChartPanel.tsx` for `lightweight-charts`.
- **No drag/resize on widgets yet** — coming with the screens registry refactor (react-grid-layout).
- **No widget header chrome component** — each widget hand-rolls its header (drag handle + title + expand). When the third widget repeats the pattern, extract to `components/widgets/WidgetFrame.tsx`.
- **Sort/filter on tables** is decorative — header `↑↓` glyphs render but don't sort. Wire up when data goes real.

## Companion skill files

- `widget-spec.md` — contract every widget must follow
- `figma-to-widget.md` — Figma frame → React widget recipe
- `add-widget.md` — daily enhancement loop
- `terminal-bootstrap.md` — original scaffold doc (mostly historical now; bootstrap is done)

## Figma file

`Terminal_testing` (file key `aBbKoxTExS6gt1ZTMYr42B`) — page **Claude test** → section **Testing** → six light-theme + six dark-theme frames. See `figma-inventory.md` for the per-layout breakdown with node IDs.
