import express from "express";
import {
  createTour,
  deleteTour,
  getAllTours,
  getTourBySlug,
  updateTour,
} from "../controllers/tourController.js";
//import validateAcc from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/tours", createTour);
router.get("/tours", getAllTours);
router.get("/tours/:slug", getTourBySlug);
router.put("/tours/:slug", updateTour);
router.delete("/tours/:id", deleteTour);

export default router;
