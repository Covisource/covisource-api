import express from "express";

// controllers
import {
  findResourceController,
  newResourceController,
} from "../controllers/resourceController";

// validators
import { newResourceValidator } from "../validators/resourceValidator";

// middleware
import authenticatedOrHasIp from "../middleware/authenticatedOrHasIp";

const router = express.Router();

router.post(
  "/newResource",
  authenticatedOrHasIp,
  newResourceValidator,
  newResourceController
);

router.get("/findResource", findResourceController);

export default router;
