import type { Metadata } from "next";
import "./globals.css";
import "./terminal.css";
import "./option-chain.css";
import "./add-widgets.css";
import "./preferences.css";
import "./global-search.css";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: "HDFC SKY · Terminal",
  description: "HDFC SKY trading terminal",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeInitScript = `
(function() {
  try {
    var key = 'sky-theme-preference';
    var pref = localStorage.getItem(key) || localStorage.getItem('sky-theme') || 'light';
    var resolved = pref;
    if (pref === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
