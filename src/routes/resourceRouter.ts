import express from "express";
import newResourceController from "../controllers/resourceController";
import authenticatedOrHasIp from "../middleware/authenticatedOrHasIp";
const router = express.Router();

router.post("/newResource", authenticatedOrHasIp, newResourceController)

export default router