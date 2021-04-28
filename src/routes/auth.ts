// init
import express from "express";
import { newUser_POST } from "../controllers/auth";
const router = express.Router();

// controllers
router.post("/newUser")

router.get("/", newUser_POST);

export default router;