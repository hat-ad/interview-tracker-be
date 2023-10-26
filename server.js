require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./src/NOSQL/database/connection");
const PORT = process.env.PORT || 8000;
const app = express();

const api = require("./src/v1/routes/api");

app.use(cors());

app.use(express.json());

app.use("/v1/api/", api);

app.listen(PORT, () => {
  console.log("Server is active : http://localhost:%d", PORT);
});

module.exports = app;
