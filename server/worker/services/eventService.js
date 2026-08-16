import pool from "../../db/index.js";

export async function getEvents() {
  const result = await pool.query("SELECT id, query FROM events");
  return result.rows;
}

export async function saveEventInfo(data) {
  await pool.query(
    "INSERT INTO events_info (event_id, info, source, url, title) VALUES ($1, $2, $3, $4, $5)",
    [data.eventId, data.info, data.source, data.url, data.title],
  );
}

export async function hasSameEventInfo(eventId, info) {
  const result = await pool.query(
    "SELECT * FROM events_info WHERE event_id = $1 AND info = $2",
    [eventId, info],
  );
  return result.rows.length > 0;
}
