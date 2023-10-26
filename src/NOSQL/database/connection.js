/* eslint-disable no-console */
const mongoose = require("mongoose");

const db = require("./mongodb");

mongoose
  .connect(process.env.NOSQL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });

module.exports = { mongoose, db };
