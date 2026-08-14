import z from "zod";
import pool from "../../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define Zod schemas for validation
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

const registerSchema = credentialsSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginSchema = credentialsSchema;

export async function login(req, res) {
  const { email, password } = req.body;

  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    return res.status(400).json(result.error);
  }

  pool.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    });
  });
}

export async function register(req, res) {
  const { email, password, confirmPassword } = req.body;

  const result = registerSchema.safeParse({
    email,
    password,
    confirmPassword,
  });

  if (!result.success) {
    return res.status(400).json(result.error);
  }

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id",
      [email, hashedPassword],
    );

    const userId = result.rows[0].id;

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (err) {
    console.error("DATABASE ERROR:", err);
    res.status(500).json({ message: "Database error" });
  }
}

export async function me(req, res) {
  const userId = req.userId;

  pool.query(
    "SELECT id, email FROM users WHERE id = $1",
    [userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (result.rows.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      res.json(result.rows[0]);
    },
  );
}
