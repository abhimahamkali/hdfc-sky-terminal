import { NextResponse } from "next/server";
import {
  formatIndexPrice,
  formatTickerDelta,
  isNiftyWeeklyExpiryDay,
} from "@/lib/format-ticker";
import { FALLBACK_TICKERS } from "@/lib/ticker-fallback";
import { INDEX_SYMBOLS } from "@/lib/ticker-symbols";
import type { TickerQuote } from "@/lib/ticker-types";

type YahooQuoteResult = {
  symbol?: string;
  regularMarketPrice?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  regularMarketPreviousClose?: number;
};

type YahooQuoteResponse = {
  quoteResponse?: {
    result?: YahooQuoteResult[];
  };
};

function parseQuote(
  config: (typeof INDEX_SYMBOLS)[number],
  row: YahooQuoteResult | undefined,
): TickerQuote | null {
  if (!row?.regularMarketPrice) return null;

  const price = row.regularMarketPrice;
  const prev = row.regularMarketPreviousClose ?? price;
  let change = row.regularMarketChange;
  let changePct = row.regularMarketChangePercent;

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

async function fetchYahooQuotesBatch(): Promise<Map<string, TickerQuote>> {
  const symbols = INDEX_SYMBOLS.map((s) => s.yahooSymbol).join(",");
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; HDFCSkyTerminal/1.0; +https://localhost)",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) return new Map();

  const data = (await res.json()) as YahooQuoteResponse;
  const rows = data.quoteResponse?.result ?? [];
  const bySymbol = new Map(rows.map((r) => [r.symbol, r]));
  const out = new Map<string, TickerQuote>();

  for (const config of INDEX_SYMBOLS) {
    const row =
      bySymbol.get(config.yahooSymbol) ??
      rows.find((r) => r.symbol === config.yahooSymbol);
    const quote = parseQuote(config, row);
    if (quote) out.set(config.id, quote);
  }

  return out;
}

export async function GET() {
  const liveMap = await fetchYahooQuotesBatch();
  const live = [...liveMap.values()];

  if (live.length === 0) {
    return NextResponse.json(
      {
        tickers: FALLBACK_TICKERS,
        updatedAt: Date.now(),
        source: "fallback",
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    );
  }

  const tickers = INDEX_SYMBOLS.map(
    (s) => liveMap.get(s.id) ?? FALLBACK_TICKERS.find((f) => f.id === s.id)!,
  );

  return NextResponse.json(
    {
      tickers,
      updatedAt: Date.now(),
      source: live.length === INDEX_SYMBOLS.length ? "live" : "fallback",
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    },
  );
}
