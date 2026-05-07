import clientPromise from "@/lib/mongodb";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isValidShortSlug(value) {
  return typeof value === "string" && /^[A-Za-z0-9]{4,24}$/.test(value);
}

function RedirectErrorPage({ short, message }) {
  return (
    <main className="min-h-screen bg-[#071226] text-slate-100 flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">ShortenX</p>
        <h1 className="mt-4 text-3xl font-bold">Link unavailable</h1>
        <p className="mt-3 text-slate-300">{message}</p>
        {short ? <p className="mt-2 text-sm text-slate-500">Slug: {short}</p> : null}
        <a className="mt-6 inline-flex rounded-lg bg-white px-4 py-2 text-slate-900 font-semibold" href="/">
          Back to home
        </a>
      </div>
    </main>
  );
}

export default async function RedirectPage({ params }) {
  const short = Array.isArray(params?.short) ? params.short[0] : params?.short;
  let targetUrl = null;
  let shouldNotFound = false;

  if (!isValidShortSlug(short)) {
    console.warn("[ShortenX] Invalid short slug requested:", short);
    notFound();
  }

  if (!process.env.MONGODB_URI) {
    console.error("[ShortenX] MONGODB_URI is missing on the redirect route.");
    return <RedirectErrorPage short={short} message="This deployment is missing its database configuration." />;
  }

  try {
    const client = await clientPromise;
    if (!client) {
      console.error("[ShortenX] MongoDB client did not initialize on redirect.");
      return <RedirectErrorPage short={short} message="Database connection failed." />;
    }

    const desiredDb = "shortenx";
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    const match = dbs.databases.find((d) => d.name.toLowerCase() === desiredDb.toLowerCase());
    const dbName = match ? match.name : desiredDb;
    const db = client.db(dbName);
    const collection = db.collection("urls");
    const doc = await collection.findOne({ shorturl: short });

    if (!doc) {
      shouldNotFound = true;
    } else {
      await collection.updateOne({ _id: doc._id }, { $inc: { clicks: 1 } });
      targetUrl = doc.url;
    }
  } catch (err) {
    console.error("Redirect error:", err);
    return <RedirectErrorPage short={short} message="We could not resolve that short link right now." />;
  }

  if (shouldNotFound) {
    notFound();
  }

  redirect(targetUrl);
}
