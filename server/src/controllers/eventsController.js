import z from "zod";
import pool from "../../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createEvent(req, res) {
  const { name } = req.body;
  const userId = req.userId;

  const eventSchema = z.object({
    name: z.string().min(1).max(255),
  });

  const result = eventSchema.safeParse({ name });

  if (!result.success) {
    return res.status(400).json(result.error);
  }

  pool.query(
    "INSERT INTO events (name, user_id, created_at) VALUES ($1, $2, NOW()) RETURNING *",
    [name, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      res.status(201).json({ event: result.rows[0] });
    },
  );
}
