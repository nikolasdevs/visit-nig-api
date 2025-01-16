import express from "express";
//import validateAcc from "../middlewares/inputValidator.js";

import {
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotelById,
  updateHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

router.post("/hotels", createHotel);
router.get("/hotels", getAllHotel);
router.get("/hotels/:slug", getHotelById);
router.put("/hotels/:id", updateHotel);
router.delete("/hotels/:id", deleteHotel);

export default router;
