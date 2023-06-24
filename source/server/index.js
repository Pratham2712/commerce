import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./src/Routes/authRouter.js";

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

app.use(
  cors({
    origin: "http://192.168.1.12:3001",
    credentials: true,
  })
);
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ data: "success" });
});
// Routes
app.use("/auth", authRouter);
app.post("/set_cookie", async (req, res) => {
  return res
    .cookie("token", "1234", {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
    })
    .status(200)
    .send("cookie stored");
});
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
