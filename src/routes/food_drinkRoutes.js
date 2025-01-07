import express from "express";
import {
  createFood_Drink,
  deleteFood_Drink,
  getAllFood_Drinks,
  getFood_DrinkBySlug,
  updateFood_Drink,
} from "../controllers/food_drinkController.js";
//import validateAcc from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/food_drinks", createFood_Drink);
router.get("/food_drinks", getAllFood_Drinks);
router.get("/food_drinks/:slug", getFood_DrinkBySlug);
router.put("/food_drinks/:slug", updateFood_Drink);
router.delete("/food_drinks/:id", deleteFood_Drink);

export default router;
