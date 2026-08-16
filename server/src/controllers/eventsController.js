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
    "INSERT INTO events (query, user_id, created_at) VALUES ($1, $2, NOW()) RETURNING *",
    [name, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      res.status(201).json({ event: result.rows[0] });
    },
  );
}

export async function getEvents(req, res) {
  const userId = req.userId;

  pool.query(
    "SELECT * FROM events WHERE user_id = $1 ORDER BY created_at DESC",
    [userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      res.status(200).json({ events: result.rows });
    },
  );
}

export async function getEventInfo(req, res) {
  const eventId = req.params.id;

  pool.query(
    "SELECT * FROM events_info WHERE event_id = $1 ORDER BY created_at DESC",
    [eventId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      // if (result.rows.length === 0) {
      //   return res
      //     .status(404)
      //     .json({ message: "Event not found", event: result.rows });
      // }

      res.status(200).json({ event: result.rows });
    },
  );
}

export async function deleteEvent(req, res) {
  const eventId = req.params.id;

  pool.query("DELETE FROM events WHERE id = $1", [eventId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  });
}
