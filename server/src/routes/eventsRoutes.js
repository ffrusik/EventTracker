import express from "express";
import pg from "pg";

import {
  createEvent,
  getEvents,
  getEventInfo,
  deleteEvent,
} from "../controllers/eventsController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/events", authenticateToken, createEvent);

router.get("/events", authenticateToken, getEvents);

router.get("/events/:id", authenticateToken, getEventInfo);

router.delete("/events/:id", authenticateToken, deleteEvent);

export default router;
