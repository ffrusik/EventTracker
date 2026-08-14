import express from "express";
import pg from "pg";

import { login, register, me } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authenticateToken, me);

router.post("/login", login);

router.post("/register", register);

export default router;
