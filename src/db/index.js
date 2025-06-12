import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("MONGODB connection successful !!");
  } catch (error) {
    console.log("MONGODB connection failed ", error);
    process.exit(1);
  }
};
