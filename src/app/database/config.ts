import { config } from "dotenv";
import mongoose from "mongoose";

export const dbConnection = async () => {
  const url: string = config().parsed?.URL_DB || "";
  try {
    await mongoose.connect(url, {
      autoIndex: true,
    });
    console.log("Database online...");
  } catch (error) {
    console.log(error);
    throw new Error("Database error initialization");
  }
};
