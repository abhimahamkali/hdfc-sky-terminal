import type { TickerQuote } from "@/lib/ticker-types";

export const FALLBACK_TICKERS: TickerQuote[] = [
  {
    id: "nifty50",
    name: "Nifty 50",
    value: "25,829.55",
    delta: "-30.55 (-0.12%)",
    dir: "down",
    tag: "EXPIRY TODAY",
  },
  {
    id: "sensex",
    name: "SENSEX",
    value: "84,475.53",
    delta: "-204.33 (-0.24%)",
    dir: "down",
  },
  {
    id: "banknifty",
    name: "Nifty Bank",
    value: "58,971.20",
    delta: "+186.05 (+0.31%)",
    dir: "up",
  },
  {
    id: "finnifty",
    name: "Fin Nifty",
    value: "26,402.10",
    delta: "+52.10 (+0.20%)",
    dir: "up",
  },
  {
    id: "midcap",
    name: "Nifty Midcap",
    value: "60,118.40",
    delta: "-14.92 (-0.02%)",
    dir: "down",
  },
];
