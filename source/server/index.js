import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./src/Routes/authRouter.js";
import axios from "axios";

dotenv.config();

axios.defaults.withCredentials = true;

const connect = async () => {
  try {
    const conn = await mongoose
      .connect(
        "mongodb+srv://prathamvaishya:pratham27122001@todo.fggkco1.mongodb.net/?retryWrites=true&w=majority"
      )
      .then((data) => {
        console.log("MongoDB connected successfully", data.connection.host);
      });
  } catch (error) {
    console.log(error);
  }
};

connect();

const app = express();

app.use("*", cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ data: "success" });
});
// Routes
app.use("/auth", authRouter);
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
