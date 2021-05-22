import express from "express";

// middleware
import isAuthenticated from "../middleware/isAuthenticated";

// controllers
import { findCategoryController, newCategoryController } from "../controllers/categoryController";

// validators
import { newCategoryValidator } from "../validators/categoryValidator";

const router = express.Router();

router.post(
  "/newCategory",
  isAuthenticated,
  newCategoryValidator,
  newCategoryController
);

router.get("/findCategory", findCategoryController)

export default router;
