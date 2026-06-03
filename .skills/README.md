# Terminal Project Skills

Skills that drive the trading-terminal build. Cursor (or Claude Code) reads these to keep work consistent across sessions.

## Order of use

1. **terminal-bootstrap.md** — run ONCE, scaffolds the repo
2. **widget-spec.md** — read BEFORE building or editing any widget
3. **figma-to-widget.md** — convert a Figma frame into a new widget
4. **add-widget.md** — daily loop: add/modify widgets on screens

## Mental model

```
Figma frame  ──(figma-to-widget)──►  /widgets/<id>/  ──(registry)──►  screens compose widgets via grid
                                                                                 ▲
                                                                       add-widget keeps editing here
```

- `/widgets/` is the parts bin
- `/screens/_registry.ts` is the assembly instructions
- `_registry.ts` files are the source of truth — never bypass them

## Cursor wiring

In Cursor, point `.cursor/rules/` at this folder (or symlink), or paste each skill as a project rule. Tell Cursor: "Before any widget work, read `.skills/widget-spec.md`."
