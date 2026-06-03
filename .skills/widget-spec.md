---
name: widget-spec
description: The contract every widget in the terminal must follow. Read this BEFORE building or modifying any widget. Defines file layout, props, theming rules, density, resize behavior, and the widget registry.
trigger: Building or modifying any widget; reviewing widget code
---

# Widget Spec

Every widget in `/widgets/<name>/` is a self-contained, themable, resizable unit that can be dropped into any screen's grid.

## File layout per widget

```
widgets/<name>/
  index.tsx          # Default export: the widget component
  meta.ts            # WidgetMeta: id, title, defaultSize, minSize, category
  types.ts           # Widget-specific types (rows, columns, etc.)
  *.tsx              # Sub-components (header, body, row, etc.)
  hooks.ts           # Optional: data hooks (mock data for now)
```

## Widget component contract

```ts
// widgets/_types.ts
export interface WidgetProps {
  id: string;              // unique instance id in the screen
  title?: string;          // override default title
  config?: Record<string, unknown>;  // widget-specific config (symbol, columns, etc.)
}

export interface WidgetMeta {
  id: string;              // 'chart' | 'watchlist' | …
  title: string;           // Default visible title
  category: 'market' | 'trade' | 'analysis' | 'utility';
  defaultSize: { w: number; h: number };  // grid units
  minSize: { w: number; h: number };
  configurable?: string[]; // keys users can edit in widget settings
}
```

Every `index.tsx` must:

1. Accept `WidgetProps`
2. Render a `<WidgetFrame>` wrapper (provides header, drag handle, settings menu, close)
3. Be fully keyboard + screen-reader navigable inside
4. Use ONLY design-system tokens — no `#fff`, no `text-gray-500`, no inline hex
5. Handle 4 size buckets gracefully: tiny / small / medium / large (use container queries via `@container`)
6. Mock data lives in `hooks.ts` — return realistic shape so swap-to-real-data is trivial later

## Theming rules

- Colors: only `bg-*`, `text-*`, `border-*` classes that resolve to tokens
- Bid/ask: `text-bid` (green/blue per DS) and `text-ask` (red/orange per DS) — never raw colors
- Numbers: monospace tabular-nums (`font-mono tabular-nums`)
- Tables: row hover, zebra optional, sticky header
- Dense by default: 12–13px base, tight line-height. Add a density toggle later, not now

## Registry

Every new widget MUST be added to `widgets/_registry.ts`:

```ts
import chart from './chart';
import chartMeta from './chart/meta';
// …
export const WIDGETS = {
  chart: { component: chart, meta: chartMeta },
  watchlist: { component: watchlist, meta: watchlistMeta },
  // …
} as const;

export type WidgetId = keyof typeof WIDGETS;
```

The registry is what lets screens reference widgets by id and what lets the "add widget" enhancement loop discover available widgets.

## Resize behavior

- `WidgetFrame` exposes a CSS container, so widgets read `@container` queries to adapt
- Tables: collapse non-essential columns at small sizes
- Charts: hide axis labels at tiny size
- Never render scrollbars on the widget root — scroll lives inside the body section

## Anti-patterns (do not do)

- Don't reach outside your widget folder for state. Use props or the shared zustand store
- Don't hardcode dimensions in px — use grid units in `meta.ts` and let `react-grid-layout` size the frame
- Don't import another widget. If two widgets share UI, extract to `components/`
- Don't fetch real data yet. Mock everything via `hooks.ts`
