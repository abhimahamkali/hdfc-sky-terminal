---
name: figma-to-widget
description: Convert a Figma frame into a working React widget. Use whenever the user gives you a Figma node link or says "build the X widget from Figma". Pairs with widget-spec.md.
trigger: User shares a Figma node URL / says "build <widget> from Figma" / "import this frame as a widget"
---

# Figma → Widget

Goal: produce a 1:1 pixel-faithful widget that conforms to `widget-spec.md`, lives in `/widgets/<id>/`, and is registered.

## Inputs you need from the user

- Figma node URL (must include `?node-id=...`)
- Widget id (kebab-case, e.g. `watchlist`, `option-chain`). If absent, propose one from the frame name and confirm.

## Steps

### 1. Read the frame

Use the Figma MCP (`mcp__a839ed3e-...__get_design_context` or `mcp__figma-console__figma_get_component`). Pull:
- Bounding box + auto-layout structure
- All text values (these become string literals OR mock-data placeholders)
- Color fills + text styles — map every one to a design-system token. If a fill doesn't resolve to a token, FLAG IT to the user; do not invent a hex
- Iconography — match to lucide-react icons; if none fits, ask user

### 2. Identify the data shape

Look at the frame and infer the row/cell structure. Example for a watchlist:

```ts
type WatchlistRow = {
  symbol: string;
  ltp: number;
  change: number;
  changePct: number;
  volume: number;
};
```

Write this into `widgets/<id>/types.ts`.

### 3. Mock data

Generate 20–30 rows of realistic mock data in `widgets/<id>/hooks.ts`:

```ts
export function useWatchlistData(): WatchlistRow[] {
  return MOCK_ROWS;  // hardcoded array, realistic Indian/US tickers depending on Figma
}
```

### 4. Build the component

- Wrap in `<WidgetFrame title={meta.title}>`
- Compose with shadcn primitives (`Table`, `ScrollArea`, etc.) wherever they fit; only drop to raw divs when shadcn doesn't suit
- All tokens, no hex
- Add container-query breakpoints if the frame has clear "compact" vs "full" treatments (often a watchlist hides volume column when narrow)

### 5. Meta

```ts
// widgets/<id>/meta.ts
export default {
  id: '<id>',
  title: '<Figma frame title>',
  category: 'market' | 'trade' | 'analysis' | 'utility',
  defaultSize: { w: 4, h: 8 },  // tune to Figma's visual weight
  minSize: { w: 3, h: 4 },
} as const;
```

### 6. Register

Append to `widgets/_registry.ts`:

```ts
import myWidget from './<id>';
import myMeta from './<id>/meta';
// inside WIDGETS object:
'<id>': { component: myWidget, meta: myMeta },
```

### 7. Preview route

Add `app/preview/<id>/page.tsx` that renders the widget in isolation at its default size, so you can eyeball it against Figma without booting a full screen.

### 8. Compare against Figma

Take a screenshot (`mcp__a839ed3e-...__get_screenshot` for the Figma frame, browser screenshot for the running widget). Diff visually. Iterate up to 3 passes on:
- Padding / gap
- Font sizes + weights
- Column widths
- Hover states
- Truncation

### 9. Report

Tell the user:
- Path to the new widget
- Path to the preview route
- Any unresolved Figma → token mappings (list them)
- Any data fields you guessed at (so they can correct the type)

## Quality bar before declaring done

- Side-by-side screenshot matches Figma to within ~2px on key elements
- Resizes cleanly from min → default → 2× default
- Toggling theme keeps the widget correct (no hardcoded color leaks)
- TypeScript clean, no `any`
- Widget appears in `_registry.ts` and renders on `/preview/<id>`
