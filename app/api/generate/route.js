import clientPromise from "@/lib/mongodb";

function makeShortCode(len = 6) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

function getBaseUrl(request) {
  const base = process.env.BASE_URL;
  if (base) return base;
  
  // Auto-detect from request origin (works on Vercel)
  const origin = request.headers.get('origin') || request.headers.get('referer');
  if (origin) return origin.replace(/\/$/, '');
  
  // Fallback to localhost
  return 'http://localhost:3000';
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    const longUrl = body && body.url ? String(body.url).trim() : "";

    if (!longUrl) {
      return new Response(JSON.stringify({ success: false, error: true, message: "Missing 'url' in request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      new URL(longUrl);
    } catch {
      return new Response(JSON.stringify({ success: false, error: true, message: "Invalid URL" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // If no MONGODB_URI, demo mode (useful for UI testing)
    if (!process.env.MONGODB_URI) {
      const short = makeShortCode(6);
      const base = getBaseUrl(request);
      const shortUrl = `${base}/${short}`;
      return new Response(JSON.stringify({ success: true, error: false, message: "Demo short url generated", shortUrl }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    // choose the correct DB name (handle existing DB with different case)
    const desiredDb = "shortenx";
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    const match = dbs.databases.find((d) => d.name.toLowerCase() === desiredDb.toLowerCase());
    const dbName = match ? match.name : desiredDb;
    const db = client.db(dbName);
    const collection = db.collection("urls");

    // generate unique shortcode (retry)
    let short = makeShortCode(6);
    let attempts = 0;
    while (attempts < 6) {
      const exists = await collection.findOne({ shorturl: short });
      if (!exists) break;
      short = makeShortCode(6);
      attempts++;
    }
    if (attempts >= 6) {
      return new Response(JSON.stringify({ success: false, error: true, message: "Could not generate unique short url" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const doc = {
      url: longUrl,
      shorturl: short,
      createdAt: new Date(),
    };

    const insert = await collection.insertOne(doc);

    const base = getBaseUrl(request);
    const shortUrl = `${base}/${short}`;

    return new Response(
      JSON.stringify({
        success: true,
        error: false,
        message: "URL Generated Successfully",
        shortUrl,
        id: insert.insertedId,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("ShortenX /api/generate error:", err);
    return new Response(JSON.stringify({ success: false, error: true, message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
