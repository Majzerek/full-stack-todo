import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI environment variable is not defined.");
}

// Module-level variable to store the client and DB
let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  if (!client) {
    client = new MongoClient(uri!);
    try {
      console.log("Connecting to MongoDB...");
      await client.connect();
      console.log("Connected to MongoDB.");
    } catch (err) {
      console.error("MongoDB connection error:", err);
      throw err;
    }
  }

  db = client.db("app-full-stack");
  return db;
}