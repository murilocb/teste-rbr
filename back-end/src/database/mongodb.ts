import mongoose from "mongoose";
import { config } from "../envs";

const uri = config.MONGODB_URI;

async function connectMongoDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Erro to connect MongoDB:", error);
    process.exit(1);
  }
}

export { connectMongoDB };
