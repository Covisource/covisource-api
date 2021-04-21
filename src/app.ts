// env config
require("dotenv").config();

// bodyparser config
const bodyParser = require("body-parser");

// routers
const { get404 } = require("./controllers/errorController");
const indexRouter = require("./routes/index");

// express config
const express = require("express");
const app = express();

app.use(indexRouter);
app.use(get404);

app.listen(process.env.PORT || 8080);
