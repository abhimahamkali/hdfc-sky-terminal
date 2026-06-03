"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FALLBACK_TICKERS } from "@/lib/ticker-fallback";
import type { TickersApiResponse, TickerQuote } from "@/lib/ticker-types";

const POLL_MS = 5000;

export function useIndexTickers(enabled = true) {
  const [tickers, setTickers] = useState<TickerQuote[]>(FALLBACK_TICKERS);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const [source, setSource] = useState<"live" | "fallback">("fallback");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set());
  const prevPrices = useRef<Record<string, number>>({});
  const mounted = useRef(true);

  const fetchTickers = useCallback(async () => {
    if (!enabled) return;
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/tickers?_=${Date.now()}`, {
        cache: "no-store",
        headers: { Pragma: "no-cache" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as TickersApiResponse;
      if (!mounted.current) return;

      const changed = new Set<string>();
      for (const t of data.tickers) {
        if (t.price === undefined) continue;
        const prev = prevPrices.current[t.id];
        if (prev !== undefined && prev !== t.price) changed.add(t.id);
        prevPrices.current[t.id] = t.price;
      }

      setTickers(data.tickers);
      setUpdatedAt(data.updatedAt);
      setSource(data.source);
      if (changed.size > 0) {
        setFlashIds(changed);
        window.setTimeout(() => {
          if (mounted.current) setFlashIds(new Set());
        }, 700);
      }
    } catch {
      if (mounted.current) setSource("fallback");
    } finally {
      if (mounted.current) setIsRefreshing(false);
    }
  }, [enabled]);

  useEffect(() => {
    mounted.current = true;
    if (!enabled) return;

    fetchTickers();
    const id = window.setInterval(fetchTickers, POLL_MS);
    return () => {
      mounted.current = false;
      window.clearInterval(id);
    };
  }, [enabled, fetchTickers]);

  return {
    tickers,
    updatedAt,
    source,
    isRefreshing,
    flashIds,
    refresh: fetchTickers,
  };
}
