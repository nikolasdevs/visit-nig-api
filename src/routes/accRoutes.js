import express from "express";
//import validateAcc from "../middlewares/inputValidator.js";
import {
  createAcc,
  deleteAcc,
  getAccBySlug,
  getAccByType,
  getAllAcc,
  updateAcc,
} from "../controllers/accController.js";

const router = express.Router();

router.post("/accommodations", createAcc);
router.get("/accommodations", getAllAcc);
router.get("/accommodations/:slug", getAccBySlug);
router.get("/accommodations/type/:type", getAccByType);
router.put("/accommodations/:id", updateAcc);
router.delete("/accommodations/:id", deleteAcc);

export default router;
