import express from "express";
//import validateAcc from "../middlewares/inputValidator.js";
import {
  createAcc,
  deleteAcc,
  getAccById,
  getAccByType,
  getAllAcc,
  updateAcc,
} from "../controllers/accController.js";

const router = express.Router();

router.post("/accommodations", createAcc);
router.get("/accommodations", getAllAcc);
router.get("/accommodations/:id", getAccById);
router.get("/accommodations/type/:type", getAccByType);
router.put("/accommodations/:id", updateAcc);
router.delete("/accommodations/:id", deleteAcc);

export default router;
