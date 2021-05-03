// init
import express from "express";
const router = express.Router();
import fetch from "node-fetch";

import cityModel from "../models/cityModel";

router.get("/populateCities", async (req, res) => {
  const fetchRes = await fetch("http://localhost:8080/cities").then((res) =>
    res.json()
  );
  return res.json(fetchRes);
});

export default router;
