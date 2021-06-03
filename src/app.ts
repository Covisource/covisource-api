// DEPENDENCIES
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

// ROUTERS
import { errorHandler, get404 } from "./controllers/errorController";
import indexRouter from "./routes/indexRouter";
import userRouter from "./routes/userRouter";
import locationRouter from "./routes/locationRouter";
import resourceRouter from "./routes/resourceRouter";
import categoryRouter from "./routes/categoryRouter";

const app = express();

// DOTENV CONFIG
dotenv.config();

// CORS CONFIG
app.use(
  cors({
    origin: "*",
  })
);

// RATE LIMITING
const limiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs,
  message:
    "Too Many requests fired from this IP. Please wait and try again later.",
});

app.use(limiter);

// BODYPARSER INIT
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// ROUTES
app.use(indexRouter);
app.use("/user", userRouter);
app.use("/location", locationRouter);
app.use("/resource", resourceRouter);
app.use("/category", categoryRouter);

app.use(get404);
app.use(errorHandler);

// MONGOOSE INIT
mongoose.connect(String(process.env.MONGO_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to Mongo DB");
});

// SERVER INIT
const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Connected to google cloud! listening on port ${port}`);
});
