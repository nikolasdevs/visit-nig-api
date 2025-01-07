import express from "express";
import {
  createShopping,
  deleteShopping,
  getAllShopping,
  getShoppingBySlug,
  getShoppingByType,
  updateShopping,
} from "../controllers/shoppingController.js";

const router = express.Router();

router.post("/shopping", createShopping);
router.get("/shopping", getAllShopping);
router.get("/shopping/:slug", getShoppingBySlug);
router.get("/shopping/type/:type", getShoppingByType);
router.put("/shopping/:id", updateShopping);
router.delete("/shopping/:id", deleteShopping);

export default router;
