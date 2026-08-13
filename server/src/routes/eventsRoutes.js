import express from "express";
import pg from "pg";

import { createEvent } from "../controllers/eventsController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/events", authenticateToken, createEvent);

export default router;
