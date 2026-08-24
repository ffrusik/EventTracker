import pool from "../../db/index.js";

export async function getCategories(req, res) {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (err) {
    console.error("DATABASE ERROR:", err);
    res.status(500).json({ message: "Database error" });
  }
}
