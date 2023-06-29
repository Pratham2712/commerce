import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./src/Routes/authRouter.js";
import { verifyToken } from "./src/middlewares/jwtMiddlewares.js";
import { homeRouter } from "./src/Routes/homeRouter.js";
import { adminRouter } from "./src/Routes/adminRouter.js";

dotenv.config();

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI).then((data) => {
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
app.use("/home", homeRouter);
app.use("/admin", adminRouter);
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
