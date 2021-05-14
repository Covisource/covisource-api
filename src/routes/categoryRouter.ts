import express from "express";

// middleware
import isAuthenticated from "../middleware/isAuthenticated";

// controllers
import { newCategoryController } from "../controllers/categoryController";

// validators
import { newCategoryValidator } from "../validators/categoryValidator";

const router = express.Router();

router.post(
  "/newCategory",
  isAuthenticated,
  newCategoryValidator,
  newCategoryController
);

export default router;
