---
name: hdfc-sky-design
description: Use this skill to generate well-branded interfaces and assets for HDFC SKY (HDFC Securities' stock & derivatives trading platform), either for production or throwaway prototypes/mocks/decks. Contains essential design guidelines, colors, type, fonts, assets, and a UI kit of the desktop trading terminal (WatchList, Charts, Option Chain, Positions, Add Widgets modal).
user-invocable: true
---

# HDFC SKY — Design Skill

Read this file, then the `README.md` in this skill directory. Explore
the other files as needed — they are organised as follows:

- `README.md` — full context: product overview, content fundamentals,
  visual foundations, iconography, and known caveats / substitutions.
- `colors_and_type.css` — every token as a CSS variable plus utility
  classes (`.h1`, `.body`, `.label`, `.caption`, `.micro`, `.num`,
  `.tag tag--profit/loss/warn/info`). Drop this file into any HTML
  artifact and you have the SKY look immediately.
- `assets/icons/` — outline widget glyphs copied from the Figma
  (chart, option-chain, scales, depth, open-interest, straddle,
  clock, youtube, calculator, filter).
- `assets/images/` — placeholder brand glyph + sample chart images
  used in the Add Widgets tiles.
- `ui_kits/sky_terminal/` — a clickable React/JSX recreation of the
  desktop trading terminal. `index.html` is the live demo;
  `*.jsx` are the per-component files; `tokens.js` is a JS mirror of
  the CSS tokens (`window.SKY.colors / space / radius / font`).
- `preview/` — small specimen cards used to populate the Design
  System tab. Look here for at-a-glance reference.

## When to use this skill

- Designing or prototyping **anything that runs inside HDFC SKY** —
  a new widget, a settings page, an empty state, an order ticket.
- Producing **client-facing materials about SKY** — pitch decks,
  marketing one-pagers, internal docs that should feel on-brand.
- Recreating screenshots from the SKY terminal for design reviews,
  bug reports or experiments.

## How to use this skill

If invoked **without other guidance**, ask the user what they want
to build, with at least the following:

1. Surface — desktop terminal, mobile onboarding, slide deck, other?
2. Theme — light, dark, or both?
3. Fidelity — quick HTML mock, production-quality coded screen,
   or static slide artwork?
4. Variations — should you explore alternatives (e.g. different
   layouts of a widget), or commit to one direction?
5. Real data or sample? If sample, in what symbol / range?

If invoked **with a specific brief**, then:

### For visual artifacts (decks, mocks, throwaway prototypes)

- Copy the assets you need out of `assets/` and the kit out of
  `ui_kits/sky_terminal/` into the working file.
- Link `colors_and_type.css` and use the CSS variables / utility
  classes — do not re-define the palette inline.
- Prefer the existing JSX components in `ui_kits/sky_terminal/` over
  rebuilding from scratch. They already match the Figma.
- Render the output as a static HTML file the user can view.

### For production code (e.g. an actual SKY React app)

- Read `colors_and_type.css` and the `tokens.js` mirror — they
  encode the canonical token names (`--sky-blue-500`, `--profit`,
  `space-md`, etc.) that match `sky-ds-poc/src/tokens/index.ts`.
- The POC `sky-ds-poc` repo has the same names in TypeScript — use
  them so the design system stays in sync.
- Components in `ui_kits/sky_terminal/*.jsx` are **cosmetic
  references**, not production code. Reimplement the structure
  with real state management, accessibility, and data binding.

## Hard rules — the things that must be right

- **One brand accent.** SKY blue `#2850E7` is the only primary
  color. No teals, no oranges, no purples.
- **Green = up, red = down. No exceptions.** `--profit (#039855)`
  and `--loss (#F04438)`. Never use them decoratively.
- **Numerics use tabular figures and Indian number formatting** —
  lakhs/crores, commas every 2/3, ₹ symbol. The `.num` class
  enables `font-feature-settings: "tnum"`.
- **No emoji. No gradients. No glassmorphism. No illustrations.**
  Iconography is outline SVG, 1.5 px stroke, 24×24.
- **Cards are flat** — 1 px `#DDE0F1` border, 8 px radius, no
  shadow. Shadows are reserved for modals and popovers.
- **Voice is operator-grade** — terse labels, Title Case, no
  exclamation, no "Let's go!". The footer carries the SEBI
  reg ID verbatim.

## Quick start — minimal SKY-styled HTML

```html
<!DOCTYPE html>
<html><head>
  <link rel="stylesheet" href="colors_and_type.css">
</head><body style="background: var(--bg-app); padding: 24px;">
  <div style="
    background: var(--bg-card);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    display: inline-flex; flex-direction: column; gap: 8px;
  ">
    <h2 class="h3">Nifty 50</h2>
    <div>
      <span class="num" style="font-size: 24px; font-weight: 600">25,829.55</span>
      <span class="num num--loss" style="margin-left: 8px">↓ −30.55 (−0.12%)</span>
    </div>
    <span class="tag tag--loss">EXPIRY TODAY</span>
  </div>
</body></html>
```

## Compatibility note for Claude Code users

This skill ships as a folder with a top-level `SKILL.md` and a
`README.md`. The CSS, tokens, icons and React JSX files inside are
self-contained — drop the folder into a Claude Code project (or any
agent that follows the Agent Skills format) and reference files by
relative path.
