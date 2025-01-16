import express from "express";
//import validateAcc from "../middlewares/inputValidator.js";
import {
  createBnb,
  deleteBnb,
  getAllBnb,
  getBnbById,
  updateBnb,
} from "../controllers/bnbController.js";

const router = express.Router();

router.post("/bnb", createBnb);
router.get("/bnb", getAllBnb);
router.get("/bnb/:slug", getBnbById);
router.put("/bnb/:id", updateBnb);
router.delete("/bnb/:id", deleteBnb);

export default router;
