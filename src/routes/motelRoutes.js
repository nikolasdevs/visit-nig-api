import express from "express";
//import validateAcc from "../middlewares/inputValidator.js";

import {
  createMotel,
  deleteMotel,
  getAllMotel,
  getMotelById,
  updateMotel,
} from "../controllers/motelController.js";

const router = express.Router();

router.post("/motels", createMotel);
router.get("/motels", getAllMotel);
router.get("/motels/:slug", getMotelById);
router.put("/motels/:id", updateMotel);
router.delete("/motels/:id", deleteMotel);

export default router;
