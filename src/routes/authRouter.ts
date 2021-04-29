// init
import express from "express";
const router = express.Router();

// controllers
import { newUser_POST } from "../controllers/authController";

router.post("/newUser", newUser_POST);

export default router;
