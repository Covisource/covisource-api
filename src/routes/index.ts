// init
import express from "express";
const router = express.Router();

// controllers
const { home } = require("../controllers/index");

router.get("/", home);

module.exports = router;
