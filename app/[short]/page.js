import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function RedirectPage({ params }) {
  const short = params.short;

  if (!process.env.MONGODB_URI) {
    // Demo behavior: show a simple server-rendered page in demo mode
    return (
      <html>
        <body>
          <h1>Demo short: {short}</h1>
          <p>No DB configured.</p>
        </body>
      </html>
    );
  }

  try {
    const client = await clientPromise;
    const desiredDb = "shortenx";
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    const match = dbs.databases.find((d) => d.name.toLowerCase() === desiredDb.toLowerCase());
    const dbName = match ? match.name : desiredDb;
    const db = client.db(dbName);
    const collection = db.collection("urls");
    const doc = await collection.findOne({ shorturl: short });

    if (!doc) {
      return (
        <html>
          <body>
            <h1>Not found</h1>
          </body>
        </html>
      );
    }

    // increment click counter
    await collection.updateOne({ _id: doc._id }, { $inc: { clicks: 1 } });

    // perform a client-side redirect by returning an HTML page with a small script
    const target = doc.url;
    return (
      <html>
        <head>
          <meta httpEquiv="refresh" content={`0;url=${target}`} />
        </head>
        <body>
          <p>Redirecting to <a href={target}>{target}</a></p>
          <script dangerouslySetInnerHTML={{ __html: `window.location.replace(${JSON.stringify(target)});` }} />
        </body>
      </html>
    );
  } catch (err) {
    console.error("Redirect error:", err);
    return (
      <html>
        <body>
          <h1>Server error</h1>
        </body>
      </html>
    );
  }
}
