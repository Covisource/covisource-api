import express from "express";
import { newResourceController } from "../controllers/resourceController";
import authenticatedOrHasIp from "../middleware/authenticatedOrHasIp";
import { newResourceValidator } from "../validators/resourceValidator";
const router = express.Router();

router.post(
  "/newResource",
  authenticatedOrHasIp,
  newResourceValidator,
  newResourceController
);

export default router;
