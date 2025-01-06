import express from "express";

import {
  createNightlife,
  deleteNightlife,
  getAllNightlife,
  getNightlifeBySlug,
  getNightlifeByType,
  updateNightlife,
} from "../controllers/nightlifeController.js";

const router = express.Router();

router.post("/nightlife", createNightlife);
router.get("/nightlife", getAllNightlife);
router.get("/nightlife/:slug", getNightlifeBySlug);
router.get("/nightlife/type/:type", getNightlifeByType);
router.put("/nightlife/:id", updateNightlife);
router.delete("/nightlife/:id", deleteNightlife);

export default router;
