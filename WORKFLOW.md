# HDFC SKY Terminal — Team Workflow

A simple, end-to-end guide: from getting the project, to building a widget, to seeing
it live, to taking the design back into Figma. Follow it top to bottom.

- **Live site:** https://hdfc-sky-terminal.vercel.app  (always on — not anyone's laptop)
- **Code repo:** https://github.com/abhimahamkali/hdfc-sky-terminal
- **Figma file:** Terminal_testing

> The app lives in the **`terminal/`** subfolder. Run all `npm` commands from there.

---

## 0. Install once (prerequisites)

| Tool | Get it |
|---|---|
| Git | https://git-scm.com/downloads |
| Node.js (LTS, ≥ 20) | https://nodejs.org |
| A code editor | VS Code, Cursor, or any |
| (optional) Cursor / Claude Code | AI assistants — auto-load this repo's rules. Not required. |

Set your Git identity once (so your commits are labelled):
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## 1. Get the project (clone — do this once)

Open a terminal (PowerShell on Windows) and run:
```bash
git clone https://github.com/abhimahamkali/hdfc-sky-terminal.git
cd hdfc-sky-terminal/terminal
npm install        # downloads dependencies (first time only)
npm run dev        # starts your local preview at http://localhost:3000
```

Open **http://localhost:3000** — you should see the terminal. Leave `npm run dev` running.

> `npm run dev` runs forever on purpose — it keeps your local site alive. It never says
> "done." That's normal, not stuck. Open a **second** terminal tab for git commands.

---

## 2. Start a piece of work (your own branch)

Never edit `main` directly. Make your own branch so your work can't collide with others'.
```bash
git checkout main
git pull                          # get everyone's latest
git checkout -b feat/my-widget    # -b = create + switch to a new branch
```

---

## 3. Build / edit on localhost

Make your change — by hand in the editor, or by asking Cursor/Claude (e.g.
*"Build the straddle chart widget from Figma node 46:5014"*). The house rules load
automatically, so the brand styling is handled for you.

**As you save, http://localhost:3000 refreshes instantly** and shows your change.
This is private to your laptop until you push. Iterate until you're happy.

---

## 4. Save & share (commit → push → PR → live)

When the change looks right:
```bash
git add -A                        # -A = gather ALL your changed files
git commit -m "Describe what you did"
git push -u origin feat/my-widget # upload your branch to GitHub
```

Then in the browser at the repo:
1. Click **Compare & pull request** → **Create pull request**.
2. A teammate reviews → clicks **Merge**.
3. Merging into `main` **auto-deploys** → your change is live on the main URL.

> Tip: after it's live, hard-refresh the site with **Ctrl + Shift + R** (clears the browser cache).

```
edit on localhost (private)
   → git add -A → commit → push       (your branch → preview URL)
   → open PR → Merge into main
   → auto-deploys → LIVE for everyone
```

---

## 5. Take a widget's design INTO Figma (code → Figma)

When you want a widget/element to exist in Figma — and **only that element** — use a
**preview route**. It's a tiny page that shows one element alone, giving it its own URL.

### How it works
- In Next.js, a folder under `app/preview/<name>/` with a `page.tsx` becomes a public URL.
- That page renders **only** your element — nothing else (no topbar, no other widgets).
- Once pushed, the element has a clean public URL.

Example that already exists:
```
app/preview/index-quote/page.tsx
→ https://hdfc-sky-terminal.vercel.app/preview/index-quote   (shows just one card)
```

### Steps for a new element
1. Build the element (on-brand, using design-system tokens — no raw colors).
2. Create a preview route that renders only it: `app/preview/<name>/page.tsx`.
   *(Easiest: ask Claude/Cursor — "make a preview route that shows only the X element.")*
3. Push it (Section 4). It gets a public URL:
   `https://hdfc-sky-terminal.vercel.app/preview/<name>`

### Import into Figma with the html.to.design plugin
1. Open the **Terminal_testing** file in Figma.
2. Run the **html.to.design** plugin (by ‹div›RIOTS).
3. Paste the preview URL → **Import**.
4. It captures the live element as editable Figma layers — just that element, pixel-faithful.

```
build element → preview route → push → public URL
   → html.to.design (paste URL) → element imported into Figma
```

> Extra preview routes do **not** slow the app — each route loads only when visited.
> They're public though, and just for exporting; one-off demo routes can be deleted after import.

---

## The 5 git commands you'll actually use

```bash
git pull                          # get latest
git checkout -b feat/something    # start new work on your own branch
git add -A                        # gather your changes
git commit -m "what I did"        # save them
git push                          # upload → preview → PR → merge → live
```

## Golden rules
- Work on a **branch**, never push to `main` directly.
- **One change per branch / PR** — easier to review and undo.
- Use **design-system tokens**, never raw hex (the rules in `.skills/` and `.cursor/rules/`
  enforce this — read `.skills/widget-spec.md` before building a widget).
- localhost = private preview · the main URL = shared & live.

Questions? See `CONTRIBUTING.md` and the `.skills/` folder in this repo.
