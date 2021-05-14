// init
import express from "express";
const router = express.Router();

// controllers
import {
  fetchUserController,
  newUserController,
} from "../controllers/userController";

// validators
import { newUserValidator } from "../validators/userValidator";

import isAuthenticated from "../middleware/isAuthenticated";

router.get("/fetchUser", isAuthenticated, fetchUserController);
router.post("/newUser", newUserValidator, newUserController);

export default router;
