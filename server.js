import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth-routes.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// Setting path to the dotenv file.
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/v1/auth", authRouter);

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
