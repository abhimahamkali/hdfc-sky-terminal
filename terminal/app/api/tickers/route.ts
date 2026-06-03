import { NextResponse } from "next/server";
import {
  formatIndexPrice,
  formatTickerDelta,
  isNiftyWeeklyExpiryDay,
} from "@/lib/format-ticker";
import { FALLBACK_TICKERS } from "@/lib/ticker-fallback";
import { INDEX_SYMBOLS } from "@/lib/ticker-symbols";
import type { TickerQuote } from "@/lib/ticker-types";

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      meta?: {
        regularMarketPrice?: number;
        chartPreviousClose?: number;
        previousClose?: number;
        regularMarketChange?: number;
        regularMarketChangePercent?: number;
      };
    }>;
  };
};

async function fetchYahooQuote(
  config: (typeof INDEX_SYMBOLS)[number],
): Promise<TickerQuote | null> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(config.yahooSymbol)}?interval=1d&range=1d`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; HDFCSkyTerminal/1.0; +https://localhost)",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = (await res.json()) as YahooChartResponse;
  const meta = data.chart?.result?.[0]?.meta;
  if (!meta?.regularMarketPrice) return null;

  const price = meta.regularMarketPrice;
  const prev =
    meta.chartPreviousClose ?? meta.previousClose ?? price;
  let change = meta.regularMarketChange;
  let changePct = meta.regularMarketChangePercent;

  if (change === undefined || changePct === undefined) {
    change = price - prev;
    changePct = prev !== 0 ? (change / prev) * 100 : 0;
  }

  const dir: "up" | "down" = change >= 0 ? "up" : "down";
  const tag =
    config.showExpiryTag && isNiftyWeeklyExpiryDay()
      ? "EXPIRY TODAY"
      : undefined;

  return {
    id: config.id,
    name: config.name,
    value: formatIndexPrice(price),
    delta: formatTickerDelta(change, changePct),
    dir,
    tag,
    price,
    change,
    changePct,
  };
}

export async function GET() {
  const results = await Promise.all(
    INDEX_SYMBOLS.map((config) => fetchYahooQuote(config)),
  );

  const live = results.filter((q): q is TickerQuote => q !== null);

  if (live.length === 0) {
    return NextResponse.json({
      tickers: FALLBACK_TICKERS,
      updatedAt: Date.now(),
      source: "fallback",
    });
  }

  const byId = new Map(live.map((t) => [t.id, t]));
  const tickers = INDEX_SYMBOLS.map(
    (s) => byId.get(s.id) ?? FALLBACK_TICKERS.find((f) => f.id === s.id)!,
  );

  return NextResponse.json({
    tickers,
    updatedAt: Date.now(),
    source: live.length === INDEX_SYMBOLS.length ? "live" : "fallback",
  });
}
