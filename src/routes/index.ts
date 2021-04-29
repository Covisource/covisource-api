// init
import express from "express";
const router = express.Router();

// controllers
import { home } from "../controllers/index";

router.get("/", home);

export default router;
