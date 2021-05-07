// init
import express from "express";
const router = express.Router();

// controllers
import { index } from "../controllers/indexController";
import isAuthenticated from "../middleware/isAuthenticated";

router.get("/", index);

router.get("/secretRoute", isAuthenticated, (req, res) => {
  res.send((req as any).userId);
});
export default router;
