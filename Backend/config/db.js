import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("MongoDB error:", error);
    process.exit(1);
  }
};

