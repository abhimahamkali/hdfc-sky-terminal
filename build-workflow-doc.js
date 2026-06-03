const path = require("path");
const fs = require("fs");
const GLOBAL = "C:/Users/Admin/AppData/Roaming/npm/node_modules";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, ExternalHyperlink, PageNumber, TabStopType, TabStopPosition,
} = require(path.join(GLOBAL, "docx"));

const ACCENT = "2850E7";      // SKY blue
const INK = "1A1A2E";
const CODE_BG = "F4F5FB";
const TABLE_HEAD = "DDE0F1";
const MUTED = "68697E";

// ---- helpers ----------------------------------------------------------
const body = (runs, opts = {}) =>
  new Paragraph({ spacing: { after: 120, line: 276 }, children: runs, ...opts });

const text = (t, o = {}) => new TextRun({ text: t, font: "Calibri", size: 22, color: INK, ...o });

const code = (lines) =>
  lines.map((ln, i) =>
    new Paragraph({
      shading: { type: ShadingType.CLEAR, fill: CODE_BG },
      spacing: { before: i === 0 ? 40 : 0, after: i === lines.length - 1 ? 160 : 0, line: 264 },
      indent: { left: 120, right: 120 },
      children: [new TextRun({ text: ln || " ", font: "Consolas", size: 19, color: "1B1E48" })],
    })
  );

const h1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, font: "Calibri", bold: true, size: 30, color: ACCENT })], spacing: { before: 320, after: 140 } });
const h2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, font: "Calibri", bold: true, size: 25, color: INK })], spacing: { before: 220, after: 100 } });

const bullet = (runs) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 80, line: 276 }, children: runs });
const numbered = (runs, ref = "steps") => new Paragraph({ numbering: { reference: ref, level: 0 }, spacing: { after: 80, line: 276 }, children: runs });

const link = (label, url) => new ExternalHyperlink({ link: url, children: [new TextRun({ text: label, style: "Hyperlink", font: "Calibri", size: 22 })] });

const border = { style: BorderStyle.SINGLE, size: 4, color: "C9CCE8" };
const borders = { top: border, bottom: border, left: border, right: border, insideHorizontal: border, insideVertical: border };

function table(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  const mkCell = (content, w, isHead) =>
    new TableCell({
      width: { size: w, type: WidthType.DXA },
      shading: isHead ? { type: ShadingType.CLEAR, fill: TABLE_HEAD } : undefined,
      margins: { top: 60, bottom: 60, left: 120, right: 120 },
      children: [new Paragraph({ children: Array.isArray(content) ? content : [new TextRun({ text: content, font: "Calibri", size: 21, bold: !!isHead, color: INK })] })],
    });
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    borders,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h, i) => mkCell(h, widths[i], true)) }),
      ...rows.map((r) => new TableRow({ children: r.map((c, i) => mkCell(c, widths[i], false)) })),
    ],
  });
}

// ---- content ----------------------------------------------------------
const children = [];

children.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "HDFC SKY Terminal", font: "Calibri", bold: true, size: 48, color: ACCENT })] }));
children.push(new Paragraph({ spacing: { after: 240 }, children: [new TextRun({ text: "Team Workflow — from cloning the project to taking designs into Figma", font: "Calibri", size: 24, color: MUTED, italics: true })] }));

children.push(table(
  ["What", "Where"],
  [
    [[new TextRun({ text: "Live site (always on)", font: "Calibri", size: 21, color: INK })], [link("hdfc-sky-terminal.vercel.app", "https://hdfc-sky-terminal.vercel.app")]],
    [[new TextRun({ text: "Code repository", font: "Calibri", size: 21, color: INK })], [link("github.com/abhimahamkali/hdfc-sky-terminal", "https://github.com/abhimahamkali/hdfc-sky-terminal")]],
    [[new TextRun({ text: "Design file", font: "Calibri", size: 21, color: INK })], [new TextRun({ text: "Figma — Terminal_testing", font: "Calibri", size: 21, color: INK })]],
  ],
  [3000, 6360]
));
children.push(body([text("Note: the app lives in the ", {}), new TextRun({ text: "terminal/", font: "Consolas", size: 20, color: "1B1E48" }), text(" subfolder. Run all npm commands from there.", {})], { spacing: { before: 120, after: 120 } }));

// 0
children.push(h1("0.  Install once (prerequisites)"));
children.push(table(
  ["Tool", "Get it"],
  [
    ["Git", [link("git-scm.com/downloads", "https://git-scm.com/downloads")]],
    ["Node.js (LTS, version 20 or higher)", [link("nodejs.org", "https://nodejs.org")]],
    ["A code editor", [new TextRun({ text: "VS Code, Cursor, or any", font: "Calibri", size: 21, color: INK })]],
    ["Cursor / Claude Code (optional)", [new TextRun({ text: "AI assistants that auto-load this repo's rules. Not required.", font: "Calibri", size: 21, color: INK })]],
  ],
  [4200, 5160]
));
children.push(body([text("Set your Git identity once, so your commits are labelled with your name:")], { spacing: { before: 140, after: 60 } }));
children.push(...code([
  'git config --global user.name "Your Name"',
  'git config --global user.email "you@example.com"',
]));

