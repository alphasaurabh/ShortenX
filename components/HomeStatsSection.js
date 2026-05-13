"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedCount from "./AnimatedCount";
import { STATS_UPDATED_EVENT } from "../lib/stats-events";

const stats = [
  {
    label: "Total shortened links created",
    getValue: (data) => data.linksCreated,
  },
  {
    label: "Total QR codes generated",
    getValue: (data) => data.qrCodesGenerated,
  },
  { label: "Instant redirects", value: "99.98%" },
  { label: "Platform uptime", value: "24/7" },
];

const DEFAULT_STATS = {
  linksCreated: 0,
  qrCodesGenerated: 0,
};

export default function HomeStatsSection({ initialStats }) {
  const [data, setData] = useState(initialStats || DEFAULT_STATS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const inFlightRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    async function refreshStats() {
      if (inFlightRef.current) {
        return inFlightRef.current;
      }

      setIsRefreshing(true);

      const request = (async () => {
        try {
          const response = await fetch("/api/stats", {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error(`Stats request failed with ${response.status}`);
          }

          const payload = await response.json();
          if (payload?.stats) {
            setData({
              linksCreated: Number(payload.stats.totalLinksCreated) || 0,
              qrCodesGenerated: Number(payload.stats.totalQRCodesGenerated) || 0,
            });
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("[ShortenX] Failed to refresh stats:", error);
          }
        } finally {
          setIsRefreshing(false);
          inFlightRef.current = null;
        }
      })();

      inFlightRef.current = request;
      return request;
    }

    refreshStats();

    const handleStatsUpdated = () => {
      refreshStats();
    };

    window.addEventListener(STATS_UPDATED_EVENT, handleStatsUpdated);

    return () => {
      controller.abort();
      window.removeEventListener(STATS_UPDATED_EVENT, handleStatsUpdated);
    };
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 lg:pb-28">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="premium-card premium-card-hover flex min-h-[132px] items-center justify-center p-[18px] text-center">
            <div className="space-y-1.5">
              <div className="text-2xl font-semibold tracking-tight text-white sm:text-[2rem]">
                {item.getValue ? <AnimatedCount value={item.getValue(data)} /> : item.value}
              </div>
              <p className="text-sm text-slate-400">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
      {isRefreshing ? <span className="sr-only">Refreshing stats</span> : null}
    </section>
  );
}