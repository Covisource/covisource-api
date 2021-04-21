// env config
require("dotenv").config();

// express config
const express = require("express");
const app = express();

// routers
const { get404 } = require("./controllers/errorController");
const indexRouter = require("./routes/index");

// bodyparser config
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(indexRouter);
app.use(get404);

app.listen(process.env.PORT || 8080);
