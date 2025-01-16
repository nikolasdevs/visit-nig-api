import express from "express";
//import validateAcc from "../middlewares/inputValidator.js";
import {
  createCountry,
  deleteCountry,
  getAllCountry,
  getCountryById,
  updateCountry,
} from "../controllers/countryController.js";

const router = express.Router();

router.post("/countries", createCountry);
router.get("/countries", getAllCountry);
router.get("/countries/:id", getCountryById);
router.put("/countries/:id", updateCountry);
router.delete("/countries/:id", deleteCountry);

export default router;