// 1
children.push(h1("1.  Get the project (clone — do this once)"));
children.push(body([text("Open a terminal (PowerShell on Windows) and run:")]));
children.push(...code([
  "git clone https://github.com/abhimahamkali/hdfc-sky-terminal.git",
  "cd hdfc-sky-terminal/terminal",
  "npm install        # downloads dependencies (first time only)",
  "npm run dev        # starts your local preview at http://localhost:3000",
]));
children.push(body([text("Open "), new TextRun({ text: "http://localhost:3000", font: "Consolas", size: 20, color: "1B1E48" }), text(" — you should see the terminal. Leave npm run dev running.")]));
children.push(body([new TextRun({ text: "Tip: ", font: "Calibri", size: 22, bold: true, color: INK }), text("npm run dev runs forever on purpose — it keeps your local site alive and never says “done”. That is normal, not stuck. Open a second terminal tab for git commands.", { italics: true, color: MUTED })]));

// 2
children.push(h1("2.  Start a piece of work (your own branch)"));
children.push(body([text("Never edit "), new TextRun({ text: "main", font: "Consolas", size: 20, color: "1B1E48" }), text(" directly. Make your own branch so your work cannot collide with others.")]));
children.push(...code([
  "git checkout main",
  "git pull                          # get everyone's latest",
  "git checkout -b feat/my-widget    # -b = create + switch to a new branch",
]));

// 3
children.push(h1("3.  Build / edit on localhost"));
children.push(body([text("Make your change — by hand in the editor, or by asking Cursor / Claude (for example: “Build the straddle chart widget from Figma node 46:5014”). The house rules load automatically, so the brand styling is handled for you.")]));
children.push(body([new TextRun({ text: "As you save, http://localhost:3000 refreshes instantly", font: "Calibri", size: 22, bold: true, color: INK }), text(" and shows your change. This is private to your laptop until you push. Iterate until you are happy.")]));

// 4
children.push(h1("4.  Save & go live"));

// Easiest way: the ship command
children.push(h2("The easy way (owner): the “ship” command"));
children.push(body([text("When you are happy with localhost, open PowerShell in the project folder and run:")]));
children.push(...code([
  "cd C:\\Users\\Admin\\Downloads\\Terminal-Project",
  ".\\ship",
]));
children.push(body([text("It asks “What did you change?”, then does everything — stages your changes, commits, merges into main, and pushes. Your change is live in about a minute. One word replaces all the git commands below.")]));

children.push(h2("The manual way (and what every colleague should do)"));
children.push(body([text("When the change looks right:")]));
children.push(...code([
  "git add -A                        # -A = gather ALL your changed files",
  'git commit -m "Describe what you did"',
  "git push -u origin feat/my-widget # upload your branch to GitHub",
]));
children.push(body([new TextRun({ text: "IMPORTANT — pushing your branch does NOT update the live site.", font: "Calibri", size: 22, bold: true, color: "C0392B" }), text(" A branch push only creates a private preview. Your change goes live ONLY after it is merged into main (below). If the site did not change, this is why.")]));
children.push(body([new TextRun({ text: "To make it live, merge into main — two ways:", font: "Calibri", size: 22, bold: true, color: INK })], { spacing: { before: 100, after: 60 } }));
children.push(body([new TextRun({ text: "Option A — Pull Request (recommended for the team).", font: "Calibri", size: 22, bold: true, color: INK }), text(" In the browser on the repository page:")]));
children.push(numbered([new TextRun({ text: "Click ", font: "Calibri", size: 22, color: INK }), new TextRun({ text: "Compare & pull request", font: "Calibri", size: 22, bold: true, color: INK }), new TextRun({ text: ", then ", font: "Calibri", size: 22, color: INK }), new TextRun({ text: "Create pull request", font: "Calibri", size: 22, bold: true, color: INK }), new TextRun({ text: ".", font: "Calibri", size: 22, color: INK })], "prsteps"));
children.push(numbered([new TextRun({ text: "Review, then click ", font: "Calibri", size: 22, color: INK }), new TextRun({ text: "Merge pull request", font: "Calibri", size: 22, bold: true, color: INK }), new TextRun({ text: " — this auto-deploys to live.", font: "Calibri", size: 22, color: INK })], "prsteps"));
children.push(body([new TextRun({ text: "Option B — Quick merge from the terminal (fine for the owner working solo):", font: "Calibri", size: 22, bold: true, color: INK })], { spacing: { before: 100, after: 60 } }));
children.push(...code([
  "git checkout main",
  "git pull",
  "git merge feat/my-widget       # bring your branch into main",
  "git push origin main           # -> auto-deploys to the live site",
]));
children.push(body([new TextRun({ text: "Tip: ", font: "Calibri", size: 22, bold: true, color: INK }), text("after it is live, wait about a minute then hard-refresh with Ctrl + Shift + R to clear the browser cache.", { italics: true, color: MUTED })]));

