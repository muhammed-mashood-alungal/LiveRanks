import mongoose from "mongoose";
import { env } from "./env.config";

export const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI = env.MONGO_URI
    await mongoose.connect(MONGO_URI);

    if (!MONGO_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
