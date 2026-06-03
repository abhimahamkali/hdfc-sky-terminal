export type TickerQuote = {
  id: string;
  name: string;
  value: string;
  delta: string;
  dir: "up" | "down";
  tag?: string;
  price?: number;
  change?: number;
  changePct?: number;
};

export type TickersApiResponse = {
  tickers: TickerQuote[];
  updatedAt: number;
  source: "live" | "fallback";
};
