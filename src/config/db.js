import mongoose from "mongoose";

export async function connectDB(uri) {
  if (!uri) throw new Error("MONGODB_URI is missing");
  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB || undefined,
  });

  console.log("✅ MongoDB connected");
  return mongoose.connection;
}
