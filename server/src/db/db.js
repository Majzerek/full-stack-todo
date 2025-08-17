"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error("MONGO_URI environment variable is not defined.");
}
// Module-level variable to store the client and DB
let client = null;
let db = null;
async function connectToDatabase() {
    if (db) {
        return db;
    }
    if (!client) {
        client = new mongodb_1.MongoClient(uri);
        try {
            console.log("Connecting to MongoDB...");
            await client.connect();
            console.log("Connected to MongoDB.");
        }
        catch (err) {
            console.error("MongoDB connection error:", err);
            throw err;
        }
    }
    db = client.db("app-full-stack");
    return db;
}
