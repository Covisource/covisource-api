// init
import express from "express";
const router = express.Router();

// controllers
import { newUserController } from "../controllers/authController";
import { newUserValidator } from "../validators/authValidator";

router.post("/newUser", newUserValidator, newUserController);

export default router;
