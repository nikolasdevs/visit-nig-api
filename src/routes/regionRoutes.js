import express from "express";
//import validateAcc from "../middlewares/inputValidator.js";
import {
  createRegion,
  deleteRegion,
  getAllRegion,
  getRegionById,
  updateRegion,
} from "../controllers/regionController.js";

const router = express.Router();

router.post("/region", createRegion);
router.get("/region", getAllRegion);
router.get("/region/:id", getRegionById);
router.put("/region/:id", updateRegion);
router.delete("/region/:id", deleteRegion);

export default router;
