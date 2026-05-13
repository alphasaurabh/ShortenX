import clientPromise from "./mongodb";
import { getShortenxDb } from "./shortenx-db";
import { createStatsService } from "./stats-core";

function getCollections(db) {
  return {
    statsCollection: db.collection("stats"),
    qrEventsCollection: db.collection("qr_events"),
    urlsCollection: db.collection("urls"),
  };
}

function logStatsDebug(message, details = {}) {
  if (process.env.NODE_ENV !== "production" || process.env.SHORTENX_STATS_DEBUG === "1") {
    console.info(`[ShortenX][stats] ${message}`, details);
  }
}

export async function incrementLinkCreated() {
  try {
    if (!process.env.MONGODB_URI) {
      return false;
    }

    const client = await clientPromise;
    if (!client) {
      return false;
    }

    const db = await getShortenxDb(client);
    const result = await createStatsService(getCollections(db)).incrementLinkCreated();
    logStatsDebug("incrementLinkCreated", { result });
    return result;
  } catch (error) {
    console.error("[ShortenX] Failed to increment link stats:", error);
    return false;
  }
}

export async function recordQrGenerated(eventKey, metadata = {}) {
  try {
    if (!process.env.MONGODB_URI) {
      return { tracked: false, duplicate: false };
    }

    const normalizedEventKey = typeof eventKey === "string" ? eventKey.trim() : "";
    if (!normalizedEventKey) {
      return { tracked: false, duplicate: false };
    }

    const client = await clientPromise;
    if (!client) {
      return { tracked: false, duplicate: false };
    }

    const db = await getShortenxDb(client);
    const result = await createStatsService(getCollections(db)).recordQrGenerated(normalizedEventKey, metadata);
    logStatsDebug("recordQrGenerated", { eventKey: normalizedEventKey, result });
    return result;
  } catch (error) {
    if (error && error.code === 11000) {
      return { tracked: false, duplicate: true };
    }

    console.error("[ShortenX] Failed to record QR generation:", error);
    return { tracked: false, duplicate: false };
  }
}

export async function getDashboardStats() {
  try {
    if (!process.env.MONGODB_URI) {
      return {
        totalLinksCreated: 0,
        totalQRCodesGenerated: 0,
      };
    }

    const client = await clientPromise;
    if (!client) {
      return {
        totalLinksCreated: 0,
        totalQRCodesGenerated: 0,
      };
    }

    const db = await getShortenxDb(client);
    const result = await createStatsService(getCollections(db)).getDashboardStats();
    logStatsDebug("getDashboardStats", result);
    return result;
  } catch (error) {
    console.error("[ShortenX] Failed to load dashboard stats:", error);
    return {
      totalLinksCreated: 0,
      totalQRCodesGenerated: 0,
    };
  }
}
