// init
import express from "express";
const router = express.Router();

// controllers
import { newUserController } from "../controllers/userController";
import { newUserValidator } from "../validators/userValidator";

router.post("/newUser", newUserValidator, newUserController);
// router.post("/setUserLocation")

export default router;
