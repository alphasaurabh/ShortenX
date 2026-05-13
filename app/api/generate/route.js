import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getOriginFromRequest } from "@/lib/site";
import { incrementLinkCreated } from "@/lib/stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function logStatsDebug(message, details = {}) {
  if (process.env.NODE_ENV !== "production" || process.env.SHORTENX_STATS_DEBUG === "1") {
    console.info(`[ShortenX][stats][generate] ${message}`, details);
  }
}

function makeShortCode(len = 6) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    const longUrl = body && body.url ? String(body.url).trim() : "";

    if (!longUrl) {
      return NextResponse.json({ success: false, error: true, message: "Missing 'url' in request" }, { status: 400 });
    }

    if (!isValidHttpUrl(longUrl)) {
      return NextResponse.json({ success: false, error: true, message: "Invalid URL" }, { status: 400 });
    }

    if (!process.env.MONGODB_URI) {
      if (process.env.NODE_ENV !== "development") {
        console.error("[ShortenX] MONGODB_URI is missing in production.");
        return NextResponse.json(
          { success: false, error: true, message: "Database is not configured" },
          { status: 500 }
        );
      }

      const short = makeShortCode(6);
      const base = getOriginFromRequest(request);
      const shortUrl = `${base}/${short}`;
      return NextResponse.json({ success: true, error: false, message: "Demo short url generated", shortUrl }, { status: 200 });
    }

    const client = await clientPromise;
    if (!client) {
      console.error("[ShortenX] MongoDB client did not initialize.");
      return NextResponse.json({ success: false, error: true, message: "Database connection failed" }, { status: 500 });
    }

    const desiredDb = "shortenx";
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    const match = dbs.databases.find((d) => d.name.toLowerCase() === desiredDb.toLowerCase());
    const dbName = match ? match.name : desiredDb;
    const db = client.db(dbName);
    const collection = db.collection("urls");

    let short = makeShortCode(6);
    let attempts = 0;
    while (attempts < 10) {
      const exists = await collection.findOne({ shorturl: short });
      if (!exists) break;
      short = makeShortCode(6);
      attempts++;
    }

    if (attempts >= 10) {
      console.error("[ShortenX] Failed to generate a unique short code after retries.");
      return NextResponse.json(
        { success: false, error: true, message: "Could not generate unique short url" },
        { status: 500 }
      );
    }

    const doc = {
      url: longUrl,
      shorturl: short,
      createdAt: new Date(),
      clicks: 0,
    };

    const insert = await collection.insertOne(doc);
    const incremented = await incrementLinkCreated();
    logStatsDebug("short link created", {
      insertedId: String(insert.insertedId),
      shorturl: short,
      incremented,
    });

    const base = getOriginFromRequest(request);
    const shortUrl = `${base}/${short}`;

    return NextResponse.json(
      {
        success: true,
        error: false,
        message: "URL Generated Successfully",
        shortUrl,
        id: insert.insertedId,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("ShortenX /api/generate error:", err);
    return NextResponse.json({ success: false, error: true, message: "Internal server error" }, { status: 500 });
  }
}
