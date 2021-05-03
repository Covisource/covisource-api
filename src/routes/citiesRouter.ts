import express from "express";
const router = express.Router();

// controllers
import { searchController } from "../controllers/citiesController";

router.get("/search/:query", searchController);

export default router;
