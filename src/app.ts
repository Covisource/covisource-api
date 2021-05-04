// DEPENDENCIES
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ROUTERS
import { errorHandler, get404 } from "./controllers/errorController";
import indexRouter from "./routes/indexRouter";
import authRouter from "./routes/authRouter";
import locationRouter from "./routes/locationRouter";

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

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// ROUTES

app.use(indexRouter);
app.use("/auth", authRouter);
app.use("/location", locationRouter);

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
