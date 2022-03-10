const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.get("/", (req, res, next) => {
  return res.status(201).json({
    message: "Welcome",
  });
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requsted-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,POST");
    return res.status(200).json({});
  }
  next();
});

//  error handling here
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      massage: error.message,
    },
  });
});

module.exports = app;
