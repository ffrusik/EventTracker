import pool from "../../db/index.js";

export async function getEvents() {
  const result = await pool.query("SELECT id, query FROM events");
  return result.rows;
}

export async function saveEventInfo(data) {
  await pool.query(
    "INSERT INTO events_info (event_id, info, source, url) VALUES ($1, $2, $3, $4)",
    [data.eventId, data.info, data.source, data.url],
  );
}
