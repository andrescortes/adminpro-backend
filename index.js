require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

dbConnection();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World",
    url: req.url,
  });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
