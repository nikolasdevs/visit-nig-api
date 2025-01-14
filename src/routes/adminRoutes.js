import express from "express";
//import validateAcc from "../middlewares/inputValidator.js";
import {
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAllAdmin,
  updateAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/admin", createAdmin);
router.get("/admin", getAllAdmin);
router.get("/admin/:id", getAdminById);
router.put("/admin/:id", updateAdmin);
router.delete("/admin/:id", deleteAdmin);

export default router;
