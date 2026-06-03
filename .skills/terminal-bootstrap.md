---
name: terminal-bootstrap
description: One-time setup for the trading terminal repo. Scaffolds Next.js 16, wires Tailwind v4, shadcn/ui, design-system tokens, grid layout shell, theme toggle, and the widget folder structure. Run ONLY ONCE at the start of the project.
trigger: User says "bootstrap the terminal project" / "set up the repo" / "init terminal" / on first run only
---

# Terminal Bootstrap

You are setting up a fresh Next.js project that will hold a TradingView-style trading terminal. Designs come from Figma (file: Terminal, https://www.figma.com/design/LUD8N7kjVWSTr23HsUa5KH/Terminal). The project must replicate Figma screens 1:1.

## Pre-flight

1. Confirm working directory is empty / fresh repo
2. Confirm the design-system repo URL is known (ask user if missing). Note its package name + install method (npm/pnpm/git submodule/local link)
3. Confirm Node >= 20

## Steps

### 1. Scaffold

```bash
pnpm create next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint
```

Choose Turbopack: yes. App Router: yes.

### 2. Core deps

```bash
pnpm add zustand react-grid-layout @tanstack/react-table lightweight-charts clsx tailwind-merge lucide-react
pnpm add -D @types/react-grid-layout
```

### 3. shadcn

```bash
pnpm dlx shadcn@latest init -d
pnpm dlx shadcn@latest add button input select dropdown-menu tabs dialog sheet tooltip table separator badge scroll-area
```

### 4. Design system

Install per the design-system repo's README. If it's a published package: `pnpm add <pkg>`. If it's a GitHub repo: add as dependency `"design-system": "github:org/repo"` or git submodule under `vendor/design-system`. Re-export tokens in `lib/tokens.ts`.

### 5. Folder structure (create empty placeholder files where needed)

```
app/
  (terminal)/
    layout.tsx          # Top bar + grid host
    page.tsx            # Default screen
    [screen]/page.tsx   # Named screens (claude-test, scalper-in, …)
  globals.css           # Tailwind + tokens
components/
  ui/                   # shadcn
  shell/
    TopBar.tsx
    GridHost.tsx        # react-grid-layout wrapper
    ThemeToggle.tsx
widgets/
  _registry.ts          # WidgetId → component map (THIS IS THE SOURCE OF TRUTH for available widgets)
  _types.ts             # WidgetProps, WidgetMeta interfaces (see widget-spec.md)
  chart/
  watchlist/
  basket/
  positions/
  scanner/
  option-chain/
  orderbook/
  …
screens/
  _registry.ts          # ScreenId → layout config (which widgets, where in grid)
lib/
  tokens.ts             # re-exports from design system
  theme.ts              # light/dark provider
  store.ts              # zustand: active screen, layout overrides, theme
.skills/                # these skill files
```

### 6. Theme setup

- CSS variables for light + dark in `globals.css`, sourced from design-system tokens
- `<html data-theme="light|dark">` toggled by `ThemeToggle.tsx`
- All widgets MUST consume tokens, never hardcoded colors

### 7. Grid shell

`GridHost.tsx` wraps `react-grid-layout`. Reads layout config from `screens/_registry.ts`, resolves each cell against `widgets/_registry.ts`, renders.

### 8. Verify

```bash
pnpm dev
```

Open `http://localhost:3000`. Empty grid with top bar and theme toggle should render. **No widgets yet** — that's correct. Bootstrap is done.

## Done when

- `pnpm dev` runs clean
- Theme toggle flips data-theme on `<html>`
- Empty grid + top bar visible
- Design-system tokens accessible via Tailwind utility classes (e.g. `bg-bg-default`, `text-text-primary`) or CSS vars
- No widgets implemented yet — they come next via `figma-to-widget.md`

## Hand-off

After bootstrap, the user will request widgets one by one. Use `figma-to-widget.md` for each.
