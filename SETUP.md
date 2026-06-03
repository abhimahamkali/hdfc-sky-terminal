# HDFC SKY Terminal — Setup & Replication Guide

> A complete onboarding doc for engineers picking up this project. Follow top-to-bottom and you'll end up with the same working terminal at `http://localhost:3000`.

---

## 0. What this project is

A widget-driven web trading terminal for **HDFC SKY** (HDFC Securities' next-gen trading platform). The UI replicates a Figma file 1:1 in production-ready React.

- **Stack** — Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
- **Design system** — HDFC SKY DS (lifted from Claude Design)
- **Theming** — Light + Dark, swappable via `data-theme` attribute
- **Workflow** — Figma → Claude Code (planning + scaffolding) → Cursor (iteration)

End state after this doc: Layout 1 (the default trading view) is live; Layouts 2–6 are spec'd and ready for Cursor to build.

---

## 1. Prerequisites

### Accounts

| Account | Why |
|---|---|
| **Anthropic** (Claude.ai) | For Claude Design (the design system source) and Claude Code |
| **Figma** | Designs live here. Need view access to the Terminal_testing file |
| **Cursor** (optional but recommended) | For day-to-day widget iteration |

### Local software

| Tool | Version | Why |
|---|---|---|
| Node.js | ≥ 20 (we use 24) | Next.js + React 19 needs modern Node |
| npm | ships with Node | Package install |
| Git | any recent | Version control |
| Figma Desktop | latest | Required for the Figma plugin used during design extraction |
| Claude Code CLI | latest | Drives the build |
| Cursor | optional | Hand-off target |

### Figma plugin

Install **figma-claude-connect** (the local Figma MCP plugin) into Figma Desktop. The plugin's manifest path on this machine is:

```
C:\Users\Admin\figma-claude-MCP\figma-claude-connect\manifest.json
```

In Figma Desktop → *Plugins → Development → Import plugin from manifest…* → point at that manifest. The plugin exposes the open file to Claude Code via WebSocket on port `9223`/`9224`.

---

## 2. The Claude Design handoff (one-time)

The design system is authored in **Claude Design** (claude.ai/design). The original Claude project is called **HDFC SKY Design System** and contains tokens, type, components, and a JSX UI kit.

### To pull it down:

1. Open the Claude Design project in your browser
2. Click **Share** (top right) → **Handoff to Claude Code…**
3. Claude gives you a URL and a command. The URL looks like:
   ```
   https://api.anthropic.com/v1/design/h/<hash>
   ```
4. Download as a `tar.gz`. From a terminal:
   ```bash
   curl -sL -o ds-handoff.tar.gz "https://api.anthropic.com/v1/design/h/<hash>"
   ```
5. Extract:
   ```bash
   mkdir -p design-system
   tar -xzf ds-handoff.tar.gz -C design-system
   ```
   You'll get a `design-system/hdfc-sky-design-system/` folder.

### What's inside `hdfc-sky-design-system/project/`

- `README.md` — full brand + content + visual guidelines (read this!)
- `SKILL.md` — Claude Code skill manifest
- `colors_and_type.css` — every token as a CSS variable + utility classes (`.h1`, `.body`, `.num`, `.tag tag--profit`, …)
- `fonts/` — self-hosted Inter (18pt / 24pt / 28pt optical-size subfamilies)
- `assets/icons/` — outline widget glyphs (chart, scales, option-chain, depth, open-interest, straddle, clock, youtube, calculator, filter)
- `assets/images/` — placeholder brand mark + chart previews
- `ui_kits/sky_terminal/*.jsx` — reference React/JSX components (cosmetic, lifted directly into the production app)

> **The DS folder is the source of truth.** When tokens change, re-pull the handoff and merge.

---

## 3. The Figma file

- **File** — `Terminal_testing` · file key `aBbKoxTExS6gt1ZTMYr42B`
- **URL** — https://www.figma.com/design/aBbKoxTExS6gt1ZTMYr42B/Terminal_testing
- **Structure** — Page **Claude test** → section **Testing** → 6 layout frames × 2 themes (Light, Dark) = 12 frames total

### The 6 layouts (1440×800 each)

| # | Purpose | Key widgets visible |
|---|---|---|
| 1 | Default trading view | TopBar · WatchList · Charts · OptionChain · Positions |
| 2 | + Widgets popover (grid view) | Catalog: Chart, OptionChain, Scalper, OpenInterest, Straddle, Depth |
| 3 | + Widgets popover (list view) | Categorised: Trading / Tracking / Utilities |
| 4 | Positions-focused | Same widgets, rearranged; Charts narrow |
| 5 | Analysis view | Large TradingView Chart · Straddle Chart · Open Interest |
| 6 | Scanner / Heatmap dashboard | 4 scanner panels + Heatmap |

The full per-frame widget breakdown lives in [figma-inventory.md](./figma-inventory.md).

---

## 4. Project folder layout (top-level)

After the steps below, you'll have:

```
Terminal-Project/
├── SETUP.md                          ← you are here
├── figma-inventory.md                ← Figma → widget breakdown
├── design-system/
│   └── hdfc-sky-design-system/       ← Claude Design handoff (untouched)
├── ds-handoff.tar.gz                 ← original archive (kept for re-extract)
├── .skills/                          ← Claude Code skill files (read by Cursor too)
│   ├── README.md
│   ├── terminal-bootstrap.md
│   ├── widget-spec.md
│   ├── figma-to-widget.md
│   ├── add-widget.md
│   └── cursor-handoff.md
└── terminal/                         ← the actual Next.js app
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── shell/
    │   │   └── TopBar.tsx
    │   └── widgets/
    │       ├── WatchList.tsx
    │       ├── ChartPanel.tsx
    │       ├── OptionChain.tsx
    │       └── PositionsTable.tsx
    ├── lib/
    │   └── theme.tsx
    ├── public/
    │   ├── fonts/       (10 Inter TTFs)
    │   └── icons/       (10 SVGs)
    └── package.json
```

---

## 5. Bootstrap from scratch — step-by-step

Run these in order. Total time: **~15 min** if npm install behaves.

### 5.1. Create the project root

```bash
mkdir -p ~/Desktop/Terminal-Project
cd ~/Desktop/Terminal-Project
```

### 5.2. Pull the DS handoff (see §2)

```bash
curl -sL -o ds-handoff.tar.gz "https://api.anthropic.com/v1/design/h/<hash>"
mkdir -p design-system
tar -xzf ds-handoff.tar.gz -C design-system
```

> Read `design-system/hdfc-sky-design-system/README.md` once before continuing. It explains how copy is written, color rules ("green = up, red = down — no exceptions"), card anatomy, etc.

### 5.3. Scaffold the Next.js app

```bash
npx create-next-app@latest terminal \
  --ts --tailwind --app --no-src-dir --eslint \
  --import-alias "@/*" --use-npm --yes
```

Wait for it to finish. **Important:** do NOT run `npm install` again in parallel — multiple installs can race and leave a half-corrupted `node_modules\next` directory (we hit this; the fix was `rm -rf node_modules package-lock.json && npm install`).

### 5.4. Copy DS fonts + icons into the Next.js public folder

```bash
SRC=design-system/hdfc-sky-design-system/project
DST=terminal/public

mkdir -p "$DST/fonts" "$DST/icons"

# Inter font subset we actually use
for f in \
  Inter_18pt-Regular Inter_18pt-Medium Inter_18pt-SemiBold Inter_18pt-Bold \
  Inter_24pt-Regular Inter_24pt-Medium Inter_24pt-SemiBold Inter_24pt-Bold \
  Inter_28pt-SemiBold Inter_28pt-Bold
do
  cp "$SRC/fonts/${f}.ttf" "$DST/fonts/"
done

cp "$SRC"/assets/icons/*.svg "$DST/icons/"
```

(On Windows Git Bash, use `/c/Users/...` paths instead of `C:\Users\...`.)

### 5.5. Create supporting folders

```bash
mkdir -p terminal/components/shell terminal/components/widgets terminal/lib
```

### 5.6. Replace generated files with our versions

Six files need to be written. Their full contents are listed in §6 below. Briefly:

- `terminal/app/globals.css` — DS tokens (CSS vars) + @font-face + utility classes (`.num`, `.tag`, `.sky-card`, …)
- `terminal/lib/theme.tsx` — `ThemeProvider` + `useTheme()` (writes `data-theme` to `<html>`, persists in `localStorage`)
- `terminal/app/layout.tsx` — wraps children in `ThemeProvider`
- `terminal/components/shell/TopBar.tsx` — Trade dropdown · 5 tickers · margin · +Widgets · layout/sidebar/help
- `terminal/components/widgets/WatchList.tsx`
- `terminal/components/widgets/ChartPanel.tsx`
- `terminal/components/widgets/OptionChain.tsx`
- `terminal/components/widgets/PositionsTable.tsx`
- `terminal/app/page.tsx` — composes Layout 1 in a CSS grid

### 5.7. Run it

```bash
cd terminal
npm run dev
```

Open **http://localhost:3000**.

Expected: TopBar + 3-column grid (WatchList | Charts | OptionChain) with PositionsTable spanning the bottom. Brand-blue active tabs, profit-green / loss-red numbers, no shadows on cards, 8 px radius.

Toggle dark mode via the layout icon in the top right (between `+ Widgets` and the sidebar icon).

---

## 6. House rules (read before editing anything)

These rules come from `design-system/hdfc-sky-design-system/project/README.md` and `SKILL.md`. Violating them breaks the brand.

### Colors

- **One accent.** SKY blue `#2850E7` (`var(--accent)`) is the *only* primary brand color. No teals, oranges, purples.
- **Green = up, red = down. No exceptions.** Use `var(--profit)` and `var(--loss)`. Never decoratively.
- **Neutrals do the heavy lifting.** Cards are `var(--bg-card)` with a 1 px `var(--border-1)` border, 8 px radius, no shadow.
- **Tag fills are washed-out tints** — `var(--sky-loss-bg)` for `EXPIRY TODAY`, etc. Never saturated.

### Type

- **One family: Inter** — self-hosted. Optical sizes: 18pt (small UI / numerics), 24pt (Inter Display, body 16–24 px), 28pt (Inter Display Lg, headers).
- Sizes are dense — **10/11/12/14 px dominate** the terminal. 18/24 reserved for headers.
- **All numerics get `className="num"`** — enables tabular figures so columns align.

### Numbers & currency

- **Indian numbering system** — `1,44,000.00`, `14,34,535.75`. Never `144,000` or `1,440,000`.
- `₹` symbol, no space for compact labels (`₹1.2L`).
- Change indicators: paired absolute + percent in parens — `-30.55 (-0.12%)`, `+52.25 (+0.22%)`.

### Voice

- **Operator's voice** — calm, terse, no marketing fluff. Imperative or label-style.
- **No emoji. Ever.** Not in tabs, not in tiles, not in empty states.
- **No exclamation marks. No "Let's go!".**
- Casing: Title Case for buttons & tabs. **ALL CAPS micro** for status chips (`EXPIRY TODAY`, `LONG BUILDUP`, `STRIKE`).
- Footer carries the SEBI ID verbatim: *"HDFC Securities Ltd. · SEBI Reg. No. INZ000186937"* (in Welcome / sign-in flows only).

### Component patterns

- **Cards are flat.** 1 px border, 8 px radius, no shadow. Shadows reserved for modals (`var(--shadow-md)`) and popovers (`var(--shadow-pop)`).
- **All widget cards are draggable** — chrome on the watchlist tab is a 6-dot drag handle.
- **Icons** — outline, 1.5 px stroke, 24×24 frame, rounded joins. No filled icons in primary UI. Default tint is brand blue.

### Coding conventions

- **Use CSS variables, never raw hex.** `var(--accent)`, `var(--profit)`, `var(--fg-1)`, etc. See `globals.css`.
- **Inline-style is fine** for widget innards. The widgets use inline styles to match the Figma JSX exactly. Don't convert to Tailwind unless there's a reason.
- **Tailwind is for layout utilities only** — `flex`, `grid`, `gap`, spacing. No Tailwind for colors / fonts.
- **Theme-aware via CSS vars.** Don't branch on `useTheme()` unless you genuinely need theme-conditional logic (the option-chain cell tints are the rare exception).

---

## 7. The skill files (`.skills/`)

These are markdown files designed to be read by Claude Code or Cursor. They keep the rules consistent across sessions.

| File | When to read |
|---|---|
| `cursor-handoff.md` | First thing — state of the world + what to build next |
| `widget-spec.md` | Before building or editing any widget |
| `figma-to-widget.md` | When porting a new Figma frame to a React widget |
| `add-widget.md` | Daily loop — "add widget X to screen Y" / "make widget X do Z" |
| `terminal-bootstrap.md` | Historical — the original scaffold doc, mostly superseded by this SETUP.md |

### Wiring into Cursor

In Cursor:

1. Open the project root (`Terminal-Project/`)
2. Settings → Rules → point at `.skills/`, or paste each skill as a project rule
3. Tell Cursor: *"Before any widget work, read `.skills/widget-spec.md`."*

### Wiring into Claude Code

Claude Code auto-discovers `.skills/*.md` files. Start a session in the project root and reference them in prompts.

---

## 8. Day-to-day workflow

### Add a new widget from a Figma frame

```
User: "Build the Open Interest widget from Figma node 46:5014"
Claude/Cursor: reads .skills/figma-to-widget.md, fetches the node via Figma MCP,
               produces components/widgets/OpenInterest.tsx + meta + registry entry
```

### Add an existing widget to a screen

```
User: "Add the Open Interest widget to the analysis screen"
Claude/Cursor: reads .skills/add-widget.md, edits screens/_registry.ts
```

### Modify a widget

```
User: "Make the watchlist sortable by change%"
Claude/Cursor: reads .skills/add-widget.md (modify flavor),
               edits WatchList.tsx + maybe its types.ts
```

### Re-sync the design system

When tokens change in Claude Design:

1. Re-export the handoff (§2)
2. Diff `design-system/hdfc-sky-design-system/project/colors_and_type.css` against `terminal/app/globals.css`
3. Update the tokens in `globals.css` to match

---

## 9. Gotchas we hit (so you don't have to)

### 9.1. Don't run two npm installs in parallel

`create-next-app` already installs deps. Running `npm install` again right after, before the first finishes, can leave a corrupted `node_modules/next/dist/esm/server/dev` directory.

**Fix if you hit it:**

```bash
cd terminal
rm -rf node_modules package-lock.json
npm install
```

### 9.2. Port 3000 already in use

Next.js dev server holds port 3000. If a stale process is hanging on:

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <pid> /F

# macOS/Linux
lsof -i :3000
kill -9 <pid>
```

### 9.3. Figma REST API token expired

If you try to use Figma's REST-based MCP tools and get `403 Token expired`, switch to the **plugin-based** tools (`figma_execute`, `figma_capture_screenshot`). They go through the desktop plugin and don't need the REST token.

### 9.4. Screenshot dimensions don't match preview viewport

When using `preview_screenshot`, the rendered image is a fixed-resolution JPEG that may *visually* compress the page — empty grey on the right doesn't mean the page is narrow. Verify actual width via `preview_eval` checking `document.body.offsetWidth`.

### 9.5. TopBar tickers truncate at narrow viewports

Known. Designed for ≥1280 px desktop. Below ~1100 px the SENSEX/Nifty Bank/Fin Nifty/Midcap tickers vanish. Future work: horizontal scroll or progressive hide.

### 9.6. Candlestick chart is fake

`Candles()` in `ChartPanel.tsx` is seeded-random SVG, not real data. When real data arrives, swap for `lightweight-charts` (the TradingView library).

### 9.7. `Date.now()` / `Math.random()` rules

The seeded `rand()` in `Candles()` is deterministic on purpose — re-renders show identical candles so React doesn't flicker. Keep it that way.

---

## 10. What's NOT done yet

| Item | Where it'd go | Effort |
|---|---|---|
| Layouts 2 + 3 — Add Widgets popover | `components/shell/AddWidgetsPopover.tsx` | M |
| Layout 4 — Positions-focused | Screen layout config | S |
| Layout 5 — Analysis view (Straddle Chart + Open Interest + full TradingView Chart) | 3 new widgets + screen layout | L |
| Layout 6 — Scanner / Heatmap dashboard | 2 new widgets (`scanner` w/ presets + `heatmap`) + screen layout | L |
| Screens registry (`screens/_registry.ts` + dynamic routes) | Refactor `app/page.tsx` to be data-driven | M |
| `react-grid-layout` for true drag/resize | Pull in lib, wrap widgets in `GridHost` | M |
| Real candlestick via `lightweight-charts` | Swap synthetic SVG in `ChartPanel` | M |
| Catalog-only widgets (Scalper, Depth, AI Bot, Pomodoro, Calculator, YouTube) | Need Figma frames first | XL |
| Sort/filter on tables | Add state to `PositionsTable`, plumb through column headers | S |

Priority order is documented in `.skills/cursor-handoff.md`.

---

## 11. Running the project (cheat sheet)

```bash
cd Terminal-Project/terminal

# install (first time, or after re-clone)
npm install

# dev server (default: localhost:3000)
npm run dev

# production build
npm run build
npm run start

# lint
npm run lint
```

---

## 12. Useful references

- HDFC SKY DS handoff README — `design-system/hdfc-sky-design-system/README.md`
- HDFC SKY DS Skill — `design-system/hdfc-sky-design-system/project/SKILL.md`
- Figma inventory (per-layout widget map) — `figma-inventory.md`
- Cursor handoff — `.skills/cursor-handoff.md`
- Original POC repo — https://github.com/abhimahamkali/sky-ds-poc
- Tokenizer skill — https://github.com/abhimahamkali/sky-ds-figma-tokenize
- Figma file — https://www.figma.com/design/aBbKoxTExS6gt1ZTMYr42B/Terminal_testing

---

## 13. Quick context for a colleague reading this for the first time

> *"What am I looking at?"*

A trading-terminal UI for HDFC SKY, built as a Next.js app. The visual language comes from a Claude Design–authored design system called **HDFC SKY DS**. Designs live in Figma (`Terminal_testing`). One layout is fully built (Layout 1, the default trading view). Five more are spec'd and ready to build using the skill files in `.skills/`.

> *"What do I do first?"*

1. Read this whole doc
2. Read `design-system/hdfc-sky-design-system/README.md` for brand fundamentals
3. Read `.skills/cursor-handoff.md` for what to build next
4. Read `.skills/widget-spec.md` before touching any widget
5. Run `npm run dev` in `terminal/`, open http://localhost:3000, toggle the theme button to confirm both themes work
6. Pick a widget from the "not done yet" list above and start

> *"What's the workflow?"*

Figma frame → `figma-to-widget.md` recipe → new TSX in `components/widgets/` → drop into a screen via `add-widget.md` recipe → verify visually against Figma screenshot. Repeat.

Done.
