import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let clientPromise = null;

if (uri) {
  const globalForMongo = globalThis;

  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    globalForMongo._mongoClientPromise = client.connect().catch((error) => {
      console.error("[ShortenX] MongoDB connection failed:", error);
      throw error;
    });
  }

  clientPromise = globalForMongo._mongoClientPromise;
} else if (process.env.NODE_ENV !== "test") {
  console.warn("[ShortenX] MONGODB_URI is not set. Database-backed features will be unavailable.");
}

export default clientPromise;
