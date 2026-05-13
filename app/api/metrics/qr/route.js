import { NextResponse } from "next/server";
import { recordQrGenerated } from "../../../../lib/stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function logStatsDebug(message, details = {}) {
  if (process.env.NODE_ENV !== "production" || process.env.SHORTENX_STATS_DEBUG === "1") {
    console.info(`[ShortenX][stats][qr] ${message}`, details);
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    const eventKey = body && body.eventKey ? String(body.eventKey).trim() : "";
    const shortUrl = body && body.shortUrl ? String(body.shortUrl).trim() : "";

    if (!eventKey) {
      return NextResponse.json({ success: false, error: true, message: "Missing event key" }, { status: 400 });
    }

    const result = await recordQrGenerated(eventKey, { shortUrl });
    logStatsDebug("qr event recorded", { eventKey, shortUrl, tracked: result.tracked, duplicate: result.duplicate });

    return NextResponse.json(
      {
        success: true,
        error: false,
        tracked: result.tracked,
        duplicate: result.duplicate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ShortenX] QR metric tracking failed:", error);
    return NextResponse.json({ success: false, error: true, message: "Failed to track QR event" }, { status: 500 });
  }
}
