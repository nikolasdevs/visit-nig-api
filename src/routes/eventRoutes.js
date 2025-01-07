import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventBySlug,
  updateEvent,
} from "../controllers/eventController.js";
//import validateAcc from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/events", createEvent);
router.get("/events", getAllEvents);
router.get("/events/:slug", getEventBySlug);
router.put("/events/:slug", updateEvent);
router.delete("/events/:id", deleteEvent);

export default router;
