// dependencies
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import firebase from "firebase-admin";
import mongoose from "mongoose";

// env config
require("dotenv").config();

// express init
const app = express();

// cors config
app.use(
  cors({
    origin: process.env.REQUEST_ALLOWED_URL,
  })
);

// routers
import { errorHandler, get404 } from "./controllers/errorController";
import indexRouter from "./routes/index";
import authRouter from "./routes/authRouter";

// bodyparser config
app.use(bodyParser.json());

app.use(indexRouter);
app.use("/auth", authRouter);
app.use(get404);
app.use(errorHandler);

mongoose.connect(String(process.env.MONGO_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to Mongo DB");
});

app.listen(process.env.PORT || 8080);
