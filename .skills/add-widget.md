---
name: add-widget
description: The enhancement loop. Use when the user says "add a widget to screen X", "make the watchlist do Y", "remove the basket from this layout", or any change to a screen's composition. Operates on existing widgets in the registry or pulls a new one in via figma-to-widget.
trigger: User asks to add/remove/modify a widget on a screen, or to enhance an existing widget
---

# Add / Enhance Widget

This is the day-to-day loop after bootstrap. The user works in the terminal (Cursor/Claude Code) and asks for changes; you produce them.

## Two flavors

### A. "Add widget X to screen Y"

1. Check `widgets/_registry.ts` — does widget X exist?
   - **Yes** → skip to step 2
   - **No** → run `figma-to-widget.md` first to build it. Ask for Figma node if not provided
2. Open `screens/_registry.ts`, find screen Y. Append a layout cell:
   ```ts
   { i: 'x-1', widgetId: 'x', x: 8, y: 0, w: 4, h: 8 }
   ```
   Pick `x/y` from an empty area; default `w/h` from the widget's meta
3. Run dev server, screenshot, confirm placement looks sane
4. Report what changed (screen, position, size)

### B. "Modify widget X" / "make X do Y"

1. Locate `widgets/<x>/` — read `index.tsx`, `types.ts`, `meta.ts`
2. Scope the change:
   - **Visual** (new column, reorder, hide something) → edit `index.tsx` + maybe `types.ts`
   - **New config option** (e.g. sort order, symbol) → add to `meta.configurable`, plumb into props, surface in `WidgetFrame` settings menu
   - **New data field** → extend `types.ts`, regenerate mock in `hooks.ts`, render
3. Update the preview route screenshot if the change is visual
4. If the change is large enough that another screen using widget X would be surprised, FLAG IT and confirm before proceeding

## Decision rules

- **One change at a time.** Don't bundle "add column" and "change colors" unless explicitly asked
- **Don't break the contract.** Widget still must follow `widget-spec.md` after the change
- **Don't touch other widgets.** If a refactor would help, mention it but don't do it
- **Preserve the registry shape.** Adding a widget = one line in `_registry.ts`. Adding a config field = one entry in `meta.configurable`. Don't restructure

## Common requests + recipes

| Request | Recipe |
|---|---|
| "Add a basket widget here" | Check registry → place in screen layout → screenshot |
| "Make the watchlist sortable by change%" | Add sort state in widget; expose via header click; tabular-nums preserved |
| "I want option chain on the Scalper screen" | If option-chain exists → place. If not → figma-to-widget first |
| "Swap chart for orderbook" | Edit screen layout cell, replace `widgetId` |
| "Hide volume column on small sizes" | Container query in `index.tsx`, hide column < threshold |
| "Add density toggle" | Lives in `lib/store.ts`, consumed by all widgets — coordinate, don't do it ad-hoc |

## When to push back

- User asks for a widget you can't see in Figma and they haven't given a frame → ask for the design first
- User asks for real data integration → out of scope for this loop, requires its own plan
- User asks for a widget that overlaps heavily with an existing one → propose extending the existing one instead

## Hand-off after each change

State, in 2 lines:
- What file(s) changed
- How to see it (preview route or screen URL)
