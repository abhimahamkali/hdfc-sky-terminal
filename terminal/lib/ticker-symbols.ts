export type IndexSymbolConfig = {
  id: string;
  name: string;
  yahooSymbol: string;
  showExpiryTag?: boolean;
};

/** Yahoo Finance symbols for Indian indices */
export const INDEX_SYMBOLS: IndexSymbolConfig[] = [
  { id: "nifty50", name: "Nifty 50", yahooSymbol: "^NSEI", showExpiryTag: true },
  { id: "sensex", name: "SENSEX", yahooSymbol: "^BSESN" },
  { id: "banknifty", name: "Nifty Bank", yahooSymbol: "^NSEBANK" },
  { id: "finnifty", name: "Fin Nifty", yahooSymbol: "^CNXFIN" },
  { id: "midcap", name: "Nifty Midcap", yahooSymbol: "^NSMIDCP" },
];
