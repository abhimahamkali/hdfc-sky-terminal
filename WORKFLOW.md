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

### Starting the server again later

In PowerShell, from the project's `terminal/` folder:
```powershell
cd C:\Users\Admin\Downloads\Terminal-Project\terminal
npm run dev
```

### "Port 3000 is in use" / "Another next dev server is already running"

This means a dev server is **already running** (often a leftover one). You have two options:
- Just use the port it picked instead (e.g. it'll say `http://localhost:3001`), **or**
- Free up port 3000 by stopping the old server. PowerShell prints the PID — stop it with:
```powershell
taskkill /PID <the-PID-it-printed> /F
```
Then run `npm run dev` again and it will use 3000. You only ever need **one** dev server running.

---

## 2. Start a piece of work (your own branch)

Never edit `main` directly. Make your own branch so your work can't collide with others'.

**Easy way (owner):** run the `branch` command — it asks for a name and creates the branch for you:
```powershell
.\branch
```

**Manual way (and for colleagues):**
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

## 4. Save & go live

### The easy way (owner): the `ship` command

When you're happy on localhost, open PowerShell in the project folder and run:
```powershell
cd C:\Users\Admin\Downloads\Terminal-Project
.\ship
```
It asks **"What did you change?"**, then does everything — stages, commits, merges into
`main`, and pushes. Live in ~1 minute. One word replaces all the git commands below.

> `ship` is the owner's express lane. Colleagues should use the manual branch → PR flow below
> so changes get reviewed.

### The manual way (and what every colleague should do)

When the change looks right:
```bash
git add -A                        # -A = gather ALL your changed files
git commit -m "Describe what you did"
git push -u origin feat/my-widget # upload your branch to GitHub
```

> ⚠️ **IMPORTANT — pushing your branch does NOT update the live site.**
> A branch push only creates a private *preview*. Your change goes live **only after it is
> merged into `main`** (the step below). If the site didn't change, this is why.

**To make it live — merge into `main`. Two ways:**

**Option A — Pull Request (recommended for the team):** in the browser at the repo:
1. Click **Compare & pull request** → **Create pull request**.
2. Review → click **Merge pull request**.
3. Merging into `main` **auto-deploys** → your change is live on the main URL.

**Option B — Quick merge from the terminal (fine for the owner working solo):**
```bash
git checkout main
git pull
git merge feat/my-widget       # bring your branch into main
git push origin main           # → auto-deploys to the live site
```

> Tip: after it's live, wait ~1 min then hard-refresh with **Ctrl + Shift + R** (clears the browser cache).

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
