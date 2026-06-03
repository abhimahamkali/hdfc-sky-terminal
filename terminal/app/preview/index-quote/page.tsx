import { IndexQuoteCard } from "@/components/demo/IndexQuoteCard";

/**
 * Isolation route: renders ONLY the IndexQuoteCard on a blank canvas.
 * Public URL once deployed:
 *   https://hdfc-sky-terminal.vercel.app/preview/index-quote
 * Feed that URL into the html.to.design Figma plugin to import just this element.
 */
export default function IndexQuotePreview() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-app, var(--sky-surface-1))",
        padding: 40,
      }}
    >
      <IndexQuoteCard />
    </main>
  );
}
