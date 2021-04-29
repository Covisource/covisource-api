// dependencies
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import firebase from "firebase-admin";

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
import authRouter from "./routes/auth";

// bodyparser config
app.use(bodyParser.json());

app.use(indexRouter);
app.use("/auth", authRouter);
app.use(get404);
app.use(errorHandler);

app.listen(process.env.PORT || 8080);
