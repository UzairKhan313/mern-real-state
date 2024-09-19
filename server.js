import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth-routes.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import morgan from "morgan";

// Setting path to the dotenv file.
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// For diplay the route and request information..
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/auth", authRouter);

// Not found Routes Error.
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

//Error Handler Middlewar.
app.use(errorHandlerMiddleware);

try {
  mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(
      `server running and connected to Database on http://localhost:${port}`
    );
  });
} catch (error) {
  console.log(error);
  console.log("falid to connect to the data base.");
  process.exit(1);
}
