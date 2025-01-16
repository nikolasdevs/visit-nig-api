import express from "express";
//import validateAcc from "../middlewares/inputValidator.js";

import {
  createState,
  deleteState,
  getAllStates,
  getStateById,
  updateState,
} from "../controllers/stateController.js";

const router = express.Router();

router.post("/states", createState);
router.get("/states", getAllStates);
router.get("/states/:id", getStateById);
router.put("/states/:id", updateState);
router.delete("/states/:id", deleteState);

export default router;
