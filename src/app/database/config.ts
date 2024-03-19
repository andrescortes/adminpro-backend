import { config } from "dotenv";
import mongoose from "mongoose";

export const dbConnection = async () => {
  const url: string = config().parsed?.URL_DB || "";
  try {
    await mongoose.connect(url, {
      autoIndex: true,
    });
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos");
  }
};
