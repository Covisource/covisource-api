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
import { get404 } from "./controllers/errorController";
import indexRouter from "./routes/index";
import authRouter from "./routes/auth";

// bodyparser config
app.use(bodyParser.json());

// firebase config
let serviceAccount;
if (process.env.ENVIRONMENT === "DEV") {
  serviceAccount = require("./firebaseCredDev.json");
} else {
  serviceAccount = require("./firebaseCredProd.json");
}

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount as any),
  databaseURL: process.env.DB_URL,
});

app.use(indexRouter);
app.use(authRouter);
app.use(get404);

app.listen(process.env.PORT || 8080);
