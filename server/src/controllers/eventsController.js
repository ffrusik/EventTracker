import z from "zod";

import pool from "../../db/index.js";

const eventSchema = z.object({
  name: z.string().min(1).max(255),
  categories: z.array(z.number().int()).min(1),
});

export async function createEvent(req, res) {
  const { name, categories } = req.body;
  const userId = req.userId;

  const validatedData = eventSchema.safeParse({
    name,
    categories,
  });

  if (!validatedData.success) {
    return res.status(400).json(validatedData.error);
  }

  const { name: eventName, categories: categoryIds } = validatedData.data;

  try {
    // Check that all selected categories actually exist
    const categoriesResult = await pool.query(
      `
        SELECT id
        FROM categories
        WHERE id = ANY($1::integer[])
      `,
      [categoryIds],
    );

    if (categoriesResult.rows.length !== categoryIds.length) {
      return res.status(400).json({
        message: "Invalid categories",
      });
    }

    // Create event
    const eventResult = await pool.query(
      `
        INSERT INTO events (query, user_id)
        VALUES ($1, $2)
        RETURNING *
      `,
      [eventName, userId],
    );

    const event = eventResult.rows[0];

    // Connect event with categories
    await pool.query(
      `
        INSERT INTO event_categories (event_id, category_id)
        SELECT $1, UNNEST($2::integer[])
      `,
      [event.id, categoryIds],
    );

    return res.status(201).json({ event });
  } catch (error) {
    console.error("Create event error:", error);

    return res.status(500).json({
      message: "Database error",
    });
  }
}

export async function getEvents(req, res) {
  const userId = req.userId;

  try {
    const result = await pool.query(
      "SELECT * FROM events WHERE user_id = $1 ORDER BY created_at DESC",
      [userId],
    );
    res.status(200).json({ events: result.rows });
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({ message: "Database error" });
  }
}

export async function getEventInfo(req, res) {
  const eventId = req.params.id;
  const userId = req.userId;

  try {
    const result = await pool.query(
      `
        SELECT ei.*
        FROM events_info ei
        JOIN events e ON e.id = ei.event_id
        WHERE ei.event_id = $1
          AND e.user_id = $2
        ORDER BY ei.created_at DESC
      `,
      [eventId, userId],
    );

    return res.status(200).json({
      event: result.rows,
    });
  } catch (error) {
    console.error("Get event info error:", error);

    return res.status(500).json({
      message: "Database error",
    });
  }
}

export async function deleteEvent(req, res) {
  const eventId = req.params.id;
  const userId = req.userId;

  try {
    const result = await pool.query(
      `
        DELETE FROM events
        WHERE id = $1
          AND user_id = $2
        RETURNING *
      `,
      [eventId, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete event error:", error);

    return res.status(500).json({
      message: "Database error",
    });
  }
}
