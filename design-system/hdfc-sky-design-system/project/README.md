# HDFC SKY — Design System

> Design system for **HDFC SKY**, HDFC Securities' next-generation
> stock trading & investing platform. SKY's flagship product is a
> **web/desktop trading terminal** with modular widgets (charts,
> option chain, scalper, watchlist, positions, scanners) and a
> companion **mobile onboarding/welcome flow**.

This folder is a portable, browseable record of the product's visual
language: tokens, type, color, components, icons, and a high-fidelity
React-style UI kit recreation of the terminal. It's designed to be
dropped into Claude Code (see `SKILL.md`) so an agent can produce
on-brand SKY mocks, prototypes, slides or screens without re-learning
the system every time.

---

## Sources used

| Source | What it gave us |
| --- | --- |
| **Figma file** — `Terminal_testing.fig` (page: *Claude-test* → section *Testing* → frames *Light theme* + *Dark theme*) | Layouts 1–4 of the desktop terminal (chart + watchlist + option chain, scanner grids, add-widget modals), color/type usage counts (`METADATA.md`), icon SVGs |
| **GitHub** — [`abhimahamkali/sky-ds-poc`](https://github.com/abhimahamkali/sky-ds-poc) | Canonical token names (`colors`, `typography`, `spacing`, `radius`), POC components (`Button`, `Input`, `Text`), the Welcome / Mobile-entry screen |
| **GitHub** — [`abhimahamkali/sky-ds-figma-tokenize`](https://github.com/abhimahamkali/sky-ds-figma-tokenize) | Companion tokenizer SKILL — referenced for naming conventions |
| **GitHub** — [`abhimahamkali/terminal_test`](https://github.com/abhimahamkali/terminal_test) | Listed but currently a stub repo (README only) — flagged below |

The reader may not have access to these sources. All
**values, assets and copy** required to reproduce the system are
inlined into this folder (see `colors_and_type.css`, `assets/`,
`ui_kits/`).

---

## At a glance — what is HDFC SKY?

A **stock & derivatives trading platform** from HDFC Securities. From
the Figma + POC code, the system covers:

- **Welcome / sign-in** — mobile-first, single mobile-number entry
  funnels users into the app ("Welcome to HDFC SKY", SEBI-regulated).
- **Desktop trading terminal** — the main artifact. A dense, widget-
  driven workspace: top market ticker (Nifty 50, SENSEX, Nifty Bank,
  Fin Nifty, Nifty Midcap), left WatchList with 5 numbered tabs, a
  Charts/Notes/Margin tabbed center panel (candlestick chart with
  OHLC quote line), a right Option Chain (CALL · STRIKE · PUT with
  PCR), a bottom Positions/Orders/GTT/Alerts/Holiday/Economic
  calendar table, and a top utility bar (Avlb Margin · Add Funds ·
  + Widgets · layout switcher · help).
- **Layouts 2/3/4** — alternate workspace presets: a tickers-only
  Add-Widgets modal, a list-mode Add-Widgets modal with Trading /
  Tracking / Utilities groups (Chart, Option Chain, Scalper, Open
  Interest, Straddle, Depth, Positions, Orders, Watchlist, AI Bot,
  Pomodoro, Calculator, YouTube), and a scanner grid (Movers,
  Trending, Charts Pattern, Live Scanner, Heatmap).
- **Light + dark themes** — both fully designed; the dark theme
  uses a deep navy `#030528` background with the same brand blue.

The voice is **practical, pro-trader, regulation-aware** — no fluff,
short labels, lots of numerics, Indian market vocabulary (Lakhs/L,
NSE, scrip, LTP, GTT, PCR, expiry).

---

## File index (manifest of this folder)

```
HDFC SKY Design System/
├── README.md                ← you are here
├── SKILL.md                 ← drop-in skill for Claude Code
├── colors_and_type.css      ← all tokens (CSS vars) + utility classes
│
├── assets/
│   ├── icons/               ← widget icons from Figma (chart, option-chain,
│   │                          scales, depth, open-interest, straddle,
│   │                          clock, youtube, calculator, filter)
│   └── images/              ← chart preview images, POC SKY logo glyph
│
├── ui_kits/
│   └── sky_terminal/        ← React/JSX recreation of the desktop terminal
│       ├── README.md
│       ├── index.html       ← interactive demo (light/dark toggle, click thru)
│       ├── TopBar.jsx       ← Trade dropdown · market tickers · Add Funds ·
│       │                       +Widgets · layout · help
│       ├── WatchList.jsx    ← 5 numbered watchlist tabs · scrip rows
│       ├── ChartPanel.jsx   ← Charts/Notes/Margin tabs · OHLC quote · timeframes
│       ├── OptionChain.jsx  ← CALL/STRIKE/PUT 3-column with PCR
│       ├── PositionsTable.jsx ← Positions/Orders/GTT/Alerts tabs · table
│       ├── AddWidgetsModal.jsx ← grid + list variants
│       └── tokens.js        ← JS export of the same tokens
│
└── preview/                 ← Design System tab cards (registered via
                              register_assets — see the DS tab in this
                              project to browse them)
```

See `ui_kits/sky_terminal/README.md` for how the kit composes.

---

## CONTENT FUNDAMENTALS

How copy is written in SKY.

### Voice & tone

- **Operator's voice** — calm, terse, no marketing fluff. The
  audience is a self-directed retail or pro trader who already knows
  the vocabulary. The product gets out of the way.
- **Imperative or label-style**, almost never conversational. Buttons
  read `Get Started`, `Add Funds`, `+ Widgets`. Tabs read
  `Charts`, `Notes`, `Margin`. Section titles read `Positions`,
  `Watch List`, `Option Chain`.
- **Regulation-aware, sober.** The footer carries the SEBI registration
  ID verbatim: *"HDFC Securities Ltd. · SEBI Reg. No. INZ000186937"*.
  No exclamation marks, no emoji, no "Let's go!".
- **Numbers do the talking.** Most labels exist to anchor a numeric
  value (e.g. `Avlb Mar: ₹1.2L`, `LTP 245.00`, `−30.55 (-0.12%)`).

### Casing

| Surface | Convention | Example |
| --- | --- | --- |
| Buttons & CTAs | Title Case | `Get Started`, `Add Funds`, `Advanced` |
| Tabs | Title Case, one word where possible | `Charts`, `WatchList`, `Positions` |
| Page / section titles | Title Case | `Option Chain`, `Add Widgets`, `Welcome to HDFC SKY` |
| Group headers in modals | ALL CAPS, micro size, tracked | `TRADING`, `TRACKING`, `UTILITIES` |
| Status / state chips | ALL CAPS, micro size | `EXPIRY TODAY`, `LONG BUILDUP`, `CALL`, `PUT`, `STRIKE` |
| Form labels | Sentence case | `Mobile number` |
| Placeholders | Sentence case, includes hint | `+91 · Enter 10-digit number`, `Search symbol`, `Search widgets` |
| Tickers / scrips | ALL CAPS, brand-as-written | `MAHABANK`, `TATAPOWER`, `RELIANCE`, `VODAFONE IDEA` |
| Indices | As officially written | `Nifty 50`, `SENSEX`, `Nifty Bank`, `Fin Nifty`, `Nifty Midcap` |

### Person & pronouns

The app rarely addresses the user directly. There is **no "I"** and
**very little "you"**. When the user *is* addressed, it's
welcoming and brand-led: *"Welcome to HDFC SKY"*. Otherwise the
interface speaks in **labels and values** — `Mobile number`,
`Avlb Mar:`, `Total P/L`.

### Number & currency formatting

- **Indian numbering system** — lakhs and crores, commas every 2/3:
  `1,44,000.00`, `14,34,535.75`. Never `144,000` or `1,440,000`.
- **Currency** — `₹` symbol, no space before the number for compact
  labels (`₹1.2L`), space optional for body copy.
- **Change indicators** — paired absolute and percent inside
  parens: `-30.55 (-0.12%)`, `+52.25 (+0.22%)`. Arrow is separate
  glyph, color follows sign.
- **Percentages** — one or two decimals (`0.22%`, `1.34%`, `15.54%`).
- **Tabular numerics** — always tabular figures (`font-feature-settings:
  "tnum"`) so columns line up. The `.num` class in
  `colors_and_type.css` does this.

### Emoji

**Never used.** Not in microcopy, not in widget tiles, not in
empty states. Iconography is via SVG only (see ICONOGRAPHY below).

### Vibe — short version

Bloomberg-terminal-meets-Robinhood for the Indian market. Quiet,
dense, data-first, with one bold blue brand accent and a strict
red/green P&L grammar. Trustworthy bank-grade chrome, but with
modern (post-2022) flat surfaces and crisp 8 px-radius cards
instead of '90s sunken bevels.

---

## VISUAL FOUNDATIONS

The full token table lives in `colors_and_type.css`. The notes
below describe how those tokens are *used*.

### Themes
Two themes ship: **Light** (default) and **Dark**. Both share
the same brand blue, semantic green/red and type scale. Toggle by
setting `data-theme="dark"` (or `.theme-dark`) on the root.

| Token | Light | Dark |
| --- | --- | --- |
| `--bg-app` | `#F6F6F6` | `#030528` (deep navy) |
| `--bg-card` | `#FFFFFF` | `#0A0C3A` |
| `--fg-1` | `#001B33` | `#FFFFFF` |
| `--border-1` | `#DDE0F1` | `#27284B` |
| `--accent` | `#2850E7` | `#617BED` |

### Color usage rules

- **One accent.** SKY blue `#2850E7` is the *only* primary brand
  color. It marks the active tab underline, active filter chip
  border, primary buttons, focused inputs, links and the brand logo.
- **Green = up, red = down. No exceptions.** Profit-green
  `#039855`, loss-red `#F04438`. Used on numbers, ticker arrows,
  candle bodies, heatmap cells and tag fills. Never as a decorative
  color.
- **Neutrals do the heavy lifting.** Most of the screen is
  near-white, with a `#DDE0F1` 1 px border around every card.
  Text is the brand near-black `#001B33`, secondary text the cool
  grey `#68697E`.
- **Tag fills are washed-out tints** — `#FEF3F2` red for
  `EXPIRY TODAY`, light blue/cyan/orange fills for heatmap cells.
  Never saturated.
- **Cyan `#06C7FC`** is a fill-only utility color used inside
  scrip-row highlight bars and small data viz; not for type.

### Type
- **One family: Inter**, self-hosted across three optical-size
  subfamilies — `Inter 18pt` for small UI/numeric text (≤16 px),
  `Inter 24pt` (`Inter Display`) for body sizes (16–24 px), and
  `Inter 28pt` (`Inter Display Lg`) for display headlines (24 px+).
  Inter tabular figures (`tnum`) are used for every price, P&L,
  axis label and ticker.
- Sizes skew **small and dense** — 10/11/12/14 px dominate the
  terminal. 18/24 reserved for headers and the Welcome screen.
- Letter-spacing is slightly tight on headings (`-0.2px` to
  `-0.4px`); micro-labels track *positive* (`0.2px`) and uppercase.
- Numerics always use tabular figures so columns align.

### Spacing & layout
- 4 px grid: `4 · 8 · 12 · 16 · 24 · 32 · 48` (from the POC tokens).
- The terminal lays out as **fixed cards** with a consistent
  16 px outer page padding and 8 px gaps between cards.
- **Card internals**: 12 px vertical / 16 px horizontal padding,
  16–24 px gaps between row groups.
- Most cards are **fixed-height with internal scroll** — pageless
  workspace, no global scrollbar.

### Backgrounds & motifs
- **No gradient backgrounds.** Surfaces are flat solid color
  (white / `#F6F6F6` / `#030528`).
- **No hand-drawn illustrations, no patterns.** The only repeating
  motif is the candlestick chart itself.
- **Photography is absent** from the trading product. The POC
  Welcome screen uses an isometric "stacked card" line illustration
  (`assets/images/sky-poc-logo.png`) as the brand mark in lieu of a
  full logo lockup.
- **Empty data cells** are simply blank, never decorated.

### Animation & motion
- **Minimal and functional.** Border-color and opacity transitions
  on focus/hover (`120ms ease` per the POC). Tab underlines
  appear instantly.
- **Numbers tick in place** — price updates flash the cell
  background green/red briefly. (Implied by the product category,
  approximated in the UI kit demo.)
- **No bouncy easing, no parallax, no entrance animations.** A
  trader's eyes are on the chart; the UI must not steal attention.

### Hover & press states
- **Hover** on buttons & icons: opacity drop (`0.85`) — never a
  size change. Cards highlight by deepening the border from
  `#DDE0F1` → `#617BED`.
- **Press**: brand button darkens from `#2850E7` to ~`#1F3FB8`.
  Tabs flash the underline color briefly.
- **Disabled**: brand button drops to the `--sky-blue-200`-derived
  `#B3D1FF` (from the POC) with `cursor: not-allowed`.
- **Focus rings**: 1 px brand-blue border replacing the default,
  no offset glow. Inputs use `border-color: #2850E7` on focus.

### Borders, dividers, shadows
- **1 px borders are everywhere.** Cards, inputs, search,
  watchlist rows, modal frames. Always `--border-1 (#DDE0F1)`
  on light, `--border-1 (#27284B)` on dark.
- **Dividers between rows** are subtler `#E3E4E6` (light) or omitted
  entirely (the white-on-white card with a single bottom border).
- **Shadows are restrained.** Cards are flat. The Add Widgets modal
  uses `--shadow-md`; popovers use `--shadow-pop` (a slight blue
  tint). No drop shadow on the page or on the watchlist rows.

### Transparency & blur
- Used sparingly. The Add Funds search uses
  `rgba(255,255,255,0.8)` as a subtle press-state. No backdrop
  blur, no glassmorphism.

### Corner radii
- `2 px` for section frames in Figma (essentially square).
- `4 px` for tags/chips.
- `6 px` for search inputs and small controls.
- `8 px` for cards and primary buttons (most common).
- `12 px` for large surfaces (mobile sheets, the welcome card).
- Full pill for status toggles and CTA pills.

### Card anatomy
A SKY card is: **white background · 1 px `#DDE0F1` border ·
8 px radius · no shadow.** A small tab/title sits at the top-left
in the brand blue with a 2 px underline. An expand glyph
sits at the top-right. The body is internally scrollable with no
fade gradient — it ends at the border. This pattern repeats
fractally: every widget is a card.

### Layout rules / fixed elements
- **Top utility bar is fixed** — Trade dropdown, three index
  tickers, Avlb Margin, +Widgets, layout switcher, help icon.
- **All widget cards are draggable** (chrome on the watchlist
  tab is a 6-dot drag handle).
- **No global footer** in the terminal. Footer copy (SEBI ID etc.)
  appears only in the Welcome / sign-in flows.

---

## ICONOGRAPHY

### Style
- **Outline icons, 1.5 px stroke, rounded joins**, 24×24 frame.
  The Figma uses the "vuesax/linear" icon family heavily for arrows
  (`vuesax/linear/arrow-up` shows up dozens of times on tickers).
- Widget tiles in the Add Widgets modal use the same outline style
  with the icon at 24×24 inside a 40×40 hit area.
- **No filled icons in primary UI.** Color is applied via CSS
  `mask-image` (or `currentColor` for inline SVGs) so the same
  source renders in brand blue by default and any theme color when
  needed. **Brand blue `#2850E7` is the default tint** for widget
  glyphs in the Add Widgets modal and trade-utility toolbars.

### Where icons come from
- **Bundled — copied from Figma** into `assets/icons/`. These are
  the canonical widget-row glyphs:
  - `chart.svg` (Trading → Chart)
  - `scales.svg` (Trading → Scalper)
  - `option-chain.svg` (Trading → Option Chain)
  - `depth.svg` (Trading → Depth)
  - `open-interest.svg` (Trading → Open Interest)
  - `straddle.svg` (Trading → Straddle)
  - `clock.svg` (Utilities → Pomodoro)
  - `youtube.svg` (Utilities → YouTube)
  - `calculator.svg` (Utilities → Calculator)
  - `filter.svg` (sort & filter chip)
- **CDN substitute for missing glyphs.** Where Figma references a
  named icon family but the SVG is not exported (e.g.
  `vuesax/linear/arrow-up`, `more_2_line`, info-circle, expand
  arrows), the UI kit uses **Lucide** (`lucide.dev`) at the same
  weight (`stroke-width: 1.5`) — `arrow-up`, `arrow-down`,
  `more-horizontal`, `info`, `maximize-2`, `chevron-down`, `plus`,
  `search`, `code`, `panel-right`, `circle-help`. *Flagged*: if
  pixel-perfect parity with the Figma family is required, swap
  these for the matching `vuesax/linear` export.

### Emoji & unicode
- **Emoji is never used.** Not in tabs, not in tiles, not in
  empty states.
- **Unicode** is used only for arrows in compact ticker rows
  (`↑ ↓`) and currency (`₹`). Even those have an SVG alternative.

### Logos
- The full HDFC SKY wordmark is **not** in the Figma file or in the
  POC repo. The POC welcome screen renders a placeholder *"SKY
  LOGO"* label and an isometric stacked-cards line illustration as
  the brand mark glyph. That glyph is preserved here at
  `assets/images/sky-poc-logo.png`. *Flagged*: please drop the real
  HDFC SKY wordmark + favicon into `assets/images/` to replace it.

---

## ⚠️ Caveats & substitutions to confirm

| Thing | What happened | What we'd like |
| --- | --- | --- |
| **Inter font files** | ✅ Resolved — self-hosted from `fonts/` (18pt, 24pt, 28pt optical sizes). | — |
| **One typeface** | Confirmed with the user: **Inter** is the sole brand face. Earlier Satoshi/Manrope references replaced. | — |
| **HDFC SKY wordmark / logo** | Not present in any source. Placeholder POC glyph used. | Drop the real logo + favicon into `assets/images/`. |
| **`abhimahamkali/terminal_test` repo** | Stub repo with README only — no code or tokens. | If there's a real terminal repo, share the URL. |
| **vuesax icon family** | Some arrows reference it by name but no SVG export. Substituted Lucide at same weight. | Provide the vuesax export if pixel-perfect parity is needed. |
| **Live numeric updates** | Trading apps usually flash green/red on tick. We've approximated with a static demo. | Specify real-time behaviour spec if needed. |

---

## Index — where to look for what

- **Tokens?** → `colors_and_type.css`
- **Components?** → `ui_kits/sky_terminal/*.jsx`
- **Live demo?** → `ui_kits/sky_terminal/index.html`
- **Icons?** → `assets/icons/`
- **Reusable agent skill?** → `SKILL.md`
- **Design System tab cards?** → `preview/` (auto-registered)
