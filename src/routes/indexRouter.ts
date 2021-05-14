// init
import express from "express";
const router = express.Router();

// controllers
import { index } from "../controllers/indexController";
import isAuthenticated from "../middleware/isAuthenticated";

router.get("/", index);

export default router;
