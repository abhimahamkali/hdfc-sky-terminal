export function formatIndexPrice(n: number) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatTickerDelta(change: number, changePct: number) {
  const changeStr =
    change >= 0
      ? `+${formatIndexPrice(change)}`
      : formatIndexPrice(change);
  const pctSign = changePct >= 0 ? "+" : "";
  return `${changeStr} (${pctSign}${changePct.toFixed(2)}%)`;
}

/** Nifty 50 weekly index options expire on Thursday (IST). */
export function isNiftyWeeklyExpiryDay(date = new Date()) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
  }).format(date);
  return weekday === "Thu";
}
