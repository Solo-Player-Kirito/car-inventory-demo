const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const mongoose = require("mongoose");
app.use(express.json());
const db = process.env.MONGO_DB;
mongoose
  .connect(db)
  .then(() => {
    console.log("conneted to the db");
  })
  .catch((err) => {
    console.log("failed to connect with db : ".err);
  });
const carsRouter = require("./routes/cars_router/car.router.js");
const userRouter = require("./routes/cars_router/user.routes.js");
app.use("/api/cars", carsRouter);
app.use("/api/user", userRouter);
app.listen(3001, () => {
  console.log("server on");
});
