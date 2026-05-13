export const STATS_UPDATED_EVENT = "shortenx:stats-updated";

export function notifyStatsUpdated() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(STATS_UPDATED_EVENT));
}
