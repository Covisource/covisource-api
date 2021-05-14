// init
import express from "express";
const router = express.Router();

// controllers
import { index } from "../controllers/indexController";

router.get("/", index);

export default router;