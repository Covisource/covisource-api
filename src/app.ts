// dependencies
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

// env config
dotenv.config();

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
import oauthRouter from "./routes/oauthRouter";

// bodyparser config
app.use(bodyParser.json());

// routes config
app.use(indexRouter);
app.use("/auth", authRouter);
app.use("/oauth", oauthRouter);

app.use(get404);
app.use(errorHandler);

// setup mongoose/mongo

mongoose.connect(String(process.env.MONGO_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to Mongo DB");
});

// setup the server

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
