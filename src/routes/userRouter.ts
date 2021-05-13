// init
import express from "express";
const router = express.Router();

// controllers
import {
  fetchUserController,
  newUserController,
  setUserLocationController,
} from "../controllers/userController";

// validators
import {
  newUserValidator,
  setUserLocationValidator,
} from "../validators/userValidator";

import isAuthenticated from "../middleware/isAuthenticated";

router.post("/newUser", newUserValidator, newUserController);

router.post(
  "/setUserLocation",
  isAuthenticated,
  setUserLocationValidator,
  setUserLocationController
);

router.get("/fetchUser", isAuthenticated, fetchUserController);

export default router;
