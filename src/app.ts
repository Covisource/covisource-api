// DEPENDENCIES
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ROUTERS
import { errorHandler, get404 } from "./controllers/errorController";
import indexRouter from "./routes/index";
import authRouter from "./routes/authRouter";
import oauthRouter from "./routes/oauthRouter";

const app = express();

// DOTENV CONFIG
dotenv.config();

// CORS CONFIG
app.use(
  cors({
    origin: process.env.REQUEST_ALLOWED_URL,
  })
);

// BODYPARSER INIT
app.use(bodyParser.json());

// PASSPORT INIT

app.use(passport.initialize());
app.use(passport.session());

// invoked when user logs in - serializes user and stores session cookie
passport.serializeUser(function (user: any, cb: any) {
  cb(null, user);
});

// invoked on each request - used to obtain credential from incoming cookie
passport.deserializeUser(function (obj: any, cb: any) {
  cb(null, obj);
});

// ROUTES

app.use(indexRouter);
app.use("/auth", authRouter);
app.use("/oauth", oauthRouter);

app.use(get404);
app.use(errorHandler);

// MONGOOSE INIT

mongoose.connect(String(process.env.MONGO_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to Mongo DB");
});

// SERVER INIT

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
