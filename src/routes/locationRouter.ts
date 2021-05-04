import express from "express";
import { getHereOauthTokenController } from "../controllers/locationController";
const router = express.Router();

// controllers
router.post("/getHereOauthToken", getHereOauthTokenController);

export default router;
