const express = require("express");
const morgan = require("morgan");
const schoolRouter = require("./routes/schoolRouter");
const app = express();

// res objects
app.use(express.json());

//Middlewear
app.use(morgan("dev"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Mounting routes
app.use("/api/v1/schools", schoolRouter);
module.exports = app;