// 5
children.push(h1("5.  Take a widget's design INTO Figma (code → Figma)"));
children.push(body([text("When you want a widget or element to exist in Figma — and only that element — use a "), new TextRun({ text: "preview route", font: "Calibri", size: 22, bold: true, color: INK }), text(". It is a tiny page that shows one element alone, giving it its own public URL.")]));
children.push(h2("How it works"));
children.push(bullet([text("In Next.js, a folder under app/preview/<name>/ with a page.tsx file becomes a public URL.")]));
children.push(bullet([text("That page renders only your element — nothing else (no topbar, no other widgets).")]));
children.push(bullet([text("Once pushed, the element has a clean public URL.")]));
children.push(body([new TextRun({ text: "Example that already exists in the project:", font: "Calibri", size: 22, color: INK })], { spacing: { before: 100, after: 60 } }));
children.push(...code([
  "app/preview/index-quote/page.tsx",
  "→ https://hdfc-sky-terminal.vercel.app/preview/index-quote   (shows just one card)",
]));
children.push(h2("Steps for a new element"));
children.push(numbered([text("Build the element (on-brand, using design-system tokens — no raw colors).")], "steps5"));
children.push(numbered([text("Create a preview route that renders only it: app/preview/<name>/page.tsx. Easiest: ask Claude / Cursor — “make a preview route that shows only the X element”.")], "steps5"));
children.push(numbered([text("Push it (Section 4). It gets a public URL: https://hdfc-sky-terminal.vercel.app/preview/<name>")], "steps5"));
children.push(h2("Import into Figma with the html.to.design plugin"));
children.push(numbered([text("Open the Terminal_testing file in Figma.")], "steps5b"));
children.push(numbered([text("Run the html.to.design plugin (by div RIOTS).")], "steps5b"));
children.push(numbered([new TextRun({ text: "Paste the preview URL, then click ", font: "Calibri", size: 22, color: INK }), new TextRun({ text: "Import", font: "Calibri", size: 22, bold: true, color: INK }), new TextRun({ text: ".", font: "Calibri", size: 22, color: INK })], "steps5b"));
children.push(numbered([text("It captures the live element as editable Figma layers — just that element, pixel-faithful.")], "steps5b"));
children.push(body([new TextRun({ text: "Good to know: ", font: "Calibri", size: 22, bold: true, color: INK }), text("extra preview routes do not slow the app — each route loads only when visited. They are public, though, and exist only for exporting; one-off demo routes can be deleted after import.", { italics: true, color: MUTED })], { spacing: { before: 120 } }));

// cheat sheet
children.push(h1("The 5 git commands you will actually use"));
children.push(...code([
  "git pull                          # get latest",
  "git checkout -b feat/something    # start new work on your own branch",
  "git add -A                        # gather your changes",
  'git commit -m "what I did"        # save them',
  "git push                          # upload -> preview -> PR -> merge -> live",
]));

// golden rules
children.push(h1("Golden rules"));
children.push(bullet([text("Work on a branch, never push to main directly.")]));
children.push(bullet([text("One change per branch / PR — easier to review and undo.")]));
children.push(bullet([text("Use design-system tokens, never raw hex colors. Read .skills/widget-spec.md before building a widget.")]));
children.push(bullet([text("localhost = your private preview. The main URL = shared & live.")]));
children.push(body([text("Questions? See CONTRIBUTING.md and the .skills/ folder in the repository.", { color: MUTED, italics: true })], { spacing: { before: 200 } }));

// ---- document ---------------------------------------------------------
const doc = new Document({
  styles: { default: { document: { run: { font: "Calibri", size: 22, color: INK } } } },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 240 } } } }] },
      { reference: "steps", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 240 } } } }] },
      { reference: "prsteps", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 240 } } } }] },
      { reference: "steps5", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 240 } } } }] },
      { reference: "steps5b", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 240 } } } }] },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1300, right: 1300, bottom: 1300, left: 1300 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "HDFC SKY Terminal — Team Workflow", font: "Calibri", size: 16, color: MUTED })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Page ", font: "Calibri", size: 16, color: MUTED }), new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 16, color: MUTED })] })] }) },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  const out = "C:/Users/Admin/Downloads/Terminal-Project/HDFC-SKY-Terminal-Workflow.docx";
  fs.writeFileSync(out, buf);
  console.log("WROTE " + out + " (" + buf.length + " bytes)");
});
