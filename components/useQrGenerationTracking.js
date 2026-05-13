"use client";

import { useEffect } from "react";
import { notifyStatsUpdated } from "../lib/stats-events";

function getSessionId() {
  if (typeof window === "undefined") {
    return "";
  }

  const storageKey = "shortenx-qr-session-id";
  const existingId = window.sessionStorage.getItem(storageKey);
  if (existingId) {
    return existingId;
  }

  const nextId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  window.sessionStorage.setItem(storageKey, nextId);
  return nextId;
}

export default function useQrGenerationTracking({ shortUrl, isEnabled }) {
  useEffect(() => {
    if (!isEnabled || !shortUrl || typeof window === "undefined") {
      return undefined;
    }

    const sessionId = getSessionId();
    const eventStorageKey = `shortenx:qr-tracked:${sessionId}:${shortUrl}`;

    if (window.sessionStorage.getItem(eventStorageKey)) {
      return undefined;
    }

    window.sessionStorage.setItem(eventStorageKey, "pending");

    let cancelled = false;

    const sendQrEvent = async () => {
      try {
        const eventKey = `qr:${sessionId}:${shortUrl}`;
        const response = await fetch("/api/metrics/qr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventKey, shortUrl }),
        });

        if (!response.ok) {
          throw new Error(`QR metric request failed with ${response.status}`);
        }

        if (!cancelled) {
          window.sessionStorage.setItem(eventStorageKey, "tracked");
          notifyStatsUpdated();
        }
      } catch (error) {
        if (!cancelled) {
          window.sessionStorage.removeItem(eventStorageKey);
          console.error("[ShortenX] Failed to track QR generation:", error);
        }
      }
    };

    sendQrEvent();

    return () => {
      cancelled = true;
    };
  }, [isEnabled, shortUrl]);
}