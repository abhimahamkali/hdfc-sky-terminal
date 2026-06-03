# Contributing — HDFC SKY Terminal

How we work on this project together. Read once before your first change.

## TL;DR

- **Live site:** https://hdfc-sky-terminal.vercel.app — always on, hosted on Vercel. Not your laptop.
- **localhost:3000** is your *private* sandbox to test changes before sharing. Optional, only while coding.
- You **never push to `main` directly.** Make a branch, push it, open a PR, merge.
- Every push gives a **preview URL**; merging to `main` updates the **live** site.

---

## Prerequisites (install once)

You only need four things. Any operating system works — the commands are identical on
Windows, Mac, and Linux.

| Tool | Required? | Get it |
|---|---|---|
| **Git** | ✅ required | https://git-scm.com/downloads |
| **Node.js** (LTS, ≥ 20) | ✅ required | https://nodejs.org |
| **A code editor** | ✅ required | VS Code (https://code.visualstudio.com), Cursor, or any |
| **A terminal** | ✅ required | Already built in — PowerShell (Windows), Terminal (Mac), bash (Linux) |
| **GitHub account** | ✅ required | https://github.com — send your username to the owner for push access |
| Claude Code / Cursor | ⚪ optional | Speed boosters that auto-load this repo's rules. Not needed to contribute. |

> You do **not** need Claude, Cursor, or any AI tool to work on this project. They just
> make it faster. Plain VS Code is perfectly fine.

Check Git and Node are installed:
```bash
git --version     # any recent version
node --version    # should print v20.x or higher
```

## First-run setup

```bash
git clone https://github.com/abhimahamkali/hdfc-sky-terminal.git
cd hdfc-sky-terminal/terminal     # NOTE: the app lives in the terminal/ subfolder
npm install                       # installs dependencies (first time only)
npm run dev                       # open http://localhost:3000
```

If `npm run dev` shows the terminal UI at http://localhost:3000, you're ready.

> Optional: if you use **Cursor** or **Claude Code**, they auto-load the rules in
> `.cursor/rules/` and `.skills/` — no configuration needed. Other editors: just read
> `.skills/widget-spec.md` and this file before building.

> Run all `npm` commands from `terminal/`, **not** the repo root. The repo root holds docs +
> the design system; the Next.js app is in `terminal/`.

---

## The daily flow (branch → push → PR → merge)

```bash
# 1. Always start from the latest main
git checkout main
git pull

# 2. Make your own branch (no collisions with teammates)
git checkout -b feat/short-description     # e.g. feat/add-widgets-popover

# 3. Work. Test on http://localhost:3000 as you go.
#    Commit checkpoints as often as you like — they're free and local.
git add -A
git commit -m "Build the Add Widgets popover"

# 4. Push to share it. This creates a Vercel PREVIEW url (does NOT touch the live site).
git push -u origin feat/short-description

# 5. Open a Pull Request on GitHub. Vercel posts a preview link on the PR.
#    A teammate reviews → Merge → the change goes LIVE on the main URL.
```

### When do I push?
- **Commit often** locally (cheap checkpoints).
- **Push** when you want a backup, a shareable preview link, or feedback — and always before
  you stop for the day, so work isn't trapped on one laptop.
- You do **not** push on every keystroke. Edits show on your own localhost instantly without pushing.

### Branch names
`feat/...` new feature · `fix/...` bug fix · `chore/...` tooling/docs. Keep them short and kebab-case.

### Shortcut for the owner: `ship`
The repo owner working solo can skip the branch/PR steps with the `ship` command — run
`.\ship` in PowerShell, answer "what did you change?", and it commits + merges to `main` +
pushes (auto-deploys to live). Colleagues should **not** use this — always use the branch →
PR flow above so changes are reviewed.

---

## What "live" vs "preview" means

| URL | Comes from | Who sees it |
|---|---|---|
| https://hdfc-sky-terminal.vercel.app | the `main` branch | everyone (the real site) |
| `…-git-<branch>-….vercel.app` (preview) | your pushed branch / PR | anyone with the link |
| http://localhost:3000 | your unsaved local edits | only you |

Auto-deploy is on: push to `main` → live site rebuilds; push a branch / open a PR → preview rebuilds.
You never run a deploy command by hand.

---

## House rules (non-negotiable — they keep the brand intact)

Full detail in `.cursor/rules/house-rules.mdc` and the `.skills/*.md` playbooks. The essentials:

- **CSS variables only**, never raw hex. One accent: SKY blue `var(--accent)`.
- **Green = up, red = down.** `var(--profit)` / `var(--loss)`. Never decorative.
- **All numerics** get `className="num"`. **Indian number format:** `1,44,000.00`, not `144,000`.
- **Inter font only**, dense 10–14px sizing. **No emoji, no exclamation marks.**
- Cards are flat: 1px border, 8px radius, no shadow.
- **Registries are the source of truth** — `widgets/_registry.ts` and `screens/_registry.ts`.
  Never bypass them by hand-editing page files.
- **One change per PR.** Don't bundle unrelated edits.

Before building or editing a widget, read `.skills/widget-spec.md`.
Porting a Figma frame? Read `.skills/figma-to-widget.md`.
Adding/moving a widget on a screen? Read `.skills/add-widget.md`.

---

## Before you open a PR

```bash
cd terminal
npm run build     # must pass — Vercel runs the same build
npm run lint
```

If the build fails locally, it'll fail on Vercel too. Fix it before pushing for review.

---

## Getting push access

The repo is public so anyone can clone, but pushing branches needs collaborator access.
Ask the owner (**abhimahamkali**) to add you under **GitHub repo → Settings → Collaborators**.
