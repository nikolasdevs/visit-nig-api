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

router.post("/accommodation", createAcc);
router.get("/accommodation", getAllAcc);
router.get("/accommodation/:id", getAccById);
 router.get("/accommodation/type", getAccByType);
router.put("/accommodation/:id", updateAcc);
router.delete("/accommodation/:id", deleteAcc);

export default router;
