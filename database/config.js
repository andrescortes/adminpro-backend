const mongoose = require("mongoose");

const dbConnection = async () => {
  const url = process.env.URL_DB;
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

module.exports = {
  dbConnection,
}