const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("colors");
require("dotenv").config();

/* Database Connection */
const connectDB = require("../config/db");
connectDB();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const middlewares = require("./middlewares");

const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/api/logs", require("./api/logs"));

// Page Not found Middleware
app.use(middlewares.notFound);

// Error handling Middleware
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(
    `Server running in "${process.env.NODE_ENV}" mode on port "${port}"`.yellow
      .bold
  );
});
