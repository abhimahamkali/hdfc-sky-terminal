export type SearchSymbol = {
  symbol: string;
  name: string;
  exchange: string;
  ltp: string;
};

export const SEARCH_SYMBOLS: SearchSymbol[] = [
  { symbol: "MRF", name: "MRF Ltd", exchange: "NSE", ltp: "1,44,000.00" },
  { symbol: "ICICIBANK", name: "ICICI Bank", exchange: "NSE", ltp: "1,20,000.00" },
  { symbol: "RELIANCE", name: "Reliance Industries", exchange: "NSE", ltp: "2,450.00" },
  { symbol: "TCS", name: "Tata Consultancy", exchange: "NSE", ltp: "4,120.50" },
  { symbol: "HDFCBANK", name: "HDFC Bank", exchange: "NSE", ltp: "1,680.25" },
  { symbol: "INFY", name: "Infosys", exchange: "NSE", ltp: "1,890.00" },
  { symbol: "NIFTY 50", name: "Nifty 50 Index", exchange: "NSE", ltp: "25,829.55" },
  { symbol: "BANKNIFTY", name: "Nifty Bank", exchange: "NSE", ltp: "58,971.20" },
  { symbol: "VODAFONE IDEA", name: "Vodafone Idea", exchange: "NSE", ltp: "14.00" },
  { symbol: "TATAPOWER", name: "Tata Power", exchange: "NSE", ltp: "412.30" },
  { symbol: "MAHABANK", name: "Bank of Maharashtra", exchange: "NSE", ltp: "58.40" },
  { symbol: "AXISBANK", name: "Axis Bank", exchange: "NSE", ltp: "1,102.00" },
];
